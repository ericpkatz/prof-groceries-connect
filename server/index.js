const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
const { syncAndSeed, models } = require('./db');
const { Item } = models;


syncAndSeed();

// logging middleware
app.use(morgan("dev"));

// static middleware
app.use(express.static(path.join(__dirname, "..", "public")));

app.get('/api/items', async (req, res, next)=> {
  try{
    res.send(await Item.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/items/:id', async (req, res, next)=> {
  try{
    const item = await Item.findByPk(req.params.id);
    await item.update(req.body);

    res.send(await item);
  }
  catch(ex){
    next(ex);
  }
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
