from app import db

class JobPosts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text)
    uri = db.Column(db.Text, unique=True)
    applicants = db.Column(db.Integer)

