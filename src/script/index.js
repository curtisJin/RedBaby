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