const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

/*production environment
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}
*/

//MongoDB connection
const PORT = process.env.PORT || 4000;
const dbURI = config.get('dbURI');

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result =>
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    })
  )
  .catch(err => console.log(err));
