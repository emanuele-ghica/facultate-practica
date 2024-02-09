const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exams');
const port = 3000;
const app = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    originSuccessStatus: 200,
    credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
