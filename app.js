require('dotenv').config();
const express = require('express');
const complianceRoutes = require('./routes/complianceRoutes');

const app = express();
app.use(express.json());


app.use('/api', complianceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
