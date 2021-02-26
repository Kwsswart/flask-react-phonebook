import re
from app import db, jwt
from app.auth.routes import current_user
from app.main import bp
from app.main.helpers import getContact, getContacts, addContact, removeContact, searchContacts
from app.models import Contacts, Users, InvalidToken
from app.helpers import JSONEncoder, validInternationalNumber, validSpanishNumber
from flask import request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, get_jwt, \
    jwt_required
from mongoengine.queryset.visitor import Q



@jwt.token_in_blocklist_loader
def check_if_blacklisted_token(data, decrypted):
    """
    Decorator designed to check for blacklisted tokens
    """
    jti = decrypted['jti']
    return InvalidToken.is_invalid(jti)


@bp.route("/api/addcontact", methods=["POST"])
@jwt_required()
def add_contact():
    try:
        name = request.json["name"]
        surname = request.json["surname"]
        phone = request.json["phone"]
        email = request.json["email"]
        email = email.lower()
        company = request.json["name"]
        uid = get_jwt_identity()
        if name and surname:
            contact = Contacts.objects.filter(Q(name=name) & Q(surname=surname)).first()
            if contact:
                return jsonify({"error": "You already have a contact with that name"})
            if not re.match(r"[\w\._]{5,}@\w{3,}.\w{2,4}", email):
                return jsonify({"error": "Invalid email"})
            if not validSpanishNumber(phone) and not validInternationalNumber(phone):
                return jsonify({"error": "Invalid phone number - Please ensure in format of 'XXX XXX XXX' for spanish numbers (No country code required) or include country code for international numbers"})
            if addContact(name, surname, phone, email, company, uid):
                return jsonify({"success": "Added"})
            else: 
                return jsonify({"error": "Invalid Form"})
        else:
            return jsonify({"error": "Ensure there is atleast a name and surname"})
    except:
        return jsonify({"error": "Invalid Form"})


@bp.route("/api/removecontact", methods=["DELETE"])
@jwt_required()
def remove_contact(cid):
    try:
        removeContact(cid)
        return jsonify({"success": "true"})
    except:
        return jsonify({"error": "Invalid form"})


@bp.route("/api/contacts/<username>")
def get_user_contacts(username):
    return jsonify(getContacts(username))


@bp.route("/api/searchcontacts/<username>", methods=["POST"])
@jwt_required()
def search_user_contacts(username):
    req = request.json
    return jsonify(searchContacts(username, req["name"], req["surname"], req["phone"], req["email"], req["company"]))