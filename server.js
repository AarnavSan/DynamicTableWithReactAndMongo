const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost/tableData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dataSchema = new mongoose.Schema({
  serial: String,
  name: String,
  city: String,
  cgpa: String,
  phone: String,
});

const Data = mongoose.model('Data', dataSchema);

app.use(bodyParser.json());

app.get('/api/data', async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

app.post('/api/data', async (req, res) => {
  const newRow = new Data(req.body);
  await newRow.save();
  res.json(newRow);
});

app.delete('/api/data/:id', async (req, res) => {
  const id = req.params.id;
  await Data.findByIdAndRemove(id);
  res.json({ message: 'Deleted' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
