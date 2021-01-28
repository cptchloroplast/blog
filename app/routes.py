from flask import abort, Blueprint, jsonify, current_app

from app.utils import render_view
from app.forms import ContactForm, SubscribeForm
from app.blog import Blog

root = Blueprint('root', __name__)

@root.route('/')
def latest():
    """Render the latest post."""
    blog: Blog = current_app.config['BLOG']
    post = blog.get_latest_published_post()
    return render_view('post.html', post=post)

@root.route('/blog/')
def table_of_contents():
    """Render the table of contents."""
    blog: Blog = current_app.config['BLOG']
    posts = blog.get_all_published_posts()
    return render_view('table_of_contents.html', posts=posts)

@root.route('/blog/<int:post_id>/')
@root.route('/blog/<int:post_id>/<slug>')
def post(post_id: int, slug: str = None):
    """Render a post or raise not found exception."""
    blog: Blog = current_app.config['BLOG']
    post = blog.get_published_post_by_id(int(post_id))
    if not post:
        abort(404)
    return render_view('post.html', post=post)

@root.route('/contact/')
def contact():
    """Render the contact form."""
    contact_form = ContactForm()
    return render_view('contact.html', contact=contact_form)

@root.route('/subscribe/', methods=['POST'])
def subscribe():
    """Subscribe to the blog."""
    form = SubscribeForm()
    if not form.validate_on_submit():
        return jsonify({  # error
            'err': True,
            'msg': "Oops, something doesn't look right here..."
        })
    blog: Blog = current_app.config['BLOG']
    if blog.add_subscriber(email=form.email.data):
        return jsonify({  # success
            'ok': True,
            'msg': "Thanks for subscribing!"
        })
    return jsonify({  # reject
        'ok': False,
        'msg': "You're already subscribed!"
    })

@root.route('/send/', methods=['POST'])
def send():
    """Send a message."""
    form = ContactForm()
    if not form.validate_on_submit():
        if form.errors.get('captcha'):
            return jsonify({  # reject
                'ok': False,
                'msg': 'No robots, please!'
            })
        return jsonify({  # error
            'err': True,
            'msg': "Oops, something doesn't look right here..."
        })
    blog: Blog = current_app.config['BLOG']
    blog.send_message(sender=form.sender.data, body=form.body.data)
    return jsonify({  # success
        'ok': True,
        'msg': "Message received. We'll get back to you soon!"
    })
