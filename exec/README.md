## 💼 주요 기술 스택

| 사용 단 | 기술 |
| ------ | ------ |
| 프론트엔드 | React.js 17.0.2, CSS, JavaScript, HTML5, OpenVidu, Teachable Machine, Axios 0.25.0, Router 6.2.1, MUI  |
| 백엔드 | Java 17, SpringBoot 2.4.5, OpenVidu, JWT 0.9.1, Lombok, myBatis, SMTP, SWAGGER |
| DB | MySQL : 8.0.27  |
| 운영체제, 서버, Infra | Ubuntu 20.04, Kurent, Coturn, Openvidu, AWS EC2 |

## ⚙️ Install and Usage

### 시스템 환경
Health Friend 는 아래와 같은 환경에서 실행 중입니다.

  OS : Ubuntu 20.04 LTS (GNU/Linux 4.15.0-72-generic x86_64)

### 시스템 구성

  jenkins : Jenkins 2.289.2

  docker : Docker version 20.10.12,

  docker-compose : docker-compose version 1.29.2

### Ubuntu 내 설치 및 업데이트 시 필요 사항

```
  sudo apt-get update
  sudo apt-get install openjdk-17
  sudo apt-get install nodejs
  sudo apt-get install npm
```

### Docker 설치

```
  sudo apt-get update

  sudo apt-get install \ apt-transport-https \ ca-certificates \ curl \ gnupg \ lsb-release
    
  sudo -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o
  /usr/share/keyrings/docker-archive-keyring.gpg

  echo \
    "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg]
    https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
  sudo apt-get update

  sudo apt-get install docker-ce docker-ce-cli containerd.io

  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

  sudo chmod +x /usr/local/bin/docker-compose
```

### OpenVidu 설치 [설치 방법](https://docs.openvidu.io/en/2.19.0/deployment/ce/on-premises/#close-ports-to-avoid-external-attacks)


#### 1. 방화벽 설정 

```
  ufw allow ssh

  ufw allow 80/tcp

  ufw allow 443/tcp

  ufw allow 3478/tcp

  ufw allow 3478/udp

  ufw allow 40000:57000/tcp

  ufw allow 40000:57000/udp

  ufw allow 57001:65535/tcp

  ufw allow 57001:65535/udp

  ufw enable
```

#### 2. OpenVidu 배포용 (On premises)

```
  cd /opt

  curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
```
#### 3. .env 수정

```
  cd /opt/openvidu
  sudo vi .env
```

```
  DOMAIN_OR_PUBLIC_IP=i6d204.p.ssafy.io  # 본인 도메인 IP

  OPENVIDU_SECRET=MY_SECRET # OPENVIDU 비밀번호

  CERTIFICATE_TYPE=letsencrypt # 인증서 사용, 만약 자가 서명을 사용한다면 selfsigned

  LETSENCRYPT_EMAIL=user@example.com # 만일 Cert type : LETSENCRYPT 로 서명시 사용
```

#### 4. OpenVidu 서버 실행

```
cd /opt/openvidu
sudo ./openvidu start
```

#### 5. docker 확인

```
sudo docker ps
```
![image](https://user-images.githubusercontent.com/87481266/154408585-df3bef34-da7a-490b-a893-ef3bb2503ce3.png)


### Coturn 설치

```
 sudo apt-get update && sudo apt-get install --no-install-recommends --yes \ coturn
```

### Coturn 설정

/etc/default/coturn 파일 수정

```
 TURNSERVER_ENABLED=1
```

/etc/turnserver.conf 파일 수정

```
 listening-port=3478
 tls-listening-port=5349
 listening-ip=<private IPv4 address of EC2>
 external-ip =<public Ipv4 address of EC2>/<private IPv4 address of EC2>
 relay-ip=<private IPv4 address of EC2>
 fingerprint
 lt-cred-mech
 user=myuser:mypassword
 realm=myrealm
 log-file=/var/log/turn.log
 simple-log
```

### Coturn 재가동

```
 sudo service coturn restart
```

### REST API service

```
 sudo vi /etc/systemd/system/api.service
```
```
  [Unit]
  Description=Health Friends API server
  After=syslog.target network.target nginx.service
  
  [Service]
  ExecStart=/bin/bash -c "exec java -jar /home/ubuntu/project/build/backend/healthfriend.jar >> /home/ubuntu/project/log/log.log 2>&1" #jar 파일 경로 기입
  Restart=always
  RestartSec=10

  User=root
  Group=root

  [Install]
  WantedBy=multi-user.target
```  
```
 sudo systemctl daemon-reload #서비스 데몬 리로드
 sudo systemctl enable api.service # 서버 리부팅 시 api.servcie 로드
 sudo service api start # api(REST 서버).service 실행
```

### nginx
```
 sudo apt-get install nginx
 sudo vi /etc/nginx/sites-enabled/default
```
```
server {
        listen 443 ssl default_server;
        listen [::]:443 ssl default_server;

        ssl_certificate /home/ubuntu/cert/live/i6d204.p.ssafy.io/fullchain.pem; #인증서 fullchain.pem 경로
        ssl_certificate_key /home/ubuntu/cert/live/i6d204.p.ssafy.io/privkey.pem; #인증서 privkey.pem 경로
        ssl_session_cache shared:le_nginx_SSL:10m;
        ssl_session_timeout 1440m;
        ssl_session_tickets off;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers off;
        ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA3";
        
        server_name _;

        location / {
                root /home/ubuntu/project/build/front; # 프론트 프로젝트 경로
                index index.html index.htm index.nginx-debian.html; # 프론트 프로젝트 index 파일명
                try_files $uri $uri/ /index.html =404;
        }
        location /api{
                proxy_pass http://i6d204.p.ssafy.io:8000/; # api 서버 주소
        }


        location /openvidu {
                proxy_pass https://i6d204.p.ssafy.io:4443/; # openvidu 서버 주소
        }
}
```
```
 sudo service nginx restart
```

### 🛢 DB

- Back-end\healthfriend\src\main\resources\application.properties
  
    내부 DB 접속 정보 및 계정 정보가 해당 파일 내부에 있습니다.



## 💾 배포 주소

https://i6d204.p.ssafy.io/
