# dd trace bug report with marblejs

## Usage

```
npm i
npm start
```

## 1. Send empty body POST request

```sh
curl --location --request POST 'localhost:3000/' \
  --data-raw ''
```

log output (trace id is present):

```json
{
  "level": 30,
  "time": 1111111111111,
  "pid": 1111111,
  "hostname": "ubu",
  "dd": {
    "trace_id": "xxx",
    "span_id": "xxx",
    "service": "marblejs-datadog-bug",
    "version": "1.0.0"
  }
}
```

## 1. Send POST request with body


```sh
curl --location --request POST 'localhost:3000/' \
  --header 'Content-Type: application/json' \
  --data-raw '{"hello": 1}'
```

log output (trace id is NOT present):

```json
{
  "level": 30,
  "time": 1652446645158,
  "pid": 1594184,
  "hostname": "ubu",
  "hello": 1
}
```

