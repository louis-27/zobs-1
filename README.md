# ZOBS

This app runs flask on the back end and react on the front end. 
Default username and password for admin is 'admin' and 'admin'. This can be 
changed by editing the `server/app/views.py` file.

## Build Instructions

```
$ git clone https://github.com/rmrt1n/zobs
$ cd zobs

```

### Server setup

install required packages
```
cd server
$ source venv/bin/activate
$ pip3 install -r requirements.txt
$ python3 -m spacy download en_core_web_sm
```

start server on port 5000 (default):
```
$ python3 run.py
```

### Client setup

install required packages
```
$ cd client
$ npm install
# to run development build
$ npm run start
# to build production app
$ npm run build
```

