
FROM python:3.6

ENV PYTHONUNBUFFERED 1

# RUN apt-get update && apt-get install -y  \
#             && rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt /requirements.txt

RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

COPY start_django.sh /start_django.sh

WORKDIR /app

EXPOSE 8081

CMD ["./start_django.sh"]