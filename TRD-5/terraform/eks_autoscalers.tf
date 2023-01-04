resource "kubernetes_horizontal_pod_autoscaler_v1" "trd-news-front-end" {
  provider = kubernetes.this

  metadata {
    name = "trd-news-front-end"
  }

  spec {
    min_replicas                      = 2
    max_replicas                      = 10
    target_cpu_utilization_percentage = 80

    scale_target_ref {
      kind        = "Deployment"
      name        = "trd-news-front-end"
      api_version = "apps/v1"
    }
  }
}
