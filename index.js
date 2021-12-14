const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 5001;


app.get('/', (req, res) => {
    res.send('Donate Blood, Save Life...Get Real Blessings!!!');
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.grbvc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const donorInfoCollection = client.db("Blood_Donation_CSE_3100").collection("DonorInfo");

    // uploading donor data in database
    app.post('/beDonor', (req, res) => {
        const newDonor = req.body;
        donorInfoCollection.insertOne(newDonor)
            .then(result => {
                console.log('inserted count: ', result.insertedCount);
                res.send(result.insertedCount > 0);
            })
    })

    // loading donors data from database and display on search page
    app.get('/searchDonors', (req, res) => {
        console.log(req.query, req.query.city);
        donorInfoCollection.find({
            city: req.query.city,
            bloodGroup: req.query.bloodGroup
        })
            .toArray((error, donors) => {
                res.send(donors);
            })
    })
});

app.listen(process.env.PORT || port);
