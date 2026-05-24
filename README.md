# Azure Container Apps + Terraform (Minimal)

Este workspace contém:

- infraestrutura Terraform para Azure Container Apps
- um app React de quiz em `app/`
- um `Dockerfile` no app React para publicar como imagem de container
- instruções para usar Azure Container Registry (ACR) e evitar custos

## Pré-requisitos

- `az` CLI logado
- `docker` instalado
- `terraform` instalado
- `npm` instalado para construir o app React

## Fluxo recomendado

### 1) Build do app React

```bash
cd app
npm install
npm run build
```

### 2) Build da imagem Docker

```bash
docker build -t meuacrname.azurecr.io/terraform-quiz:v1 .
```

### 3) Enviar a imagem para o ACR

```bash
az acr login -n meuacrname
docker push meuacrname.azurecr.io/terraform-quiz:v1
```

### 4) Atualizar o Terraform para usar a imagem do ACR

No `variables.tf`, defina:

```hcl
variable "container_image" {
  description = "Container image to deploy in Container Apps"
  type        = string
  default     = "meuacrname.azurecr.io/terraform-quiz:v1"
}
```

### 5) Aplicar a infraestrutura

```bash
terraform init
terraform apply -auto-approve
```

## Monitoramento de custos

- Configure `min_replicas = 1` e `max_replicas = 1` para testes simples.
- Use o SKU `Basic` no ACR.
- Destrua recursos quando não estiver usando.

## Limpeza de recursos

Para apagar recursos criados pelo Terraform:

```bash
terraform destroy -auto-approve
```

Para remover o ACR se não quiser manter:

```bash
az acr delete -n meuacrname -g rg-appteste --yes
```

> Seus créditos terminam no início de Junho. Destrua recursos antes dessa data se não quiser gerar custo permanente.
