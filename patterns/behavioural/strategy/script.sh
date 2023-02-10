docker run \
    --name postgres \
    -e POSTGRES_USER=camisbrussi \
    -e POSTGRES_PASSWORD="senha0001" \
    -e POSTGRES_DB=heroes \
    -p 5433:5432 \
    -d \
    postgres

docker logs postgres
docker exec -it postgres psql --username camisbrussi --dbname heroes
CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);
SELECT * FROM warriors;

# mongodb

docker run -p 27017:27017 \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=camisbrussi \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d mongo:4