import express from "express";
import 'dotenv/config.js';
import cors from 'cors';
import studentRoutes from "./routes/studentRoutes.js";


const app = express();
app.use(cors());


app.use(express.json());


app.use((req, res, next) =>{
    console.log(req.path, req.method);
    next();
})


try{
    app.listen(process.env.PORT || 4000,() =>{
        console.log(`Student Profile Listening to port ${process.env.PORT || 4000}...`);
    })
}catch(e){
    console.log(e);
}

app.use('/api/students', studentRoutes);


app.use((req, res) =>{
    res.status(404).json({success: false, message: 'No such endpoint exists'});
});