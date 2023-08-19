import os
from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS, cross_origin
import elan_reader as ER

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

audio_extensions = ['.mp3', '.wav']

@app.route('/')
def hello_world():
    return 'Hello world'


@app.route('/upload', methods=['POST'])
def upload_file():
    filetype = request.form.get('type')
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    split_filename = os.path.splitext(file.filename)
    #filename = split_filename[0]
    extension = split_filename[1]
    file_location = f'upload/{file.filename}'
    file.save(file_location)  # Provide the desired path to save the file

    if (extension == '.eaf' and filetype == 'elan'):
        tiers = ER.get_tiers(file_location)
        elan_data = ER.get_elan_data(file_location)

        return jsonify({'message': 'File uploaded successfully', 'tiers': tiers, 'elanData': elan_data})

    if (extension in audio_extensions and filetype == 'audio'):
        file_url = f'{request.base_url}/{file_location}'
        return jsonify({'file_url': file_url})

    else:
        return jsonify({'message': 'Error extension file'}), 500


@app.route('/upload/<path:filename>', methods=['GET'])
def serve_file(filename):
    path = app.root_path
    return send_from_directory(path, filename)
