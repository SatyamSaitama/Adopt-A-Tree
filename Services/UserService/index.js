const express = require('express');
const bodyParser = require('body-parser');
const {User} = require('./models');
db = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secretKey = 'AdoptMoreTrees'
const app = express();
const PORT = 3001; 
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())

app.post('/user/register', async (req, res) => {
    try {
      const { username, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      if (role) {
        const newUser = await User.create({ username, password: hashedPassword, role: role });
        res.status(201).json({ user: newUser });
      } else {
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json({ user: newUser });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.post('/user/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1d' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/user/find/all',async (req, res)=>{
  try {
    users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
})
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });