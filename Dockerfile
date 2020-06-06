FROM python:3.7-alpine as build
RUN apk add gcc musl-dev postgresql-dev
COPY requirements/* requirements/
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install -r requirements/prod.txt

FROM python:3.7-alpine as release
COPY --from=build /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY app/* app/
COPY .env ./
COPY data.json ./
CMD exec gunicorn -b :$PORT app:app
