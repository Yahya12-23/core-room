export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const response = await fetch(
      'https://api.sheetbest.com/v1/collect/f0f8d202-f7ab-4431-ade0-79cac7d1fe0f',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Email: email,
          Name: name,
          Phone: phone
        })
      }
    );

    const text = await response.text();

    if (!response.ok) {
      console.error('Sheet.best error:', text);
      return res.status(500).json({ error: 'Sheet error', details: text });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}  }
}
