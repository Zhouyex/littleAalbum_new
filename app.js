var express = require('express');

//引入自己封装的模块
var router = require('./index');

var app = express();


app.set('view engine','ejs');
//加载静态资源
app.use(express.static('./node_modules/'));
app.use(express.static('./static/'));
app.use(express.static('./upload/'))

// app.get('/',(req,res)=>{
//     // res.send('success');
//     // res.render('index');

// })

app.get('/',router.showIndex);
//跳转到创建页面
app.get('/createDir',router.createDir);

//跳转到上传页面
app.get('/upload',router.toUploadpage);

app.get('/:phoName',router.showImg);


//点击创建后 实现 注意：post方式
app.post('/createDir',router.cjDir);

//点击提交后 文件上传
app.post('/upload',router.dealupload);

//拦截 404
app.use((req,res)=>{
    res.render('404');
})

app.listen(7777);

