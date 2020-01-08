# Anywhere Fitness Backend

> https://anywhere-fitness-api.herokuapp.com

| Method | Endpoint                         | Description                  | Auth Required | Is Instructor |
| ------ | -------------------------------- | ---------------------------- | :-----------: | :-----------: |
| GET    | /                                | Base endpoint                |      [ ]      |      [ ]      |
| GET    | /api/client/profile              | Get client profile           |      [x]      |      [ ]      |
| GET    | /api/client/reservations         | Get client reservations      |      [x]      |      [ ]      |
| POST   | /api/client/reservation/:classId | Add reservation              |      [x]      |      [ ]      |
| DELETE | /api/client/reservation/:classId | Delete reservation           |      [x]      |      [ ]      |
| GET    | /api/classes                     | Get all classes              |      [x]      |      [ ]      |
| GET    | /api/classes/:id                 | Get classes by ID            |      [x]      |      [ ]      |
| GET    | /api/classes/instructor/:id      | Get classes by instructor ID |      [x]      |      [ ]      |
| POST   | /api/classes                     | Add class                    |      [x]      |      [x]      |
| PUT    | /api/classes/:id                 | Update class                 |      [x]      |      [x]      |
| DELETE | /api/classes/:id                 | Delete class                 |      [x]      |      [x]      |
| POST   | /api/auth/register               | Register new user            |      [ ]      |      [ ]      |
| POST   | /api/auth/login                  | Log in user                  |      [ ]      |      [ ]      |

> Login needs Authorization Header

```
headers: {
  'Content-Type': 'application/json',
  Authorization: token,
}
```

> Mock User in Database

* **email**: *drogo@horselands.com*
* **password**: *bloodrider*

```
{
  "user": {
    "id": "5e139145cd754e0a26e963e5",
    "firstName": "Khal",
    "lastName": "Drogo",
    "email": "drogo@horselands.com",
    "role": "instructor"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTM5MTQ1Y2Q3NTRlMGEyNmU5NjNlNSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNTc4MzQyMTk1fQ.ii0YI9EYd8lS3BrcLSfyu-DJxLZZXTeGMRALw4qzRew"
}
```

> Mock Class in Database

```
{
    "type": "Yoga",
    "days": [
      "Sunday"
    ],
    "intensityLevel": "Intermediate",
    "createdAt": "2020-01-07T07:09:59.960Z",
    "_id": "5e14306f3e7d5e15a41e448e",
    "name": "Summertime fine",
    "description": "These beaches ain't ready",
    "startTime": "5:30",
    "endTime": "6:00",
    "duration": 30,
    "requirements": "None",
    "location": "The Park",
    "size": 10,
    "price": 15,
    "arrivalDetails": "Arrive 10 minutes early for stretching",
    "shouldKnowDetails": "We go hard!",
    "instructor": "5e139145cd754e0a26e963e5",
    "__v": 0
  }
```
