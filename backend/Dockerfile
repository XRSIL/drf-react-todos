FROM  python:3.9

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

RUN pip install django django-cors-headers djangorestframework

# copy from the current directory of the Dockerfile to /api in the image
COPY . . 

EXPOSE 8000

