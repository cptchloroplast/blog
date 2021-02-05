FROM python:3.7-alpine as build
RUN apk add gcc musl-dev libffi-dev
COPY requirements/* requirements/
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install -r requirements/prod.txt

FROM python:3.7-alpine as release
COPY --from=build /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
WORKDIR /home
COPY app ./app
COPY data.json ./
COPY content ./content
COPY .env ./
CMD gunicorn -b :$PORT "app:create_app('prod')"
