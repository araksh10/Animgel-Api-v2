const express = require("express");
const cors = require("cors"); 
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/index");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authGuard = require("./utils/helpers");
require("dotenv").config(); 

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
    "/graphql",
    // graphqlHTTP({
    //     schema,
    //     graphiql: true,
    // }),
    graphqlHTTP((req, res) => {
        let user = null;

        try {
            user = authGuard(req);
        } catch (err) {
            if (process.env.NODE_ENV !== "production") {
                user = null;
            } else {
                throw err.message;
            }
        }

        return {
            schema,
            graphiql: true,
            context: {
                req,
                res,
                user,
            },
        };
    })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
