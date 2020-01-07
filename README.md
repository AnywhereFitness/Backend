# Anywhere Fitness Backend

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