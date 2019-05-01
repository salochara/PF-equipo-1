FROM tiangolo/uwsgi-nginx-flask:python3.6

RUN pip install flask_cors
RUN pip install flask-login
RUN pip install Flask-Neo4j
RUN pip install peewee


COPY ./app /app
WORKDIR /app/

EXPOSE 80
