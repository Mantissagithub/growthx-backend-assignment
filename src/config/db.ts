import mongoose from 'mongoose';

const connectDB = async() => {
    try{
        const mongo_uri = process.env.MONGODB_URI || ' ';
        if(!mongo_uri){
            throw new Error("Database url is not found in environment variables");
        }

        await mongoose.connect(mongo_uri, {
            // useNewUrlParser : true,
            // useUnifiedTopology : true
        });

        console.log("MongoDB connected successfully.");
    }catch(err){
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
};

export default connectDB;