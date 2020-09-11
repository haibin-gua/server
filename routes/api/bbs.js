const Router = require('koa-router');
const bcrypt = require ('bcryptjs');
const tools = require('../../config/tools'); 
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');

const router = new Router();
//引入Bbs
const Bbs = require('../../models/Bbs');

//test
router.get('/test',async(ctx)=>{
    ctx.status = 200;
    ctx.body = {
        msg:'bbs works..'
    }
});

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
            password:tools.enbcrypt(ctx.request.body.password)
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

//登录接口
router.post('/login',async(ctx)=>{
    //查询
    const findResult = await Bbs.find({username:ctx.request.body.username});
    const password = ctx.request.body.password;
    const bbs = findResult[0];
    //判断查没查到
    if(findResult.length == 0){
        ctx.status = 404;
        ctx.body = {username:'用户不存在'};
    }else{
        //查到后验证密码
        var result =  await bcrypt.compareSync(password,bbs.password)

        //验证通过
        if(result){
            // 返回token
            const payload = {id:bbs.id,name:bbs.name,username:bbs.username};
            const token = jwt.sign(payload,'secret',{expiresIn:3600});

            ctx.status = 200;
            ctx.body = {success:true,token:"Bearer " + token};
        }else{
             ctx.status = 400;
             ctx.body = {password:'密码错误'}
        }
    }
});


router.get('/current',passport.authenticate('jwt', { session: false }),async(ctx)=>{
    // ctx.body = {success:true};
    ctx.body = {
        id:ctx.state.user.id,
        name:ctx.state.user.name,
        username:ctx.state.user.username
    }
});


module.exports = router.routes();