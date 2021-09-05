from flask import request, make_response
from functools import wraps
import jwt
import datetime
from app import app
from app.models import JobPosts

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

@app.route('/admin')
def admin():
    auth = request.authorization
    if auth and auth.username == 'admin' and auth.password == 'admin':
        token = jwt.encode({
            'user': auth.username,
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

@app.route('/jobpost')
@login_required
def jobpost():
    pass

@app.route('/jobpost/<id>')
@login_required
def jobpost_id(id):
    pass

@app.route('/results/<id>')
@login_required
def results(id):
    pass

@app.route('/talent/<id>')
@login_required
def talent(id, methods=['GET', 'POST']):
    pass

