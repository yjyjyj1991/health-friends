# 헬스프렌드 (Health Friend)
<div align="center">

![image](https://user-images.githubusercontent.com/87481266/151474591-837f81bf-cf37-4ad1-a8d8-e940484fb6c8.png)

</div>

## 💼 주요 기술 스택

| 사용 단 | 기술 |
| ------ | ------ |
| 프론트엔드 | React.js 17.0.2, CSS, JavaScript, HTML5, OpenVidu, Teachable Machine, Axios 0.25.0, Router 6.2.1, MUI  |
| 백엔드 | Java 17, SpringBoot 2.4.5, OpenVidu, JWT 0.9.1, Lombok, myBatis, SMTP, SWAGGER |
| DB | MySQL : 8.0.27  |
| 운영체제, 서버, Infra | Ubuntu 20.04, Kurent, Coturn, Openvidu, AWS EC2 |
|  |  |


## 🦺 주요 기능 정리

- 운동 및 식단 통합 플랫폼

- 라이브 스트리밍 그룹운동 및 인공지능 자세 교정

- 운동 데이터 관리

- 맞춤형 식단 제공 (사용자 몸무게와 활동량 기반으로 계산 합니다.)

## 🔧 기술 정리

- JWT 토큰을 이용해서 보안성을 높였습니다.

- Jenkins를 이용하여서 배포를 자동화 하였습니다.

- 난수 생성 및 SMTP를 통한 이메일 인증, 패스워드 초기화를 제공합니다.

- OpenVidu를 통해서 실시간 화상 회의 시스템 구현


## ⚙️ Install and Usage

### 시스템 환경
Health Friend 는 아래와 같은 환경에서 실행 중입니다.

  OS : Ubuntu 20.04 LTS (GNU/Linux 4.15.0-72-generic x86_64)
  Cpu 모델 : Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30GHz //수정 필요
  Total Memory: 16396056 kB //수정 필요
  물리 cpu 개수 : 4 cpu당 물리 코어 : 4 논리 코어 수 : 32 //수정 필요

### 시스템 구성

  jenkins : Jenkins 2.289.2

  docker : Docker version 20.10.12,

  docker-compose : docker-compose version 1.29.2

### Ubuntu 설치 및 업데이트 시 필요 사항

```
  sudo apt-get update
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


#### 1. port 열어 주기

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
  cd openvidu
  sudo vi .env
```

```
  DOMAIN_OR_PUBLIC_IP=i6d204.p.ssafy.io  # 본인 도메인 IP

  OPENVIDU_SECRET=MY_SECRET # OPENVIDU 비밀번호

  CERTIFICATE_TYPE=selfsigned #자가 서명형태

  LETSENCRYPT_EMAIL=user@example.com # 만일 Cert type : LETSENCRYPT 로 서명시 사용
```

#### 4. OpenVidu 서버 실행

```
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

### 🛢 DB

- Back-end\healthfriend\src\main\resources\application.properties
  
    내부 DB 접속 정보 및 계정 정보가 해당 파일 내부에 있습니다.



## 💾 배포 주소

https://i6d204.p.ssafy.io/


## 🤝🏻 팀원

**프론트엔드** : 권영준, 홍지원
      
**백엔드** : 김수호, 김형우
     
**인프라** : 김수호, 김형우
