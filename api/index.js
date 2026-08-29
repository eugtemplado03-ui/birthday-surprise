const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// In-memory store for serverless instance
let surprises = {};
let wishes = [];

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    platform: 'Vercel Serverless',
    app: 'Birthday Surprise App',
    timestamp: new Date().toISOString(),
    totalSurprises: Object.keys(surprises).length,
    totalWishes: wishes.length
  });
});

// 2. Create Surprise
app.post('/api/surprise', (req, res) => {
  try {
    const { recipientName, senderSignature, letterDate, letterBody, photos } = req.body;
    
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

    surprises[id] = surpriseData;

    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
    const host = req.headers['x-forwarded-host'] || req.get('host');
    const shareUrl = `${protocol}://${host}/?id=${id}`;

    res.json({
      success: true,
      id,
      shareUrl,
      data: surpriseData
    });
  } catch (err) {
    console.error('Error creating surprise:', err);
    res.status(500).json({ error: 'Failed to create surprise' });
  }
});

// 3. Get Surprise by ID
app.get('/api/surprise/:id', (req, res) => {
  const { id } = req.params;
  const surprise = surprises[id];

  if (!surprise) {
    return res.status(404).json({ error: 'Surprise not found' });
  }

  res.json({
    success: true,
    data: surprise
  });
});

// 4. Record Wish
app.post('/api/wishes', (req, res) => {
  try {
    const { name, wishText, surpriseId } = req.body;
    const newWish = {
      id: generateId(),
      surpriseId: surpriseId || 'general',
      name: name ? name.trim() : 'Anonymous',
      wishText: wishText ? wishText.trim() : 'Happy Birthday!',
      createdAt: new Date().toISOString()
    };

    wishes.push(newWish);
    if (wishes.length > 200) wishes = wishes.slice(-200);

    res.json({
      success: true,
      wish: newWish
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record wish' });
  }
});

// 5. Get Wishes
app.get('/api/wishes', (req, res) => {
  const { surpriseId } = req.query;
  if (surpriseId) {
    const filtered = wishes.filter(w => w.surpriseId === surpriseId);
    return res.json({ success: true, wishes: filtered });
  }
  res.json({ success: true, wishes });
});

module.exports = app;
