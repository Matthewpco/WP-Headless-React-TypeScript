resource "kubernetes_deployment_v1" "trd-news-front-end-deployment" {
  provider = kubernetes.this

  metadata {
    name = "trd-news-front-end"
    labels = {
      app  = "trd-news"
      tier = "front-end"
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app  = "trd-news"
        tier = "front-end"
      }
    }

    strategy {
      type = "RollingUpdate"
    }

    template {
      metadata {
        name = "trd-news-front-end"
        labels = {
          app  = "trd-news"
          tier = "front-end"
        }
      }

      spec {
        container {
          name  = "front-end"
          image = format("%s:%s", data.aws_ecr_repository.trd.repository_url, var.trd_image_tag)

          resources {
            requests = {
              cpu    = "100m"
              memory = "512Mi"
            }
            limits = {
              "cpu"    = "1"
              "memory" = "1Gi"
            }
          }

          port {
            container_port = 3000
          }

          env_from {
            secret_ref {
              name     = "trd-news-front-end"
              optional = false
            }
          }
        }
      }
    }
  }

  depends_on = [
    kubernetes_secret_v1.trd-news-front-end,
  ]
}
