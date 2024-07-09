#!/bin/bash

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 {host} {port}"
  exit 1
fi

HOST=$1
PORT=$2

echo Waiting for container \"$HOST\" to start completely...

while ! nc -z $HOST $PORT; do
  sleep 0.1
done

echo "Container \"$HOST\" has been completely started!"