const Router = require('koa-router');
const router = new Router();

//引入Bbs
const Bbs = require('../../models/Bbs');

//test
// router.get('/test',async(ctx)=>{
//     ctx.status = 200;
//     ctx.body = {
//         msg:'bbs works..'
//     }
// });

router.post('/register',async(ctx)=>{
    // console.log(ctx.request.body)

    //存储到数据库
    const findResult = await Bbs.find({username:ctx.request.body.username});
    console.log(findResult);
    if(findResult.length > 0){
        ctx.status = 500;
        ctx.body = {
            username:'用户名已被占用'
        };
    }else{
        //未查到
        const newBbs = new Bbs({
            name:ctx.request.body.name,
            username:ctx.request.body.username,
            password:ctx.request.body.password
        });
        // console.log(newBbs);
        //存储到数据库
        await newBbs.save().then(bbs=>{
            ctx.body = bbs;
        }).catch((err)=>{
            console.log(err)
        });

        //返回json数据
        ctx.body = newBbs;
        
    }
});

module.exports = router.routes();