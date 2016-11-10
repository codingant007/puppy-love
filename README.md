Puppy Love
==========

The modern and better avatar of [valentine puppy-love](https://github.com/pclubiitk/valentine) in the making.

Algorithm designed from the ground up, with a completely secure computation model which guarantees the following:

* Even the server admin cannot figure out your choices.
* The identities of your choices are never, *ever*, exposed in plain text. Not even at the server.
* The server, even while matching couples, can *not* know what the choices were.
* The other person will only know whether you liked him/her or not if that person liked you as well.

Implementation will be using the following platforms:

* Node.js
* Express.js
* JavaScript
* Bootstrap
* Docker

## Running
Recommended way using Docker:
```
docker run -d -p 27017:27017 -v $HOME/.mongodata:/data/db --name mongodb-puppy mongo
docker build -t 'puppy:v1' .
docker run --net=host -it -p 8091:8091 puppy:v1
```

Alternatively:
```
# Run Mongodb
mongod --dbpath=$HOME/.mongodata

# Get dependencies for frontend
sudo npm install -g bower

cd views
bower install

# Now run the backend
cd ..
npm install

# Recommended, for restarting on failure
sudo npm install -g nodemon
nodemon

# Alternative to nodemon:
npm run start
```
You can open the local website on [localhost:8091](localhost:8091)
The backend will be listening on the printed port number.

**Note**: Course project for CS252, by [Saksham Sharma](https://github.com/sakshamsharma/) and [Vinayak Tantia](https://github.com/vtantia).
