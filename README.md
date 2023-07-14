# Leitmotiv Academy

A summer school for film enthusiast, and learn and become a yound filmmaker.

### [Live Site Link](https://leitmotiv-academy-client.web.app/)

### Features of this website

1. User authentication with firebase: Login and Registration page.
2. Page routing with React Router.
3. Private (or Protected) routing.
4. REST API endpoint for performing CRUD operation on MongoDB database.
5. Backend with Express and Nodejs.
6. JWT for authenticating users and secure get API endpoint.
7. User role: admin, instuctor, student.
8. Dashboard: role base Dashboard.
9. Stripe payment.

## Launch the project in local server.

Clone the repository

### For client (or front end) side

```bash
cd leitmotiv-academy/leitmotiv-academy-client

npm i

npm run dev
```

#### Note:

- You have to setup firebase web app api keys and put them in a `.env.local` file and name them as in `firebase.config.js`.
- Also VITE_API_URL for backend url.

### For server (or back end) side

```bash
cd leitmotiv-academy/leitmotiv-academy-server

npm i

npm run dev
```

#### Note:

- You have to add an MongoDB username and password in `.env` file as `DB_USER` and `DB_PASS`.
- Add a SECRET_TOKEN for JWT
- And PAYMENT_SECRET_KEY for stipe for payment.
