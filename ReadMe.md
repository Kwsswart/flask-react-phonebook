# Flask-React-Phonebook

This essentially a standard phonebook application, allowing you to store and search contact lists. I made this in order to practice with the technologies used.

You may see a hosted version of this application [here](https://flask-react-phonebook.herokuapp.com/ "Heroku application")


## Technologies used:

Python - Flask
JavaScript - ReactJS
MongoDB

## Project set-up:

1. Download the source code.
2. Within ./backend/.env set environment variables:
    1. JWT_SECRET_KEY
    2. SECRET_KEY
3. Create an account on [MongoAtlas](https://www.mongodb.com/cloud/atlas "MongoDB atlas hosting service")
4. Once done the above in the ./backend/.env set:
    1. MONGODB_HOST=<formatted-uri-provided>
    2. MONGODB_USERNAME=<username>
    3. MONGODB_PASSWORD=<password>
5. Within Python shell run:
    1. from app.security import gen_fernet_key
    2. gen_fernet_key()
    3. copy this key and place it into ./backend/.env
        KEY=<copiedkey>



# License

This is [MIT licensed](https://github.com/facebook/react/blob/master/LICENSE)



