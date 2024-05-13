const mongoose = require('mongoose');
const config = require('./config')

async function connect() {
    try {
        await mongoose.connect(config.DB.URI);
        
        console.log("Database connected !");
    } catch (error){
        console.log("DB Error", error);
        throw new Error(error);
    }

}

module.exports = connect;

