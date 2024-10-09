# Run dev mode

## Only NestJS

```bash
npm run start:dev
```

## Serverless Framework

### Run with serverless offline

```bash
npm run build
serverless offline
```

### Deploy to AWS using Serverless Framework

```bash
npm run build
sls deploy --verbose
```

### Remove components from AWS using Serverless Framework

```bash
sls remove --verbose
```

### Packaging and deployment separately

`sls package`

`serverless deploy --package .serverless --verbose` (**.serverless** is the folder that generated by the packaging)

## Databases

### Working with RDS

1. Create the RDS
2. Connect to the host and create the database
   `CREATE DATABASE ecommercedb`
3. Set/change database credentials on `postgres.module.ts`
4. Initialize the application
5. On ecommercedb database execute
   ```sql
   insert into supplier("name", address)
   values('Proveedor 1', 'Av. Alegría 102');
   ```

### Working with DynamoDB

1. Create the `product` table on DynamoDB and set ID as key partition
2. Set/change access/secret keys on `DynamoProductRepository.ts`

### Working with Redis

- Install/run docker

```bash
docker pull redis:latest
docker run --rm -p 6379:6379 --name myredis redis
```

- Verifify installation

```bash
docker exec -it myredis redis-cli
keys *
```

## Unit test and coverage

- Install/run docker

```bash
docker pull sonarqube:lts-community
docker run --name mysonar -p 9000:9000 sonarqube:lts-community
```

- Go to http://localhost:9000 on the browser, loggin and configure the security
- Donloadd sonnar-scanner, and send coverage
