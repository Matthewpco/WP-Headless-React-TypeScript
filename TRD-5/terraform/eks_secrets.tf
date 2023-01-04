resource "kubernetes_secret_v1" "trd-news-front-end" {
  provider = kubernetes.this

  metadata {
    name = "trd-news-front-end"
  }

  data = {
    "NEXT_PUBLIC_ENV"                   = var.environment,
    "PIANO_API_TOKEN"                   = jsondecode(data.aws_secretsmanager_secret_version.pro.secret_string)["piano_api_token"],
    "PIANO_APPLICATION_ID"              = var.piano_app_id,
    "PIANO_MODE"                        = var.piano_mode,
    "WP_GRAPHQL_URL"                    = var.wp_graphql_url,
    "WP_LOGIN"                          = var.wp_login,
    "WP_LOGIN_PASSWORD"                 = jsondecode(data.aws_secretsmanager_secret_version.pro.secret_string)["wp_token"],
  }
}
