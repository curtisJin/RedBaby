!function($){
    //接受列表页传来的sid截取获得对应数值
    let $sid = location.search.substring(1).split('=')[1];
    
    // 放大前的图片
    const $imgview = $('.img-view img');
    //放大的图片 
    const $imgZoom = $('.imgzoom-pop img');
    //标题名称
    const $title = $('#itemNameZyP');
    //价格
    const $price = $('.mainprice');

    //如果$sid不存在，默认设为1
    if(!$sid){
        $sid = 1;
    }

    //将获取到的sid传递给后端
    $.ajax({
        url:"http://localhost:8080/RedBaby/php/getsid.php",
        data:{
            sid:$sid
        },
        dataType:'json'
    }).done(function(data){
        // console.log(data);
        $imgview.attr('src',data.url);
        $imgview.attr('sid',data.sid);//给图片添加唯一的sid属性
        $imgZoom.attr('src',data.url);
        $title.text(data.title);
        $price.html(data.price);
        //渲染小图
        let picarr = data.piclisturl.split(',');
        let $strHtml = '';
        $.each(picarr,function(index,value){
            $strHtml += `
            <li>
            <a href="#">
                <img src="${value}" alt="">
            </a>
        </li>
            `;
        });
        $('.imgzoom-thumb-main ul').html($strHtml);
    });

    //放大镜效果
    
    //放大前图片盒子
    const $imgzoomMain = $('.imgzoom-main');
    //放大镜
    const $imgzoomGlass = $('.imgzoom-glass');
    //放大后图片的框
    const $imgzoomPop = $('.imgzoom-pop');
    //小图列表
    const $splist = $('.imgzoom-thumb-main');

    //比例小放：大放 = 1:2
    let $rate = $imgzoomPop.width()/$imgzoomGlass.width();
    // console.log($rate);//2
    //放大效果
    $imgzoomMain.hover(function(){
        $imgzoomGlass.css('display','block');
        $imgzoomPop.css('display','block');
        $(this).on('mousemove',function(ev){
            let $leftvalue = ev.pageX-$('.imgzoom-main').offset().left-$imgzoomGlass.width()/2;
            let $topvalue = ev.pageY-$('.imgzoom-main').offset().top-$imgzoomGlass.height()/2;
            if($leftvalue<0){
                $leftvalue = 0;
            }else if($leftvalue >=$imgzoomMain.width()-$imgzoomGlass.width()){
                $leftvalue = $imgzoomMain.width()-$imgzoomGlass.width();
            }
            if($topvalue<0){
                $topvalue = 0;
            }else if($topvalue >= $imgzoomMain.height()-$imgzoomGlass.height()){
                $topvalue = $imgzoomMain.height()-$imgzoomGlass.height();
            };
            $imgzoomGlass.css({
                left:$leftvalue,
                top:$topvalue
            });
            $imgZoom.css({
                left:-$leftvalue*$rate,
                top:-$topvalue*$rate
            })
        })
    },function(){
        $imgzoomGlass.css('display','none');
        $imgzoomPop.css('display','none');
    });

    //小图切换
    $(".imgzoom-thumb-main ul").on('mouseover','li',function(){
        let $imgsrc = $(this).find('img').attr('src');
        $imgview.attr('src',$imgsrc);
        $imgZoom.attr('src',$imgsrc);
    });



    //通过cookie来做添加购物车的操作;
    ////购物车的注意事项
    //1.购物车的核心存储什么：
    //商品的编号：
    //商品的数量：

    //2、怎么存储--数组
    //cookie中的数据已字符串形式存储，数组存进去以后会变成字符串
    let arrsid = [];//存储商品编号
    let arrnum = [];//存储添加的商品数量
    //3、点击加入购物车按钮
    //第一次点击：在购物车列表创建商品列表
    //非首次点击：之前创建过的列表中增加数量即可

    //判断是不是第一次需要从cookie中取出arrnum判断
    //封装一个cookie转数组的函数
    function cookieTurnArray(){
        if($.cookie('cookiesid') && $.cookie('cookienum')){
            arrsid = $.cookie('cookiesid').split(',');//获取sid和数量并转换成数组
            arrnum = $.cookie('cookienum').split(',');
        }else{
            arrsid = [];
            arrnum = [];
        }
    };

    //点击添加cookie
    $('#addCart').on('click',function(){
        //获取当前商品的sid
        let $getsid = $imgview.attr('sid');
        console.log($getsid);
        //判断是否为第一次点击
        //$.inArray(value,array,[fromIndex])
        //确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
        cookieTurnArray();
        if($.inArray($getsid,arrsid) != -1){//$sid存在，商品列表存在，数量累加
            //先取出cookie中存在的数量+当前添加的数量，一起添加到cookie中。
            console.log($.inArray($getsid,arrsid));
            let $num = parseInt(arrnum[$.inArray($getsid,arrsid)]) + parseInt($('#inputbuyCount').val());//取值
            arrnum[$.inArray($getsid,arrsid)] = $num; //赋值
            $.cookie('cookienum',arrnum,{expires:10,path:'/'});
        }else{
            //第一次点击加入购物车按钮,将商品的sid和商品的数量放到提前准备的数组里面，然后将数组传入cookie.
            arrsid.push($getsid);//将商品编号放入数组中
            console.log(1);
            $.cookie('cookiesid',arrsid,{expires:10,path:'/'});
            arrnum.push($('#inputbuyCount').val());//将输入框中的值传入数组
            $.cookie('cookienum',arrnum,{expires:10,path:'/'});
        }
        
        //点击添加购物车弹出跳转按钮
        $('.tips').show(300);
    })

    //点击购物车弹窗右上角关闭窗口
    $('.tips-close').click(function(){
        // alert(111);
        $('.tips').hide(300);
    });
}(jQuery);

// 点击购买数量加减符号改变value值
!function($){
    let buynum= $('#inputbuyCount').val();
    // $('.minus').click(function(){
    //     buynum--;
    //     $('#inputbuyCount').val() = buynum;
    // });

    // 增加按钮
    $('.plus').click(function(){
        //改变input里的数值
        buynum++;
        $('#inputbuyCount').val(buynum);
        //大于1时改变左按钮的背景
        if(buynum>1){
            $('.minus').addClass('notminus');
        }
        if(buynum>=9){
            $('.plus').addClass('maxplus');
            //移除点击事件
            $('.plus').unbind();
        }
    });

    //减少按钮
    $('.minus').click(function(){
        buynum--;
        $('#inputbuyCount').val(buynum);
        //小于99时改变右按钮的背景
        if(buynum<9){
            $('.plus').removeClass('maxplus');
        }
        //小于1时改变左按钮背景
        if(buynum<=1){
            $('.minus').removeClass('notminus');
            //移除点击事件
            $('.minus').unbind();
        }
    });

    // //输入框输入数字失去焦点后改变value值
    // $('#inputbuyCount').change(function(){
    //     let buynum=$('#inputbuyCount').val();
    //     $('#inputbuyCount').val(buynum);
        
    // })
}(jQuery)