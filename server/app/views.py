from flask import request, make_response
from functools import wraps
import jwt
import datetime
import os

from app import app, db
from app.models import JobPosts, JobPostsReqs, Talent
# from app.get_details import get_details
from app.utils import hash_file
from app.model_rank import model_rank

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return {'message': 'missing token'}, 401
        try:
            # for PyJWT ver 2.1.0, decode needs algorithms parameter passed in
            # https://stackoverflow.com/questions/65451144/ibm-text-to-speech-python-decodeerror
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except:
            return {'message': 'invalid token'}, 401
        return f(*args, **kwargs)
    return decorated


@app.route('/')
def root():
    return 'hello world!'

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    # auth = request.authorization
    if username and password and username == 'admin' and password == 'admin':
        token = jwt.encode({
            'user': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'])
        return {'token': token}
    return {'message': 'unable to login'}, 401
    # return make_response('unauthorized access', 401,
    #                      {'WWW-Authenticate': 'Basic Realm="Login Required"'})

@app.route('/dashboard')
@login_required
def dashboard():
    res = {'jobposts': []}
    for i in JobPosts.query.all():
        res['jobposts'].append({
            'id': i.id,
            'title': i.title,
            'uri': i.uri,
            'applicants': i.applicants
        })
    return res

@app.route('/jobpost', methods=['GET', 'POST'])
@login_required
def jobpost():
    # handle post req
    if request.method == 'POST':
        data = request.get_json()

        # add job post to db
        new_jobpost = JobPosts(title=data['title'], uri=data['uri'], applicants=0)
        db.session.add(new_jobpost)
        db.session.commit()

        # add requirements to db
        requirements = data['requirements']
        id = JobPosts.query.order_by(JobPosts.id.desc()).first().id
        for i in requirements:
            new_jobpostreq = JobPostsReqs(job_post_id=id, skill=i)
            db.session.add(new_jobpostreq)
            db.session.commit()

        return {'message': 'job post submitted'}

    # handle get request
    response = {'job_posts': []}
    for i in JobPosts.query.all():
        response['job_posts'].append({
            'title': i.title,
            'uri': i.uri,
            'tag': i.tag,
            'applicants': i.applicants
        })
    return response

@app.route('/jobpost/<id>', methods=['DEL'])
@login_required
def jobpost_id(id):
    job_post = JobPosts.query.filter_by(uri=id).delete()
    db.session.commit()
    return {'message': 'job post successfully deleted'}

@app.route('/results/<id>')
@login_required
def results(id):
    res = {'results': []}
    
    job_post_id = JobPosts.query.filter_by(uri=id).first().id
    requirements = [i.skill for i in JobPostsReqs.query.filter_by(job_post_id=job_post_id).all()]

    for i in Talent.query.filter_by(job_post_id=job_post_id).all():
        filename = os.path.join(app.config['UPLOAD_PATH'], i.file_hash)
        score = model_rank(filename, requirements)
        res['results'].append({
            'name': i.name,
            'email': i.email,
            'phone': i.phone,
            'filename': filename,
            'score': score
        })

    return res


@app.route('/talent/<id>', methods=['POST'])
@login_required
def talent(id):
    print('WOI ANJING', request.files, request.form)
    upload = request.files['file']
    filename = upload.filename
    if filename != '':
        if filename.split('.')[-1] not in app.config['VALID_FILE_EXT']:
            return {'message': 'invalid file extension'}, 401

        # hash file and save file as ../UPLOAD_PATH/hash
        hashed = hash_file(upload)
        upload.seek(0) # move filepointer to start after read()
        new_filename = os.path.join(app.config['UPLOAD_PATH'], hashed)
        upload.save(new_filename)

        job_post = JobPosts.query.filter_by(uri=id).first()
        job_post_id = job_post.id

        # increment applicants in database
        job_post.applicants += 1
        db.session.commit()

        # add talent to db
        # details = get_details(new_filename)
        new_talent = Talent(
            name=request.form['name'],
            email=request.form['email'],
            phone=request.form['phone'],
            file_hash=hashed,
            job_post_id=job_post_id
        )
        db.session.add(new_talent)
        db.session.commit()

        return {'message': 'file upload succesful'}

    return {'message': 'file upload failed'}, 401

