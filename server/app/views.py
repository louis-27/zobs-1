from flask import request, make_response
from functools import wraps
import jwt
import datetime
import hashlib
from app import app, db
from app.models import JobPosts, JobPostsReqs, Talent

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
    print(request)
    username = request.form['username']
    password = request.form['password']
    # auth = request.authorization
    if username and password and username == 'admin' and password == 'admin':
        token = jwt.encode({
            'user': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=10)
        }, app.config['SECRET_KEY'])
        return {'token': token}
    return make_response('unauthorized access', 401,
                         {'WWW-Authenticate': 'Basic Realm="Login Required"'})

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
        print('TYPE FUCK YOU', type(id))
        for i in requirements:
            new_jobpostreq = JobPostsReqs(job_post_id=id, skill=i)
            db.session.add(new_jobpostreq)
            db.session.commit()

        return {'message': 'job post submitted'}
    
    # handle get request
    response = {'job_posts': []}
    for i in JobPosts.query.all():
        response['job_posts'].append({
            'title': i['title'],
            'uri': i['uri'],
            'tag': i['tag'],
            'applicants': i['applicants']
        })
    return response
    

@app.route('/jobpost/<id>')
@login_required
def jobpost_id(id):
    pass

@app.route('/results/<id>')
@login_required
def results(id):
    pass

@app.route('/talent/<id>', methods=['POST'])
@login_required
def talent(id):
    upload = request.files['upload']
    filename = upload.filename
    if filename != '':
        if filename.split('.')[-1] not in app.config['VALID_FILE_EXT']:
            return {'message': 'invalid file extension'}, 401
        
        print('FUCK', upload, type(upload))
        # add to db and uploads dir
        # hashed = hashlib.sha256(filename)
        # upload.save(app.config['UPLOAD_PATH'] + '/' + filename)
        # name = res_get_name(upload)

        return {'message': 'file upload succesful'}

    return {'message': 'file upload failed'}, 401

