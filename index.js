import app from "./src/app.js";
import 'dotenv/config';
const PORT = process.env.PORT ?? 8080;

const start = async () => {

// TODO:- connect to the database 
    app.listen(PORT, () => {
        console.log(`Server is listning on the PORT ${PORT}`)
    })
}

start() ; 