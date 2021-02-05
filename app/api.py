from authlib.integrations.flask_client import OAuth, FlaskRemoteApp
from requests.models import Response

CLIENT_NAME = 'auth0'

oauth = OAuth()
oauth.register(CLIENT_NAME)

class API:
    client: FlaskRemoteApp
    token: dict

    def __init__(self, audience: str) -> None:
        """Initializes the API by creating a client a getting a token."""
        self.client = oauth.create_client(CLIENT_NAME)
        self.get_token(audience)

    def get_token(self, audience: str) -> None:
        """Gets a token for use with the API."""
        self.token = self.client.fetch_access_token(audience=audience)

    def add_subscriber(self, email: str) -> bool:
        """Returns true if new subscriber added or false if error."""
        resp: Response = self.client.request('POST', 'subscriber', token=self.token, json={'email': email})
        if resp.status_code == '200':
            return True
        return False

    def send_message(self, sender: str, body: str) -> bool:
        """Returns true if message sent or false if error."""
        resp: Response = self.client.request('POST', 'message', token=self.token, json={'sender': sender, 'body': body})
        if resp.status_code == '200':
            return True
        return False
