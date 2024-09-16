/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  // Modify the prompt before sending
  const modifiedPrompt = `Give the answer in correct format please dont give a markdown format Prompt is : ${prompt}`;

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(modifiedPrompt); // Send the modified prompt
  console.log(result);
  console.log(result.response.text);

  return result.response.text();
}

export default run;
