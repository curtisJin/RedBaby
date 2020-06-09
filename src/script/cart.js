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

    })
}(jQuery);