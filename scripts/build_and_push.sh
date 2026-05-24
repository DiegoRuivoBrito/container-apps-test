#!/usr/bin/env bash
# Usage: ./build_and_push.sh <acrName> <imageName> <tag>
set -euo pipefail
acrName="$1"
imageName="$2"
tag="${3:-v1}"

docker build -t "${imageName}:${tag}" ./app
az acr login --name "${acrName}"
loginServer=$(az acr show -n "${acrName}" --query loginServer -o tsv)
docker tag "${imageName}:${tag}" "${loginServer}/${imageName}:${tag}"
docker push "${loginServer}/${imageName}:${tag}"
echo "Pushed ${loginServer}/${imageName}:${tag}"
