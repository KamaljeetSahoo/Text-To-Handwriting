from flask import Flask
import pymongo
from bson.json_util import dumps
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

client = pymongo.MongoClient(
    "mongodb+srv://admin:admin@rengokusama.qbtnl.mongodb.net/user?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE")
db = client.user
records = db.users

@app.route('/', methods=['GET'])
def index():
    return "Hello"

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
