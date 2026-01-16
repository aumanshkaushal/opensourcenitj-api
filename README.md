<h1 align="center">
  <br>
  <a href="https://opensourcenitj.com/api">
    <img src="./assets/readmeBanner.jpg" alt="os-api">
  </a>
  <br>
  OpensourceNITJ - API
  <br>
</h1>

<h4 align="center">By Developers, For Developers</h4>

<p align="center">
  <a href="https://opensourcenitj.com">
    <img alt="OpenSourceNITJ" src="https://img.shields.io/badge/OpenSourceNITJ-community?color#2596be">
  </a>
  <a href="https://github.com/opensourcenitj/api">
    <img alt="GitHub version" src="https://img.shields.io/github/package-json/v/Opensource-NITJ/api?color=ffffff">
  </a>
  <a href="https://github.com/opensourcenitj/api">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Opensource-NITJ/api?color=ffffff">
  </a>
</p>

### Features:

-   Get student details using roll number
-   Get simplified view of timetable to embed into your applications

## Routes

### Health Check

```http
GET /health
```

Returns the health status of the API server.

#### Response (200)

```json
{
    "status": "ok",
    "uptime": 12345.67,
    "timestamp": "2026-01-16T14:32:10.123Z"
}
```

| Field     | Type   | Description              |
| --------- | ------ | ------------------------ |
| status    | string | Health status of the API |
| uptime    | number | Server uptime in seconds |
| timestamp | string | ISO 8601 timestamp       |

---

### Get Student Group (First Year Only)

```http
GET /students/getGroup
```

Returns the group and subgroup (e.g., `B6`, `a`) of a first-year student based on their roll number.

#### Query Parameters

| Parameter  | Type   | Description                      |
| ---------- | ------ | -------------------------------- |
| rollNumber | string | Required. Roll number of student |

#### Response (200)

```json
{
    "group": "B6",
    "subGroup": "a"
}
```

| Field    | Type   | Description                      |
| -------- | ------ | -------------------------------- |
| group    | string | Student group (`A1`-`B6`)        |
| subGroup | string | Student subgroup (`a`, `b`, `c`) |

#### Error Response (404)

Group not found for the provided roll number.

---

### Get First Year Timetable

```http
GET /timetable/year/1
```

Returns the timetable for first-year students.

#### Query Parameters

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| group     | string | Required. Group (`A1`–`B6`) |

#### Response (200)

```json
{
    "timetableData": {
        "Monday": {
            "period1": [
                [
                    {
                        "subject": "Maths",
                        "faculty": "Dr. Sharma",
                        "room": "LT-1"
                    }
                ]
            ]
        }
    },
    "notes": ["Practical classes start next week"]
}
```

#### timetableData structure

```ts
Record<
    string,
    Record<
        string,
        Array<
            Array<{
                subject: string;
                faculty: string;
                room: string;
            }>
        >
    >
>;
```

| Field   | Type   | Description  |
| ------- | ------ | ------------ |
| subject | string | Subject name |
| faculty | string | Faculty name |
| room    | string | Room or lab  |

| Field | Type     | Description                |
| ----- | -------- | -------------------------- |
| notes | string[] | Additional timetable notes |

#### Error Response (400)

```json
{
    "error": "Invalid group parameter"
}
```

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | string | Error message |

---

### Base URL

```
https://api.opensourcenitj.com
```
