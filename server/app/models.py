from app import db

class JobPosts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text)
    uri = db.Column(db.Text, unique=True)
    tag = db.Column(db.String(10))
    applicants = db.Column(db.Integer)

class JobPostsReqs(db.Model):
    job_post_id = db.Column(db.Integer, db.ForeignKey('job_posts.id'), primary_key=True)
    skill = db.Column(db.Text, primary_key=True)

class Talent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    email = db.Column(db.Text)
    phone = db.Column(db.Text)
    file_hash = db.Column(db.Text)
    job_post_id = db.Column(db.Integer, db.ForeignKey('job_posts.id'))

