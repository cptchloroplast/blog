from datetime import datetime
from flask import Flask, g, request
from flask.wrappers import Response

class Logger:

    def __init__(self, app: Flask = None) -> None:
        if app is not None:
            self.init_app(app)

    def init_app(self, app: Flask) -> None:
        app.before_request(self.before_request)
        app.after_request(self.after_request)

    def before_request(self) -> None:
        g.start_time = datetime.utcnow()

    def after_request(self, response: Response) -> Response:
        end_time = datetime.utcnow()
        speed = (end_time - g.start_time).total_seconds()
        return response
