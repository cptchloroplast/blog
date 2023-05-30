#!/bin/bash

FILENAME="credentials.json"
if [ ! -f "$FILENAME" ]
then
  echo "$GOOGLE_CREDENTIALS" >> "$FILENAME"
fi
