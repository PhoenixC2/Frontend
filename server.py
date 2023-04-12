# credits to https://cabreraalex.medium.com/svelte-js-flask-combining-svelte-with-a-simple-backend-server-d1bc46190ab9
from flask import Flask
import random

app = Flask(__name__, static_folder="frontend/dist", static_url_path="/")


@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.route("/rand")
def hello():
    return str(random.randint(0, 100))


if __name__ == "__main__":
    print(app.url_map)
    app.run(debug=True)
