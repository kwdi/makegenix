const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error')
const colors = require('colors');
const fileupload = require('express-fileupload')
const cookieParser =  require('cookie-parser');

// Load env vars
dotenv.config({path: './config/config.env'});

// Connect to database
connectDB();

// Router
const stores = require('./routes/stores');
const products = require('./routes/products');
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();

// Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

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
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);


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

