# Confession form site

## Usage

### Backend

The backend is deployed with [Deta](https://deta.sh) with their service: Deta Base.

### Frontend

`npm install && npm start` is used to install dependencies and start the React.js site which listens at `localhost:3000`

## .env

The file .env needs to be configured in order for the program to work.

```env
# File: backend/.env

ADMIN_PASSWORD=admin_cfs_dashboard_password
DETA_PROJECT_ID=deta_project_id
DETA_PROJECT_KEY=deta_project_key
```

```env
# File: frontend/.env

REACT_APP_API_BASE_URL=deta_micro_url_base
```
