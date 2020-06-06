import os

from dotenv import find_dotenv, load_dotenv

class Config():

    load_dotenv(find_dotenv())

    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    RECAPTCHA_PUBLIC_KEY = os.getenv('RECAPTCHA_PUBLIC_KEY')
    RECAPTCHA_PRIVATE_KEY = os.getenv('RECAPTCHA_PRIVATE_KEY')

    DATA_PATH = os.path.abspath(os.path.join(__file__, '../data.json'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
