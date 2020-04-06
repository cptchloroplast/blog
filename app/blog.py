from sqlalchemy.exc import IntegrityError

from app import db
from app.models import Post, Subscriber, Message
from app.forms import SubscribeForm, ContactForm

class Blog():

    def get_latest_post(self):
        return db.session.query(Post).filter(Post.published.isnot(None)) \
            .order_by(Post.published.desc()).first()

    def get_all_published_posts(self):
        return db.session.query(Post).filter(Post.published.isnot(None)) \
            .order_by(Post.published.desc()).all()

    def get_published_post_by_id(self, post_id):
        return db.session.query(Post) \
            .filter(Post.id == post_id, Post.published.isnot(None)).first()

    def add_subscriber(self):
        form = SubscribeForm()
        if not form.validate_on_submit():
            return {
                'ok': False,
                'err': True,
                'msg': "Oops, something doesn't look right here..."
            }
        subscriber = Subscriber(email=form.email.data)
        db.session.add(subscriber)
        try:
            db.session.commit()
        except IntegrityError:
            return {
                'ok': False,
                'msg': "You're already subscribed!"
            }
        return {
            'ok': True,
            'msg': "Thanks for subscribing!"
        }

    def send_message(self):
        form = ContactForm()
        if not form.validate_on_submit():
            return {
                'ok': False,
                'err': True,
                'msg': "Oops, something doesn't look right here..."
            }
        message = Message(sender=form.sender.data, body=form.body.data)
        db.session.add(message)
        db.session.commit()
        return {
            'ok': True,
            'msg': "Message received. We'll get back to you soon!"
        }
