from datetime import datetime

from flask import Flask, g, request
from flask.wrappers import Response

from app.blog import Blog

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
        duration = (end_time - g.start_time).total_seconds()
        Blog.add_metric(
            status_code=response.status_code,
            duration=duration,
            url=request.url,
            method=request.method,
            mimetype=response.mimetype,
            remote_addr=request.remote_addr,
            xforwardedfor=request.headers.get('X-Forwarded-For', None),
            ua_browser=request.user_agent.browser,
            ua_language=request.user_agent.language,
            ua_platform=request.user_agent.platform,
            ua_version=request.user_agent.version
        )
        return response
