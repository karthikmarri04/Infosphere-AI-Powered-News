export const summarizeWithGemini = async (text, lang = "en") => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      console.error("❌ Gemini API key missing");
      return "Gemini API key missing.";
    }

    if (!text || text.trim().length < 20) {
      return "Not enough content to summarize.";
    }

    const languageMap = {
      en: "English",
      hi: "Hindi",
      es: "Spanish",
      fr: "French",
      de: "German",
      zh: "Chinese",
      ja: "Japanese",
      ar: "Arabic",
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Summarize the following news article in exactly 3 concise lines in ${
                    languageMap[lang] || "English"
                  }:\n\n${text}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("🧠 Gemini response:", data);

    if (!response.ok) {
      return data?.error?.message || "Gemini API error.";
    }

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Summary unavailable."
    );
  } catch (err) {
    console.error("Gemini error:", err);
    return "Unable to generate summary right now.";
  }
};
