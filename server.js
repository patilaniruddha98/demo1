import express from 'express';
import mongoose from "mongoose"
import dotenv from "dotenv"
import productRouter from './productRouter.js';
import cors from 'cors';
import cert from "./rds-combined-ca-bundle.pem"

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*'
}));

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MNGODB_URL || "mongodb://getmycart:aniruddha@getmycart.cluster-c2jyxsybbctr.ap-south-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false", {
    tlsCAFile: "./rds-combined-ca-bundle.pem",
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("connection sucessful")
}).catch((e) => {
    console.log("not connected", e)
})

app.get("/api/config/paypal", (req, res) => {
    // eslint-disable-next-line no-undef
    res.send(process.env.PAYPAL_CLIENT_ID || "sb")
})


app.use("/api/product", productRouter)

app.get('/', (req, res) => {
    res.send("server is ready");
});
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
    console.log("aniruddha" + process.env.PORT)
});
