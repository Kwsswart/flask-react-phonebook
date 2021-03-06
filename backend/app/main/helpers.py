import re
from app import db
from app.models import Users, Contacts
from app.helpers import JSONEncoder, is_jsonable
from app.security import encpwd, checkpwd, enc, dec
from mongoengine.queryset.visitor import Q


def addContact(name, surname, phone, email, company, uid):
    """
    Function intended to add users, pass variables with values not values themselves
        - Pass atleast: Name, Surname && email or phone. uid not encoded
    """
    if name and surname:
        try:
            contact = Contacts(name=name, surname=surname, phone=enc(phone), email=enc(email), company=company, uid=uid)
            contact.save()
            return True
        except Exception as e:
            print(e)
            return False
    else:
        return False


def removeContact(cid):
    """
    Function intended to remove contacts
    """
    if cid:
        try:
            contacts = Contacts.objects.all()
            contact = list(filter(lambda x: JSONEncoder().encode(x["id"]) == cid, contacts))[0]
            if not contact:
                return False
            else:
                contact.delete()
                return True
        except Exception as e:
            print(e)
            return False
    else:
        return False



def getContacts(username):
    """
    Function intended to query database for all contacts for user
    """
    user = Users.objects.get(username=username)
    contacts = Contacts.objects(uid=JSONEncoder().encode(user.id)).all()
    return [{"id": JSONEncoder().encode(i.id), "name": i.name, "surname": i.surname,"phone": dec(i.phone), "email": dec(i.email), "company": i.company} for i in contacts]


def getContact(cid):
    """
    Function intended to query database for contact by id
    """

    contacts = Contacts.objects.all()
    contact = list(filter(lambda x: JSONEncoder().encode(x["id"]) == cid, contacts))[0]
    return {"id":  JSONEncoder().encode(contact.id), "name": contact.name, "surname": contact.surname, "phone": dec(contact.phone), "email": dec(contact.email), "company": contact.company}


def searchContacts(username, name, surname, phone, email, company):
    """
    Function intended to query database for contact by search parameters
    """

    user = Users.objects.get(username=username)
    query_string = {
        'regex': {
            'name' : re.compile('.*' + name + '.*', re.IGNORECASE) if name != ''  else 0,
            'surname' : re.compile('.*' + surname + '.*', re.IGNORECASE) if surname != '' else 0,
            'phone' : re.compile('.*' + phone + '.*', re.IGNORECASE) if phone != '' else 0,
            'email' : re.compile('.*' + email + '.*', re.IGNORECASE) if email != '' else 0,
            'company' : re.compile('.*' + company + '.*', re.IGNORECASE) if company != '' else 0
        }
    }
    contacts = Contacts.objects.filter(
        Q(name=query_string['regex']['name']) | 
        Q(surname=query_string['regex']['surname']) | 
        Q(company=query_string['regex']['company'])
        ).order_by('name')
    '''
        
        Q(phone=query_string['regex']['phone']) |
        Q(email=query_string['regex']['email']) | 
    '''
    if contacts:
        contacts = list(filter(lambda x: x["uid"] == JSONEncoder().encode(user.id), contacts))
    return [{"id": JSONEncoder().encode(i.id), "name": i.name, "surname": i.surname,"phone": dec(i.phone), "email": dec(i.email), "company": i.company} for i in contacts]

