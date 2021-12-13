const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 5001;


app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.grbvc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const donorInfoCollection = client.db("Blood_Donation_CSE_3100").collection("DonorInfo");
    console.log('database connected');
    const info = {name: 'samiha', age: 22}
    donorInfoCollection.insertOne(info)
    .then(result = () => {
        console.log('one data added');
    })
    // client.close();

});

app.get('/', (req, res) => {
    res.send('Donate Blood, Save Life...Get Real Blessings!!!');
})

app.listen(5001, () => console.log('Listening to port 5001'));
