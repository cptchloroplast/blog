import os
import json

from flask import url_for, render_template
from werkzeug.routing import BuildError

from app import app
from app.forms import SubscribeForm

with open(os.path.abspath(app.config['DATA_PATH'])) as data_file:
    data = json.load(data_file)

def render_view(template, **kwargs):
    subscribe_form = SubscribeForm()
    return render_template(
        template,
        data=data,
        subscribe=subscribe_form,
        **kwargs
    )

def permalink(function):
    def inner(*args, **kwargs):
        endpoint, values = function(*args, **kwargs)
        try:
            return url_for(endpoint, **values)
        except BuildError:
            return
    return inner
