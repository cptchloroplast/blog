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
    ROOT_DIRECTORY = os.path.abspath(os.path.join(__file__, '../../'))
    TEMPLATE_DATA = os.path.join(ROOT_DIRECTORY, 'data.json')
    CONTENT_DIRECTORY = os.path.join(ROOT_DIRECTORY, 'content')

class DevelopmentConfig(Config):
    FLASK_ENV = 'development'
    RECAPTCHA_PUBLIC_KEY = os.getenv('RECAPTCHA_PUBLIC_KEY')
    RECAPTCHA_PRIVATE_KEY = os.getenv('RECAPTCHA_PRIVATE_KEY')
    SECRET_KEY = 'secret-key'

class ProductionConfig(Config):
    FLASK_ENV = 'production'
    RECAPTCHA_PUBLIC_KEY = os.getenv('RECAPTCHA_PUBLIC_KEY')
    RECAPTCHA_PRIVATE_KEY = os.getenv('RECAPTCHA_PRIVATE_KEY')
    SECRET_KEY = os.getenv('SECRET_KEY')
    COMMIT_SHA = os.getenv('COMMIT_SHA')

class TestingConfig(Config):
    FLASK_ENV = 'testing'
    TESTING = True
    WTF_CSRF_ENABLED = False
    SECRET_KEY = 'secret-key'
