import re
from app.models import Users, InvalidToken, Contacts
from app.auth import bp
from app.helpers import is_jsonable, JSONEncoder, validInternationalNumber, validSpanishNumber
from app.security import encpwd, checkpwd, enc, dec
from app.auth.helpers import getUser, getUsers, addUser
from flask import jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, get_jwt, \
    jwt_required



@bp.route("/api/login", methods=["POST"])
def login():
    try:
        username = request.json["username"]
        pwd = request.json["pwd"]

        if pwd and username:
            user = list(filter(lambda x: x["username"] == username and checkpwd(pwd, x["pwd"]), getUsers()))
            if len(user) == 1:
                token = create_access_token(identity=user[0]["id"])
                refresh_token = create_refresh_token(identity=user[0]["id"])
                return jsonify({"token": token, "refreshToken": refresh_token})
            else:
                return jsonify({"error": "Invalid credentials"})
        else:
            return jsonfiy({"error": "Invalid form"})
    except Exception as e:
        print(e)
        return jsonify({"error": "Invalid Form"})


@bp.route("/api/register", methods=["POST"])
def register():
    try:
        username = request.json["username"]
        name = request.json["name"]
        phone = request.json["phone"]
        email = request.json["email"]
        email = email.lower()
        pwd = encpwd(request.json["pwd"])
        email = email.lower()
        users = getUsers()

        if len(list(filter(lambda x: x["username"] == username, users))) == 1 or \
            len(list(filter(lambda x: dec(x["email"]) == email, users))) == 1 or \
                len(list(filter(lambda x: dec(x["phone"]) == phone, users))) == 1:
            return jsonify({"error": "Username/phone/email is in use."})

        if not re.match(r"[\w\._]{5,}@\w{3,}.\w{2,4}", email):
            return jsonify({"error": "Invalid email"})

        if not validSpanishNumber(phone) and not validInternationalNumber(phone):
            return jsonify({"error": "Invalid phone number - Please ensure in format of 'XXX XXX XXX' for spanish numbers (No country code required) or include country code for international numbers"})
        
        if addUser(username, name, phone, email, pwd):
            return jsonify({"success": True})
        else: 
            return jsonify({"error": "Invalid Form"})
    except Exception as e:
        print(e)
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


@bp.route("/api/changepassword", methods=["POST"])
@jwt_required()
def change_password():
    try:
        u = current_user()
        users = Users.objects.all()
        pwd= request.json["pwd"]
        user = list(filter(lambda x: (JSONEncoder().encode(x["id"]) == u.json["id"]), users))[0]
        if not (request.json["pwd"] and request.json["npwd"] and request.json["rpwd"]):
            return jsonify({"error":"Invalid Form"})
        if not checkpwd(request.json["pwd"], user["pwd"]):
            return jsonify({"error": "Wrong Password"})
        if not request.json["npwd"] == request.json["rpwd"]:
            return jsonify({"error": "New Password needs to match Repeated Password"})
        if request.json["pwd"] == request.json["npwd"]:
            return jsonify({"error": "You cannot change to the same password"})
        user.pwd = encpwd(request.json["npwd"])
        user.save()
        return jsonify({"success":True})
    except Exception as e:
        print(e)
        return jsonify({"error": "Invalid Form"})


@bp.route("/api/deleteaccount", methods=["DELETE"])
@jwt_required()
def delete_account():
    try:
        u = current_user()
        users = Users.objects.all()
        user = list(filter(lambda x: (JSONEncoder().encode(x["id"]) == u.json["id"]), users))[0]
        contacts = Contacts.objects.all()
        for contact in contacts:
            if contact.uid == get_jwt_identity():
                contact.delete()
        user.delete()
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)})


@bp.route("/api/changedetails", methods=["POST"])
@jwt_required()
def change_details():
    try:
        u = current_user()
        users = Users.objects.all()
        user = list(filter(lambda x: (JSONEncoder().encode(x["id"]) == u.json["id"]), users))[0]

        if not (request.json["pwd"] and request.json["email"] and request.json["phone"]):
            return jsonify({"error":"Invalid Form"})
        if not checkpwd(request.json["pwd"], user.pwd):
            return jsonify({"error": "Wrong Password"})
        if not re.match(r"[\w\._]{5,}@\w{3,}.\w{2,4}", request.json["email"]):
            return jsonify({"error": "Invalid email"})
        if not validSpanishNumber(request.json["phone"]) and not validInternationalNumber(request.json["phone"]):
            return jsonify({"error": "Invalid phone number - Please ensure in format of 'XXX XXX XXX' for spanish numbers (No country code required) or include country code for international numbers"})
        user.email = enc(request.json["email"])
        user.phone = enc(request.json["phone"])
        user.save()
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)})