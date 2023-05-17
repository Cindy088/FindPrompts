import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User", //one-to-many relationship
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);
//get the prompt if it exists, or create a new model if it doesn't

export default Prompt;
