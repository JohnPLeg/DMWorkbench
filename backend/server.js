const express = require('express');
const cors = require('cors');
const homeRouter = require('./routes/homeRouter');
const chatRouter = require('./routes/chatRouter');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/user', homeRouter);
app.use('/chatroom', chatRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})