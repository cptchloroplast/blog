from app.api import API
from flask import abort, Blueprint, current_app, make_response, request, render_template
from urllib.parse import urlparse

from app.utils import render_view
from app.forms import ContactForm, SubscribeForm
from app.blog import Blog
from app.responses import success, reject, error

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
        return error("Oops, something doesn't look right here...")
    api: API = current_app.config['API']
    try:
        if api.add_subscriber(email=form.email.data):
            return success("Thanks for subscribing!")
        return reject("You're already subscribed!")
    except Exception:
        return error("Oops, something doesn't seem to be working...")

@root.route('/send/', methods=['POST'])
def send():
    """Send a message."""
    form = ContactForm()
    if not form.validate_on_submit():
        if form.errors.get('captcha'):
            return reject("No robots, please!")
        return error("Oops, something doesn't look right here...")
    api: API = current_app.config['API']
    try:
        if api.send_message(sender=form.sender.data, body=form.body.data):
            return success("Message received. We'll get back to you soon!")
        return error("Oops, something doesn't look right here...")
    except Exception:
        return error("Oops, something doesn't seem to be working...")

@root.route('/sitemap')
def sitemap():
    """Render the sitemap."""
    components = urlparse(request.host_url)
    host = f'{components.scheme}://{components.netloc}'
    static = []
    for rule in current_app.url_map.iter_rules():
        if 'GET' in rule.methods and len(rule.arguments) == 0:
            url = {
                'loc': f'{host}{str(rule)}'
            }
            static.append(url)
    dynamic = []
    blog: Blog = current_app.config['BLOG']
    posts = blog.get_all_published_posts()
    for post in posts:
        url = {
            'loc': f'{host}/blog/{post.id}/{post.slug}',
            'lastmod': post.published_iso
        }
        dynamic.append(url)
    sitemap = render_template('sitemap.xml', static=static, dynamic=dynamic)
    response = make_response(sitemap)
    response.headers['Content-Type'] = 'application/xml'
    return response
