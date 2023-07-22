const express = require('express');
const cors = require('cors');
require('dotenv').config()
var jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://dbuser1:${process.env.DBPASS}@cluster0.uzwtobv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function verifyJWT(req,res,next){
    try {
        const token = req.headers?.authorization?.split(" ")?.[1]
        console.log(token)
        if (!token) {
            res.status(401).json({
                status: "Fail",
                error: "You are not logged in"
            })
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err) {
                return res.status(403).send({ message: 'Forbidden Access' })
            }
            req.user = decoded;
            console.log(decoded)
            next();

        })
        // const user = User.findOne({ email: decoded.email })
      
    } catch (error) {
        res.status(403).json({
            status: "Fail",
            error: "Invalid User"
        })
    }
}
async function run(){
    try {
        await client.connect()

        const userCollection = client.db('power-hack').collection("users")
        const billCollection = client.db('power-hack').collection("billing-list")

        app.get('/api/login',verifyJWT,async(req,res)=>{
            console.log(req?.user)
        const user = await userCollection.findOne({email:req.user?.email})

      
        res.status(200).json({
            status: "success",
            user: user.email
        })
        }),

        app.put('/api/registration', async (req, res) => {
            const {email,password} = req.body;
            console.log(req.body)
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    email,
                    password
                }
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
            res.send({ result, token })
        })


        app.post('/api/login',async (req,res)=>{
            const { email, password } = req.body;

            const user = await userCollection.findOne({email:email})
    
            if (!user) {
                return res.status(401).json({
                    status: "Fail",
                    message: "No User found. Please create an account"
                })
            }
            if(user){
                if(user.password==password){
                    const payload = {
                        email: user.email,
                    }
                
                    const token = jwt.sign(payload, process.env.
                        ACCESS_TOKEN_SECRET, {
                        expiresIn: "7days"
                    });
                    return res.status(200).json({
                        status: "Success",
                        message: "Successfully Logged in",
                        data: user,
                        token,
                    })
                }
                else{
                    return res.status(401).json({
                        status: "Fail",
                        message: "Password is not correct"
                    })
                }
            }
        } )
        app.post('/api/add-billing',async (req,res)=>{
            const data = req.body
            console.log(data)
            const result= await billCollection.insertOne(data)
            if(result){
                return res.status(200).json({
                    status: "Success",
                    message: "Successfully Posted data",
                    data:result
                })
            }
        })
        app.get('/api/billing-list',async(req,res)=>{
            console.log(req.query)
            const page = parseInt(req?.query?.page);
            
            const size = parseInt(req?.query?.size);
            console.log(page)
            const query = {};
            const cursor = billCollection.find(query);
            let bills;
            if (page || size) {
                bills = await cursor.skip(page * size).limit(10).toArray();
              
            }
            else {
                bills = await cursor.toArray();
            }
            console.log(bills.length)
            res.send({data:bills});
        })
        app.delete('/api/delete-billing/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await billCollection.deleteOne(filter);
            res.send(result);
        })
        app.patch('/api/update-bill/:id',verifyJWT,async(req,res)=>{
            const { id } = req.params;
            const data = req.body
            const updateDoc={
                $set:{
                    data,
                }
            }
            const result = await billCollection.updateOne({ _id: id },updateDoc)
            res.send(result)
        })
    } finally{
        
    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Power_HACK Running');
})

app.listen(port, () => {
    console.log(`Power_HACK listening on port ${port}`)
})