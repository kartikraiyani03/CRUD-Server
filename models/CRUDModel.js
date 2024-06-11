let mg = require('mongoose')

let CRUDSchema = new mg.Schema({
    name : String,
    email : String,
    age : Number,
})

let Collection = mg.model("CRUD_App",CRUDSchema)
module.exports = Collection