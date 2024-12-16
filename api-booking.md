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
- status?: active/passed/pending
- field_id?: field_id
- order?: asc/desc
- page: 3
- limit: 10

Response success : 
```json
{
  "success": true,
  "message": "success",
  "data": [
    {
      "id": "jifwofwo",
      "status": "active",
      "play_time": "date",
      "field": {
        "id": "jifowjf",
        "name": "Lapang B",
        "img_url": [
          "https://gamba",
          "https://gamba",
          "https://gamba",
        ]
      }
    },
    {
      "id": "jifwofwo",
      "status": "active",
      "play_time": "date",
      "field": {
        "id": "jifowjf",
        "name": "Lapang B",
        "img_url": [
          "https://gamba",
          "https://gamba",
          "https://gamba",
        ]
      }
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
    "play_time": "date time",
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
- status?: active/passed/pending
- page: 2
- limit: 3

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
      "booking_date": "14 November 2024",
      "play_time": "date time",
      "field": {
        "name": "lapang",
        "img_url": [
          "https://gambar.com/jifw",
          "https://gambar.com/jifw",
          "https://gambar.com/jifw",
        ]
      }
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

<hr />

## Get Schedule
Role: ADMIN | CUSTOMER

Enpoint : GET /api/bookings/schedule

Header :
- authorization: token

Params : 
- date: ISO Date
- field_id: string


Response success :
```json
{
  "success": true,
  "message": "gagal",
  "data": [
    {
      "hour": 8,
      "booked": false
    },
    {
      "hour": 9,
      "booked": false
    },
    {
      "hour": 10,
      "booked": true
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