import os
from phoenixc2.server.plugins.base import BlueprintPlugin
from flask import Blueprint

frontend = Blueprint("frontend", __name__, url_prefix="/")
frontend.static_folder = os.path.dirname(os.path.abspath(__file__)) + "/frontend/dist/"


@frontend.route("/")
def base():
    return frontend.send_static_file("index.html")


class Plugin(BlueprintPlugin):
    name = "frontend"
    description = "The frontend plugin for PhoenixC2. Serves a built Svelte frontend."
    author = "screamz2k"

    @staticmethod
    def execute(commander, config) -> Blueprint:
        return frontend
