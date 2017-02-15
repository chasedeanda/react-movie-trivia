import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use('/', express.static('public'));

app.listen(process.env.PORT || 8000);