const express = require('express');
const next = require('next');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

// Initialize Next.js engine
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // 1. Core Express Middlewares
    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    // 2. Mount API Routes (Express Backend)
    // You will uncomment these as we implement each route file:
    server.use('/api/auth', require('./backend/routes/auth.routes'));
    server.use('/api/projects', require('./backend/routes/projects.routes'));
    server.use('/api/news', require('./backend/routes/news.routes'));
    server.use('/api/careers', require('./backend/routes/careers.routes'));
    server.use('/api/settings', require('./backend/routes/settings.routes'));
    server.use('/api/upload', require('./backend/routes/upload.routes'));

    // Test API route to ensure Express is catching /api
    server.get('/api/ping', (req, res) => {
        res.status(200).json({ success: true, message: 'Express backend is live!' });
    });

    // 3. Mount Next.js (Frontend SSR Pipeline)
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    // 4. Start Hybrid Server
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${hostname}:${port}`);
    });
}).catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
});
