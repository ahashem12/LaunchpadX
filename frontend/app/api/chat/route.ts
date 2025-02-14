import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

// You might want to load this from a database in a real application
const getBusinessContext = async (userId: string) => {
  // Placeholder for business context
  return {
    businessName: "Example Corp",
    industry: "Technology",
    size: "50-100 employees",
    // Add more business-specific information
  };
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    // In a real application, you would get the user ID from the session/auth
    const businessContext = await getBusinessContext("user123");

    // Add business context to the system message
    const systemMessage = {
      role: "system",
      content: `You are a business consultant for ${businessContext.businessName}, 
                a ${businessContext.industry} company with ${businessContext.size}. 
                Provide advice and answers specific to their business context.`
    };

    // Combine system message with user messages
    const fullMessages = [systemMessage, ...messages];

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: fullMessages,
    });

    const aiContent = response.choices[0]?.message?.content || "No response";
    return NextResponse.json({ content: aiContent });
    
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}