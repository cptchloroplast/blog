FROM python:3.7-alpine

RUN adduser -D blog
WORKDIR /home/blog

RUN apk add gcc musl-dev postgresql-dev
COPY requirements/* requirements/
RUN pip install -r requirements/prod.txt

COPY app/* app/
COPY .env ./
COPY data.json ./
COPY boot.sh ./
RUN chmod +x boot.sh

RUN chown -R blog:blog ./
USER blog

EXPOSE 5000
ENTRYPOINT [ "./boot.sh" ]
