!function($){
//表单验证提示
const $form = $('.main form');
const $userName = $('#inputUsername');
const $passWord = $('#inputPassword');
const $repeatPw = $('#repeatPassword');
const $Phonenum = $('#inputPhonenum');
//输入合法的开关
let $userSwitch = false;
let $passSwitch = false;
let $repeatSwitch = false;
let $phoneSwithc = false;
//用户名
//点击用户名输入框，隐藏提示label，
$userName.on('focus',function(){
    $('.username-field').find('.placeholder').css({
        display:'none'
    });
    // 显示输入内容的提示
    $('.username-field').find('.error-msg').html('用户名只能使用数字字母下划线，且数字不能开头，长度在6-15之间').css({
        color:'#ccc'
    })
});
$userName.on('blur',function(){
    //如果输入框输入为空，显示提示label，隐藏输入内容提示。
    if($userName.val()==''){
        $('.username-field').find('.placeholder').css({
            display:'block'
        });
        $('.username-field').find('.error-msg').html('');
        $userSwitch = false;
    }else{
        //通过正则判断输入用户名是否符合条件
        let reg = /^[_a-z]\w{5,14}$/i;
        if(reg.test($userName.val())){
            $userSwitch = true;
            //用ajax来判断用户是否存在
            $.ajax({
                type:'post',
                url:'http://localhost:8080/RedBaby/php/registry.php',
                data:{
                    username:$userName.val()
                }
            }).done(function(result){
                if(!result){//用户名不存在
                    $('.username-field').find('.error-msg').html('该用户名可以使用').css({
                        color:'green'
                    });
                    $userSwitch = true;
                }else{//用户名存在
                    $('.username-field').find('.error-msg').html('用户名已存在,请重新输入').css({
                        color:'red'
                    });
                    $userSwitch = false;
                    // alert($userSwitch);
                }
            })
        }else{
            $('.username-field').find('.error-msg').html('用户名非法，请重新输入').css({
                color:'red'
            })
            $userSwitch = false;
        }
    }
});

//密码
//点击密码输入框，隐藏提示label，
$passWord.on('focus',function(){
    $('.password-field').find('.placeholder').css({
        display:'none'
    });
    // 显示输入内容的提示
    $('.password-field').find('.error-msg').html('密码为6-16位数字、字母及特殊符号(@、#)组合').css({
        color:'#ccc'
    })
});
//密码框失去焦点触发事件
$passWord.on('blur',function(){
    if($passWord.val()==''){
        $('.password-field').find('.placeholder').css({
            display:'block'
        });
        $('.password-field').find('.error-msg').html('');
    }else{
        //通过正则判断输入密码是否符合条件
        let reg = /^[0-9a-zA-Z#@]{6,16}$/;
        if(reg.test($passWord.val())){
            $passSwitch = true;
        }else{
            $('.password-field').find('.error-msg').html('密码不符合要求，请重新输入').css({
                color:'red'
            });
            $passSwitch = true;
        }
    }
});
//密码框输入的时候触发强度检测事件
$passWord.on('input',function(){
    //输入长度达到6个时触发安全框的显示
    if($passWord.val().length>=6){
        $('.security-level').css({
            display:'block'
        })
    }else{
        $('.security-level').css({
            display:'none'
        })
    }

    //正则规则
    //低的规则(纯数字纯字母或纯字符)
    let pureNum = /^\d{6,16}$/;//纯数字
    let pureLett = /^[a-zA-Z]{6,16}$/;//纯字母
    let pureSym = /^(#|@){6,16}$/;//纯符号

    //中的规则
    let NumAlett = /^[0-9a-zA-Z]{6,16}$/;//数字字母组合
    let NumAsym = /^[0-9#@]{6,16}$/; //6-16位的数字或者特殊符号
    let letAsym = /^[a-zA-Z#@]{6,16}$/; //6-16位的字母和特殊符号

    //高的规则
    let regStrong = /^[0-9a-zA-Z#@]{6,16}$/;  //6-16位的数字或者字母或者字符

    if(pureNum.test($passWord.val())||pureLett.test($passWord.val())||pureSym.test($passWord.val())){//安全等级低
        $('.password-field').find('.level1').css({
            backgroundColor:'#ffaa00'
        });
        $('.password-field').find('.level2').css({
            backgroundColor:'#cacaca'
        });
        $('.password-field').find('.level3').css({
            backgroundColor:'#cacaca'
        })
        //安全等级低的时候禁用提交按钮
        $passSwitch = false;
        //同时信息提示框进行提示
        $('.password-field').find('.error-msg').html('安全等级低,请重新输入').css({
            color:'red'
        });
    }else if(NumAlett.test($passWord.val())||NumAsym.test($passWord.val())||letAsym.test($passWord.val())){//安全等级中
        $('.password-field').find('.level1').css({
            backgroundColor:'#ffaa00'
        })
        $('.password-field').find('.level2').css({
            backgroundColor:'#ffaa00'
        })
        $('.password-field').find('.level3').css({
            backgroundColor:'#cacaca'
        })
        $passSwitch = true;
        //安全等级的时候禁用提交按钮
        //同时信息提示框进行提示
        $('.password-field').find('.error-msg').html('')
    }else if(regStrong.test($passWord.val())){//安全等级高
        $('.password-field').find('.level1').css({
            backgroundColor:'#ffaa00'
        })
        $('.password-field').find('.level2').css({
            backgroundColor:'#ffaa00'
        })
        $('.password-field').find('.level3').css({
            backgroundColor:'#ffaa00'
        })
        $passSwitch = true;
    }
})


//确认输入密码
$repeatPw.on('focus',function(){
    $('.repeat-psssword').find('.placeholder').css({
        display:'none'
    });
    // 显示输入内容的提示
    $('.repeat-psssword').find('.error-msg').html('再次输入以确认您的密码').css({
        color:'#ccc'
    })
})
$repeatPw.on('blur',function(){
    if($repeatPw.val()==''){
        $('.repeat-psssword').find('.placeholder').css({
            display:'block'
        });
        $('.repeat-psssword').find('.error-msg').html('');
    } 
    if($repeatPw.val()===$passWord.val()){
        $('.repeat-psssword').find('.error-msg').html('两次密码一致').css({
            color:'green'
        });
        $repeatSwitch =true;
    }else{
        $('.repeat-psssword').find('.error-msg').html('两次密码输入不一致').css({
            color:'red'
        });
    }
})

//手机号码输入
$Phonenum.on('focus',function(){
    $('.phonenum-field').find('.placeholder').css({
        display:'none'
    });
    $('.phonenum-field').find('.error-msg').html('请输入手机号').css({
        color:'#ccc'
    })
});
$Phonenum.on('blur',function(){
    if($Phonenum.val()==''){
        $('.phonenum-field').find('.placeholder').css({
            display:'block'
        });
        $('.phonenum-field').find('.error-msg').html('')
    }else{
        //输入不为空做正则判断
        var reg = /^1[3456789]\d{9}$/;
        if(reg.test($Phonenum.val())){
            $('.phonenum-field').find('.error-msg').html('手机号符合要求').css({
                color:'green'
            });
            $phoneSwithc = true;
        }else{
            $('.phonenum-field').find('.error-msg').html('请输入正确的手机号码').css({
                color:'red'
            });
        }
    }
})



// form表单事件
$form.on('submit',function(){
    console.log($userSwitch);
    console.log($passSwitch);
    console.log($repeatSwitch);
    console.log($phoneSwithc);
if(!$userSwitch || !$passSwitch || !$repeatSwitch || !$phoneSwithc)
    return false;
})


}(jQuery);
