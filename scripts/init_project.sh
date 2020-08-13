#!/bin/sh

echo -n "Please input [ProjectName] >";
read ProjectName

if [ -z "${ProjectName}" ]
then
  echo 'ERROR: Empty ProjectName is invalid.'
  exit 1
fi

APPS_DIR=$(pwd)/apps
DIR_PATH=${APPS_DIR}/${ProjectName}

if [ -e ${DIR_PATH} ]
then
  echo "ERROR: Already exists path: ${DIR_PATH}"
  exit 1
fi
cp -rp template ${DIR_PATH}
# TSCONFIG_PATH=${DIR_PATH}/tsconfig.json
# TEMP_TSCONFIG=$(sed -e s/template/${ProjectName}/g ${TSCONFIG_PATH})
# echo -n ${TEMP_TSCONFIG} > ${TSCONFIG_PATH}

echo -n "Please input [scriptId] >";
read scriptId
if [ -z "${scriptId}" ]
then
  echo 'ERROR: Empty scriptId is invalid.'
  rm -rf ${DIR_PATH}
  exit 1
fi

cd ${DIR_PATH};clasp clone ${scriptId} --rootDir ./dist
echo "Initialize ${ProjectName}!!"