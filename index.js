import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import RegisterationRoutes from "./Routes/RegisterationRoute.js";
import connectDB from "./config/MongooseConnection.js";
import StripeCheckout from "./Routes/StripeCheckoutRoute.js";

configDotenv();
const app = express()
app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))

app.use('/auth', RegisterationRoutes);
app.use('/checkout', StripeCheckout);

const PORT = process.env.PORT || 8080

connectDB().then(()=>{
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})