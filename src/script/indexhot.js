!function($){
    const $hrcontent = $('.hr-content');
    $.ajax({
        url:'http://localhost:8080/RedBaby/php/index-hot.php',
        dataType:'json'
    }).success(function(data){
        let $strhtml = '<ul class="clear-fix">';
        $.each(data,function(index,value){
            $strhtml += `
            <li class="hrc-item">
                <img src="${value.url}" alt="">
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
    })
}(jQuery);