const mongoose =require('mongoose');

const mongp_url = process.env.MONGO_CONN;

mongoose.connect(mongp_url)
    .then(()=>{
        console.log('mongodb Connected...');
    }).catch((err)=>{
        console.log('mongodb Connection error: ',err);
    })