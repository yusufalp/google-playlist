const express = require('express');
const morgan = require('morgan');
const googleApps = require('./playstore');
const cors = require('cors');

app = express();

app.use(morgan('common'));
app.use(cors());

app.get('/apps', (req, res) => {
  console.log("123")
  const { search ='', sort, genres} = req.query;
  let results = googleApps.filter(googleApp => 
    googleApp.App.toLowerCase().includes(search.toLowerCase())
  )
  if(sort){
    if(!['Rating', 'App'].includes(sort)){
      return res.status(400).send('Sort must be one of the Rating or App')
    }
  }

  if(genres) {
    if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)){
      return res.status(400).send('Genres must be one of the Action, Puzzle, Strategy, Casual, Arcade, Card')
    }
  }

  if(sort){
    results.sort((a,b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
    });
  }

  if(genres){
    results = results.filter(result => result.Genres.includes(genres))
  }

  res.json(results);
})

app.listen(8000, () => {
  console.log('Google Play App is running on port 8000!')
})