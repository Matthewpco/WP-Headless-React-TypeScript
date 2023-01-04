resource "kubernetes_service_v1" "trd-news-front-end-svc" {
  provider = kubernetes.this

  metadata {
    name = "trd-news-front-end"
    annotations = {
      "alb.ingress.kubernetes.io/healthcheck-path" = "/favicon.ico"
    }
    labels = {
      app  = "trd-news"
      tier = "front-end"
    }
  }

  spec {
    selector = {
      app  = "trd-news"
      tier = "front-end"
    }

    port {
      name        = "trd"
      port        = 3000
      target_port = 3000
      protocol    = "TCP"
    }

    type = "NodePort"
  }
}
