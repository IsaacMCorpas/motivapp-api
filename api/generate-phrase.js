export default async function handler(req, res) {
  const tipo = req.query.tipo || "general";

  const mensajes = {
    mercadona: [
      "¡Hoy repartes energía en cada pasillo!",
      "Cada caja que cierras te acerca a tus metas.",
      "La actitud positiva también se contagia en el trabajo."
    ],
    gym: [
      "¡No busques excusas, busca resultados!",
      "Tu único rival eres tú mismo.",
      "Cada repetición te hace más fuerte."
    ],
  };

  // Selecciona tipo o general
  const lista = mensajes[tipo] || [...mensajes.mercadona, ...mensajes.gym];
  const frase = lista[Math.floor(Math.random() * lista.length)];

  res.status(200).json({ frase });
}
