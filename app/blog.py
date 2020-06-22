from typing import List

from app.models import db, Post, Subscriber, Message, Log, Metric

class Blog:

    @staticmethod
    def get_latest_published_post() -> Post:
        """Returns the latest published post."""
        return db.session.query(Post).filter(Post.published.isnot(None)) \
            .order_by(Post.published.desc()).first()

    @staticmethod
    def get_all_published_posts() -> List[Post]:
        """Returns all published posts in chronological order."""
        return db.session.query(Post).filter(Post.published.isnot(None)) \
            .order_by(Post.published.desc()).all()

    @staticmethod
    def get_published_post_by_id(post_id: int) -> Post:
        """Returns a published post or none."""
        return db.session.query(Post) \
            .filter(Post.id == post_id, Post.published.isnot(None)).first()

    @staticmethod
    def add_subscriber(email: str) -> bool:
        """Returns true if new subscriber added or false if email already subscribed."""
        subscriber = Subscriber(email=email)
        if db.session.query(Subscriber).filter_by(email=email).scalar() is not None:
            return False
        db.session.add(subscriber)
        db.session.commit()
        return True

    @staticmethod
    def add_message(sender: str, body: str) -> None:
        """Adds a new message."""
        message = Message(sender=sender, body=body)
        db.session.add(message)
        db.session.commit()

    @staticmethod
    def add_log(body: str) -> None:
        """Adds a new log."""
        log = Log(body=body)
        db.session.add(log)
        db.session.commit()

    @staticmethod
    def add_metric(status_code: int, duration: int, url: str, method: str, mimetype: str,
                   remote_addr: str, xforwardedfor: str, ua_browser: str, ua_language: str,
                   ua_platform: str, ua_version: str) -> None:
        """Adds a new metric."""
        metric = Metric(
            status_code=status_code,
            duration=duration,
            url=url,
            method=method,
            mimetype=mimetype,
            remote_addr=remote_addr,
            xforwardedfor=xforwardedfor,
            ua_browser=ua_browser,
            ua_language=ua_language,
            ua_platform=ua_platform,
            ua_version=ua_version
        )
        db.session.add(metric)
        db.session.commit()
