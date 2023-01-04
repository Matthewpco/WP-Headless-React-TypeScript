terraform {
  backend "s3" {
    bucket               = "trd-terraform-state"
    key                  = "tfstate"
    workspace_key_prefix = "trd-front-end"
    dynamodb_table       = "trd-terraform-state"
    region               = "us-east-1"
  }
  required_providers {
    aws = {
      version = "4.19.0"
    }
    kubernetes = {
      version = "2.11.0"
    }
  }
}

provider "aws" {
  alias  = "this"
  region = "us-east-1"

  default_tags {
    tags = {
      Environment = var.environment
      Project     = "TRD News"
    }
  }
}

data "aws_region" "current" {
  provider = aws.this
}

data "aws_eks_cluster" "this" {
  provider = aws.this
  name     = format("trd-eks-cluster-%s", var.environment)
}

data "aws_eks_cluster_auth" "this" {
  provider = aws.this
  name     = data.aws_eks_cluster.this.name
}

data "aws_ecr_repository" "trd" {
  provider = aws.this
  name     = format("trd-%s", var.environment)
}

data "aws_secretsmanager_secret" "pro" {
  provider = aws.this
  name     = format("trd-pro-%s", var.environment)
}

data "aws_secretsmanager_secret_version" "pro" {
  provider  = aws.this
  secret_id = data.aws_secretsmanager_secret.pro.id
}

provider "kubernetes" {
  alias                  = "this"
  host                   = data.aws_eks_cluster.this.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.this.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.this.token
}
