import PIL
import os
import uuid
from flask import Flask, request, jsonify, send_from_directory
from diffusers import StableDiffusionInstructPix2PixPipeline, EulerAncestralDiscreteScheduler

app = Flask(__name__)

model_id = "timbrooks/instruct-pix2pix"
pipe = StableDiffusionInstructPix2PixPipeline.from_pretrained(model_id, safety_checker=None)
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
    '0': "make the person younger",
    '1': "make the person a Disney cartoon character",
    '2': "make it Pixar style",
    '3': "make the person a cyborg"
}

@app.route('/results/<filename>')
def result_file(filename):
    return send_from_directory(app.config['RESULT_FOLDER'], filename)

@app.route('/ImageConversion', methods=['POST'])
def convert_image():
    try:
        file = request.files['file']
        prompt = request.form['prompt']

        prompt = prompts.get(prompt, "make the person younger") # defaults to "make the person younger"

        # Save uploaded images temporarily
        uploaded_image_path = save_image(load_image(file), 'UPLOAD_FOLDER', quality=50) # defaults Default downgrade to 50% quality
        app.logger.info(f"Uploaded file saved to: {uploaded_image_path}")

        # Load the image and perform the conversion
        image = load_image(file)
        images = pipe(prompt, image=image, num_inference_steps=8, image_guidance_scale=1.5).images
        result_image = images[0]

        # Save the resulting image
        result_image_path = save_image(result_image, 'RESULT_FOLDER')

        # Generate URL for the resulting image
        result_image_url = request.url_root + 'results/' + os.path.basename(result_image_path)

        return jsonify({'result': 'success', 'image_url': result_image_url})
    except Exception as e:
        return jsonify({'result': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=50)  # debug=True causes Restarting with stat
