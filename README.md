# survey_progress
prototype for LSST survey progress


## Instalation
### Clone Repository
```
https://github.com/linea-it/fits_manage.git fits_manage
```

```
cd fits_manage/
```

### Create a .env based in env_template
```
cp env_template .env

```

### Build and Run Containers 
```
docker-compose build
```

### Prepare Database

```
docker-compose up database
```

```
docker exec -it fits_manage_database_1 psql -h localhost -U postgres
```

Dentro do psql executar a query.
```
ALTER USER postgres WITH PASSWORD 'postgres';
```

Stop database container and up core-admin

### Create a superuser in Django
```
docker-compose up core-admin
```
run createsuperuser to create a admin user in Django.
with the docker running open a new terminal and run this command.
```
 docker exec -it fits_manage_backend_1 python manage.py createsuperuser
```

### Run 
Stop all containers and run in background mode
```
docker-compose up -d
```

## Access Backend
Open in Browser
http://localhost:8081