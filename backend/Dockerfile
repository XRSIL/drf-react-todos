FROM  python:3.9-slim-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

RUN python3 -m venv /opt/venv

COPY requirements.txt .

RUN . /opt/venv/bin/activate && pip install -r requirements.txt

COPY . .

EXPOSE 8000

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod o+x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

