from flask_wtf import CSRFProtect, FlaskForm, RecaptchaField
from wtforms.fields import TextAreaField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, Email

csrf = CSRFProtect()

class SubscribeForm(FlaskForm):
    email = EmailField(
        'Subscribe for the latest and greatest!',
        validators=[DataRequired(), Email()],
        id='subscribe-email',
        render_kw={'placeholder': 'Email'}
    )

class ContactForm(FlaskForm):
    sender = EmailField(
        'Email',
        validators=[DataRequired(), Email()],
        id='contact-sender',
        render_kw={'placeholder': 'Email'}
    )
    body = TextAreaField(
        'Message',
        validators=[DataRequired()],
        id='contact-body',
        render_kw={
            'placeholder': 'Message',
            'rows': '5'
        }
    )
    captcha = RecaptchaField(
        'Recaptcha',
        validators=[DataRequired()],
        id='contact-captcha'
    )
