# API Docs | Booking

<hr/>

## Add Booking | Pembayaran
Role: CUSTOMER

Enpoint : POST /api/bookings

Header :
- content-type: application/json
- authorization: token

Request body : 
```json
{
  "id_lapang": "jiewo",
  "tanggal": "29-11-2024",
  "jam": "20",
  "metode_pembayaran": "bayar_lokasi"
}
```

Response sucess :
```json
{
  "success": true,
  "message": "booking berhasil",
  "data": {
    "booking_id": "jifw",
    "field_id": "jifeow",
    "booking_time": "27 November 2024",
    "play_time": "20-21 WIB 29 November 2024"
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

## Get User's Booking

Role: CUSTOMER

Endpoint : GET /api/users/:id/booking

Header :

- authorization: token

Params :
- status?: active/passed
- field?: field_id
- order?: asc/desc
- page?: 3
- limit?: 10

Response success : 
```json
{
  "success": true,
  "message": "success",
  "data": [
    {
      "id": "jifwofwo",
      "status": "active",
      "field_name": "lapang a",
      "date": "19 November 2024",
      "time": "14-15",
      "field_img_url": "https://gambar.com/jifw"
    },
    {
      "id": "jifwofwo",
      "status": "active",
      "field_name": "lapang a",
      "date": "19 November 2024",
      "time": "14-15",
      "field_img_url": "https://gambar.com/jifw"
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

<br/><hr/><br/>

## Get Detail Booking
Role: CUSTOMER & ADMIN

Enpoint : GET /api/bookings/:id

Header :
- authorization: token

Response success :
```json
{
  "success": true,
  "message": "success",
  "data": {
    "id": "jiowrwo",
    "status": "active",
    "booking_date": "17 November 2024",
    "play_date": "20 November 2024",
    "play_time": "09-10 WIB",
    "field": {
      "id": "jifow",
      "nama": "lapang a",
      "lokasi": "outdoor",
      "img_url": "https://gambar.com",
      "harga": 100000
    },
    "payment_method": "bayar langsung"
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

## Get All Booking
Role : ADMIN

Enpoint : GET /api/bookings

Header :
- authorization: token

Params :
- play_date?
- create_date?
- status?
- payment_method?
- page?
- limit?

Response success :
```json
{
  "success": true,
  "message": "success",
  "data": [
    {
      "id": "jifwofwo",
      "customer_id": "jifow",
      "status": "active",
      "field_name": "lapang a",
      "booking_date": "14 November 2024"
      "date": "19 November 2024",
      "time": "14-15",
      "field_img_url": "https://gambar.com/jifw"
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

<br/><hr/><br/>

## Update Status Booking
Role: ADMIN

Enpoint : PATCH /api/bookings/:id/status

Header :
- authorization: token
- content-type: application/json

Request body :
```json
{
  "status": "active"
}
```

Response success :
```json
{
  "success": true,
  "message": "gagal",
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