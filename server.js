const express = require('express');
const dotenv = require('dotenv');

// Router

const shops = require('./routes/shops');

// Load env vars
dotenv.config({path: './config/config.env'});

const app = express();

// Mouter routers
app.use('/api/v1/shops', shops);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
