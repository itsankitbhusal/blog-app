# **API DOCUMENTATION**

Rest API in Node js using Express, Sequelize. Implementation of various technologies such as jwt, google oAuth2, etc.

---

## User Route `/Auth`  

---

Auth route `API` using `JWT`

### `Auth/register`

#### POST
`http://localhost:8000/auth/register`

Data needs to be provided in body in a json format

```json
{
"firstName": "'ankit",
"lastName": "bhusal",
"email": "ankitbhusal@gmail.com",
"password": "ankitbhusal20"
}
```

Response:

```json
{
"message": "User created successfully",
"data": {
		"id": 9,
		"firstName": "'ankit",
		"lastName": "bhusal",
		"email": "ankitbhusal@gmail.com",
		"updatedAt": "2022-11-26T07:56:08.028Z",
		"createdAt": "2022-11-26T07:56:08.028Z"
	}
}
```

### `Auth/Login`

#### POST
`http://localhost:8000/auth/login`

Data needs to be provided in body in a json format

```json
{
"email": "ankitbhusal95@gmail.com",
"password": "ankitbhusal20"
}
```


Response

```json
{
"message": "User logged in successfully",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmtpdGJodXNhbDk1QGdtYWlsLmNvbSIsImlhdCI6MTY2OTQ1MDI4MiwiZXhwIjoxNjY5NTM2NjgyfQ.YbmWUnd6KUwGseZPeTvY0zW-DwVIMvIeZCNlg8y4qfo"

}
```


### `Auth/Delete`

#### DELETE

Provide id as a url parameter and token in header

`http://localhost:8000/auth/delete/1`

Response

```json
{
"message": "User deleted successfully"
}
```


### `Auth/Update`

#### PUT

Provide token in headers and  fields in body 

`http://localhost:8000/auth/update/3`

```json
{
"firstName": "Ankit",
"lastName": "Bhusal"

}
```


Response
```json
{
"message": "User updated successfully"
}
```



## Google Auth
### `Auth/google`

hit in `auth/google` endpoint and it will create user in databse with google cardinals but <mark>password field will be null</mark> in the database. After  successful login we will have response as below

`http://localhost:8000/auth/google`

Response
```json
{
  "user": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiYW5raXRiaHVzYWw1OUBnbWFpbC5jb20iLCJpYXQiOjE2Njk2NTA4OTgsImV4cCI6MTY2OTY1NDQ5OH0.JYZ3qYeycREHwwi1SFfMy3sd3p7qrp_huaWfcub4tZk",
    "firstName": "Your",
    "lastName": "Favourite",
	"email": "ankitbhusal59@gmail.com"
  }
}
```


---

## Category Route `/category`
---

### Add category

### `/category/add`

#### POST

`http://localhost:8000/category/add`

Request

```json
{
"name": "tech"
}
```

Response

```json
{
"message": "Category created successfully",
"data": {
	"id": 1,
	"name": "tech",
	"updatedAt": "2022-11-29T14:11:19.759Z",
	"createdAt": "2022-11-29T14:11:19.759Z"
	}
}
```


### Delete Category

### `/category/delete/:id`

### DELETE

Request

`http://localhost:8000/category/delete/1`

Response

```json
{
"message": "Category deleted successfully",
"data": 1
}
```

### Get single category

### `/category/get/:id`

### GET

`http://localhost:8000/category/get/2`

Response

```json
{
"message": "Category found successfully",
	"data": {
	"id": 2,
	"name": "tech",
	"createdAt": "2022-11-29T14:16:50.000Z",
	"updatedAt": "2022-11-29T14:16:50.000Z"
	}
}
```


### Get all categories

### `/category/get`

### GET

`http://localhost:8000/category/get/`

Response

```json
{
"message": "Categories found successfully",
"data": [
	{
		"id": 2,
		"name": "tech",
		"createdAt": "2022-11-29T14:16:50.000Z",
		"updatedAt": "2022-11-29T14:16:50.000Z"
	},
	{
		"id": 3,
		"name": "stack",
		"createdAt": "2022-11-29T14:16:57.000Z",
		"updatedAt": "2022-11-29T14:16:57.000Z"
	},
	{
		"id": 4,
		"name": "programming",
		"createdAt": "2022-11-29T14:17:07.000Z",
		"updatedAt": "2022-11-29T14:17:07.000Z"
	}
]
}
```


### Update Category

### `/category/update/:id`

### PUT

`http://localhost:8000/category/update/2`

Request

```json
{
"name": "updated"
}
```

Response

```json
{
"message": "Category updated successfully",
"data": [
		1
	]

}
```

