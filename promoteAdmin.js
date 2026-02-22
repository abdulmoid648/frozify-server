const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const promoteAdmin = async () => {
    const email = process.argv[2];

    if (!email) {
        console.error('Please provide an email address: node promoteAdmin.js <email>');
        process.exit(1);
    }

    try {
        // Connect to Database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB...');

        const user = await User.findOne({ email });

        if (!user) {
            console.error('User not found');
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();

        console.log(`User ${user.username} (${user.email}) has been promoted to admin!`);
        process.exit();
    } catch (err) {
        console.error('Error promoting user:', err.message);
        process.exit(1);
    }
};

promoteAdmin();
