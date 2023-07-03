const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoutes');
const errorHandler = require('./utilis/errorHandlers');
const courses = require('./routes/courseRoutes');
const enrolledCourses = require('./routes/enrollmentRoutes');
const config = require('./config');

app.use(express.json());
const url = 'mongodb+srv://enigmaticwolf83:449ec5cdMongo@cluster0.5pwrqbs.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(url).then(()=>{
    console.log('App is connected to database');
}).catch((error)=>{
    console.log("Error connecting to database",error);
});
app.use(cors());
app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use(errorHandler);
app.use('/',courses);
app.use('/',enrolledCourses)
  
app.listen(config.PORT, ()=>{
    console.log(`Server is listening at https://localhost:${config.PORT}`)
});


