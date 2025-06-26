from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate  # Needed for db migrations
from config import Config

db = SQLAlchemy()
migrate = Migrate()  # Instantiate Flask-Migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)  # This is important for `flask db` commands

    from .routes import treasury
    app.register_blueprint(treasury)

    return app
