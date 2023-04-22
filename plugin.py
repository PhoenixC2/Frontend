from phoenixc2.server.plugins.base import BlueprintPlugin
from flask import Blueprint

frontend = Blueprint("frontend", __name__, url_prefix="/")
frontend.static_folder = "dist"
frontend.static_url_path = ""


@frontend.route("/")
def base():
    return frontend.send_static_file("index.html")


class Plugin(BlueprintPlugin):
    name = "frontend"
    description = "The frontend plugin for PhoenixC2. Serves a built react app."
    author = "screamz2k"

    @staticmethod
    def execute(commander, config) -> Blueprint:
        return frontend
