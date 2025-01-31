require('dotenv').config();
const mongoose = require("mongoose");

const connectToMongoDB = async () => {
    try {
        const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
        
        if (!DB_USERNAME || !DB_PASSWORD || !DB_NAME) {
            throw new Error("Missing required environment variables");
        }

        const encodedPassword = encodeURIComponent(DB_PASSWORD);
        const mongoURI = `mongodb+srv://${DB_USERNAME}:${encodedPassword}@cluster0.un7knal.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true
        });
        
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectToMongoDB;
