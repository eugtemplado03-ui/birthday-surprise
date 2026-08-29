function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

global.__wishes = global.__wishes || [];

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { name, wishText, surpriseId } = req.body || {};
      const newWish = {
        id: generateId(),
        surpriseId: surpriseId || 'general',
        name: name ? name.trim() : 'Anonymous',
        wishText: wishText ? wishText.trim() : 'Happy Birthday!',
        createdAt: new Date().toISOString()
      };

      global.__wishes.push(newWish);
      if (global.__wishes.length > 200) global.__wishes = global.__wishes.slice(-200);

      return res.status(200).json({
        success: true,
        wish: newWish
      });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to record wish' });
    }
  }

  const { surpriseId } = req.query;
  if (surpriseId) {
    const filtered = global.__wishes.filter(w => w.surpriseId === surpriseId);
    return res.status(200).json({ success: true, wishes: filtered });
  }

  return res.status(200).json({
    success: true,
    wishes: global.__wishes
  });
};
