# InternSphere — Final Full-Stack Build

A polished internship discovery platform inspired by the supplied InternSphere mockup.

## Core features
- Responsive landing page matching the supplied visual direction
- Working Sign in / Sign up / Sign out
- Student, Recruiter and Admin roles
- Admin can publish internships
- Recruiters can publish internships
- Required internship form fields and server-side validation
- Student applications
- MongoDB Atlas
- JWT + bcrypt authentication
- Live internship updates through Socket.IO
- External internship ingestion architecture
- AICTE adapter (disabled by default until permitted access/feed is confirmed)
- Scheduled external sync using node-cron
- Postman collection

## Roles
### Student
Browse, search, view, save/apply and track applications.

### Recruiter
Create company profile and publish/manage internship listings.

### Admin
Manage platform listings and publish internships. Admin registration requires `ADMIN_SIGNUP_KEY` so arbitrary visitors cannot create admin accounts.

## Run locally
### 1. Client
```powershell
cd client
npm install
npm run dev
```

### 2. Server
```powershell
cd server
npm install
copy .env.example .env
npm run dev
```

### 3. MongoDB Atlas
Put your Atlas connection string in `server/.env`.

## External data
The AICTE portal currently publishes internship listings publicly. The project includes an ingestion adapter, but it is intentionally OFF by default. Before enabling automated fetching from AICTE or another third-party site, confirm current terms, robots rules, and/or an official API/feed. Prefer an official feed where available.

Set:
`ENABLE_EXTERNAL_INGEST=true`

and configure the permitted source URL. The sync job can run periodically and upsert listings by `externalId`.

## Production
Recommended:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Custom domain: optional

Set production environment variables on the hosting providers. Never commit `.env`.
