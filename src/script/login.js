!function($){
    // input获得焦点时placeholder为空
    $('#userName').on('focus',function(){
        $(this).attr('placeholder','');
    });
    $('#userName').on('blur',function(){
        if($(this).val()===''){
            $(this).attr('placeholder','用户名/手机/邮箱/');
        }
    });
    $('#passWord').on('focus',function(){
        $(this).attr('placeholder','');
    });
    $('#passWord').on('blur',function(){
        if($(this).val()===''){
            $(this).attr('placeholder','密码');
        } 
    });

    //点击登录发送用户名密码
    $('.login-submit').on('click',function(){
        $.ajax({
            type:"post",
            url:'http://localhost:8080/RedBaby/php/login.php',
            data:{
                user:$('#userName').val(),
                // 获取密码是注意编码的转换，要加hex_sha1
                password:hex_sha1($('#passWord').val())
            }
        }).done(function(res){
            if(res){
                //跳转首页
                location.href ='./index.html';
                //保存用户名到localstorage
                localStorage.setItem('username',$('#userName').val());
                $('.login-error').css({
                    display:'none'
                })
            }else{
                // 用户名密码错误将密码重置
                $('#passWord').val('');
                $('.login-error').css({
                    display:'block'
                })
            }
        })
    })
}(jQuery)