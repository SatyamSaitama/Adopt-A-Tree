const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {Tree} = require('./models')
const axios = require('axios');
db = require('./models');
const {getTrees} = require('../Utils/utils')
app.use(bodyParser.json());
PORT = 3002
const authenticateToken = require('../middleware/AuthMiddleWare');

app.post('/tree/add_tree', authenticateToken,  async (req, res) => {
    const request = await axios.get('http://localhost:3001/user/'+req.user.userId)
    const user = request.data.user;
    const role = user.role;
    if (role === 'admin') {
      try {
        const { treeName } = req.body;
        await Tree.create({ treeName: treeName });
        res.status(201).json({ createdTree: treeName });
      } catch (error) {
        console.log(error);
        res.status(403).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(500).json({ error: 'Forbidden' });
    }
  });
  
  app.delete('/tree/:id',authenticateToken,   async (req, res) => {
    const request = await axios.get('http://localhost:3001/user/'+req.user.userId)
    const user = request.data.user;
    const role = user.role;
    if (role === 'admin') {
      try {
        const id = req.params.id;
        console.log(id);
        const tree = await Tree.findByPk(id);
        if (!tree) {
          return res.status(404).json({ error: 'User not found' });
        }
        await tree.destroy();
  
        res.status(201).json({ message: 'Tree removed from Database' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
  app.get('/tree/:id', async (req, res) => {
    id = req.params.id;
    try {
      const tree = await Tree.findByPk(id);
      if (!tree) {
        return res.status(404).json({ error: 'Tree not found' });
      }
      res.status(200).json(tree);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }}
  )
  
  
  app.get('/tree/adopt/:id',authenticateToken, async (req,res)=>{
    try {
      const id = req.params.id
      const tree = await Tree.findByPk(id)
      tree.update({UserId:req.user.userId,isAdopted:true})
      res.send(tree)
  
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Something Went Wrong' });
  
    }
    
  })

  app.get('/tree/find/all', async (req, res) => {
    try {
      const trees = await Tree.findAll();
      res.status(200).json(trees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/tree/find/adopted',authenticateToken, async (req,res)=>
  {
    try {
        const response = await axios.get('http://localhost:3001/user/'+req.user.userId)
        const user = response.data.user;
        const trees = await getTrees(user.id);
        res.status(200).json(trees);
  
    } catch (error) {
      res.status(404).json({ error});
    }
    
  })
  app.get('/tree/info/:id',async (req,res)=>{
    id = req.params.id;
    const tree = await Tree.findByPk(id)
    const response = await axios.get('http://localhost:3001/user/'+tree.UserId)
    const user = response.data.user;
    res.json({treeName : tree.treeName,User: user.username})
  
  })

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });


