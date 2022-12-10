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
---

## Post Route `/category`

---

### Add Post

### `/post/add`

#### POST

`http://localhost:8000/post/add`

In this image isnot used, will be using in a while, now it is left as a empty

Request

```json
{
"title":"Title 1",
"body":"body content goes here in an textfield",
"categoryId":"3",
"image": "https://i.picsum.photos/id/376/536/354.jpg?hmac=FY3pGZTc81LYCnJOB0PiRX570QylTn7xchj6FZA6TeQ",
"userId":"4"
}
```

Response

```json
{
"message": "Post created successfully",
"data": {
	"id": 1,
	"title": "Title 1",
	"body": "body content goes here in an textfield",
	"categoryId": "3",
	"image": "https://i.picsum.photos/id/376/536/354.jpg?hmac=FY3pGZTc81LYCnJOB0PiRX570QylTn7xchj6FZA6TeQ",
	"userId": "4",
	"updatedAt": "2022-11-30T15:18:35.308Z",
	"createdAt": "2022-11-30T15:18:35.308Z"
	}

}
```

### Delete Post 

### `/post/delete/:id`

### DELETE

Request

`http://localhost:8000/post/delete/1`

Response

```json
{
"message": "Post deleted successfully",
"data": 1
}
```


### Get all posts

### `/post/get`

### GET

`http://localhost:8000/post/get/`

Response

```json
{
"message": "Posts found successfully",
"data": [
{
"id": 2,
"title": "Title 1",
"body": "body content goes here in an textfield",
"image": "https://i.picsum.photos/id/376/536/354.jpg?hmac=FY3pGZTc81LYCnJOB0PiRX570QylTn7xchj6FZA6TeQ",
"categoryId": 3,
"userId": 4,
"createdAt": "2022-11-30T15:20:08.000Z",
"updatedAt": "2022-11-30T15:20:08.000Z"
},
{
"id": 5,
"title": "Title 1",
"body": "body content goes here in an textfield",
"image": "https://i.picsum.photos/id/376/536/354.jpg?hmac=FY3pGZTc81LYCnJOB0PiRX570QylTn7xchj6FZA6TeQ",
"categoryId": 3,
"userId": 4,
"createdAt": "2022-11-30T15:20:13.000Z",
"updatedAt": "2022-11-30T15:20:13.000Z"
},
{
"id": 6,
"title": "Title 1",
"body": "body content goes here in an textfield",
"image": "https://i.picsum.photos/id/376/536/354.jpg?hmac=FY3pGZTc81LYCnJOB0PiRX570QylTn7xchj6FZA6TeQ",
"categoryId": 3,
"userId": 4,
"createdAt": "2022-11-30T15:20:14.000Z",
"updatedAt": "2022-11-30T15:20:14.000Z"
}
]
}
```
### Get posts with limit

### `/post/get/limit/:limit`

### GET

`http://localhost:8000/post/get/limit/2`

Response

```json
{
"message": "Posts found successfully",
"data": [
{
"id": 2,
"title": "Title 1",
"body": "body content goes here in an textfield",
"image": "https://i.picsum.photos/id/376/536/354.jpg?hmac=FY3pGZTc81LYCnJOB0PiRX570QylTn7xchj6FZA6TeQ",
"categoryId": 3,
"userId": 4,
"createdAt": "2022-11-30T15:20:08.000Z",
"updatedAt": "2022-11-30T15:20:08.000Z"
},
{
"id": 5,
"title": "Title updated",
"body": "updated body content goes here in an textfield",
"image": "https://i.picsum.photos/id/376/536/354.jpg?hmac=FY3pGZTc81LYCnJOB0PiRX570QylTn7xchj6FZA6TeQ",
"categoryId": 3,
"userId": 4,
"createdAt": "2022-11-30T15:20:13.000Z",
"updatedAt": "2022-11-30T15:33:20.000Z"
}
]
}
```


### Get post by id

### `/post/get/:id`

### GET

`http://localhost:8000/post/get/5`

Response

```json
{
"message": "Post found successfully",
"data": {
"id": 5,
"title": "Title 1",
"body": "body content goes here in an textfield",
"image": "https://i.picsum.photos/id/376/536/354.jpg?hmac=FY3pGZTc81LYCnJOB0PiRX570QylTn7xchj6FZA6TeQ",
"categoryId": 3,
"userId": 4,
"createdAt": "2022-11-30T15:20:13.000Z",
"updatedAt": "2022-11-30T15:20:13.000Z"
}
}
```


### Update Post

### `/post/update/:id`

### PUT

`http://localhost:8000/post/update/5`

Request

```json
{
"title":"Title updated",
"body":"updated body content goes here in an textfield",
"categoryId":"3",
"userId":"4"
}
```

Response

```json
{
"message": "Post updated successfully",
"data": [
1
]
}
```


---

## Comment Route `/comment`

---

### Add Comment

### `/comment/add`

#### POST

`http://localhost:8000/comment/add`

Request

```json
{
"content": "this is a content of comment",
"userId": "4",
"postId": "2"
}
```

Response

```json
{
"message": "Comment created successfully",
"data": {
"id": 3,
"content": "this is a content of comment",
"userId": "4",
"postId": "2",
"updatedAt": "2022-11-30T15:50:42.104Z",
"createdAt": "2022-11-30T15:50:42.104Z"
}
}
```

### Delete Comment

### `/comment/delete/:id`

### DELETE

Request

`http://localhost:8000/comment/delete/3`

Response

```json
{
"message": "Comment deleted successfully",
"data": 1
}
```


### Update Comment

### `/comment/update/:id`

### PUT

`http://localhost:8000/comment/update/5`

Request

```json
{
"userId": 4,
"postId": 2,
"content": "this is updated content"
}
```

Response

```json
{
"message": "Comment updated successfully",
"data": [
1
]
}
```


