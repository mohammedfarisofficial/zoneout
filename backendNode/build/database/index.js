import mongoose from "mongoose";
export default ({ db }) => {
    const connect = async () => {
        mongoose
            .connect(db)
            .then(() => {
            return console.info(`Database successfully connected`);
        })
            .catch((error) => {
            console.error("Error connecting to database: ", error);
            return process.exit(1);
        });
    };
    connect();
    mongoose.connection.on("disconnected", connect);
};
//# sourceMappingURL=index.js.map