data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "website" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.ec2.id]
  subnet_id              = tolist(data.aws_subnets.default.ids)[0]

  user_data = <<-EOF
    #!/bin/bash
    apt-get update -y
    apt-get install -y nginx git
    git clone https://github.com/Nurlanbek0v/kimstudio-website.git /tmp/kimstudio
    cp /tmp/kimstudio/index.html \
       /tmp/kimstudio/style.css \
       /tmp/kimstudio/script.js \
       /tmp/kimstudio/logo.png \
       /var/www/html/
    systemctl enable nginx
    systemctl restart nginx
  EOF

  tags = { Name = "kimstudio-web", Project = var.project }
}

resource "aws_lb_target_group_attachment" "website" {
  target_group_arn = aws_lb_target_group.website.arn
  target_id        = aws_instance.website.id
  port             = 80
}
