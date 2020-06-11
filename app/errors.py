from app.utils import render_view

def page_not_found(e):
    return render_view('errors/404.html'), 404

def server_error(e):
    # TODO: log error
    return render_view('errors/500.html'), 500
