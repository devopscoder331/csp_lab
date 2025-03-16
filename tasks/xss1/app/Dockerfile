FROM python:3.11-slim-bookworm

RUN pip install flask

COPY app.py /app/app.py

WORKDIR /app

ENTRYPOINT ["python", "app.py"]