const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3456;

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' })); // Support base64 image uploads
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
const SURPRISES_FILE = path.join(DATA_DIR, 'surprises.json');
const WISHES_FILE = path.join(DATA_DIR, 'wishes.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadData(filePath, defaultVal = {}) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error loading ${filePath}:`, err.message);
  }
  return defaultVal;
}

function saveData(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error saving ${filePath}:`, err.message);
  }
}

// In-memory + file-backed storage
let surprises = loadData(SURPRISES_FILE, {});
let wishes = loadData(WISHES_FILE, []);

// Helper to generate short readable IDs
function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Birthday Surprise App',
    timestamp: new Date().toISOString(),
    totalSurprises: Object.keys(surprises).length,
    totalWishes: wishes.length
  });
});

const GIST_RAW_URL = 'https://gist.githubusercontent.com/eugtemplado03-ui/e88e9b4d70b854d8eff3d9214e75f0e5/raw/active_surprise.json';

// 2. Get the Active / Global Custom Surprise
app.get('/api/surprise', async (req, res) => {
  const activeFile = path.join(DATA_DIR, 'active_surprise.json');
  let activeSurprise = loadData(activeFile, null);
  
  if (activeSurprise && activeSurprise.recipientName) {
    return res.json({ success: true, data: activeSurprise });
  }

  // If local file is empty (e.g. after Render sleep/restart), auto restore from Cloud DB
  try {
    const cloudRes = await fetch(GIST_RAW_URL);
    if (cloudRes.ok) {
      const cloudData = await cloudRes.json();
      if (cloudData && cloudData.recipientName) {
        saveData(activeFile, cloudData);
        return res.json({ success: true, data: cloudData });
      }
    }
  } catch (e) {
    console.log('Cloud DB fallback error:', e.message);
  }

  res.json({ success: true, data: null });
});

// 3. Save & Update the Active Custom Surprise Directly
app.post('/api/surprise', (req, res) => {
  try {
    const { recipientName, senderSignature, letterDate, letterBody, photos, creatorPin } = req.body;
    
    if (!recipientName) {
      return res.status(400).json({ error: 'Recipient name is required' });
    }

    const surpriseData = {
      recipientName: recipientName.trim(),
      senderSignature: senderSignature ? senderSignature.trim() : 'Forever Yours ❤️',
      letterDate: letterDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      letterBody: letterBody ? letterBody.trim() : '',
      photos: Array.isArray(photos) ? photos : [],
      creatorPin: creatorPin || '1234',
      updatedAt: new Date().toISOString()
    };

    saveData(path.join(DATA_DIR, 'active_surprise.json'), surpriseData);

    res.json({
      success: true,
      message: 'Surprise saved directly!',
      data: surpriseData
    });
  } catch (err) {
    console.error('Error saving surprise:', err);
    res.status(500).json({ error: 'Failed to save surprise' });
  }
});

// 4. Get a Custom Birthday Surprise by ID (fallback)
app.get('/api/surprise/:id', (req, res) => {
  const { id } = req.params;
  const surprise = surprises[id] || loadData(path.join(DATA_DIR, 'active_surprise.json'), null);

  if (!surprise) {
    return res.status(404).json({ error: 'Surprise not found' });
  }

  res.json({
    success: true,
    data: surprise
  });
});

// 4. Record a Birthday Candle Wish / Guestbook Message
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
    // Keep last 200 wishes
    if (wishes.length > 200) wishes = wishes.slice(-200);
    saveData(WISHES_FILE, wishes);

    res.json({
      success: true,
      wish: newWish
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record wish' });
  }
});

// 5. Get Wishes list
app.get('/api/wishes', (req, res) => {
  const { surpriseId } = req.query;
  if (surpriseId) {
    const filtered = wishes.filter(w => w.surpriseId === surpriseId);
    return res.json({ success: true, wishes: filtered });
  }
  res.json({ success: true, wishes });
});

// ==========================================
// STATIC FRONTEND & ROUTING
// ==========================================
app.use(express.static(path.join(__dirname)));

// Route for shareable URLs /s/:id
app.get('/s/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌸 Birthday Surprise Full-Stack Server running on port ${PORT}`);
  console.log(`👉 http://localhost:${PORT}/`);
});
