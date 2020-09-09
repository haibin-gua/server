const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

//实例化koa
const app = new Koa();
const router = new Router();
const Schema = mongoose.Schema;

app.use(bodyParser());

router.post('/',async(ctx)=>{
    const newBbs = new Bbs({
        name:ctx.request.body.name,
        username:ctx.request.body.username,
        password:ctx.request.body.password
    });
    //存储到数据库
    await newBbs.save().then(bbs=>{
        ctx.body = bbs;
    }).catch((err)=>{
        console.log(err)
    });

    //返回JSON数据
    ctx.body = newBbs;
});

//数据库地址
const db = 'mongodb://localhost:27017/bbs'
//连接数据库
mongoose.connect(db,{ //创建数据库
    useNewUrlParser:true,
    useFindAndModify:true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=>{
        console.log("mongodb Connectd...");
    })
    .catch(err=>{
        console.log(err);
    });

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
const Bbs = mongoose.model("bbs",BbsSchema);

//配置路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('ok');
})

