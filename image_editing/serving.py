from flask import Flask, request, jsonify, send_from_directory
#import torch
import PIL
import os
import uuid
from diffusers import StableDiffusionInstructPix2PixPipeline, EulerAncestralDiscreteScheduler

app = Flask(__name__)

model_id = "timbrooks/instruct-pix2pix"
pipe = StableDiffusionInstructPix2PixPipeline.from_pretrained(model_id, safety_checker=None) # torch_dtype=torch.float16
#pipe.to("cuda")
pipe.scheduler = EulerAncestralDiscreteScheduler.from_config(pipe.scheduler.config)

UPLOAD_FOLDER = 'uploads'
RESULT_FOLDER = 'results'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER

def load_image(file_path):
    image = PIL.Image.open(file_path)
    image = PIL.ImageOps.exif_transpose(image)
    image = image.convert("RGB")
    return image

def save_image(image, folder):
    unique_filename = str(uuid.uuid4()) + '.jpg'
    file_path = os.path.join(app.config[folder], unique_filename)
    image.save(file_path)
    return file_path

@app.route('/results/<filename>')
def result_file(filename):
    return send_from_directory(app.config['RESULT_FOLDER'], filename)

@app.route('/ImageConversion', methods=['POST'])
def convert_image():
    try:
        file = request.files['file']
        prompt = request.form['prompt']

        if prompt == '0':
            prompt = "make the person younger"
        elif prompt == '1':
            prompt = "make the person a disney cartoon character"
        elif prompt == '2':
            prompt = "make it pixar style"
        elif prompt == '3':
            prompt = "make the person cyborg"

        # 업로드된 이미지를 임시로 저장
        uploaded_image_path = save_image(load_image(file), 'UPLOAD_FOLDER')
        app.logger.info(f"Uploaded file saved to: {uploaded_image_path}")

        # 이미지를 로드하고 변환 수행
        image = load_image(uploaded_image_path)
        images = pipe(prompt, image=image, num_inference_steps=8, image_guidance_scale=1.5).images
        result_image = images[0]

        # 결과 이미지를 저장
        result_image_path = save_image(result_image, 'RESULT_FOLDER')

        # 결과 이미지에 대한 URL 생성
        result_image_url = request.url_root + 'results/' + os.path.basename(result_image_path)

        return jsonify({'result': 'success', 'image_url': result_image_url})
    except Exception as e:
        return jsonify({'result': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=50)  # debug=True causes Restarting with stat
