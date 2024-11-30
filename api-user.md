# API Docs | User

<hr/>

## Login
Role: CUSTOMER & ADMIN

Enpoint : POST /api/users/login

Header :
- content-type: application/json

Request body :
```json
{
  "email": "john@gmail.com",
  "password": "rahasia"
}
```

Response success :
```json
{
  "success": true,
  "message": "berhasil",
  "data": {
    "token": "jifewjofjwijfio"
  }
}
```
Response error :
```json
{
  "success": false,
  "message": "email atau password invalid",
  "data": {}
}
```

<br/><hr/><br/>

## Add User | Register
Role: CUSTOMER

Enpoint : POST /api/users

Header :
- content-type: application/json

Request body :
```json
{
  "nama_depan": "john",
  "nama_belakang": "doe",
  "email": "john@gmail.com",
  "password": "rahasia"
}
```

Response success :
```json
{
  "success": true,
  "message": "berhasil",
  "data": {
    "nama_depan": "john",
    "nama_belakang": "doe",
    "email": "john@gmail.com",
  }
}
```
Response error :
```json
{
  "success": false,
  "message": "input invalid",
  "data": {}
}
```

<br/><hr/><br/>

## Get Detail User
Role: CUSTOMER & ADMIN

Enpoint : GET /api/users/:id

Header :

- authorization: token

Response success :
```json
{
  "success": true,
  "message": "success",
  "data": {
    "id": "joiwurw",
    "first_name": "john",
    "last_name": "doe",
    "email": "john@gmail.com",
    "image_url": "https://gambar.com",
    "phone_number": "1234567i",
    "gender": "laki-laki",
    "birth_date": "26 November 2024",
    "address": {
      "province": "kalimantan selatan",
      "kabupaten": "banjar",
      "kecamatan": "pandan sari"
    }
  }
}
```

Response error :
```json
{
  "success": false,
  "message": "gagal",
  "data": {}
}
```

<br/><hr/><br/>

## Update User
Role: CUSTOMER & ADMIN

Enpoint : PATCH /api/users/:id

Header :
- content-type: form-data
- authorization: token

Request body :
```json
{
  "first_name": "john",
  "last_name": "doe",
  "image": "file",
  "phone_number": "1234567i",
  "gender": "laki-laki",
  "birth_date": "26 November 2024",
  "address": {
    "province": "kalimantan selatan",
    "kabupaten": "banjar",
    "kecamatan": "pandan sari"
  }
}
```

Response success :
```json
{
  "success": true,
  "message": "success",
  "data": {
    "first_name": "john",
    "last_name": "doe",
    "email": "john@gmail.com",
    "image_url": "https://gambar.com",
    "phone_number": "1234567i",
    "gender": "laki-laki",
    "birth_date": "26 November 2024",
    "address": {
      "province": "kalimantan selatan",
      "kabupaten": "banjar",
      "kecamatan": "pandan sari"
    }
  }
}
```

Response error :
```json
{
  "success": false,
  "message": "gagal",
  "data": {}
}
```

<br/><hr/><br/>

## Update Password
Role: CUSTOMER

Enpoint : PATCH /api/users/:id/password 

Header :
- content-type: application/json
- authorization: token

Request body :
```json
{
  "newPassword": "jifoww",
  "oldPassword": "jifwo"
}
```

Response success :
```json
{
  "success": true,
  "message": "success",
  "data": {}
}
```

Response error :
```json
{
  "success": false,
  "message": "gagal",
  "data": {}
}
```

<br/><hr/><br/>

## Get All User
Role: ADMIN

Enpoint : GET /api/users

Header :
- authorization: token

Response success :
```json
{
  "success": true,
  "message": "success",
  "data": [
    {
      "id": "jifowejf",
      "first_name": "samsul",
      "last_name": "samsudin"
    },
    ...
  ]
  
}
```

Response error :
```json
{
  "success": false,
  "message": "gagal",
  "data": {}
}
```