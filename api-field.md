# API Docs | Field

<hr/>

## Get Field
Role: CUSTOMER & ADMIN

Enpoint : GET /api/fields

Header :
- authorization: token

Response success :
```json
{
  "success": true,
  "message": "berhasil mendapatkan list lapang",
  "data": [
    {
      "id": "jifowjfw",
      "nama": "Lapang A",
      "img_url": "https://gambar.com",
      "lokasi": "indoor",
      "harga": 70000
    },
    {
      "id": "jifowjfw",
      "nama": "Lapang A",
      "img_url": "https://gambar.com",
      "lokasi": "indoor",
      "harga": 70000
    },
    ...
  ]
}
```
Response error :
```json
{
  "success": false,
  "message": "gagal mendapat list lapang",
  "data": {}
}
```

<br/><hr/><br/>

## Get Detail Field
Role: CUSTOMER & ADMIN

Enpoint : GET /api/fields/:id

Header :
- authorization: token

Response success :
```json
{
  "success": true,
  "message": "berhasil",
  "data": {
    "id": "jifewjo23i",
    "nama": "Lapang B",
    "img_url": ["https://gambar.com/1", "https://gambar.com/2", "https://gambar.com/3"],
    "harga": 100000,
    "lokasi:": "outdoor",
    "jenis_lantai": "vinyl",
    "fasilitas": ["bangku", "jaring", "scoring board"]
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

## Update Field
Role: ADMIN

Enpoint : PATCH /api/fields/:id

Header :
- authorization: token
- content-type: form-data

Request body :
```json
{
  "nama": "Lapang B",
  "img": [image1, image2, image3],
  "harga": 100000,
  "lokasi:": "outdoor",
  "jenis_lantai": "vinyl",
  "fasilitas": ["bangku", "jaring", "scoring board"]
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