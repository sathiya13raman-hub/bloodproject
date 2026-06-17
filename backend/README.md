# LifeBlood — Django REST Framework Backend

Backend API mapped to your existing MySQL tables: `signin`, `donortable`, `recipienttable`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Create signin account |
| POST | `/api/auth/login/` | Login with mailid + password |
| POST | `/api/auth/token/refresh/` | Refresh JWT tokens |
| GET | `/api/auth/profile/` | Logged-in user + donor/recipient profiles |
| GET | `/api/donors/` | List donors (filter by city, name, phone) |
| POST | `/api/donors/` | Register donor in `donortable` |
| GET | `/api/donors/<id>/` | Donor details |
| GET | `/api/recipients/` | List blood requests |
| POST | `/api/recipients/` | Register recipient request |
| GET | `/api/recipients/<id>/` | Recipient details |

## Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

API base URL: `http://127.0.0.1:8000/api/`

## Example requests

### Register (signin table)

```json
POST /api/auth/register/
{
  "email": "newuser@example.com",
  "password": "mypass123",
  "confirm_password": "mypass123"
}
```

### Login

```json
POST /api/auth/login/
{
  "email": "sathiya13.raman@gmail.com",
  "password": "newline@123"
}
```

### Register donor (donortable)

```json
POST /api/donors/
Authorization: Bearer <access_token>
{
  "name": "vinitha",
  "dob": "2004-01-20",
  "city": "salem",
  "gender": "female",
  "mobile": "8500022333",
  "lastDonatedDate": "2020-01-15",
  "maritalStatus": "unmarried"
}
```

### Register recipient (recipienttable)

```json
POST /api/recipients/
Authorization: Bearer <access_token>
{
  "patientname": "agila",
  "contactnumber": "8884442154",
  "age": 22,
  "gender": "female",
  "unitsreq": "5units",
  "reason": "surgery",
  "location": "coimbatore",
  "hospitalname": "ganga",
  "frequency": "monthly"
}
```

### Search donors

```
GET /api/donors/?location=salem&query=vinitha
```

## ID generation

Matches your SQL logic:

- `userid` → `usr001`, `usr002`, ...
- `donorid` → `dnr001`, `dnr002`, ...
- `recipientid` → `rec001`, `rec002`, ...
