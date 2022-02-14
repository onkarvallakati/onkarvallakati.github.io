const dbClient = require('mongoose');
dbClient.connect("mongodb+srv://rajib:ammabba123@cluster0.hqbfn.mongodb.net/testdb?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
    console.log('successfully connect to database');
}).catch((err)=>{
    console.error('error connecting to database');
})
module.exports = dbClient;
