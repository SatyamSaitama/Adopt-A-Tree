const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {Produce,Share} = require('./models')
const axios = require('axios');
db = require('./models');
const { sequelize } = require('./models');
const {getTrees,calculateTimeSinceAdoption} = require('../Utils/utils')
app.use(bodyParser.json());
PORT = 3003
const authenticateToken = require('../middleware/AuthMiddleWare');

app.get('/production/test',async(req, res)=>{
  userTrees = await getTrees(3)
  time = await calculateTimeSinceAdoption(userTrees)
  res.json(time)

})
app.post('/production/:treeId',authenticateToken,async(req,res)=>{
 
    const id = req.params.treeId;
    const response = await axios.get('http://localhost:3002/tree/' + id);
    const tree = response.data
    console.log(tree)
    const {produceName,quantity} = req.body;
    const info = await Produce.create({produceName,quantity,TreeId:id})
    const request = await axios.get('http://localhost:3001/user/'+tree.UserId)
    const user = request.data.user;
    const share = await Share.findOne({where:{UserId:user.id,product:produceName}})
    treesByUser = await getTrees(user.id)
    console.log(treesByUser)
    const relationshipTime = await calculateTimeSinceAdoption(treesByUser)
    if (share){
      const numberOfTree = share.numberOfTree
      share.update({numberOfTree : numberOfTree + 1,relationshipTime})
      
    }
    else{
      Share.create({UserId:user.id,relationshipTime:0,numberOfTree:1,product:produceName})
    }
  
    res.json({tree:tree.treeName,info})
  
  
  })
  
  app.get('/production/calculate-share', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:3001/user/find/all');
      const users = response.data;
      const shares = await Share.findAll();
      const productShares = {};
  
      for (const user of users) {
        const userShares = await shares.filter((share) => share.UserId === user.id);
        for (const userShare of userShares) {
          const product = userShare.product;
          const ProductShares = await Share.findAll({
            where: { product },
            attributes: [
              'UserId',
              [sequelize.fn('max', sequelize.col('numberOfTree')), 'maxNumberOfTrees'],
              [sequelize.fn('min', sequelize.col('numberOfTree')), 'minNumberOfTrees'],
              [sequelize.fn('max', sequelize.col('relationshipTime')), 'maxRelationshipTime'],
              [sequelize.fn('min', sequelize.col('relationshipTime')), 'minRelationshipTime'],
            ],
          });
      
         const productData = {
        userId: ProductShares[0].UserId,
        maxNumberOfTrees: ProductShares[0].dataValues.maxNumberOfTrees,
        minNumberOfTrees: ProductShares[0].dataValues.minNumberOfTrees,
        maxRelationshipTime: ProductShares[0].dataValues.maxRelationshipTime,
        minRelationshipTime: ProductShares[0].dataValues.minRelationshipTime,
      };
          const numberOfTreesScore = (userShare.numberOfTree)/(productData.maxNumberOfTrees);
          const timeSinceAdoptionScore = (userShare.relationshipTime) / productData.maxRelationshipTime;
          
          const compositeScore = 0.6 * numberOfTreesScore + 0.4 * timeSinceAdoptionScore;
          if (!productShares[product]) {
            productShares[product] = [];
          }
  
          productShares[product].push({
            userId: user.id,
            username: user.username,
            product,
            compositeScore,
          });
        }
      }
  
      res.json({ productShares });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });