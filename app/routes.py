from flask import abort, jsonify

from app import app, _blog as blog
from app.utils import render_view
from app.forms import ContactForm

@app.route('/')
def home():
    post = blog.get_latest_post()
    return render_view('post.html', post=post)

@app.route('/blog/')
def table_of_contents():
    posts = blog.get_all_published_posts()
    return render_view('table_of_contents.html', posts=posts)

@app.route('/blog/<post_id>/')
@app.route('/blog/<post_id>/<slug>')
def post(post_id, slug=None):
    post = blog.get_published_post_by_id(post_id)
    if not post:
        abort(404)
    return render_view('post.html', post=post)

@app.route('/contact/')
def contact():
    contact_form = ContactForm()
    return render_view('contact.html', contact=contact_form)

@app.route('/subscribe/', methods=['POST'])
def subscribe():
    resp = blog.add_subscriber()
    return jsonify(resp)

@app.route('/send/', methods=['POST'])
def send():
    resp = blog.send_message()
    return jsonify(resp)

@app.errorhandler(404)
def page_not_found(e):
    return render_view('errors/404.html'), 404

@app.errorhandler(500)
def server_error(e):
    return render_view('errors/500.html'), 500
