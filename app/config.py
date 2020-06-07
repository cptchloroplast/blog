import os

from dotenv import find_dotenv, load_dotenv

def load_config(config):
    return {
        'dev': DevelopmentConfig,
        'prod': ProductionConfig,
        'test': TestingConfig,
    }.get(config, DevelopmentConfig)

class Config:
    load_dotenv(find_dotenv())
    DATA_PATH = os.path.abspath(os.path.join(__file__, '../data.json'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    FLASK_ENV = 'development'
    FLASK_APP = "app:create_app('dev')"
    RECAPTCHA_PUBLIC_KEY = 'recaptcha-private-key'
    RECAPTCHA_PRIVATE_KEY = 'recaptcha-private-key'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.abspath(os.path.join(__file__, '../../dev.sqlite'))
    SECRET_KEY = 'secret-key'

class ProductionConfig(Config):
    FLASK_ENV = 'production'
    FLASK_APP = "app:create_app('prod')"
    RECAPTCHA_PUBLIC_KEY = os.getenv('RECAPTCHA_PUBLIC_KEY')
    RECAPTCHA_PRIVATE_KEY = os.getenv('RECAPTCHA_PRIVATE_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    SECRET_KEY = os.getenv('SECRET_KEY')

class TestingConfig(Config):
    FLASK_ENV = 'testing'
    FLASK_APP = "app:create_app('test')"
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.abspath(os.path.join(__file__, '../../test.sqlite'))
    WTF_CSRF_ENABLED = False