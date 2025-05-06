import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  image: {
    type: String,
    default: ""
  },
  text: {
    type: String,
    default: ""
  },
}, {
  timestamps: true
});

export default mongoose.model("Blog", blogSchema);
