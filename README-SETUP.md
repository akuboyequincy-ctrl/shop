# ShopZone - Real-time Multi-device Sync Setup

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- npm installed

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start the server:**
```bash
npm start
```

The server will run on `http://localhost:3000`

### Access the Application

- **Customer Store:** Open `http://localhost:3000` in your browser
- **Admin Dashboard:** Login with username `Nii` and password `11223344`

## 📱 Real-time Multi-device Sync

The server enables real-time order updates across different devices using WebSockets:

1. When a customer places an order on one device
2. The server broadcasts it to all connected clients
3. Admin dashboard updates automatically (no refresh needed)

## 🔧 How It Works

### Architecture:
- **Frontend:** Single HTML file with WebSocket client
- **Backend:** Node.js/Express with WebSocket support
- **Communication:** WebSocket for real-time updates, REST API as fallback

### Key Features:
- ✅ Real-time order synchronization
- ✅ Multi-device support
- ✅ Automatic reconnection on disconnect
- ✅ Local fallback with localStorage
- ✅ WebSocket + REST API hybrid

## 📝 Development

### File Structure:
```
.
├── index.html          (Frontend app with WebSocket client)
├── server.js           (Node.js backend with WebSocket)
├── package.json        (Dependencies)
└── README-SETUP.md     (This file)
```

### API Endpoints:
- `GET /api/data` - Get all data
- `GET /api/orders` - Get all orders
- `GET /api/products` - Get all products
- `POST /api/orders` - Place new order
- `PUT /api/products/:id` - Update product

### WebSocket Messages:

**Client → Server:**
```json
{ "type": "order", "data": {...} }
{ "type": "product_update", "data": {...} }
```

**Server → Client:**
```json
{ "type": "init", "data": {...} }
{ "type": "order_update", "data": [...] }
{ "type": "products_update", "data": [...] }
```

## 🚢 Production Deployment

To deploy to production:

1. **Railway.app** (Recommended for Node.js):
```bash
npm install -g railway
railway link
railway up
```

2. **Heroku**:
```bash
heroku create your-app-name
git push heroku main
```

3. **AWS/Azure/DigitalOcean**:
- Use PM2 for process management
- Set up SSL/TLS certificates
- Configure environment variables

## 🔐 Security Notes

- Update admin password in `index.html` (line 1949)
- Use environment variables for sensitive data
- Enable HTTPS in production
- Add authentication/authorization as needed

## 📞 WhatsApp Integration

Orders are automatically sent to WhatsApp number: **+233246570758**

To change:
1. Edit `WHATSAPP_NUMBER` in `server.js`
2. Update WhatsApp links in `index.html`

## 🐛 Troubleshooting

### Server won't start
- Check if port 3000 is available
- Run `npm install` to ensure all dependencies installed

### WebSocket connection fails
- Ensure server is running
- Check browser console for errors
- Verify firewall allows WebSocket connections

### Orders not syncing
- Check browser console (F12) for WebSocket errors
- Verify server is receiving messages: check server logs
- Try refreshing the page

## 📚 Next Steps

1. Configure database (MongoDB, PostgreSQL, etc.)
2. Add user authentication
3. Implement payment processing
4. Add email notifications
5. Set up admin analytics dashboard

---

**Built with Node.js + Express + WebSockets** 🚀
