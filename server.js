const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' })

const mongoURI = 'mongodb://127.0.0.1:27017/jfz'; // Replace with your MongoDB URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



const app = express();

app.use(cors({
  origin: 'http://localhost:4200',  // Your Angular app's origin
  credentials: true
}));

app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected...'))
// .catch(err => console.log(err));

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const seaManagementRoutes = require('./routes/sea-management');
const admin = require('./routes/admin');
const bill = require('./routes/bill');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/sea-management', seaManagementRoutes);
app.use('/api/admin', admin);
app.use('/api/bill', bill);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
