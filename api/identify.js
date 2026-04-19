module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  try {
    const PLANTNET_KEY = process.env.PLANTNET_API_KEY;
    const { image } = req.body;

    const buffer = Buffer.from(image, "base64");
    const form = new FormData();
    form.append("images", new Blob([buffer], { type: "image/jpeg" }), "plant.jpg");
    form.append("organs", "auto");

    const response = await fetch(
      `https://my-api.plantnet.org/v2/identify/all?api-key=${PLANTNET_KEY}&lang=en&nb-results=5`,
      { method: "POST", body: form }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
