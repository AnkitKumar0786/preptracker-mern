const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const authRoutes = require('./routes/auth.route');
const problemRoutes = require('./routes/problem.route');
const analyticsRoutes = require('./routes/analytics.route');
const noteRoutes = require('./routes/note.route');
const goalRoutes = require('./routes/goal.route')
const aiRoutes = require('./routes/ai.route')

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRoutes);
app.use('/api/problem',problemRoutes);
app.use('/api/analytics',analyticsRoutes);
app.use('/api/note',noteRoutes)
app.use('/api/goal',goalRoutes)
app.use('/api/ai',aiRoutes);


module.exports = app;