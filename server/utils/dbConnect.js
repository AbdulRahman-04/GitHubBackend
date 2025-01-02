import mongoose from "mongoose"
import config from "config"

async function dbConnect() {

    try {

        await mongoose.connect(config.get("DB_URL"))
        console.log(`DATABASE CONNECTED SUCCESSFULLY!✅`);
        
        
    } catch (error) {
        console.log(error);
    }
    
}

dbConnect()