import os
import random
from phoenixc2.server.plugins.base import BlueprintPlugin
from flask import Blueprint, send_from_directory

DIRECTORY = os.path.dirname(os.path.abspath(__file__))
frontend = Blueprint("frontend", __name__, url_prefix="/")


@frontend.route("/")
def base():
    print(DIRECTORY + "/client/public/")
    return send_from_directory(DIRECTORY + "/client/public", "index.html")


# Path for all the static files (compiled JS/CSS, etc.)
@frontend.route("/<path:path>")
def home(path):
    print(DIRECTORY + "/client/public/" + path)
    return send_from_directory(DIRECTORY + "/client/public/", path)

@frontend.route("/rand")
def hello():
    return str(random.randint(0, 100))


class Plugin(BlueprintPlugin):
    name = "frontend"
    description = "The frontend plugin for PhoenixC2. Serves a built Svelte frontend."
    author = "screamz2k"

    @staticmethod
    def execute(commander, config) -> Blueprint:
        return frontend
