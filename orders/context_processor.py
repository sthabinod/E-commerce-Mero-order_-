from .models import Contact

def settings(request):
    return {'settings': Contact.load()}