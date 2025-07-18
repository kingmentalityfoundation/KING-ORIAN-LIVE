const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.handler = async function (event, context) {
  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message || "Hello, who are you?";

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are King Orian, a mythic advisor. Speak with depth, clarity, and power.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: completion.data.choices[0].message.content }),
    };
  } catch (error) {
    console.error("Function Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "AI function failed. " + error.message }),
    };
  }
};
