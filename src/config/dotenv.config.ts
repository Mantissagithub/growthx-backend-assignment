import dotenv from "dotenv";

const loadEnvCongifMongoDB = () => {
    const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
    dotenv.config({path : envFile});

    if(!process.env.MONGODB_URI){
        console.warn(`Warning : MONGODB_URI is not set in ${envFile}`);
    }
};

export default loadEnvCongifMongoDB;