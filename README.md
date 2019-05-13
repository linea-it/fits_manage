# survey_progress
prototype for LSST survey progress


## Instalation
### Clone Repository
```
https://github.com/linea-it/lna.git lna
```

```
cd lna
```
### Docker-Compose
```
ln -s docker-compose-development.yml docker-compose.yml
```

### Create a .env based in env_template
```
cp env_template .env

```

### Arquivo de Conf do NGNIX
```
cd frontend/nginx/ && ln -s development.conf default.conf && cd ..
```


### Build and Run Containers 
```
docker-compose build
```
```
docker-compose up 
```
In First time backend can't connect to database to apply migrations, if this occur stop all container and run up again.

### Create a superuser in Django

run createsuperuser to create a admin user in Django.
with the docker running open a new terminal and run this command.
```
docker exec -it $(docker ps -q -f name=backend) python manage.py createsuperuser
```

### Run 
Stop all containers and run in background mode
```
docker-compose up -d
```

## Access Backend
Open in Browser
http://localhost

## Acessar o Admin
Open in Browser
http://localhost/admin/



## Adicionar mais campos ao models.py

Descobrir o nome do container usando o comando 

```
docker ps
```

Alterar o arquivo backend/fits/models.py adicionando novos campos 
seguindo os tipos de campos documentados neste link 
https://docs.djangoproject.com/pt-br/2.1/ref/models/fields/

Depois de criar os novos campos, com o container ligado executar o comandos:
```
docker exec -it fitsmanage_backend_1 python manage.py makemigrations
```

```
docker exec -it fitsmanage_backend_1 python manage.py migrate
```


-------------------------------------------------
## Instalação sem Código Fonte. 

criar um diretório lna.
```
mkdir lna
cd lna
mkdir initial_data log archive
```

Criar o arquivo docker-compose.yml com este conteúdo. 
```
version: '3'

services:
  # Database Postgres + Q3C
  database:
    image: linea/postgresql_q3c:latest
    restart: always
    env_file:
      - .env
    expose:
      - 5432
    volumes:
      - ./pg_data:/var/lib/postgresql/data
      - ./pg_backups:/pg_backups
      - ./initial_data:/data

  #Backend Django
  backend:
    image: linea/lna:BACK4dcb1d66cd5f190e9846856ff3e5c112ac207b05
    env_file:
      - .env
    volumes:
      - ./log:/log
      - ./archive:/archive
    ports:
      - 8081:8081
    depends_on:
      - database

  # Servidor Web NGINX + Frontend React
  frontend:
    image: linea/lna:FRONT4dcb1d66cd5f190e9846856ff3e5c112ac207b05
    ports:
      - 80:8080
    #volumes:
    #  - ./dashboard/nginx/development.conf:/etc/nginx/conf.d/default.conf:ro
    cap_drop:
      - ALL
    depends_on:
      - backend
```

Criar arquivo .env
```
DEBUG=True

DB_HOST=database
DB_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
```

Para iniciar o ambiente usar comando 
```
docker-compose up
```
 Apos o ambiente iniciado em outro terminal executar o comando createsuperuser para criar um usuario administrativo. 
```
docker exec -it $(docker ps -q -f name=backend) python manage.py createsuperuser
```
Acessar no navegador a url localhost para testar. 
Acessar no navegador a url http://localhost/admin/ para acessar a interface administrativa do Django. 


