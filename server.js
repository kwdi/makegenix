const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error')
const colors = require('colors');
const fileupload = require('express-fileupload')

// Load env vars
dotenv.config({path: './config/config.env'});

// Connect to database
connectDB();

// Router
const stores = require('./routes/stores');
const products = require('./routes/products');


const app = express();

// Body parser
app.use(express.json());

// Dev logger middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// File upload
app.use(fileupload());

app.use(express.static(path.join(__dirname, 'public')));

// Mouter routers
app.use('/api/v1/stores', stores);
app.use('/api/v1/products', products);

app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)

    );

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`.red);
    //Close server & exit process
    server.close (() => process.exit(1));
})

