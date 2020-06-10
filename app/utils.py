import json
from typing import Callable

from flask import url_for, render_template, current_app
from werkzeug.routing import BuildError

from app.forms import SubscribeForm

def render_view(template: str, **kwargs):
    with open(current_app.config['TEMPLATE_DATA']) as data_file:
        data = json.load(data_file)
        subscribe_form = SubscribeForm()
        build = current_app.config.get('COMMIT_SHA')
        return render_template(
            template,
            data=data,
            subscribe=subscribe_form,
            build=build,
            **kwargs
        )

def permalink(function: Callable):
    def inner(*args, **kwargs):
        endpoint, values = function(*args, **kwargs)
        try:
            return url_for(endpoint, **values)
        except BuildError:
            return
    return inner
