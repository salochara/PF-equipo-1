# Import standard library modules

# Import installed modules
# # Import installed packages
from flask import abort
from webargs import fields
from flask_apispec import doc, use_kwargs, marshal_with
from flask_jwt_extended import get_current_user, jwt_required

# Import app code
from app.main import app
from app.api.api_v1.api_docs import docs, security_params
from app.core import config
from app.db.flask_session import db_session
from app.core.celery_app import celery_app
from app.db.utils import (
    get_hello
)
from app.models.hello import Hello


@docs.register
@doc(
    description="Retrieve the roles of the user",
    security=security_params,
    tags=["hello"],
)
@app.route(f"{config.API_V1_STR}/hello/", methods=["GET"])
def route_hello_get():    
    return get_hello()
