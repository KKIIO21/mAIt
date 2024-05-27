import PIL
import os
import uuid
import json
import random
import openai
import time
import requests
from flask import Flask, request, jsonify, send_from_directory
from diffusers import StableDiffusionInstructPix2PixPipeline, EulerAncestralDiscreteScheduler
from flask_cors import CORS
from gtts import gTTS

app = Flask(__name__)
CORS(app)

#############################################################################################################
# Image #

model_id = "timbrooks/instruct-pix2pix"
pipe = StableDiffusionInstructPix2PixPipeline.from_pretrained(model_id, safety_checker=None)
pipe.scheduler = EulerAncestralDiscreteScheduler.from_config(pipe.scheduler.config)

UPLOAD_FOLDER = 'image_upload'
RESULT_FOLDER = 'image_result'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER

def load_image(file_path):
    image = PIL.Image.open(file_path)
    image = PIL.ImageOps.exif_transpose(image)
    image = image.convert("RGB")
    return image

def resize_image(image, max_width=300):
    # 현재 이미지의 크기
    width, height = image.size
    # 새 너비를 기준으로 높이를 비율에 맞게 조정
    ratio = max_width / float(width)
    new_height = int(ratio * float(height))
    # 이미지 리사이즈
    image = image.resize((max_width, new_height), PIL.Image.LANCZOS)
    return image

def save_image(image, folder, quality=None):
    unique_filename = str(uuid.uuid4()) + '.jpg'
    file_path = os.path.join(app.config[folder], unique_filename)
    if quality is not None:
        image.save(file_path, quality=quality)
    else:
        image.save(file_path)
    return file_path

# Prompt mappings for image conversion
prompts = {
    '젊은시절': "make the person younger",
    '디즈니': "make the person a Disney cartoon character",
    '픽사': "make it Pixar style",
    '사이보그': "make the person a cyborg"
}

@app.route('/image_result/<filename>')
def result_file(filename):
    return send_from_directory(app.config['RESULT_FOLDER'], filename)

def process_image(file_path, prompt):
    image = load_image(file_path)
    image = resize_image(image)  # 이미지 리사이즈 추가
    images = pipe(prompt, image=image, num_inference_steps=8, image_guidance_scale=1.5).images
    result_image = images[0]
    result_image_path = save_image(result_image, 'RESULT_FOLDER')
    return result_image_path

@app.route('/ImageConversion', methods=['POST'])
def convert_image():
    try:
        file = request.files['file']
        prompt = request.form['prompt']

        prompt = prompts.get(prompt, "make the person younger")  # defaults to "make the person younger"

        # Save uploaded images temporarily
        uploaded_image_path = save_image(resize_image(load_image(file)), 'UPLOAD_FOLDER', quality=50)  # 이미지 리사이즈 및 품질을 50%로 저장
        app.logger.info(f"Uploaded file saved to: {uploaded_image_path}")

        # Process the image synchronously
        result_image_path = process_image(uploaded_image_path, prompt)

        # Generate URL for the resulting image
        result_image_url = request.url_root + 'image_result/' + os.path.basename(result_image_path)

        return jsonify({'result': 'success', 'image_url': result_image_url})
    except Exception as e:
        return jsonify({'result': 'error', 'message': str(e)})

#############################################################################################################
# News #

clicks = {'poli': 0, 'econo': 0, 'soci': 0, 'cul': 0}

