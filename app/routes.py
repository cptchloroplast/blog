from flask import abort, Blueprint, jsonify

from app.blog import Blog
from app.utils import render_view
from app.forms import ContactForm

root = Blueprint('root', __name__)
blog = Blog()

@root.route('/')
def home():
    post = blog.get_latest_post()
    return render_view('post.html', post=post)

@root.route('/blog/')
def table_of_contents():
    posts = blog.get_all_published_posts()
    return render_view('table_of_contents.html', posts=posts)

@root.route('/blog/<post_id>/')
@root.route('/blog/<post_id>/<slug>')
def post(post_id, slug=None):
    post = blog.get_published_post_by_id(post_id)
    if not post:
        abort(404)
    return render_view('post.html', post=post)

@root.route('/contact/')
def contact():
    contact_form = ContactForm()
    return render_view('contact.html', contact=contact_form)

@root.route('/subscribe/', methods=['POST'])
def subscribe():
    resp = blog.add_subscriber()
    return jsonify(resp)

@root.route('/send/', methods=['POST'])
def send():
    resp = blog.send_message()
    return jsonify(resp)

@root.errorhandler(404)
def page_not_found(e):
    return render_view('errors/404.html'), 404

@root.errorhandler(500)
def server_error(e):
    return render_view('errors/500.html'), 500
