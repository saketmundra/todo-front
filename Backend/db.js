const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook?directConnection=true"

const connecttoMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongodb" );
    })
}

module.exports= connecttoMongo 