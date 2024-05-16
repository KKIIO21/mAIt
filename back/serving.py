import PIL
import os
import uuid
import json
import random
import openai
import time
from flask import Flask, request, jsonify, send_from_directory
from diffusers import StableDiffusionInstructPix2PixPipeline, EulerAncestralDiscreteScheduler
from flask_cors import CORS
from gtts import gTTS
from concurrent.futures import ThreadPoolExecutor

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

executor = ThreadPoolExecutor(max_workers=4)  # 병렬 처리용 스레드 풀

def load_image(file_path):
    image = PIL.Image.open(file_path)
    image = PIL.ImageOps.exif_transpose(image)
    image = image.convert("RGB")
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
        uploaded_image_path = save_image(load_image(file), 'UPLOAD_FOLDER', quality=50)  # defaults Default downgrade to 50% quality
        app.logger.info(f"Uploaded file saved to: {uploaded_image_path}")

        # Process the image asynchronously
        future = executor.submit(process_image, uploaded_image_path, prompt)
        result_image_path = future.result()

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
def text2voice(r_text, chatId):
    timestamp = str(int(time.time()))
    filename = f"{chatId}/{chatId}_{timestamp}_답변.mp3"
    try:
        tts = gTTS(text=r_text, lang='ko')
        tts.save(f"chatbot_result/{filename}")
        return timestamp
    except Exception as e:
        print(f"text2voice 실행 중 오류 발생: {str(e)}")
        return False

@app.route('/message', methods=['POST'])
def message():
    data = request.json
    text = data.get('text')
    chatId = data.get('chatId')

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
        if line.startswith("입력: "):
            existing_conversations.append({"role": "user", "content": line.strip().replace("입력: ", "")})
        elif line.startswith("출력: "):
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
    timestamp = text2voice(r_text, chatId)
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
    app.run(port=50)  # debug=True causes Restarting with stat
