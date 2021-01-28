import os
import re
from typing import List
from datetime import datetime
import logging

from app.models import Post  # , Subscriber, Message

class Blog:
    posts: List[Post]

    def __init__(self, path: str) -> None:
        self.posts = []
        self.parse_content(path)

    def parse_content(self, path: str) -> None:
        """Parse blog posts from files."""
        for filename in os.listdir(path):
            post = Post()
            post.id = int(filename.split('.')[0])
            with open(os.path.join(path, filename), 'r') as file:
                post.body = file.read()
            for match in re.finditer(r'\[[a-z]+\]:#\(.*\)', post.body):
                metadata = match.group()
                key, value = [x[1:-1] for x in metadata.split(":#")]
                if key == 'title':
                    post.title = value
                elif key == 'published':
                    post.published = datetime.fromisoformat(value.replace('Z', '+00:00')) if value else None
                elif key == 'updated':
                    post.updated = datetime.fromisoformat(value.replace('Z', '+00:00')) if value else None
                else:
                    logging.error(f'Unknown key found in metadata of {filename}: {key}')
                    pass
            self.posts.append(post)

    def get_latest_published_post(self) -> Post:
        """Returns the latest published post."""
        try:
            return sorted(self.posts, key=lambda x: x.published, reverse=True)[0]
        except IndexError:
            return None

    def get_all_published_posts(self) -> List[Post]:
        """Returns all published posts in reverse chronological order."""
        return sorted(list(filter(lambda x: x.published, self.posts)), key=lambda x: x.published, reverse=True)

    def get_published_post_by_id(self, post_id: int) -> Post:
        """Returns a published post or none."""
        try:
            return list(filter(lambda x: x.id == post_id, self.posts))[0]
        except IndexError:
            return None

    def add_subscriber(self, email: str) -> bool:
        """Returns true if new subscriber added or false if email already subscribed."""
        return True

    def send_message(self, sender: str, body: str) -> None:
        """Sends a new message."""
        pass
