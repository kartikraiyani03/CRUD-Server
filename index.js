let express = require('express')
let mg = require('mongoose')
let cors = require('cors')
let Collection = require('./models/CRUDModel')

let app = express()
let PORT = process.env.PORT || 3000
app.use(cors(
    {
        origin : ["https://crud-client-seven.vercel.app"],
        methods : ["GET","POST","DELETE","PUT"],
        credentials : true
    }
))
app.use(express.json())

mg.connect("mongodb+srv://raiyanikartik43:V8tAD3mp2CUvfQpR@cluster0.qtkgf0x.mongodb.net/MERN")
.then(() => console.log("DB Connected"))
.catch((e) => console.log(e))

app.get('/',(req,res) =>
{
    Collection.find({})
    .then(users => res.json(users))
    .catch(e => res.json(e))
})

app.get('/getUser/:id',(req,res) =>
{
    let id = req.params.id
    Collection.findById({_id:id})
    .then(users => res.json(users))
    .catch(e => res.json(e))
})

app.put('/update/:id',(req,res) =>
{
    let id = req.params.id
    Collection.findByIdAndUpdate({_id:id},{name:req.body.name,email:req.body.email,age:req.body.age})
    .then(users => res.json(users))
    .catch(e => res.json(e))
})

app.delete('/delete/:id',(req,res) =>
{
    let id = req.params.id
    Collection.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(e => res.json(e))
})

app.post('/create',(req,res) =>
{
    let {name,email,age} = req.body
    Collection.create({name,email,age})
    .then(user => res.json(user))
    .catch(e => console.log(e))
})


app.listen(PORT,() =>
{
    console.log("Server Running")
})
