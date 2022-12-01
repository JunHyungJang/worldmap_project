const express = require("express")
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")

const PORT = process.env.PORT || 5000;
let cors_origin = ['http://localhost:3000'];
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true,
}));

// app.use(cors())
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', require('./routes/server'))
app.use('/ass',require('./routes/assignment'))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/',function(request, response){
    response.sendFile( path.join(__dirname, '../client/build', "index.html"));
})
// app.get('/',(req,res) => {
//     res.send("Server Response Success")
// })


app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})


