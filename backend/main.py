from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def hello_world():
    print('test2')
    return 'Hello world'

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file uploaded', 400
    file = request.files['file']
    file.save('files/test.txt')  # Provide the desired path to save the file
    print('succesful upload')
    return jsonify({'message': 'File uploaded successfully'})