import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import RegisterationRoutes from "./Routes/RegisterationRoute.js";
import connectDB from "./config/MongooseConnection.js";
import StripeCheckout from "./Routes/StripeCheckoutRoute.js";
import paymentHistoryRoutes from "./Routes/paymentHistoryRoute.js";

configDotenv();
const app = express()
app.use(express.json())
app.use(cors())

app.use('/auth', RegisterationRoutes);
app.use('/checkout', StripeCheckout);
app.use('/payment/history', paymentHistoryRoutes);

app.use('*', (req, res) => {
    res.status(200).json({
        status: "server started"
    })
})

const PORT = process.env.PORT || 8080

connectDB().then(()=>{
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})