import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from './routes/auth.route'
const PORT = 5002;
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],credentials:true
  })
);
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes 
app.use("/auth",authRouter)



app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
