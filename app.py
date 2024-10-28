from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate 
from models import db
from routes import api
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)
# print(Config.JWT_SECRET_KEY)
# Initialize Flask-Migrate
migrate = Migrate(app, db)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()  # Create database tables

app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
