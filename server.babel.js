import express from 'express';
import path from 'path';

const app = express();

app.use('/', express.static('public'));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(process.env.PORT || 8000);