const http = require('http');
const app = require('./app');

const HTTP_PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

process.on('SIGTERM', () => {
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    // db.close((err) => {
    //   if (err) {
    //     return console.error(err.message);
    //   }
    //   console.log('Close the database connection.');
    //   process.exit(0);
    // });
  });
});