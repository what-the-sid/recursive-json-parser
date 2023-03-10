
# Telstra JSON parser

API to parse nested structure of data using recursive approach.

## Install
- Run Docker Build command:

`docker build . -t root/telstra-web-app `

- Docker run server:

`docker run -p 5000:5000 -d root/telstra-web-app`


## Develop:

- Install packages or dependencies:

`npm i`

- Build Scripts:

`npm run build:staging`

- Run app on local:

`npm run start`

- Check Lints or Faults:

`npm run lint`

- Run Unit Tests:

`npm run test`


## Folder structure

```
├── Dockerfile
├── docker-compose.yml
├── index.js
├── package-lock.json
├── package.json
└── scripts
    ├── __tests__
    │   ├── fixtures
    │   │   ├── invalid.json
    │   │   ├── success-response.json
    │   │   ├── valid-with-missing.json
    │   │   ├── valid-without-array.json
    │   │   └── valid.json
    │   └── mapper
    │       └── mapper.test.js
    ├── controllers
    │   └── mapper.controller.js
    ├── libs
    │   └── log
    │       └── errors.js
    └── mapper.js
```

## API Details:
#### Endpoint:
`/parse-json`

### Method:
`POST`

#### Sample Payload:

```
{
    "payload": {
        "name": "subscriber",
        "valueType": "array",
        "value": [
            {
                "name": "MN",
                "valueType": "string",
                "value": "{REF_MSISDN}"
            },
            {
                "name": "IM",
                "valueType": "string",
                "value": "{REF_IMSI}"
            }
        ]
    },
    "referenceData": {
        "REF_MSISDN": "0406679321",
        "REF_IMSI": "50002312344314",
        "REF_SERVPROFID": "2"
    }
}
```

#### Sample Response:

```
{
    "name": "subscriber",
    "valueType": "array",
    "value": [
        {
            "name": "MN",
            "valueType": "string",
            "value": "0406679321"
        },
        {
            "name": "IM",
            "valueType": "string",
            "value": "50002312344314"
        }
    ]
}
```
