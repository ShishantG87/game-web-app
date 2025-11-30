import mongoose from "mongoose";
const { Schema } = mongoose;

const platformSchema = new Schema({
    name: {type: String, required:true, unique: true},
});

export default mongoose.model("Platform", platformSchema);
