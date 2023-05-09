// const http = require('http');
// const fs = require('fs');

// const usersFile = 'users.json';

// const server = http.createServer((req, res) => {
//   if (req.url === '/users' && req.method === 'POST') {
//     let body = '';
//     req.on('data', chunk => {
//       body += chunk.toString();
//     });
//     req.on('end', () => {
//       try {
//         const data = JSON.parse(body);
//         const users = getUsers();
//         const usernameExists = users.some(user => user.username === data.username);
//         const emailExists = users.some(user => user.email === data.email);
//         if (usernameExists) {
//           res.statusCode = 400;
//           res.end('Username already exists');
//         } else if (emailExists) {
//           res.statusCode = 400;
//           res.end('Email already exists');
//         } else {
//           users.push(data);
//           saveUsers(users);
//           res.end('User added successfully');
//         }
//       } catch (error) {
//         res.statusCode = 400;
//         res.end('Invalid JSON data');
//       }
//     });
//   } else {
//     res.statusCode = 404;
//     res.end('Not found');
//   }
// });

// function getUsers() {
//   try {
//     const data = fs.readFileSync(usersFile);
//     return JSON.parse(data);
//   } catch (error) {
//     return [];
//   }
// }

// function saveUsers(users) {
//   const data = JSON.stringify(users);
//   fs.writeFileSync(usersFile, data);
// }

// const port = 3000;
// server.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

const http = require('http');
const fs = require('fs');

const users = require('./users.json'); // Load the JSON file

const API_KEY = 'my-api-key'; // Define the API key

// Create a function to serve the JSON file
const serveUsers = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users));
}

// Create a middleware to check for the API key
const checkAPIKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key']; // Get the API key from the header
  if (apiKey === API_KEY) {
    next(); // Pass the request to the next middleware or the route handler
  } else {
    res.statusCode = 401; // Unauthorized status code
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid API key');
  }
}

// Create the HTTP server and define the routes
const server = http.createServer((req, res) => {
  if (req.url === '/users') {
    checkAPIKey(req, res, () => {
      serveUsers(req, res);
    });
  } else {
    res.statusCode = 404; // Not found status code
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page not found');
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});