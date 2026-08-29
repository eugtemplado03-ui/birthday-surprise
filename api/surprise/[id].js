global.__surprises = global.__surprises || {};

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  const surprise = global.__surprises[id];

  if (!surprise) {
    return res.status(404).json({ error: 'Surprise not found' });
  }

  return res.status(200).json({
    success: true,
    data: surprise
  });
};
