!function($){
    const $hrcontent = $('.hotrecommend');
    $.ajax({
        url:'http://localhost:8080/RedBaby/php/index-hot.php',
        dataType:'json'
    }).done(function(data){
        let $strhtml = '<ul class="clear-fix">';
        $.each(data,function(index,value){
            // data-original="${value.url}" alt="" class="lazy" 
            //懒加载这两个属性是重点
            $strhtml += `
            <li class="hrc-item">
                <img data-original="${value.url}" alt="" class="lazy">
                <a href="#"></a>
                <div class="hrc-detail">
                    <span class="hrcd-intro">${value.title}</span>
                    <div class="hrcd-price">
                        <b>
                            <i>¥</i>
                            <span>${value.price}</span>
                        </b>
                    </div>
                </div>
                <span class="hrc-addcart"></span>
            </li>
            `;
        });
        $strhtml += '</ul>';
        $hrcontent.html($strhtml);
        // 添加懒加载
        $(function(){
            $('img.lazy').lazyload({effect:'fadeIn'});
        });
    });

    const floors = $('.storey');
    for(let i=0;i<floors.length;i++){
        // console.log(floors.eq(i).find('.fc-right'));
        $.ajax({
            url:'http://localhost:8080/RedBaby/php/index-hot.php',
            dataType:'json',
            data:{
                page:i+2,
            }
        }).done(function(data){
            let $strhtml = '<ul>';
            $.each(data,function(index,value){
                $strhtml += `
                        <li>
                            <div class="fcr-item-img">
                                <a href="#">
                                    <img data-original="${value.url}" alt="" class="lazy">
                                </a>
                            </div>
                            <div class="fcr-item-itro">
                                <a href="#">${value.title}</a>
                            </div>
                            <div class="fcr-item-price">
                                <p class="fcr-price-now">
                                    <i>¥</i><span>${value.price}</span>
                                </p>
                            </div>
                            <div class="fcr-item-cart">
                                <span></span>
                            </div>
                        </li>
                `;
            });
            $strhtml += '</ul>';
            floors.eq(i).find('.fc-right').html($strhtml);
            // 添加懒加载
            $(function(){
                $('img.lazy').lazyload({effect:'fadeIn'});
            });
        })
    }
    
    
}(jQuery);

                        