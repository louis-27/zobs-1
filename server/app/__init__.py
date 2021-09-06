from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../database.db'
app.config['UPLOAD_PATH'] = 'uploads'
app.config['VALID_FILE_EXT'] = ['pdf']

db = SQLAlchemy(app)

from app import views
