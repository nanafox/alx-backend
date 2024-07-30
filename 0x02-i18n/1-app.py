#!/usr/bin/env python3

"""A simple flask app."""

from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)
app.url_map.strict_slashes = False
babel = Babel(app)


class Config:
    """Config for the app."""

    LANGUAGES = ["en", "fr"]
    babel.BABEL_DEFAULT_LOCALE = "en"
    babel.BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@app.route("/", methods=["GET"])
def home():
    """Get the locale from request"""
    return render_template("1-index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)