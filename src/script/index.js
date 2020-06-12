!function($){
    let $catalogItem = $('.catalog-item');
    let $catalogSItem = $('.catalog-second-item');

    // 鼠标进入显示
    $catalogItem.on('mouseover',function(){
        $catalogSItem.eq($(this).index()).show().siblings('.catalog-second-item').hide();
    });
    // 鼠标离开隐藏
    $catalogItem.on('mouseout',function(){
        $catalogSItem.hide();
    });
    //鼠标进入二级菜单继续显示
    $catalogSItem.on('mouseover',function(){
        $(this).show();
    });
    //鼠标离开二级菜单隐藏
    $catalogSItem.on('mouseout',function(){
        $(this).hide();
    });

    //根据本地信息，显示用户信息
    if(localStorage.getItem('username')){
        $('#reg-bar-node').hide();
        $('#loginsuccess').show();
        $('#loginsuccess span').html(localStorage.getItem('username'));
    }
    //点击退出，清除localStorage
    $('.login-quit').on('click',function(){
        $('#reg-bar-node').show();
        $('#loginsuccess').hide();
        localStorage.removeItem('username');
    })
}(jQuery);

!function($){
    class Carousel {
        constructor(){
            // 淡入淡出轮播图
            this.hsBanner = $('.hs-banner');
            // 图片的ul
            this.bannerUl = $('.bannerLi');
            //图片的li
            this.picli = this.bannerUl.children();
            //点击的圆点
            this.bdPage = $('.bd-page li');
            //左边的箭头
            this.leftarow = $('.pre');
            //右边的箭头
            this.rightarow = $(".next");
            this.index = 0;
            //左右箭头
            this.arrow = $('.hs-banner-arr');
        }
        // 初始化
        init(){
            let _this = this;
            let mytimer = null;
            this.bdPage.on('click',function(){
                _this.index = $(this).index();//获取到当前点击按钮的下标
                _this.Switch();
            });

            // 左右箭头事件
            this.rightarow.on('click',function(){
                _this.rightevent();
            });
            this.leftarow.on('click',function(){
                _this.leftevent();
            });
            // 自动轮播
            mytimer = setInterval(function(){//不支持箭头函数
                _this.rightarow.click();
            },5000);


            //鼠标移入移出开启停止轮播图
            this.hsBanner.on('mouseover',function(){
                clearInterval(mytimer);
                _this.arrow.show();
            });
            this.hsBanner.on('mouseout',function(){
                _this.arrow.hide();
                mytimer = setInterval(function(){
                    _this.rightarow.click();
                },5000);
            });
        }



        // 封装的淡入淡出函数
        Switch(){
            this.bdPage.eq(this.index).addClass('bd-now').siblings('.bd-page li').removeClass('bd-now');
            this.picli.eq(this.index).stop(true).animate({
                opacity:1
            }).siblings(".bannerLi li").stop(true).animate({
                opacity:0
            })
        };
        rightevent(){
            this.index++;
            if(this.index>this.bdPage.length-1){
                this.index = 0;
            }
            this.Switch();
        };
        leftevent(){
            this.index--;
            if(this.index<0){
                this.index = this.bdPage.length-1;
            }
            this.Switch();
        }
    }
    new Carousel().init();
}(jQuery);

//楼梯效果
!function($){
    //获取楼梯和楼层元素
    const $stairs = $('.fs-items li');
    const $floorS = $('.storey');
    //顶部悬浮效果和楼梯颜色变化
    function Scroll (){
        $(window).scroll(function(){
            //$(this).scrollTop()滚动条距离顶部的距离
            let topDistance = $(this).scrollTop();
            if(topDistance>1472){
                $('.fixed-stairs').css({
                    position:'fixed',
                    top:'0px',
                    left:'50%',
                    marginLeft:'-50%',
                    marginTop:'0'
                })
                //楼层margin-top:29px;
                $('.floors-wrap').css({
                    marginTop:'56px'
                })
            }else{
                $('.fixed-stairs').css({
                    position:'static',
                    marginTop:'26px',
                    marginLeft:'0'
                })
                //楼层margin-top:3px;
                $('.floors-wrap').css({
                    marginTop:'3px'
                })
            }
            //拖动滚轮显示对应楼层效果
            $floorS.each(function(index,ele){
                let $floorTop = $(this).offset().top + $(this).height()/2;
                if($floorTop>topDistance){
                    $stairs.find('a').removeClass('moveNow');
                    $stairs.eq(index).find('a').addClass('moveNow');
                    return false;
                }
            })
        });
    }
    Scroll();
    
    //点击楼梯li获取对应的top值进行跳转
    $stairs.on('click',function(){
        //点击的时候会触发滚轮的滑动事件，进而触发楼梯背景的滑动，解决办法就是取消滚轮事件
        $(window).off('scroll');

        //点击当前li在其父级下找到a标签移出moveNow，给当前点击的添加类名
        $(this).parents('.fs-items').find('a').removeClass('moveNow');
        $(this).find('a').addClass('moveNow');
        // console.log($(this).index());
        let floorTop = $floorS.eq($(this).index()).offset().top;
        $('html,body').animate({
            scrollTop:floorTop 
        },function(){
            Scroll();//点击结束继续滚轮事件
        })
    })
}(jQuery)