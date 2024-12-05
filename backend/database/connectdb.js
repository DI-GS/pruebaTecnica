import mongoose from "mongoose";

try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.URI_MONGO);

    mongoose.connection.once('open', () => {
        console.log("Conexión exitosa a MongoDB");
    });
} catch (error) {
    console.error("Error de conexión a MongoDB:", error.message);
    process.exit(1);
}