resource "aws_lb" "website" {
  name               = "kimstudio-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = data.aws_subnets.default.ids

  tags = { Project = var.project }
}

resource "aws_lb_target_group" "website" {
  name     = "kimstudio-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = data.aws_vpc.default.id

  health_check {
    path                = "/"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    interval            = 30
  }

  tags = { Project = var.project }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.website.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.website.arn
  }
}
