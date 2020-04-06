import os

from dotenv import find_dotenv, load_dotenv

class Config():

    def __init__(self):
        load_dotenv(find_dotenv())

    DATA_PATH = os.getenv('DATA_PATH') or \
        os.path.abspath(os.path.join(__file__, '../../data.json'))
    SECRET_KEY = os.getenv('SECRET_KEY') or 'secret_key'
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI') or \
        'sqlite:///' + os.path.abspath(os.path.join(__file__, '../../db.sqlite'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    RECAPTCHA_PUBLIC_KEY = os.getenv('RECAPTCHA_PUBLIC_KEY')
    RECAPTCHA_PRIVATE_KEY = os.getenv('RECAPTCHA_PRIVATE_KEY')
