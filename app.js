require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const cors = require('cors');



const connectDB = require('./db/connect')
const productsRouter = require('./routes/products');

const notFoundMiddleWare = require('./middleware/not-found');
const errorMiddleWare = require('./middleware/error-handler');

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/products',productsRouter);

// products route
app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

const port = 3100;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
};

start();
