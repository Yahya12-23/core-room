export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone } = req.body;

    if (!email || !name || !phone) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    try {
        const response = await fetch('https://api.sheetbest.com/v1/collect/f0f8d202-f7ab-4431-ade0-79cac7d1fe0f', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: email,
                Name: name,
                Phone: phone
            })
        });

        if (!response.ok) {
            throw new Error('Sheet.best failed');
        }

        return res.status(200).json({ success: true });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to collect email' });
    }
}
