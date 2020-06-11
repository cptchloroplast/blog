from flask import Flask

from app.models import db
from app.forms import csrf
from app.routes import root
from app.errors import page_not_found, server_error
from app.config import load_config
from app.logger import Logger

def create_app(config: str = None) -> Flask:
    app = Flask(__name__)
    app.config.from_object(load_config(config))
    db.init_app(app)
    db.create_all(app=app)
    csrf.init_app(app)
    app.register_blueprint(root)
    app.register_error_handler(404, page_not_found)
    app.register_error_handler(500, server_error)
    logger = Logger()
    logger.init_app(app)
    return app
