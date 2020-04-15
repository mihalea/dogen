#!/usr/bin/env bash

# Start the first process
cd /covid/server && yarn start &
pid_server=$!
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start express server: $status"
  exit $status
fi

# Start the second process
cd /covid/client && yarn run prod &
pid_client=$!
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start react client: $status"
  exit $status
fi


while sleep 60; do
    echo "alive"
#   ps -p $pid_server
#   PROCESS_1_STATUS=$?
#   ps -p $pid_client
#   PROCESS_2_STATUS=$?
#   if [ $PROCESS_1_STATUS -eq 0 -o $PROCESS_2_STATUS -eq 0 ]; then
#     echo "One of the processes has already exited."
#     exit 1
#   fi
done
