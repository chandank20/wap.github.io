const express = require('express');
const cors = require('cors');
const userRouters = require('./routers/userRouters');
const songRouters = require('./routers/songRouters');
const app = express();
app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//     res.end("page found");
// });

app.listen(5500, () => {
    console.log("5500 running.......");
});

app.use('/users', userRouters);
app.use('/songs', songRouters);

app.use((req, res, next) =>{
    res.status(400).json("Page not found");
});

app.use((err,req, res, next) =>{
    if(err.message == "Record Not Found!"){
        res.status(404).json({error:err.msg});
    } else {
        res.status(500).json({error:err.msg});
    }
});
