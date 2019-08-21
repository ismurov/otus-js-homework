require("dotenv").config();

const cors = require('cors');
const express = require('express');
const graphlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./graphql/schema');


// Options
const port = process.env.PORT || "4000";
const db = process.env.mongoURI;


// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    db,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


// Configure Express Server
const app = express();

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/graphql', graphlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}/graphql/`);
});

