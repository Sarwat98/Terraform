terraform {
  backend "s3" {
    bucket = "sarwat"
    key    = "terraform.tfstate"
    region = "us-east-1"
    encrypt        = true
    dynamodb_table = "sarwat"
  }
}
