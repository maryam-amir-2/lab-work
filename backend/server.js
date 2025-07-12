const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());


// MongoDB connection

mongoose.connect('mongodb+srv://maryamrameen74774:maryam@cluster0.fwjb7xr.mongodb.net/temperatures?retryWrites=true&w=majority', {

    useNewUrlParser: true,

    useUnifiedTopology: true,
 });

// Mongoose model

const Temperature = mongoose.model('temperatures',{

    region: String,

    date: String,

    value: Number,
});

// Routes

// Get all temperatures

app.get('/api/temperatures', async (req, res) => {

    const data = await Temperature.find();

    res.json(data);

});

// Get temperatures by region

app.get('/api/temperatures/:region', async (req, res) => {

    const region= req.params.region;
    const data= await Temperature.find({ region });
    res.json(data);

});

// Add new temperature
app.post('/api/temperatures', async (req, res) => {

    const temp = new Temperature (req.body);

    await temp.save();

    res.json({ message: 'Saved!' });

});

app.listen(5000, () => console.log('Server running on port 5000'));