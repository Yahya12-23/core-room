export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let { name, email, phone } = req.body;

    name = name?.trim();
    email = email?.trim();
    phone = phone?.replace(/\D/g, "");

    // VALIDATION
    if (!name) return res.status(400).json({ error: "Name required" });
    if (!email || !email.includes("@")) return res.status(400).json({ error: "Invalid email" });
    if (!phone || phone.length !== 10) return res.status(400).json({ error: "Invalid phone" });

    const SHEET_URL = "https://api.sheetbest.com/sheets/f0f8d202-f7ab-4431-ade0-79cac7d1fe0f";

    // 🔍 FETCH EXISTING (safer)
    let existing = [];
    try {
      const existingRes = await fetch(SHEET_URL);
      existing = await existingRes.json();
    } catch (err) {
      console.log("Error fetching existing rows:", err);
      // don't crash app if this fails
      existing = [];
    }

    // 🔍 DUPLICATE CHECK (safe field access)
    const duplicate = existing.some(row =>
      row.Email === email || row.Phone === phone
    );

    if (duplicate) {
      return res.status(200).json({
        message: "You're already on the list.",
      });
    }

    // ✅ INSERT
    const insertRes = await fetch(SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Name: name,
        Phone: phone,
      }),
    });

    const insertText = await insertRes.text(); // safer than .json()

    if (!insertRes.ok) {
      console.log("Sheetbest error:", insertText);
      return res.status(500).json({ error: "Sheet insert failed" });
    }

    return res.status(200).json({
      message: "You're on the list.",
    });

  } catch (err) {
    console.log("SERVER ERROR:", err);
    return res.status(500).json({
      error: "Server crashed",
    });
  }
}    if (duplicate) {
      return res.status(200).json({
        message: "You're already on the list.",
      });
    }

    // ✅ INSERT
    const insertRes = await fetch(SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Name: name,
        Phone: phone,
      }),
    });

    if (!insertRes.ok) {
      throw new Error("Failed to insert");
    }

    return res.status(200).json({
      message: "You're on the list.",
    });

  } catch (err) {
    return res.status(500).json({
      error: "Server error",
    });
  }
}}
