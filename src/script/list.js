!function($){
    let before_sort =[];//排序之前的数组;
    let now_sort = [];//排序过程中的数组;

    let before =null;
    let after = null;

    //渲染商品列表第一页；
    const $pList = $('.product-list-box');
    $.ajax({
        url:'http://localhost:8080/RedBaby/php/listdata.php',
        dataType:'json'
    }).done(function(data){
        let $listHtml = '<ul class="clear-fix">';
        $.each(data,function(index,value){
            $listHtml += `
                <li class="p-item">
                    <div class="product-box">
                        <!-- 产品图片 -->
                        <div class="proImg">
                            <a href="detail.html?sid=${value.sid}" target="_blank"">
                                <img class="lazy" data-original="${value.url}" alt="">
                            </a>
                        </div>
                        <!-- 产品信息 -->
                        <div class="proInfo">
                            <div class="price-box">
                                <span class="common-price"><i>¥</i>${value.price}</span>
                            </div>
                            <!-- 销售标题 -->
                            <div class="sell-title">
                                <a href="detail.html?sid=${value.sid}" target="_blank"">
                                    ${value.title}
                                </a>
                            </div>
                        </div>
                        <!-- 产品操作 -->
                        <div class="proOpt">
                            <div class="num-select">
                                <input type="text" class="goodsNum" value="1">
                                <div class="add-reduce">
                                    <a href="#" class="add"></a>
                                    <a href="#" class="reduce"></a>
                                </div>
                            </div>
                            <!-- 加入购物车 -->
                            <a class="addSPcart"><i></i>加入购物车</a>
                        </div>
                    </div>
                </li>
            `;
        });
        $listHtml += '</ul>';
        $pList.html($listHtml);

        // 添加懒加载
        $(function(){
            $('img.lazy').lazyload({effect:'fadeIn'});
        });

        before_sort =[];
        now_sort = [];

        before =null;
        after = null;
        //将ul中的li元素放入数组中
        $('.product-list-box li').each(function(index,element){
            before_sort[index]=$(this);
            now_sort[index]=$(this);
            // console.log(now_sort);
        })
    });


    //分页插件
    //通过get请求将page发送给后端。
    $('.ps-mybox').pagination({
        pageCount: 3,//总的页数，自己设定的，也可以从后端获取
        jump: true,//是否开启跳转到指定的页数，布尔值。
        coping: true,//是否开启首页和尾页，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function (api) {
            console.log(api.getCurrent());//将点击获取到的page页码数发送给后端
            $.ajax({
                url: 'http://localhost:8080/RedBaby/php/listdata.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function (data) {
                let $listHtml = '<ul class="clear-fix">';
                $.each(data,function(index,value){
                    $listHtml += `
                        <li class="p-item">
                            <div class="product-box">
                                <!-- 产品图片 -->
                                <div class="proImg">
                                    <a href="detail.html?sid=${value.sid}" target="_blank"">
                                        <img class="lazy" data-original="${value.url}"/>
                                    </a>
                                </div>
                                <!-- 产品信息 -->
                                <div class="proInfo">
                                    <div class="price-box">
                                        <span class="common-price"><i>¥</i>${value.price}</span>
                                    </div>
                                    <!-- 销售标题 -->
                                    <div class="sell-title">
                                        <a href="detail.html?sid=${value.sid}" target="_blank"">
                                            ${value.title}
                                        </a>
                                    </div>
                                </div>
                                <!-- 产品操作 -->
                                <div class="proOpt">
                                    <div class="num-select">
                                        <input type="text" class="goodsNum" value="1">
                                        <div class="add-reduce">
                                            <a href="#" class="add"></a>
                                            <a href="#" class="reduce"></a>
                                        </div>
                                    </div>
                                    <!-- 加入购物车 -->
                                    <a class="addSPcart"><i></i>加入购物车</a>
                                </div>
                            </div>
                        </li>
                    `;
                });
                $listHtml += '</ul>';
                $pList.html($listHtml);

                //添加懒加载
                $(function(){
                    $('img.lazy').lazyload({effect:'fadeIn'});
                });

                before_sort =[];
                now_sort = [];

                before =null;
                after = null;
                //将ul中的li元素放入数组中
                $('.product-list-box li').each(function(index,element){
                    before_sort[index]=$(this);
                    now_sort[index]=$(this);
                });
            });
        }
    });

    //3、点击排序按钮进行排序(利用冒泡算法)

    //点击综合按钮进行综合默认排序
    $('.p-sort span').eq(0).on('click',function(){
        //$.each()相当于jQuery.each()可以遍历数组和对象，不同于遍历jQuery对象的$().each()
        $.each(before_sort,function(index,value){
            $(".product-list-box ul").append(value);
        });
        return;
    });
    //点击价格按钮切换价格排序方式
    let priceSwitch = null;
    $('.p-sort span').eq(-1).on('click',function(){
        if(!priceSwitch){
            for(let i=0;i<now_sort.length-1;i++){
                for(let j=0;j<now_sort.length-i-1;j++){
                    before = parseFloat(now_sort[j].find('.common-price').text().substring(1));
                    // 提取价格这一块需要注意的是元素与文字之间不要换行，不然会留下很懂空格，导致提取价格失败。
                    // console.log(before);
                    after = parseFloat(now_sort[j+1].find('.common-price').text().substring(1));
                    // 通过比较价格改变li的位置
                    if(before>after){
                        let temp = now_sort[j];
                        now_sort[j]=now_sort[j+1];
                        now_sort[j+1]=temp;
                    }
                }
            }
            $.each(now_sort,function(index,value){
                // console.log(value);
                $('.product-list-box ul').append(value);
            });
            priceSwitch = true;
            console.log(priceSwitch);
        }else{
            for(let i=0;i<now_sort.length-1;i++){
                for(let j=0;j<now_sort.length-i-1;j++){
                    before = parseFloat(now_sort[j].find('.common-price').text().substring(1));
                    // console.log(before);
                    after = parseFloat(now_sort[j+1].find('.common-price').text().substring(1));
                    // 通过比较价格改变li的位置
                    if(before<after){
                        let temp = now_sort[j];
                        now_sort[j]=now_sort[j+1];
                        now_sort[j+1]=temp;
                    }
                }
            }
            $.each(now_sort,function(index,value){
                // console.log(value);
                $('.product-list-box ul').append(value);
            });
            priceSwitch = null;
        }
    });
}(jQuery);