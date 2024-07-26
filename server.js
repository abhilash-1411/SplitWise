const express = require('express');
const usersRoutes = require('./User/Routes');

const app = express();
const port = 3001; 

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

// Users routes
app.use('/api/v1/userdb', usersRoutes);


app.listen(port, () => console.log(`App listening on port ${port}`));