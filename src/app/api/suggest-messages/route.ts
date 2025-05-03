export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three unique, open-ended, and engaging questions formatted as a single string.Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience.Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction.Each question must be clear, engaging, and contain no more than 13 words.Ensure the questions are not repetitive and do not resemble previous ones.";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      return new Response(JSON.stringify({ success: false, error: data }), {
        status: response.status,
      });
    }

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

// Remove any surrounding quotes and unescape inner quotes
const cleanedText = generatedText.trim().replace(/^"|"$/g, '').replace(/\\"/g, '"');

return new Response(cleanedText, {
  status: 200,
  headers: { 'Content-Type': 'text/plain' },
});

  } catch (error: any) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
