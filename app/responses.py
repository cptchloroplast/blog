from flask import jsonify, Response

def success(msg: str = 'Success') -> Response:
    """Returns a success response."""
    return jsonify({
        'ok': True,
        'msg': msg,
    })

def reject(msg: str = 'Reject') -> Response:
    """Returns a rejection response."""
    return jsonify({
        'ok': False,
        'msg': msg
    })

def error(msg: str = 'Error') -> Response:
    """Returns an error response."""
    return jsonify({
        'err': True,
        'msg': msg,
    })
