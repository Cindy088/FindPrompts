import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB(); //a lambda function, every time it gets called it needs to connect to the database do its thing and then gone
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save(); //save to database
    return new Response(JSON.stringify(newPrompt), { status: 201 }); //201 created successfully
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
