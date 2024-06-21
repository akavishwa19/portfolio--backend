import mongoose from "mongoose";

mongoose.Promise=global.Promise;
const db={};
db.mongoose=mongoose;

export default db;