const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const postSchema = new Schema(
  {
    title: { type: String },
    history: { type: String },
    imageUrl: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }], // we will update this field a bit later when we create review model
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

module.exports = Post;
