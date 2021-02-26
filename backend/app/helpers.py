import json
import phonenumbers
from bson import ObjectId


class JSONEncoder(json.JSONEncoder):
    """ 
    JSON encoder
        - Usage:: JSONEncoder.encode(x)
    """
    
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


def is_jsonable(x):
    """ 
    Check if x is json serializable
    """
    try:
        json.dumps(x)
        return True
    except:
        return False


def validSpanishNumber(phone):
    """
    Function intended to ensure phone is in spanish format:
        *** start w/ 9/8/6/7
        *** total 9 numbers in format XXX XXX XXX
    """
    try:
        if len(phone) != 11:
            return False
        for i in range(11):
            if i in [3,7]:
                if phone[i] != ' ':
                    return False
            elif not phone[i].isnumeric():
                return False
        return True  
    except Exception as e:
            print(e)
            return False


def validInternationalNumber(phone):
    """
    Function intended to ensure phone is in international format:
        *** start w/ country code i.e +44 etc
        *** total numbers are within the limit for said country
    """

    try:
        p = phonenumbers.parse(phone)
        if not phonenumbers.is_valid_number(p):
            return False
        return True
    except (phonenumbers.phonenumberutil.NumberParseException, ValueError):
        return False
