const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wpnyk0i.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const run = async () => {
    try {
        const categoriesCollection = client.db("news-18").collection("categories")
        const newsCollection = client.db("news-18").collection("news")

        //catagories collection
        app.get('/categories', async (req, res) => {
            const query = {}
            const categories = await categoriesCollection.find(query).toArray()
            res.send(categories)
        })

        //news collection
        app.get('/news', async (req, res) => {
            const query = {}
            const news = await newsCollection.find(query).toArray()
            res.send(news)
        })


        //show news according to category
        app.get('/categoryWise/:id', async (req, res) => {
            const id = req.params.id
            const query = {}
            const news = await newsCollection.find(query).toArray()

            if (id == 8) {
                res.send(news)
            }

            else {
                const categoryWiseNews = news.filter(singelNews => singelNews.category_id == id)
                res.send(categoryWiseNews)
            }
        })


        //show one news in details
        app.get('/news/:id', async (req, res) => {
            const id = req.params.id
            const query = { id: new ObjectId(id) }
            const result = await newsCollection.findOne(query)
            res.send(result)
        })



    } finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Running")
})

app.listen(port, () => {
    console.log("Server is running in " + port)
})