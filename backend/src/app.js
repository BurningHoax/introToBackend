import express from "express";

const app = express();

app.use(express.json()); //to parse json requests it gets from client side

//routes import
import userRouter from "./routes/user.route.js"; //since we exported it as default in routes.js, we can import with any name



// routes declaration
app.use("/api/v1/users", userRouter);


//example route: htts://localhost:4000/api/v1/users/register


export default app;
