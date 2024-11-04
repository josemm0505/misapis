import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js';
import * as db from '../db/cnn_mongodb.js';

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.generalRoute = '/api/';

        this.conectarMongoDB();

        this.middlewares();
        this.routes();
    }

    async conectarMongoDB(){
        if(!db.isConnected){
            await db.conectarMongoDB();
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        //localhost:3000/api/ejemplo
        this.app.use(this.generalRoute, indexRoutes);
        this.app.use('**',(req, res)=>{
            res.status(404).json({
                message: 'Endpoint Not Found'
            })
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port`, `${this.port}`.yellow);
        });
    }
}