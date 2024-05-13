const express = require('express');
require('dotenv').config(); 

const axios = require('axios');
const  routes =  require('./routes/index');
const cheerio = require('cheerio');
const config = require('./config/config.js')
const Database = require('./config/database.js')
const cors = require('cors')

const app = express();

async function main() {
  try {
    app.use(express.json());
    app.use(cors({
      origin:process.env.URL_FRONTEND 
    }));
    app.use('/api', routes)
    await Database();

    app.listen(config.PORT, () => {
      console.log(`App on ${config.PORT}`);
  });
  
  } catch (error) {
    console.log("error when starting the application:", error)
  }
}

main()

