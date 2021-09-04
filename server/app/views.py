from app import app

@app.route('/')
def root():
    return 'hello world!'

@app.route('/admin')
def admin():
    return {
        'post1': {
            'name': 'react developer',
            'description': 'angular is not accepted',
            'url': 'localhost:5000/random1'
        },
        'post2': {
            'name': 'backend developer',
            'description': 'js or python accepted',
            'url': 'localhost:5000/random2'
        }
    }
