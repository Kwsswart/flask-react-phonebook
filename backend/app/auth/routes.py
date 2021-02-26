import re
from app.models import Users, InvalidToken
from app.auth import bp
from app.helpers import is_jsonable, JSONEncoder, validInternationalNumber, validSpanishNumber
from app.auth.helpers import getUser, getUsers, addUser, removeUser
from flask import jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, get_jwt, \
    jwt_required


@bp.route("/api/login", methods=["POST"])
def login():
    try:
        username = request.json["username"]
        pwd = request.json["pwd"]

        if pwd and username:
            user = list(filter(lambda x: x["username"] == username and x["pwd"] == pwd, getUsers()))
            if len(user) == 1:
                token = create_access_token(identity=user[0]["id"])
                refresh_token = create_refresh_token(identity=user[0]["id"])
                return jsonify({"token": token, "refreshToken": refresh_token})
            else:
                return jsonify({"error": "Invalid credentials"})
        else:
            return jsonfiy({"error": "Invalid form"})
    except:
        return jsonify({"error": "Invalid form"})


@bp.route("/api/register", methods=["POST"])
def register():
    try:
        username = request.json["username"]
        name = request.json["name"]
        phone = request.json["phone"]
        email = request.json["email"]
        email = email.lower()
        pwd = request.json["pwd"]
        email = email.lower()

        users = getUsers()

        if len(list(filter(lambda x: x["username"] == username, users))) == 1 or \
            len(list(filter(lambda x: x["email"] == email, users))) == 1 or \
                len(list(filter(lambda x: x["phone"] == phone, users))) == 1:
            return jsonify({"error": "Username/phone/email is in use."})

        if not re.match(r"[\w\._]{5,}@\w{3,}.\w{2,4}", email):
            return jsonify({"error": "Invalid email"})

        if not validSpanishNumber(phone) and not validInternationalNumber(phone):
            return jsonify({"error": "Invalid phone number - Please ensure in format of 'XXX XXX XXX' for spanish numbers (No country code required) or include country code for international numbers"})
        
        if addUser(username, name, phone, email, pwd):
            return jsonify({"success": True})
        else: 
            return jsonify({"error": "Invalid Form"})
    except:
        return jsonify({"error": "Invalid Form"})


@bp.route("/api/checkiftokenexpire", methods=["POST"])
@jwt_required()
def check_if_token_expire():
    return jsonify({"success": True})


@bp.route("/api/refreshtoken", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    token = create_access_token(identity=identity)
    return jsonify({"token": token})


@bp.route("/api/logout/access", methods=["POST"])
@jwt_required()
def access_logout():
    jti = get_jwt()["jti"]
    try:
        invalid_token = InvalidToken(jti=jti)
        invalid_token.save()
        return jsonify({"success":True})
    except Exception as e:
        print(e)
        return jsonify({"error": e})


@bp.route("/api/logout/refresh", methods=["POST"])
@jwt_required()
def refresh_logout():
    jti = get_jwt()["jti"]
    try:
        invalid_token = InvalidToken(jti=jti)
        invalid_token.save()
        return jsonify({"success": True})
    except Exception as e:
        print(e)
        return jsonify({"error": e})


@bp.route("/api/getcurrentuser")
@jwt_required()
def current_user():
    uid = get_jwt_identity()
    return jsonify(getUser(uid))
