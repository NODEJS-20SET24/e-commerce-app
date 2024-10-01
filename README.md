# Run dev mode
## Only NestJS
``` bash
npm run start:dev
```

## Serverless Framework
### Run with serverless offline
``` bash
npm run build
serverless offline
```

### Deploy to AWS using Serverless Framework
``` bash
npm run build
sls deploy --verbose
```

### Remove components from AWS using Serverless Framework
``` bash
sls remove --verbose
```

### Packaging and deployment separately
`sls package`

`serverless deploy --package .serverless --verbose` (**.serverless** is the folder that generated by the packaging)