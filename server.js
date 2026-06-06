// ShopZone Backend Server for Real-time Multi-device Sync
const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// In-memory database (use real DB in production)
let shopData = {
  products: [
    { id: 1, name: 'Samsung Galaxy S24', category: 'Electronics', price: 4500, stock: 15, desc: 'Latest Samsung flagship with AI features and stunning display.', emoji: '📱', image: '' },
    { id: 2, name: 'Running Sneakers', category: 'Sports', price: 320, stock: 50, desc: 'Premium cushioned running shoes for all terrains. Lightweight and durable.', emoji: '👟', image: '' },
    { id: 3, name: 'Wireless Earbuds', category: 'Electronics', price: 280, stock: 30, desc: 'True wireless earbuds with 24hr battery and active noise cancellation.', emoji: '🎧', image: '' },
    { id: 4, name: 'Shea Butter Cream', category: 'Health & Beauty', price: 45, stock: 100, desc: 'Natural Ghana shea butter moisturizer for soft and radiant skin.', emoji: '🧴', image: '' },
  ],
  orders: [],
  customers: [],
  suppliers: [],
};

// Store active WebSocket connections
const clients = new Set();

// ============================
// WebSocket Handlers
// ============================
wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('Client connected. Total clients:', clients.size);

  // Send initial data to new client
  ws.send(JSON.stringify({ type: 'init', data: shopData }));

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      handleMessage(message, ws);
    } catch (err) {
      console.error('WebSocket message error:', err);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected. Total clients:', clients.size);
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
});

function handleMessage(message, sender) {
  const { type, data } = message;

  if (type === 'order') {
    // New order placed
    shopData.orders.push(data);
    
    // Update product stock
    const pidx = shopData.products.findIndex(p => p.id === data.productId);
    if (pidx !== -1) {
      shopData.products[pidx].stock -= data.qty;
    }

    // Broadcast to all clients
    broadcastToAll({
      type: 'order_update',
      data: shopData.orders,
    });

    console.log('Order placed:', data.id);
  } else if (type === 'product_update') {
    // Product updated
    const pidx = shopData.products.findIndex(p => p.id === data.id);
    if (pidx !== -1) {
      shopData.products[pidx] = data;
    }
    broadcastToAll({ type: 'products_update', data: shopData.products });
  } else if (type === 'customer_update') {
    // Customer added
    if (!shopData.customers.find(c => c.phone === data.phone)) {
      shopData.customers.push(data);
    }
  }
}

function broadcastToAll(message) {
  const payload = JSON.stringify(message);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

// ============================
// REST API Endpoints
// ============================

// Get all data
app.get('/api/data', (req, res) => {
  res.json(shopData);
});

// Get orders
app.get('/api/orders', (req, res) => {
  res.json(shopData.orders);
});

// Get products
app.get('/api/products', (req, res) => {
  res.json(shopData.products);
});

// Place order (fallback for non-WebSocket clients)
app.post('/api/orders', (req, res) => {
  const order = req.body;
  shopData.orders.push(order);

  // Update stock
  const pidx = shopData.products.findIndex(p => p.id === order.productId);
  if (pidx !== -1) {
    shopData.products[pidx].stock -= order.qty;
  }

  // Broadcast to all WebSocket clients
  broadcastToAll({
    type: 'order_update',
    data: shopData.orders,
  });

  res.json({ success: true, order });
});

// Update product
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pidx = shopData.products.findIndex(p => p.id === id);
  
  if (pidx !== -1) {
    shopData.products[pidx] = req.body;
    broadcastToAll({ type: 'products_update', data: shopData.products });
    res.json({ success: true, product: shopData.products[pidx] });
  } else {
    res.status(404).json({ success: false, error: 'Product not found' });
  }
});

// ============================
// Server Start
// ============================
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 ShopZone Server running on http://localhost:${PORT}`);
  console.log(`📡 WebSocket enabled at ws://localhost:${PORT}`);
});
