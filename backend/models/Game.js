import mongoose from "mongoose";

const { Schema } = mongoose;

const gameSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  rating: Number,
  platforms: [
    { type: Schema.Types.ObjectId, ref: "Platform" }
  ],
});

export default mongoose.model("Game", gameSchema);
