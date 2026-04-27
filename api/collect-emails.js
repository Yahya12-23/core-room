// api/collect-emails.js

const sheetBestAPI = 'https://api.sheetbest.com/v1/collect/f0f8d202-f7ab-4431-ade0-79cac7d1fe0f';

const collectEmails = async (email) => {
    const response = await fetch(sheetBestAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    });

    if (!response.ok) {
        throw new Error('Failed to collect email.');
    }

    return await response.json();
};

module.exports = collectEmails;