function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

global.__surprises = global.__surprises || {};

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { recipientName, senderSignature, letterDate, letterBody, photos } = req.body || {};
      
      if (!recipientName) {
        return res.status(400).json({ error: 'Recipient name is required' });
      }

      const id = generateId();
      const surpriseData = {
        id,
        recipientName: recipientName.trim(),
        senderSignature: senderSignature ? senderSignature.trim() : 'Forever Yours ❤️',
        letterDate: letterDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        letterBody: letterBody ? letterBody.trim() : '',
        photos: Array.isArray(photos) ? photos : [],
        createdAt: new Date().toISOString()
      };

      global.__surprises[id] = surpriseData;

      const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
      const proto = req.headers['x-forwarded-proto'] || 'https';
      const shareUrl = `${proto}://${host}/?id=${id}`;

      return res.status(200).json({
        success: true,
        id,
        shareUrl,
        data: surpriseData
      });
    } catch (err) {
      console.error('Error creating surprise:', err);
      return res.status(500).json({ error: 'Failed to create surprise' });
    }
  }

  // GET /api/surprise?id=xyz
  const id = req.query.id;
  if (id) {
    const surprise = global.__surprises[id];
    if (surprise) {
      return res.status(200).json({ success: true, data: surprise });
    }
    return res.status(404).json({ error: 'Surprise not found' });
  }

  return res.status(200).json({
    success: true,
    total: Object.keys(global.__surprises).length
  });
};
