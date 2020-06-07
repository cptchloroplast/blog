import os
import json

from flask import url_for, render_template, current_app
from werkzeug.routing import BuildError

from app.forms import SubscribeForm

def render_view(template, **kwargs):
    with open(os.path.abspath(current_app.config['DATA_PATH'])) as data_file:
        data = json.load(data_file)
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
