const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");

const URL = require('./models/url');

const app = express();
const PORT = 8001;

// MongoDB Connection
connectToMongoDB('mongodb://localhost:27017/short-url')
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
app.use(express.json());
app.use("/url", urlRoute);

app.get('/:shortId', async(req, res)=> {
const shortId = req.params.shortId;
const entry = await URL.findOneAndUpdate({
    shortId
}, 

{
    $push:{
    visitHistory: {
        timestamp: Date.now(),
    }
} })

})




app.listen(PORT, () => console.log(`🚀 Server Started at PORT: ${PORT}`));
