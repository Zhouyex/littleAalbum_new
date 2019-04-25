var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
exports.showIndex = (req,res) =>{
    //读取文件夹，获取相册数组
    var arr = [];
    fs.readdir('./upload/',(err,file)=>{
        if(err){res.send('文件读取错误！')}
        else{
            file.map((item,index)=>{
                var data = fs.statSync('./upload/'+item,data)
                if(data.isDirectory)
                {
                    arr.push(item);
                }
            })
            // console.log(arr,1111);//可以输出

            var imgList = {
                albumName : arr
            }
            res.render('index',imgList)

        }
    })

    // res.render('index');
}

//进入文件夹的相册
exports.showImg = (req,res) =>{
    // console.log(req.params)
    //获取文件夹名字
    var imgname = req.params.phoName;

    //定义空数组 存放map出来的文件
    var imgList = [];
    fs.readdir('./upload/'+imgname,(err,file)=>{
        if(err){res.render('404')}
        else{
            
            //展示图片文件  此时需要检测文件 然后 展示图片
            file.map((item,index)=>{
                //使用同步检测方法
                var data = fs.statSync('upload/'+imgname+'\\'+item,data);
                if(data.isFile())
                {
                    imgList.push(item)
                }
            })

            var dataList = {
                imgs:imgList,
                // 相册名字 传到模板的面包屑
                xcname:imgname
            }
            // console.log(imgList);//可以正确打印
            //把图片渲染出来吧
            res.render('showImgs',dataList)

            // res.send('检测成功');

        }
    })


    // res.render('showImgs')
}

//开始创建文件夹（相册）
//把创建页面渲染出来
exports.createDir = (req,res) =>{
    // res.send('success');
    res.render('createDirpage');
}



//创建相册（文件夹）
exports.cjDir = (req,res) => {

    //获取数据 根据数据 创建文件夹
    var form = new formidable.IncomingForm();

    //开始处理 获取数据
    form.parse(req,(err,filed,file)=>{
        if(err){res.send('创建文件夹失败')}
        else{
            // res.render('test'); //可以进去
        //    console.log(filed,44444); 
        //    console.log(filed.wjjName);
           //开始创建文件夹
           fs.mkdir('upload/'+filed.wjjName,(err)=>{
               if(err){res.send('文件夹创建失败')}else{
                   //文件夹创建成功
                   //重定向  
                   res.redirect('http://127.0.0.1:7777')
               }
           })

        //    res.send('ok');
        }
        
    })
}



//跳转到 文件上传页面
exports.toUploadpage = (req,res)=>{
    //把相册文件夹数据放到 上传文件的那个 select 中 以供选择上传文件的相册
    var albumwjj = [];
    fs.readdir('./upload',(err,file)=>{
        if(err){res.send('目录读取失败')}
        else{
            //检测文件夹
            file.map((item,index)=>{
            var data = fs.statSync('upload/'+item,data)

            if(data.isDirectory()){
                albumwjj.push(item)
            }
            })

            //模板中使用的就是 albums!!!!!
            var dataList = {
                albums : albumwjj
            }

            res.render('upload',dataList)
        }
    })

    // res.render('upload');
}

//文件开始上传
exports.dealupload = (req,res)=>{
    //开始对上传文件进行处理
    var form = formidable.IncomingForm();
    form.uploadDir = './temp/';
    form.parse(req,(err,filed,file)=>{
        // console.log(filed);
        // console.log(filed.albumName);
        // console.log(file);
        var oldDir = file.pic.path;
        var newDir = 'upload/'+filed.albumName+'\\'+new Date().getTime()+path.extname(file.pic.name);

        fs.rename(oldDir,newDir,(err)=>{
            if(err)
            {
                res.send('图片上传失败！');
            }else{
                res.redirect('http://127.0.0.1:7777/'+filed.albumName)
            }
        })

        // res.send('文件上传')

    })


    // res.send('上传');
}




