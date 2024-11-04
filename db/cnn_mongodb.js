import mongoose from 'mongoose';

let isConnected = false;

const conectarMongoDB = async () =>{
    if(isConnected){
        console.log('Ya esta conectado a la base de datos'.green);
        return;
    }

    try{
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log('Conectado a la base de datos'.green);
    }catch(error){
        console.log('Error al conectar'.red)
    }
}

const db =mongoose.connection;

db.on('error', (error) => {
    isConnected = false;
    console.log('Error al conectar'.red)
})

db.once('open', () => {
    isConnected = true;
})

db.on('disconnected', () => {
    isConnected = false;
    console.log('Desconectado de la base de datos'.yellow)
})

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Desconectado de la base de datos'.yellow)
    process.exit(0);
})

export {conectarMongoDB, isConnected};