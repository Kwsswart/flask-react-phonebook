from app import create_app, db
from app.models import Users, Contacts


app = create_app()

@app.shell_context_processor
def make_shell_context():
    """ Setting the shell context """
    
    return {
        'db': db, 
        'Users': Users,
        'Contacts': Contacts
        }


if __name__ == '__main__':
    app.run()