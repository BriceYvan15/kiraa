
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRomanticMessage = async (name: string, inspiration?: string): Promise<string> => {
  try {
    const inspirationText = inspiration?.trim();
    const inspirationBlock = inspirationText
      ? `\n\nInspiration (à respecter et intégrer de façon naturelle, sans citer mot pour mot) :\n${inspirationText}`
      : "";

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Rédige un message d'amour court, poétique et extrêmement romantique pour la Saint-Valentin pour une femme nommée ${name}. Le ton doit être doux, sincère et élégant. Environ 60-80 mots.${inspirationBlock}`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text || "Tu es le plus beau cadeau de ma vie. Joyeuse Saint-Valentin, mon amour.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Chaque jour passé à tes côtés est une bénédiction. Je t'aime plus que les mots ne peuvent l'exprimer. Joyeuse Saint-Valentin.";
  }
};
