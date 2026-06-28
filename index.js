import app from "./src/app.js";
import 'dotenv/config';
import connectDB from "./src/common/config/db.js";

const PORT = process.env.PORT ?? 8080;

const start = async () => {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Server is listning on the PORT ${PORT} in ${process.env.NODE_ENV} mode`)
    })
}

start().catch((error) => {
    console.log('Failed to start the server', error)
    process.exit(1);
});