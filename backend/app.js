const express = require('express');
const app = express();
const sequelize = require ('./util/database');

const cors = require("cors");
const Expense = require ('./models/expense');

const adminRoutes = require('./routes/admin');
app.use(express.json());


app.use(cors());

app.use('/expenses', adminRoutes);

Expense.sync();
sequelize
.sync()
.then((result) => {
   app.listen(3000)
}).catch((err) => {
    console.log(err)
});


