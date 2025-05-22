const express = require('express');
const Datastore = require('@seald-io/nedb');

const app = express();
const port = Number(process.env.PORT || 3000);
const server = app.listen(port);

const dbOptions = {
  filename: 'database.db'
};
const database = new Datastore(dbOptions);

console.log(`Server is listening on port ${port}`);

database.loadDatabase();

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post('/wish', (request, response) => {
  console.log("POST Request Received");
  const data = request.body;
  console.log(data);

  const timestamp = Date.now();
  data.timestamp = timestamp;
    
  database.insert(data);
  response.json({
    status: 'success',
    wish: data.wish,
    timestamp: data.timestamp
  });
});

app.get('/wish', (request, response) => {
  database.find({}, (error, data) => {
    if (error) {
      response.end();
      return;
    }
    response.json(data);
  })
});
