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
    AUTH0_CLIENT_ID = os.getenv('AUTH0_CLIENT_ID')
    AUTH0_CLIENT_SECRET = os.getenv('AUTH0_CLIENT_SECRET')
    AUTH0_API_BASE_URL = os.getenv('AUTH0_API_BASE_URL')
    AUTH0_ACCESS_TOKEN_URL = os.getenv('AUTH0_ACCESS_TOKEN_URL')
    AUTH0_API_AUDIENCE = os.getenv('AUTH0_API_AUDIENCE')

class TestingConfig(Config):
    FLASK_ENV = 'testing'
    TESTING = True
    WTF_CSRF_ENABLED = False
    SECRET_KEY = 'secret-key'
