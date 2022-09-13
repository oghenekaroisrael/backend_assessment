
# Assessment for  the Part-time Full-Stack Software Engineer role at stealth intech startup


## Authors

- [@oghenekaroisrael](https://www.github.com/oghenekaroisrael)
## Run Locally

Clone the project

```bash
  git clone https://github.com/oghenekaroisrael/assessment_backend
```

Go to the project directory

```bash
  cd assessment_backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## API Reference

#### Create A New User

```http
  POST /api/users/create
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | **Required** first name of user |
| `lastName` | `string` | **Required** last name of user |
| `userId` | `guid` |Not Required  - user id has a default generated |
| `accountId` | `guid` | Not Required  - user id has a default generated |


#### Update An Existing User

```http
  POST /api/users/create
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | **Required** first name of user |
| `lastName` | `string` | **Required** last name of user |
| `userId` | `guid` |**Required**  - user id of the user to edit |


#### Delete An Existing User

```http
  POST /api/users/create
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | **Required** first name of user |
| `lastName` | `string` | **Required** last name of user |
| `userId` | `guid` |**Required**  - user id of the user to edit |


#### Get A User By Id

```http
  GET /api/users/user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `guid` | **Required**. Id of user to fetch |

#### add(num1, num2)

#### Get All Users

```http
  GET /api/users/
```


