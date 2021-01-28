import logging

from app.utils import render_view

def page_not_found(e):
    """Render not found view."""
    return render_view('errors/404.html'), 404

def server_error(e):
    """Log error and render server error view."""
    logging.error(f'Unknown error: {str(e)}')
    return render_view('errors/500.html'), 500
