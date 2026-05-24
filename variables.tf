variable "location" {
  description = "Azure location where resources will be created"
  type        = string
  default     = "East US"
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "rg-appteste"
}
variable "container_image" {
  description = "Container image to deploy (public or ACR image)"
  type        = string
  default     = "mcr.microsoft.com/azuredocs/aci-helloworld:latest"
}