from app import db
from app.helpers import JSONEncoder, is_jsonable
from app.models import Users


def getUsers():
    """
    Function intended to query database for all users
    """

    users = Users.objects.all()
    return [{"id": JSONEncoder().encode(i.id), "username": i.username, "name": i.name, "phone": i.phone, "email": i.email, "pwd": i.pwd} for i in users]


def getUser(uid):
    """
    Function intended to query database for user by id
    """
    users = Users.objects.all()
    user = list(filter(lambda x: (JSONEncoder().encode(x["id"]) == uid), users))[0]
    return {"id":  JSONEncoder().encode(user.id), "username": user.username, "name": user.name, "phone": user.phone, "email": user.email, "pwd": user.pwd}


def addUser(username, name, phone, email, pwd):
    """
    Function intended to add users, pass variables with values not values themselves
    """

    if username and pwd and email and name and phone:
        try:
            user = Users(username=username, name=name, phone=phone, email=email, pwd=pwd)
            user.save()
            return True
        except Exception as e:
            print(e)
            return False
    else:
        return False


def removeUser(user_id):
    """
    Function intended to remove users pass req['_id']['$oid']
    """
    #
    if user_id:
        try:
            user = Users.objects(id=user_id).first()
            if not user:
                return False
            else:
                user.delete()
                return True
        except Exception as e:
            print(e)
            return False
    else:
        return False
