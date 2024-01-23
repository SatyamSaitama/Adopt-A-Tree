const axios = require('axios');

async function getTrees(userId) {
  try {
    const response = await axios.get('http://localhost:3002/tree/find/all');
    return response.data.filter(tree => tree.UserId ===parseInt(userId) );
  } catch (error) {
    console.error('Error fetching trees:', error.message);
  }
}

async function calculateTimeSinceAdoption(trees) {
  const currentDate = new Date();
  const earliestAdoptionDate = new Date(Math.min(...trees.map(tree => new Date(tree.createdAt))));
  const timeDiffInMilliseconds = currentDate - earliestAdoptionDate;
  const timeDiffInHours = timeDiffInMilliseconds / (1000 * 60 * 60);
  return Number(timeDiffInHours.toFixed(2));
}

module.exports = { getTrees, calculateTimeSinceAdoption };
