// import { setupTracing } from "./tracer";
// setupTracing('example-mysql-server');
import * as http from 'http';
import * as mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'secret'
});

connection.query(
  'CREATE DATABASE IF NOT EXISTS db',
  (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created successfully');
  }
);

const port = process.env.PORT || 3000;

// Creates a server
const server = http.createServer(function(request, response) {
  const body = [];
    request.on('error',
      (err: any) => console.log(err)
    );
    request.on('data',
      (chunk: any) => body.push(chunk)
    );
    request.on('end', () => {
      if (request.url === '/connection/query') {
        connection.query(
          'SELECT * FROM db',
          (err, results) => {
            if (err) {
              console.error('Error querying database:', err);
              response.writeHead(500);
              response.end('internal error');
              return;
            }
            console.log('Query made successfully');
            response.writeHead(200);
            response.end('success');
          }
        );
      } else {
        response.writeHead(404);
        response.end('not found');
      }
    });
});

// Starts the server
server.listen(port, () => {
  console.log(`Node HTTP listening on ${port}`);
});