# Anywhere Fitness Backend

> https://anywhere-fitness-api.herokuapp.com

| Method | Endpoint                    | Description                  | Auth Required | Is Instructor |
| ------ | --------------------------- | ---------------------------- | :-----------: | :-----------: |
| GET    | /                           | Base endpoint                |      [ ]      |      [ ]      |
| GET    | /api/classes                | Get all classes              |      [x]      |      [ ]      |
| GET    | /api/classes/:id            | Get classes by ID            |      [x]      |      [ ]      |
| GET    | /api/classes/instructor/:id | Get classes by instructor ID |      [x]      |      [ ]      |
| POST   | /api/classes                | Add class                    |      [x]      |      [x]      |
| PUT    | /api/classes/:id            | Update class                 |      [x]      |      [x]      |
| DELETE | /api/classes/:id            | Delete class                 |      [x]      |      [x]      |
| POST   | /api/auth/register          | Register new user            |      [ ]      |      [ ]      |
| POST   | /api/auth/login             | Log in user                  |      [ ]      |      [ ]      |

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
