from app.utils import render_view
from app.blog import Blog

def page_not_found(e):
    """Render not found view."""
    return render_view('errors/404.html'), 404

def server_error(e):
    """Log error and render server error view."""
    Blog.add_log(str(e.original_exception))
    return render_view('errors/500.html'), 500
