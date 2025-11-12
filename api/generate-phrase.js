// api/generate-phrase.js
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

export default async function handler(req, res) {
  try {
    // lee tipo desde query (?tipo=mercadona o ?tipo=gym)
    const tipo = (req.query.tipo || 'gym').toString();

    const prompt =
      tipo === 'mercadona'
        ? 'Genera una frase corta, positiva y motivadora para alguien que trabaja en Mercadona. En español, máximo 30-40 palabras.'
        : 'Genera una frase corta y motivadora sobre el gimnasio y superación personal. En español, máximo 30-40 palabras.';

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 60,
      temperature: 0.8
    };

    const openaiResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!openaiResp.ok) {
      const errText = await openaiResp.text();
      console.error('OpenAI error:', openaiResp.status, errText);
      return res.status(openaiResp.status).json({ error: 'Error desde OpenAI', details: errText });
    }

    const data = await openaiResp.json();
    const frase = (data?.choices?.[0]?.message?.content || '').trim();

    return res.status(200).json({ frase });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Error interno en el servidor' });
  }
};
