terraform {
	required_providers {
		azurerm = {
			source  = "hashicorp/azurerm"
			version = "~> 3.0"
		}
	}
}

provider "azurerm" {
	features {}
}

resource "azurerm_resource_group" "rg" {
	name     = var.resource_group_name
	location = var.location
}

resource "azurerm_log_analytics_workspace" "log-appteste" {
  name                = "log-appteste"
  location            = var.location
  resource_group_name = var.resource_group_name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_container_app_environment" "container-appteste" {
  name                       = "container-appteste"
  location                   = var.location
  resource_group_name        = var.resource_group_name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.log-appteste.id
}

resource "azurerm_container_app" "app-teste" {
  name                         = "app-teste"
  container_app_environment_id = azurerm_container_app_environment.container-appteste.id
  resource_group_name          = var.resource_group_name
  revision_mode                = "Single"

  ingress {
    external_enabled = true
    target_port      = 80
    traffic_weight {
      latest_revision = true
      percentage = 100
    }
  }

  template {
    container {
      name   = "app-teste"
      image  = var.container_image
      cpu    = 0.25
      memory = "0.5Gi"
    }

    min_replicas = 1
    max_replicas = 3
  }
}