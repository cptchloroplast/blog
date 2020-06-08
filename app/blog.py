from typing import List, Dict, Union

from sqlalchemy.exc import IntegrityError

from app.models import db, Post, Subscriber, Message
from app.forms import SubscribeForm, ContactForm

class Blog:

    @staticmethod
    def get_latest_published_post() -> Post:
        return db.session.query(Post).filter(Post.published.isnot(None)) \
            .order_by(Post.published.desc()).first()

    @staticmethod
    def get_all_published_posts() -> List[Post]:
        return db.session.query(Post).filter(Post.published.isnot(None)) \
            .order_by(Post.published.desc()).all()

    @staticmethod
    def get_published_post_by_id(post_id: int) -> Post:
        return db.session.query(Post) \
            .filter(Post.id == post_id, Post.published.isnot(None)).first()

    @staticmethod
    def add_subscriber(form: SubscribeForm) -> Dict[str, Union[str, bool]]:
        if not form.validate_on_submit():
            return {  # error
                'err': True,
                'msg': "Oops, something doesn't look right here..."
            }
        subscriber = Subscriber(email=form.email.data)
        db.session.add(subscriber)
        try:
            db.session.commit()
        except IntegrityError:
            return {  # reject
                'ok': False,
                'msg': "You're already subscribed!"
            }
        return {  # success
            'ok': True,
            'msg': "Thanks for subscribing!"
        }

    @staticmethod
    def send_message(form: ContactForm) -> Dict[str, Union[str, bool]]:
        if not form.validate_on_submit():
            if form.errors.get('captcha'):
                return {  # reject
                    'ok': False,
                    'msg': 'No robots, please!'
                }
            return {  # error
                'err': True,
                'msg': "Oops, something doesn't look right here..."
            }
        message = Message(sender=form.sender.data, body=form.body.data)
        db.session.add(message)
        db.session.commit()
        return {  # success
            'ok': True,
            'msg': "Message received. We'll get back to you soon!"
        }
