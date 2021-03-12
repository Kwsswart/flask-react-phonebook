import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config(object):
    """ Retain all config variables """
    
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY") or "you-will-never-guess-the-jwt-key"
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ["access", "refresh"]
    MONGODB_SETTINGS = {
    'db': 'phonebook',
    'host': os.environ.get('MONGODB_HOST'),
    'username': os.environ.get('MONGODB_USER'),
    'password': os.environ.get('MONGODB_PASSWORD')
    }