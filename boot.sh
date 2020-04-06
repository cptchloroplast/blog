#!/bin/sh
exec gunicorn -b :5000 app:app