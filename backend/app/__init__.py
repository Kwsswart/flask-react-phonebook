import os
from flask import Flask
from config import Config
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager
from flask_cors import CORS


cors = CORS()
db = MongoEngine()
jwt = JWTManager()

def create_app(config_class=Config):
    """ Create application context """

    app = Flask(__name__, static_folder="../build", static_url_path="/")
    app.config.from_object(Config)

    db.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)
    

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp)

    return app


from app import models