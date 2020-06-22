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
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    FLASK_ENV = 'development'
    RECAPTCHA_PUBLIC_KEY = os.getenv('RECAPTCHA_PUBLIC_KEY')
    RECAPTCHA_PRIVATE_KEY = os.getenv('RECAPTCHA_PRIVATE_KEY')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(Config.ROOT_DIRECTORY, 'dev.sqlite')
    SECRET_KEY = 'secret-key'
    SQLALCHEMY_ENGINE_OPTIONS = {
        'execution_options': {
            'schema_translate_map': {
                'schema': 'main'
            }
        }
    }

class ProductionConfig(Config):
    FLASK_ENV = 'production'
    RECAPTCHA_PUBLIC_KEY = os.getenv('RECAPTCHA_PUBLIC_KEY')
    RECAPTCHA_PRIVATE_KEY = os.getenv('RECAPTCHA_PRIVATE_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_ENGINE_OPTIONS = {
        'execution_options': {
            'schema_translate_map': {
                'schema': os.getenv('DATABASE_SCHEMA')
            }
        }
    }
    COMMIT_SHA = os.getenv('COMMIT_SHA')

class TestingConfig(Config):
    FLASK_ENV = 'testing'
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(Config.ROOT_DIRECTORY, 'test.sqlite')
    WTF_CSRF_ENABLED = False
    SECRET_KEY = 'secret-key'
    SQLALCHEMY_ENGINE_OPTIONS = {
        'execution_options': {
            'schema_translate_map': {
                'schema': 'main'
            }
        }
    }
