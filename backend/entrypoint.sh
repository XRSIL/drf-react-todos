#!/bin/sh

. /opt/venv/bin/activate

python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser --no-input
python3 manage.py runserver 0.0.0.0:8000

ENTRYPOINT ["sh", "-c", "/entrypoint.sh"]