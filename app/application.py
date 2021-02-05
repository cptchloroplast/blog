from flask import Flask

from app.api import API, oauth
from app.forms import csrf
from app.routes import root
from app.errors import page_not_found, server_error
from app.config import load_config
from app.blog import Blog

def create_app(config: str = None) -> Flask:
    app = Flask(__name__)
    app.config.from_object(load_config(config))
    oauth.init_app(app)
    csrf.init_app(app)
    app.register_blueprint(root)
    app.register_error_handler(404, page_not_found)
    app.register_error_handler(Exception, server_error)
    app.config['BLOG'] = Blog(app.config['CONTENT_DIRECTORY'])
    app.config['API'] = API(app.config['AUTH0_API_AUDIENCE'])
    return app
