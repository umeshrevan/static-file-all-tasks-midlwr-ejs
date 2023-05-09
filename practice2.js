Copy code
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { message: '' });
});

app.get('/verify-email', (req, res) => {
  res.render('verify-email');
});

app.get('/email-verified', (req, res) => {
  res.render('email-verified');
});

app.post('/verify-email', (req, res) => {
  // Add code to verify the email
  res.render('email-verified', { message: 'Your email has been verified successfully!' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
And here's the index.ejs file:

html
Copy code
<!DOCTYPE html>
<html>
<head>
  <title>Verify Email</title>
</head>
<body>
  <h1>Verify Email</h1>
  <p>If you want to verify your email, click the button below:</p>
  <form method="get" action="/verify-email">
    <button>Verify Email</button>
  </form>
  <p><%= message %></p>
</body>
</html>
And the verify-email.ejs file:

html
Copy code
<!DOCTYPE html>
<html>
<head>
  <title>Verify Email</title>
</head>
<body>
  <h1>Verify Email</h1>
  <p>Your email has been sent a verification link, please check your email and click on the link to verify.</p>
  <form method="post" action="/verify-email">
    <button>Verify Email</button>
  </form>
</body>
</html>
And the email-verified.ejs file:

html
Copy code
<!DOCTYPE html>
<html>
<head>
  <title>Email Verified</title>
</head>
<body>
  <h1>Email Verified</h1>
  <p><%= message %></p>
  <form method="get" action="/">
    <button>Log in</button>
  </form>
</body>
</html>