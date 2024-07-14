const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
    const answers = req.body.answers;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const data = { ip, answers, timestamp: new Date() };

    fs.appendFile(path.join(__dirname, 'hidden', 'ips.json'), JSON.stringify(data) + '\n', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error saving data' });
        }
        res.json({ message: 'Data saved successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