def load_json_data(file_name):
    with open(f'news_data/{file_name}.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
    return random.choice(data)  # 각 파일에서 무작위 기사 반환

@app.route('/update_clicks/<category>', methods=['POST'])
def update_clicks(category):
    if category in clicks:
        clicks[category] += 1
        return jsonify({'message': 'Updated'}), 200
    return jsonify({'message': 'Category not found'}), 404

@app.route('/get_news', methods=['GET'])
def get_news():
    categories = ['poli', 'econo', 'soci', 'cul']  # 카테고리 목록
    news_data = [load_json_data(category) for category in categories]
    most_clicked_category = max(clicks, key=clicks.get)
    recommended_article = load_json_data(most_clicked_category)
    return jsonify({'news': news_data, 'recommended': recommended_article})

#############################################################################################################
# ChatBot #


# text to voice
def text2voice(r_text, chatId, voice):
    timestamp = str(int(time.time()))
    filename = f"{chatId}/{chatId}_{timestamp}_답변.mp3"
    url = "https://typecast.ai/api/speak"
    
    # 오류로 인해 하드코딩으로 진행했음.
    # actors_id = ["5ffda44bcba8f6d3d46fc41f", "63a3d9da4b235ddd6541a795", "65c47f4f7e237f1cb0a80380", "63edf3d68aab086d6b782a55", "633d52c5febcba27f45eced7", "65571d1aa52fc0f2872045fa"]
    
    # actor_id = actors_id[int(voice)]

    payload = json.dumps({
        "actor_id": "65c47f4f7e237f1cb0a80380",
        "text": r_text,
        "lang": "auto",
        "tempo": 1,
        "volume": 100,
        "pitch": 0,
        "xapi_hd": True,
        "max_seconds": 60,
        "model_version": "latest",
        "xapi_audio_format": "mp3"
    })
    
    try:
        with open('./key2.txt', 'r') as file:
            key = file.read()
    except Exception as e:
        return jsonify({'error': f'Failed to load API key2. ERROR: {str(e)}'}), 500
    
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'{key}'
    }

    try:
        response = requests.post(url, headers=headers, data=payload)
        
        if response.status_code == 401:
            print("인증 오류: API 호출에 실패했습니다. 인증 토큰을 확인하세요.")
            return False
        elif response.status_code == 400:
            print("잘못된 요청: 요청 형식을 확인하세요.")
            print("응답 내용:", response.text)
            return False
        
        response.raise_for_status()
        
        response_json = response.json()
        result = response_json.get("result")
        
        if result:
            speak_url = result.get("speak_v2_url")
            
            if speak_url:
                for _ in range(120):  # 최대 120초 동안 폴링
                    audio_response = requests.get(speak_url, headers=headers)
                    audio_result = audio_response.json().get("result")
                    
                    if audio_result['status'] == 'done':
                        audio_download_url = audio_result.get('audio_download_url')
                        if audio_download_url:
                            final_audio_response = requests.get(audio_download_url)
                            final_audio_response.raise_for_status()  # HTTP 오류 발생 시 예외 발생

                            # 'result' 디렉토리가 존재하지 않으면 생성
                            if not os.path.exists('result'):
                                os.makedirs('result')

                            with open(f"chatbot_result/{filename}", 'wb') as audio_file:
                                audio_file.write(final_audio_response.content)
                            return timestamp
                        else:
                            print("오디오 다운로드 URL을 찾을 수 없습니다.")
                            return False
                    elif audio_result['status'] == 'progress':
                        print(f"status: {audio_result['status']}, waiting 1 second")
                        time.sleep(1)
                    else:
                        print("오디오 생성에 실패했습니다.")
                        return False
            else:
                print("오디오 생성 URL을 찾을 수 없습니다.")
                return False
        else:
            print("응답에서 결과를 찾을 수 없습니다.")
            return False
    except requests.exceptions.RequestException as e:
        print(f"text2voice 실행 중 오류 발생: {str(e)}")
        return False

@app.route('/message', methods=['POST'])
def message():
    data = request.json
    text = data.get('text')
    chatId = data.get('chatId')
    voice = data.get('voice')
    print(voice)

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # api 비밀키 로드
    try:
        with open('./key.txt', 'r') as file:
            key = file.read()
    except Exception as e:
        return jsonify({'error': f'Failed to load API key. ERROR: {str(e)}'}), 500

    openai.api_key = key

    title = text.split()[0]
    folder = f'./chatbot_result/{chatId}'
    txt = f'./chatbot_result/{chatId}/{chatId}.txt'

    # 폴더 생성, 입력 추가
    if not os.path.exists(folder):
        os.makedirs(folder)
    with open(txt, 'a', encoding='utf-8') as file:
        file.write("입력: " + text + '\n')

    with open(txt, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    existing_conversations = []
    for line in lines:
        # 입력과 출력을 구분하여 existing_conversations에 추가
        if (line.startswith("입력: ")):
            existing_conversations.append({"role": "user", "content": line.strip().replace("입력: ", "")})
        elif (line.startswith("출력: ")):
            existing_conversations.append({"role": "assistant", "content": line.strip().replace("출력: ", "")})

    # gpt 초기 설정
    conversation = (
        [{"role": "system", "content": "한글로 친절하게 설명해줘. 하지만 무조건 100자 이내로 대답해. 다음 내용들은 사용자의 입력, gpt의 출력으로 구성돼어있어. 잘 참고해서 유저의 입력에 답변해줘."}]
        + existing_conversations
        + [{"role": "user", "content": text + "이전 대화를 참고해서 답변해"}]
    )

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=conversation
        )
    except Exception as e:
        return jsonify({'error': f'OpenAI API 호출 중 오류 발생: {str(e)}'}), 500

    r_text = response['choices'][0]['message']['content']

    # 답변 추가
    try:
        with open(txt, 'a', encoding='utf-8') as file:
            file.write("출력: " + r_text + '\n')
    except FileNotFoundError:
        print(f"파일을 찾을 수 없습니다.")

    # 답변 반환
    timestamp = text2voice(r_text, chatId, voice)
    if timestamp:
        return jsonify({'text': text, 'r_text': r_text, 'chatId': chatId, 'timestamp': timestamp}), 200
    else:
        return jsonify({'error': 'Failed to create voice response'}), 500

@app.route('/message/<url>/', methods=['GET'])
def serve_mp3(url):
    file = url.split('_')[0]
    directory = f"./chatbot_result/{file}/"
    filename = f"{url}_답변.mp3"
    print(file, filename)
    try:
        return send_from_directory(directory, filename, as_attachment=True)
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404

#############################################################################################################

if __name__ == '__main__':
    app.run(port=50, debug=True)  # debug=True causes Restarting with stat
