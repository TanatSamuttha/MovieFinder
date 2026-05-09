import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export default async function searchMovieTitles(query) {
    try {
        const tokenSave = true; //for dev
        if(tokenSave){
            return [
                'Star Wars: Episode IV – A New Hope',
                'Star Wars: Episode V – The Empire Strikes Back',
                'Star Wars: Episode VI – Return of the Jedi',
                'Star Wars: Episode I – The Phantom Menace',
                'Star Wars: Episode II – Attack of the Clones',
                'Star Wars: Episode III – Revenge of the Sith',
                'Star Wars: Episode VII – The Force Awakens',
                'Star Wars: Episode VIII – The Last Jedi',
                'Star Wars: Episode IX – The Rise of Skywalker',
                'Rogue One: A Star Wars Story'
            ]
        }
        console.log("Searching");
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",

            contents: `
                User query: "${query}"
                Find the some most relevant movie titles. (at least 10)
                Rules:
                - Return ONLY valid JSON
                - No markdown
                - No explanation
                - Use this exact format:
                {
                "movies": [
                    "Movie 1",
                    "Movie 2"
                ]
                }
            `,

            config: {
                temperature: 0.3
            }
        });

        const text = response.text.replace(/```json/g, "").replace(/```/g, "").trim();
        console.log(text);
        
        const json = JSON.parse(text);

        return json.movies || [];

    } catch (err) {
        console.error("Gemini error:", err);
        return [];
    }
}