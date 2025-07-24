const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('Received login request:', req.body);
    res.json({loggedIn: true});
});

module.exports = router;