import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import userRoutes from './routes/User';

const app = express();
const dbURI = 'mongodb+srv://everyone:newone23@cluster0.gwytp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
    .connect(dbURI)
    .then(() => {
        console.log('Connected...');
        StartServer();
    })
    .catch(err => {
        console.log(err);
    })


const StartServer = () => {

    http.createServer(app).listen(3001, () => {
        console.log('Server started...');
    })
    
    app.use(express.urlencoded());
    app.use(express.json());

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    app.use('/users', userRoutes);

    app.get('/ping', (req, res, next) => {
        res.status(200).json({message: 'Successful...'});
    })
}