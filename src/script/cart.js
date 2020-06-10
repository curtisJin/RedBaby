!function($){
    //1、获取cookie，渲染对应的商品列表
    //2、获取所有的接口数据，判断取值

    function Showlist(sid,num){
        $.ajax({
            url:'http://localhost:8080/RedBaby/php/alldata.php',
            dataType:'json'
        }).done(function(data){
            $.each(data,function(index,value){
                if(sid==value.sid){
                    //克隆隐藏的.cargo标签,包括子元素
                    let $cloneCargo = $('.cargo:hidden').clone(true,true);
                    $cloneCargo.show();
                    $cloneCargo.find('.cargo-img-box').find('img').attr('src',value.url);
                    $cloneCargo.find('.cargo-img-box').find('img').attr('sid',value.sid);
                    $cloneCargo.find('.cargo-title').html(value.title);
                    $cloneCargo.find('.uprice-now').find('em').html(value.price);
                    $cloneCargo.find('.text-count').val(num);

                    //计算单个商品的价格
                    $cloneCargo.find('.nd-price').find('em').html((value.price*num).toFixed(2));//得到的值保留两位小数点
                    //克隆处理后的商品信息插入集合中
                    $('.cargo-info').append($cloneCargo);
                    sumPrice();//计算总价
                }  
            })
        })
    }

    //获取cookie渲染数据
    if($.cookie('cookiesid') && $.cookie('cookienum')){
        let sidarr = $.cookie('cookiesid').split(',');//获取到cookie后转换成数组
        let numarr = $.cookie('cookienum').split(',');//获取到cookie后转换成数组
        $.each(sidarr,function(index,value){
            Showlist(sidarr[index],numarr[index]);
        });
    }

    //计算总价（封装函数）
    function sumPrice(){
        
        let $sum = 0;//选购商品的数量
        let $totalpri = 0;//商品的总价
        $('.cargo:visible').each(function(index,elem){
            if($(elem).find('.ic-check input').prop('checked')){
                $sum += parseInt($(elem).find('.text-count').val());
                $totalpri += parseFloat($(elem).find('.nd-price em').html());
            }
        });
        $('.ctgNum').html($sum);
        $('.sum-num em').html($totalpri.toFixed(2));//保留两位小数
    }
    
    //全选功能
    $('.allchecked').on('change',function(){//change:元素的值发生改变时就会触发
        $('.cargo:visible').find(':checkbox').prop('checked',$(this).prop('checked'));//点击全选的时候将全选按钮的checked属性值赋给所有复选框
        $('.allchecked').prop('checked',$(this).prop('checked'));
        sumPrice();
    });
    //单个商品全部选中以后触发全选
    //单个商品计算总价
    let $uPrice = $('.cargo:visible').find(':checkbox');//匹配所有复选框
    $('.cargo-info').on('change',$uPrice,function(){//将父元素的事件委托给子元素
        if($('.cargo:visible').find(':checkbox').length===$('.cargo:visible').find('input:checked').size()){
            $('.allchecked').prop('checked',true);
        }else{
            $('.allchecked').prop('checked',false);
        }
        sumPrice();
    });

    //改变购买商品数量
    //点击加号增加商品数量
    //通过当前点击事件在其父级下寻找相关元素，直接通过类名会选取到所有的元素，
    $('.plus').on('click',function(){
        let $cargo = $(this).parents('.cargo');
        let $goodsnum = $cargo.find('.text-count').val();
        $goodsnum++;
        //当数量大于1改变减号的背景,解除按钮禁用
        if($goodsnum>1){
            $cargo.find('.min-count').css({
                backgroundPosition:'-87px 0',
                // cursor:"pointer"
            })
        }
        //当数量大于99改变加号背景并且禁用按钮
        if($goodsnum>=9){
            $goodsnum=9;
            $cargo.find('.max-count').css({
                backgroundPosition:'-111px -24px',
                // cursor:'no-drop'
            });
        }

        $cargo.find('.text-count').val($goodsnum);
        //通过当前点击的按钮，在父级元素下找到价格和数量进行计算。
        $cargo.find('.nd-price em').html(oddPrice($(this)));
        sumPrice();
        setCookie($(this));
    });
    // 点击减号减少数量
    $('.minus').on('click',function(){
        let $cargo = $(this).parents('.cargo');
        let $goodsnum = $cargo.find('.text-count').val();
        $goodsnum--;
        //如果小于等于1改变减号的背景，停止点击事件
        if($goodsnum<1){
            $goodsnum = 1;
            $cargo.find('.min-count').css({
                backgroundPosition:'-87px -24px',
            })  
        }
        //如果小于99改变加号的背景
        if($goodsnum<9){
            $cargo.find('.max-count').css({
                backgroundPosition:'-111px 0'
            })
        }

        $cargo.find('.text-count').val($goodsnum);
        //通过当前点击的按钮，在父级元素下找到价格和数量进行计算。
        $cargo.find('.nd-price em').html(oddPrice($(this)));
        sumPrice();
        setCookie($(this));  
    })
    //在商品数量框中输入输入以后计算价格，修改
    $('.text-count').on('input',function(){
        let $reg = /^\d+$/g;//通过正则过滤只能输入数字
        let $value = $(this).val();
        if(!$reg.test($value)){
            $(this).val(1);
            //如果输入非数字，内容置为1
        }
        $(this).parents('.cargo').find('.nd-price em').html(oddPrice($(this)));
        sumPrice();
        setCookie($(this));
    })





    //计算单价(封装)
    function oddPrice(obj){
        //在传入对象的父级找到价格和数量，父级要加具体限制，不然找到所有的父级元素。
        let $dj = parseFloat(obj.parents('.cargo').find('.uprice-now em').html());//获取单价
        let $num = parseInt(obj.parents('.cargo').find('.text-count').val());
        return ($dj*$num).toFixed(2);
    }

    //将改变后的数量存放到cookie中
    let arrsid = [];
    let arrnum = [];
    function cookieTurnArray(){
        if($.cookie('cookiesid')&&$.cookie('cookienum')){
            arrsid = $.cookie('cookiesid').split(',');
            arrnum = $.cookie('cookienum').split(',');
            
        }else{
            arrsid = [];
            arrnum = [];
        }
        
    }
    //设置cookie的函数(封装)
    function setCookie(obj){
        cookieTurnArray();
        let $sid = obj.parents('.cargo').find('.cargo-img-box img').attr('sid');
        arrnum[$.inArray($sid,arrsid)] = obj.parents('.cargo').find('.text-count').val();
        $.cookie('cookienum',arrnum,{expire:10,path:"/"});
    }

    //删除
    function delcookie(sid,arrsid){//sid:当前删除的sid arrsid:存放sid的数组
        let $index = -1;//定义要删除cookie sid的索引位置
        $.each(arrsid,function(index,value){
            if(sid===value){
                $index = index;
            }
        });
        arrsid.splice($index,1);
        arrnum.splice($index,1);

        $.cookie('cookiesid',arrsid,{expires:10,path:'/'});
        $.cookie('cookienum',arrnum,{expires:10,path:'/'});
    }
    //单个删除
    $('.ic-del').on('click',function(){
        cookieTurnArray();
        if(window.confirm('你确定要删除吗？')){
            $(this).parents('.cargo').remove();
            delcookie($(this).parents('.cargo').find('.cargo-img-box img').attr('sid'),arrsid);
            sumPrice();
        }
    });
    //删除选中商品
    $('.del-check').on('click',function(){
        //将cookie转换成数组
        cookieTurnArray();
        if(window.confirm('你确定要删除选中商品吗？')){
            $('.cargo:visible').each(function(){
                if($(this).find(':checkbox').is(':checked')){//判断当前复选框是否选中
                    $(this).remove();
                    //在当前cargo元素下找到img在找到sid
                    delcookie($(this).find('img').attr('sid'),arrsid);
                }
            });
            sumPrice();
        }
    })
}(jQuery);