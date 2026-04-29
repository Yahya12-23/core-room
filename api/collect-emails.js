module.exports = async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let { name, email, phone } = req.body;

    // normalize
    name = (name || "").trim();
    email = (email || "").trim();
    phone = (phone || "").replace(/\D/g, "");

    // validation
    if (!name) {
      return res.status(400).json({ error: "Name required" });
    }

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (!phone || phone.length !== 10) {
      return res.status(400).json({ error: "Invalid phone" });
    }

    const SHEET_URL = "https://api.sheetbest.com/sheets/f0f8d202-f7ab-4431-ade0-79cac7d1fe0f";

    // get existing
    const existingRes = await fetch(SHEET_URL);
    const existing = await existingRes.json();

    // duplicate check
    const duplicate = existing.some(row =>
      row.Email === email || row.Phone === phone
    );

    if (duplicate) {
      return res.status(200).json({
        message: "You're already on the list."
      });
    }

    // insert
    const insertRes = await fetch(SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Email: email,
        Name: name,
        Phone: phone
      })
    });

    if (!insertRes.ok) {
      const text = await insertRes.text();
      console.log("Sheetbest error:", text);
      return res.status(500).json({ error: "Sheet insert failed" });
    }

    return res.status(200).json({
      message: "You're on the list."
    });

  } catch (err) {
    console.log("SERVER ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
