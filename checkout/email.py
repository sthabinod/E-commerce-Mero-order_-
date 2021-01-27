from .mail_google import Create_Service
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

CLIENT_SECRET_FILE = 'checkout/client_id.json'
API_NAME = 'gmail'
API_VERSION = 'v1'
SCOPES = ['https://mail.google.com/']

def send_message(email, name, order_id):
    service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)
    text = 'Hello '+ name + '\n\nYour order has been confirmed!\nThe order number is '+str(order_id) +'\n\nThanks for choosing MeroOrder'
    emailMsg = text
    mimeMessage = MIMEMultipart()
    mimeMessage['to'] = email
    mimeMessage['subject'] = 'Order Confirmed'
    mimeMessage.attach(MIMEText(emailMsg, 'plain'))
    raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()
    
    message = service.users().messages().send(userId='me', body={'raw': raw_string}).execute()

