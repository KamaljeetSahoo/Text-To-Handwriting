from flask import Flask
from flask.globals import request
import pymongo
from bson.json_util import dumps
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from utils import process_text, generate_images, generate_pdf
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

client = pymongo.MongoClient(
    "mongodb+srv://admin:admin@rengokusama.qbtnl.mongodb.net/user?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE")
db = client.user
records = db.users

def convertImage(np_arr):
    encoded_list = []
    for arr in np_arr:
        im = Image.fromarray(arr.astype("uint8"))
        rawBytes = io.BytesIO()
        im.save(rawBytes, "PNG")
        rawBytes.seek(0)  # return to the start of the file
        b64 = base64.b64encode(rawBytes.read())
        encoded_list.append(f"data:image/png;base64,{b64.decode()}")
    return encoded_list

@app.route('/', methods=['GET'])
def index():
    return "Hello"

@app.route('/convert', methods=['POST'])
def convert():
    print("hey")
    data = request.get_json()
    text_data = data['textData']
    _, words = process_text(text_data)
    final_images = generate_images(words)
    return dumps({'success': True, 'image': convertImage(final_images)})

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
