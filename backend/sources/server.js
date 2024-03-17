/* eslint-disable max-len */
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./database/connection');
require('dotenv').config();
const loginRoutes = require('./routes/login');
const getCountRoutes = require('./routes/adminHome');
const productRoutes = require('./routes/adminProducts');
const userRoutes = require('./routes/adminUser');
const userProduct = require('./routes/userProducts');
const cors = require('cors');
const corsConfig = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// express app
const app = express();
const port = process.env.PORT || 3000;

// cors
app.use(cors(corsConfig));

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve images from the 'upload' directory
app.use('/images', express.static('sources/upload/'));
// routes
app.use('/api/auth/', loginRoutes);
app.use('/api/endpoint/home', getCountRoutes);
app.use('/api/endpoint/products', productRoutes);
app.use('/api/endpoint/users', userRoutes);
app.use('/api/endpoint/', userProduct);

// conect mongodb
connectDB();

// app listen port
app.listen(port, () => {
  console.log(`server up and running on: http://localhost:${port}`);
});
