const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const passport = require('koa-passport');
const cors = require('koa-cors');


//实例化koa
const app = new Koa();
const router = new Router();


app.use(bodyParser());
app.use(cors());

//引入passport.js


//引入bbs.js
const bbs = require('././routes/api/bbs');

//路由
router.get('/',async(ctx)=>{
    ctx.body = {
        msg:'hello world'
    }
});

//连接数据库
mongoose.connect("mongodb://localhost:27017/Bbs",{
    useNewUrlParser:true,
    useFindAndModify:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log('mongodb ok');
    }).catch( err =>{
        console.log(err);
    })

    app.use(passport.initialize());
    app.use(passport.session());
    require('./config/passport')(passport);


//配置路由地址
router.use('/api/bbs',bbs);

//配置路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('ok');
})

