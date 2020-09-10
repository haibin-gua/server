const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//实例化数据模板
const BbsSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = Bbs = mongoose.model("bbs",BbsSchema);