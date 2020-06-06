FROM python:3.7-alpine as build
RUN apk add gcc musl-dev postgresql-dev
RUN adduser -D blog
WORKDIR /home/blog
COPY requirements/* requirements/
RUN python -m venv .venv
ENV VIRTUAL_ENV=/home/blog/.venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN pip install -r requirements/prod.txt

FROM python:3.7-alpine as release
RUN adduser -D blog
WORKDIR /home/blog
COPY --from=build /home/blog/.venv ./
ENV VIRTUAL_ENV=/home/blog/.venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
COPY app/* app/
COPY .env ./
COPY data.json ./
RUN chown -R blog:blog ./
USER blog
CMD exec gunicorn -b :$PORT app:app
