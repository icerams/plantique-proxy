module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const PLANTNET_KEY = process.env.PLANTNET_API_KEY;

  const response = await fetch(
    `https://my-api.plantnet.org/v2/identify/all?api-key=${PLANTNET_KEY}&lang=en&nb-results=5`,
    { method: "POST", body: req.body, headers: { "content-type": req.headers["content-type"] } }
  );

  const data = await response.json();
  res.status(response.status).json(data);
}
