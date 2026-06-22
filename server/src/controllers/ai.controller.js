const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateDSAnotes(req, res) {

    try {

        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({ message: "topic is required" })
        }

        const prompt = `You are an expert Data Structures and Algorithms instructor. 
        Write concise, highly readable, and structured study notes on the topic: "${topic}". 
        Include the following sections:
        1. A brief, simple explanation.
        2. Key concepts or rules.
        3. Time and Space Complexity (Big O).
        4. A standard, clean code template in C++ or Java.
        
        Do not use conversational filler (like "Here are your notes"). Just return the formatted notes directly using Markdown formatting.`;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);
        const aiText = result.response.text();

        res.status(200).json({
            message: "Notes generated successfully",
            notes: aiText
        })

    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ message: "Internal error during AI generation" });
    }

}

module.exports = {generateDSAnotes}