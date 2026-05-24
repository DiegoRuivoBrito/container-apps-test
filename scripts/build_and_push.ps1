param(
  [Parameter(Mandatory=$true)][string]$acrName,
  [Parameter(Mandatory=$true)][string]$imageName,
  [string]$tag = "v1"
)

docker build -t "$imageName:$tag" ./app
az acr login --name $acrName
$loginServer = az acr show -n $acrName --query loginServer -o tsv
docker tag "$imageName:$tag" "$loginServer/$imageName:$tag"
docker push "$loginServer/$imageName:$tag"
Write-Host "Pushed $loginServer/$imageName:$tag"
