const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoutes');
const errorHandler = require('./utilis/errorHandlers');
const courses = require('./routes/courseRoutes');
// const enrolledCourses = require('./routes/enrollmentRoutes');
const config = require('./config');
// const cabRoute = require('./routes/userRoutes');
app.use(express.json());
const url = 'mongodb+srv://enigmaticwolf83:449ec5cdMongo@cluster0.5pwrqbs.mongodb.net/?retryWrites=true&w=majority';



app.use(cors({
    origin: 'https://codinggninjas.onrender.com'
}));
app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use(errorHandler);
app.use('/',courses);
// app.use('/',enrolledCourses)
// app.use('/',cabRoute);
  
app.listen(config.PORT, ()=>{
    mongoose.connect(url, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(()=>{
        console.log('App is connected to database');
    }).catch((error)=>{
        console.log("Error connecting to database",error);
    });
    console.log(`Server is listening at https://localhost:${config.PORT}`)
});


