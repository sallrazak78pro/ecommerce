const express =require('express');
const mongoose = require('mongoose');
const morgan =require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const expressValidator = require('express-validator')
require('dotenv').config();


//import 
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')
const categoryRoutes= require('./routes/category')
const productRoutes= require('./routes/product')

//app
const app=express();

//middlewares
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
app.use(expressValidator())


//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true 
}).then(()=>{
    console.log('DB connected');
})

//route
app.use('/api',authRoutes);

app.use('/api',userRoutes)

app.use('/api',categoryRoutes)

app.use('/api',productRoutes)


const port=process.env.PORT || 8000 ;

app.listen(8000,()=>{
    console.log(`Server is running on port ${port}`);
})