const express = require('express');
const cors = require('cors');
const config = require('./config/app.config.js');


// Importing the routes
const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require('./routes/user.routes.js');
const adminRoutes = require('./routes/admin.routes.js');

// Create an express app
const app = express();

// App setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes setup
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', adminRoutes);

// Setting Port
const PORT = process.env.PORT || config.PORT;

// Listen on port
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    }
);