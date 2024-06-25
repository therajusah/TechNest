

const express = require('express');
const connectToMongoDB = require('./connection/conn'); 
const userRoutes = require('./routes/userRoutes'); 

const app = express();
const port = process.env.PORT || 5000;


connectToMongoDB()
  .then(() => {
    
    app.use(express.json());

    app.use('/api/v1', userRoutes);

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

  
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
