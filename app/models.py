from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from slugify import slugify
from markdown import markdown

from app.utils import permalink

db = SQLAlchemy()

class Post(db.Model):
    __tablename__ = 'pos_post'

    id = db.Column('pos_id', db.Integer, primary_key=True)
    title = db.Column('pos_title', db.String)
    markdown = db.Column('pos_markdown', db.String)
    published = db.Column('pos_dt_published', db.DateTime)
    updated = db.Column('pos_dt_updated', db.DateTime)

    @property
    def slug(self):
        return slugify(self.title)

    @property
    def published_on(self):
        return self.published.strftime('%A, %d %B %Y @ %H:%M UTC')

    @property
    def body(self):
        return markdown(self.markdown)

    @permalink
    def url(self):
        return 'root.post', {'post_id': self.id, 'slug': self.slug}

class Subscriber(db.Model):
    __tablename__ = 'sub_subscriber'

    email = db.Column('sub_email', db.String, primary_key=True)
    subscribed = db.Column('sub_dt_subscribed', db.DateTime, default=datetime.utcnow())

class Message(db.Model):
    __tablename__ = 'mes_message'

    id = db.Column('mes_id', db.Integer, primary_key=True)
    sender = db.Column('mes_sender', db.String)
    body = db.Column('mes_body', db.String)
    sent = db.Column('mes_dt_sent', db.DateTime, default=datetime.utcnow())
    read = db.Column('mes_dt_read', db.DateTime)

class Metrics(db.Model):
    __tablename__ = 'met_metrics'

    id = db.Column('met_id', db.Integer, primary_key=True)
