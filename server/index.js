import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { initializeDatabase } from './db/init.js';
import { codeAnalysisRouter } from './routes/codeAnalysis.js';
import { snippetRouter } from './routes/snippets.js';
import { collaborationHandler } from './utils/collaboration.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Initialize Database
await initializeDatabase();

// Routes
app.use('/api/analysis', codeAnalysisRouter);
app.use('/api/snippets', snippetRouter);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', version: '1.0.0' });
});

// WebSocket Connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-joined', { userId: socket.id });
  });

  socket.on('code-change', (data) => {
    socket.broadcast.to(data.roomId).emit('code-updated', data);
  });

  socket.on('cursor-move', (data) => {
    socket.broadcast.to(data.roomId).emit('cursor-position', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 CodeSnap Server running on http://localhost:${PORT}`);
});
