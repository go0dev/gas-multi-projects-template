#!/bin/bash
CONFIG_FILE=$(pwd)/config/codegen.conf

if [ $# != 2 ]
then
  echo "ERROR: Please input args [app-id], [type-name]"
  exit 1
fi

if [ ! -e ${CONFIG_FILE} ]
then
  echo "ERROR: Not found config file: ${CONFIG_FILE}"
  exit 1
fi
source $CONFIG_FILE

if [ -z "$HOST" -o -z "$USER" -o -z "$PASS" ]
then
  echo "ERROR: Not found config data. HOST:$HOST, USER:$USER, PASS:$PASS"
  exit 1
fi
yarn kintone-dts-gen --host "$HOST" -u "$USER" -p "$PASS" --app-id $1 --type-name $2 -o apps/utils/src/typings/$2
