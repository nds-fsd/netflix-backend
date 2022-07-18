const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL;
const { MongoMemoryServer } = require('mongodb-memory-server');
const { User } = require('../mongo/schemas/user');



let mongod = null;

const connectDB = async () => {
    try {
        let dbUrl = `mongodb+srv://${DATABASE_URL}/?retryWrites=true&w=majority`;
        if (process.env.NODE_ENV === 'test') {
            mongod = await MongoMemoryServer.create();
            dbUrl = mongod.getUri();
        }

        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        if (process.env.NODE_ENV !== 'test') {
            console.log('Connected to database');
            console.log('🕰️...Searching for ADMIN user...')
        }

        const admin = await User.findOne({ role: "ADMIN" });
        if (!admin) {
            if (process.env.NODE_ENV !== 'test') {
                console.log('💿 [DATABASE] ADMIN user not found, creating one....');
            }

            const admin = new User({
                email: 'admin@fakeflix.com',
                password: 'nuclioFakeflix',
                name: "Admin",
                role: "ADMIN"
            });

            await admin.save();
            if (process.env.NODE_ENV !== 'test') {
                console.log("💿 [DATABASE] ADMIN user created!: ", admin.email);
            }
        } else {
            if (process.env.NODE_ENV !== 'test') {
                console.log("💿 [DATABASE] ADMIN user exists: ", admin.email);
            }
        }



    }
    catch (err) {
        console.log(err);
    }
}

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        if (mongod) {
            await mongod.stop();
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = { connectDB, disconnectDB };