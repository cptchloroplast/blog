from datetime import datetime

from slugify import slugify
from markdown import markdown

from app.utils import permalink


class Post:
    id: int
    title: str
    body: str
    published: datetime
    updated: datetime

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

class Subscriber:
    email: str

class Message:
    sender: str
    body: str
