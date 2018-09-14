#!/bin/bash

# Apply database migrations
echo Running Migrate.
python manage.py migrate

# Collect static files
echo Running Collectstatic.
python manage.py collectstatic --noinput  


python manage.py runserver 0.0.0.0:8081

# Start Gunicorn processes
# TODO Esse parametro --reload nao pode ir para producao
# echo Starting Gunicorn.
# exec gunicorn api.wsgi:application \
#     --bind 0.0.0.0:8081 \
#     --workers 3 \
#     --reload