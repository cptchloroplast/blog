from flask import Flask

from app.models import db
from app.forms import csrf
from app.routes import root
from app.config import load_config

def create_app(config=None):
    app = Flask(__name__)
    app.config.from_object(load_config(config))
    db.init_app(app)
    db.create_all(app=app)
    csrf.init_app(app)
    app.register_blueprint(root)
    return app
