from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from slugify import slugify
from markdown import markdown

from app.utils import permalink

db = SQLAlchemy()

class Post(db.Model):
    __tablename__ = 'pos_post'
    __table_args__ = {'schema': 'schema'}

    id = db.Column('pos_id', db.Integer, primary_key=True)
    title = db.Column('pos_title', db.String)
    body = db.Column('pos_body', db.String)
    published = db.Column('pos_dt_published', db.DateTime)
    updated = db.Column('pos_dt_updated', db.DateTime)

    @property
    def slug(self):
        return slugify(self.title)

    @property
    def published_long(self):
        return self.published.strftime('%A, %d %B %Y @ %H:%M UTC')

    @property
    def updated_long(self):
        return self.updated.strftime('%A, %d %B %Y @ %H:%M UTC')

    @property
    def published_short(self):
        return self.published.strftime('%Y-%m-%d')

    @property
    def markdown(self):
        return markdown(self.body)

    @permalink
    def url(self):
        return 'root.post', {'post_id': self.id, 'slug': self.slug}

class Subscriber(db.Model):
    __tablename__ = 'sub_subscriber'
    __table_args__ = {'schema': 'schema'}

    email = db.Column('sub_email', db.String, primary_key=True)
    subscribed = db.Column('sub_dt_subscribed', db.DateTime, default=datetime.utcnow)

class Message(db.Model):
    __tablename__ = 'mes_message'
    __table_args__ = {'schema': 'schema'}

    id = db.Column('mes_id', db.Integer, primary_key=True)
    sender = db.Column('mes_sender', db.String)
    body = db.Column('mes_body', db.String)
    sent = db.Column('mes_dt_sent', db.DateTime, default=datetime.utcnow)
    read = db.Column('mes_dt_read', db.DateTime)

class Log(db.Model):
    __tablename__ = 'log_log'
    __table_args__ = {'schema': 'schema'}

    id = db.Column('log_id', db.Integer, primary_key=True)
    registered = db.Column('log_dt_registered', db.DateTime, default=datetime.utcnow)
    body = db.Column('log_body', db.String)

class Metric(db.Model):
    __tablename__ = 'met_metric'
    __table_args__ = {'schema': 'schema'}

    id = db.Column('met_id', db.Integer, primary_key=True)
    registered = db.Column('met_dt_registered', db.DateTime, default=datetime.utcnow)
    status_code = db.Column('met_status_code', db.Integer)
    duration = db.Column('met_duration', db.Float)
    url = db.Column('met_url', db.String)
    method = db.Column('met_method', db.String)
    mimetype = db.Column('met_mimetype', db.String)
    remote_addr = db.Column('met_remote_address', db.String)
    xforwardedfor = db.Column('met_x_forwarded_for', db.String)
    ua_browser = db.Column('met_user_agent_browser', db.String)
    ua_platform = db.Column('met_user_agent_platform', db.String)
    ua_language = db.Column('met_user_agent_language', db.String)
    ua_version = db.Column('met_user_agent_version', db.String)
