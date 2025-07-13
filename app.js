const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postsRoutes');
const transactionsRoutes = require('./routes/transactionsRoutes');
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.use('/user', (req, res) => {
//   console.log('eee');
// }); 

app.use('/user', userRoutes);
app.use('/posts',postRoutes);
app.use('/transactions', transactionsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
