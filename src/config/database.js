const mongoose = require('mongoose');

const createConnecton = connectionString => {

    mongoose.connect(connectionString);

    mongoose.connection.on('connected', () => console.log('MongoDB connected'));
    mongoose.connection.on('disconnect', () => console.log('MongoDB disconnected'));

    process.on('SIGINT', () => {
        mongoose.connection.close().then(() => {
            console.log('MongoDB disconnected');   
            process.exit(0);
        });
    });
}

module.exports = createConnecton;