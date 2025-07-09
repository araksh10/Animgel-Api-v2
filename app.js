const express = require("express");
const cors = require("cors"); 
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/index");
const connectDB = require("./config/db");
require("dotenv").config(); 

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
