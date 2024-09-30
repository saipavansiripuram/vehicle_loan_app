const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoute = require('./routers/userRouter')
const loanRoute = require('./routers/loanRouter')
const loanApplicationRoute = require('./routers/loanApplicationRouter')
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/user', userRoute)
app.use('/loan', loanRoute)
app.use('/loanApplication', loanApplicationRoute)

// app.use(cors(
//     {
//         origin: "https://8081-adcdaaacdbdfabaaabfbfdaabfbdefedecdcecce.premiumproject.examly.io",
//         methods: "GET,POST,OPTIONS,PUT,PATCH,DELETE",
//         allowedHeaders: 'Content-Type,Authorization',
//         credentials: true

//     }
// ))


const dbConnection = async () => {
    // await mongoose.connect('mongodb://127.0.0.1:27017', {
    await mongoose.connect('mongodb+srv://saipavansiripuram5:1234@cluster0.nes3kdw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to Mongodb");``
    }).catch((error) => {
        console.log("Error", error);
    })
}
dbConnection()



app.listen(8080, () => {
    console.log("Server is Running on 8080");
})