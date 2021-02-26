from app import db
from app.helpers import JSONEncoder
from mongoengine import Document, fields, DoesNotExist, signals
from bson.json_util import loads, dumps


class Users(Document):
    """ Model for user information  """

    username = fields.StringField(required=True, unique=True)
    name = fields.StringField(required=True)
    phone = fields.StringField(required=True)
    email = fields.StringField(required=True)
    pwd = fields.StringField(required=True)

    def to_json(self):
        return {
                "_id": str(self.pk),
                "username": self.name,
                "name": self.surname,
                "phone": self.phone,
                "email": self.email}


class Contacts(Document):
    """ Model for standard contact data """

    name = fields.StringField()
    surname = fields.StringField()
    phone = fields.StringField()
    email = fields.StringField()
    company = fields.StringField()
    uid = fields.StringField()

    def to_json(self):
        return {
                "_id": str(self.pk),
                "name": self.name,
                "surname": self.surname,
                "phone": self.phone,
                "email": self.email,
                "company": self.company}


class InvalidToken(Document):

    """
    Blacklisted token storage
    """

    jti = fields.StringField()

    @classmethod
    def is_invalid(cls, jti) -> str:
        q = cls.objects(jti=jti).first()
        return bool(q)
