variable "environment" {
  type = string
}
variable "trd_image_tag" {
  type = string
}
variable "wp_login" {
  type      = string
  sensitive = true
}
variable "wp_graphql_url" {
  type = string
}
variable "piano_mode" {
  type = string
}
variable "piano_app_id" {
  type = string
}
