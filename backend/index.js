import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from './model/user.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;


async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}

connectDB();

app.get('/', (req, res) => {
    res.send('Hello, Node.js!');
});

app.post('/signup', async function (req,res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const mobileNumber= req.body.mobileNumber;
    const fullName =req.body.fullName;



    await UserModel.create({
        email : email,
        mobileNumber:mobileNumber,
        password : password,
        username : username,
        fullName:fullName
    });
    res.json({
        message: "You are signed up"
    })
});

app.post('/login', async function (req,res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
        password: password
    });

    if (user) {
        const token = jwt.sign({
            id: user._id.toString()
        },JWT_SECRET)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
