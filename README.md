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
cd nginx/ && ln -s development.conf default.conf && cd ..
```


### Build and Run Containers 
```
docker-compose build
```
```
docker-compose up 
```

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

