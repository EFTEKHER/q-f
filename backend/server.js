import express from 'express';
import morgan from 'morgan' ;
import cors from 'cors';
import {config} from 'dotenv';
import router from './router/route.js';
import connect from './database/conn.js'
// import connection file
const app = express();

/** middleware**/

app.use(morgan('tiny'))
app.use(cors());
app.use(express.json());
config();


// application port

const port =process.env.PORT || 8080;

connect();
//routes
app.use('/api',router)

app.get('/', (req, res) => {
try{
res.json("Get Request");
}
catch(err){

    res.json(err.message);
}
}
)

/* start server only when have valid connection* */

connect().then(()=>{
try{
    app.listen(port,()=>{
        console.log(`server connected to http://localhost:${port}`);
    
    })
}catch(error){
console.log("cannot connect to server");
}
}).catch(err=>{
    console.log("Invalid database connection");
})

