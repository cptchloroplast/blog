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
    def slug(self) -> str:
        return slugify(self.title)

    @property
    def published_long(self) -> str:
        return self.published.strftime('%A, %d %B %Y @ %H:%M UTC')

    @property
    def published_short(self) -> str:
        return self.published.strftime('%Y-%m-%d')

    @property
    def published_iso(self) -> str:
        return self.published.strftime('%Y-%m-%dT%H:%M:%SZ')

    @property
    def updated_long(self) -> str:
        return self.updated.strftime('%A, %d %B %Y @ %H:%M UTC')

    @property
    def markdown(self) -> str:
        return markdown(self.body)

    @permalink
    def url(self):
        return 'root.post', {'post_id': self.id, 'slug': self.slug}

class Subscriber:
    email: str

class Message:
    sender: str
    body: str
