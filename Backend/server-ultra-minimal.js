const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Ultra Minimal API Working!');
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is healthy' });
});

app.listen(port, () => {
    console.log(`Ultra minimal server running on port ${port}`);
});
