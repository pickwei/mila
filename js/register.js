$(function(){
//  框变红
    $(".form-group").click(function(){
        $(this).find('input').addClass("active");
        $(this).siblings(".form-group").find('input').removeClass("active");
    })
});


//获取验证码
var CanSubmit=false;
$('.get_code').click(function(){
    if($("#tel").val()==""){
        $("#tel_msg").html("手机号不能为空!");
        CanSubmit=false;
    }else{
        var timer=null;
        var count=60;
        var curCount;
        console.log('获取验证码已点击');
        sendMessage();
        function sendMessage(){
            curCount=count;
            $(".get_code").attr("disabled","true"); /*阻止重复点击  带来的定时器叠加负面问题*/
            $(".get_code").html(curCount+"秒后重新输入");
            timer=setInterval(setTime,1000);
        }
        function setTime(){
            if(curCount==0){
                clearInterval(timer);
                $(".get_code").removeAttr("disabled"); /*阻止重复点击  带来的定时器叠加负面问题*/
                $(".get_code").html("重新获取验证码");
            }else{
                curCount--;
                $(".get_code").html(curCount+"秒后重新输入");
            }
        }
    }

});

/**用户名输入验证**/
$('#uname').blur(function(){
      console.log("uname失去焦点");
      var username=$('#uname').val();
      var reg = new RegExp(/^[0-9a-zA-Z\u4e00-\u9fa5]+$/g);
      if(username==''){
          $('#uname_msg').html('用户名不能为空');
           CanSubmit=false;
      }else if(username.length<6){
          $('#uname_msg').html('用户名不能小于6个字符');
           CanSubmit=false;
      }else if(username.length>12){
          $('#uname_msg').html('用户名不能大于12个字符');
           CanSubmit=false;
      }else if(!reg.test(username)){
          $('#uname_msg').html('用户名只能由汉字、字母、数字组成');
          CanSubmit=false;
      }else{
          $.ajax({
              type: 'POST',
              /**
               接收客户端注册时提交的用户名，验证是否被占用，存在输出exist 不存在输出  inexistence
               **/
              url: 'data/2_register.php',
              data: {"uname":username},
              success: function(txt){
                  console.log(txt);
                  if(txt==='err'){  //用户名或密码错误
                      $('#uname_msg').html('用户名已经被占用');
                       CanSubmit=false;
                  }else if(txt==='ok'){   //登录成功
                      $('#uname_msg').html('用户名可用');
                       CanSubmit=true;
                  }else { //其它错误
                      $('#uname_msg').html(txt);
                       CanSubmit=false;
                  }
              }
          });
      }
});
/*密码判断*/
$('#upwd').blur(function(){
    //检测密码由6-18字母和数字组成，不能是纯数字或纯英文
     var reg=new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/g);
    //^(?![a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{10,20}$
        if($("#upwd").val()==""){
            $("#Password_msg").html("密码不能为空");
            $("#Password_msg").show();
             CanSubmit=false;
        }else if(!reg.test($("#upwd").val())){
            $("#Password_msg").text("密码由6-18字母和数字组成，不能是纯数字或纯英文");
            $("#Password_msg").show();
            CanSubmit=false;
        }else{
            $("#Password_msg").text("密码符合规范");
             CanSubmit=true;
        }
});

/*确认密码判断*/
$('#Confirm_upwd').blur(function(){
    if($("#Confirm_upwd").val()==""){
        $("#Confirm_upwd_msg").html("请输入确认密码");
        CanSubmit=false;
    }else if($("#Confirm_upwd").val()!=$("#upwd").val()){
        $("#Confirm_upwd_msg").html("两次输入的密码不一致");
         CanSubmit=false;
    }else{
        $("#Confirm_upwd_msg").html("确认密码符合规范");
         CanSubmit=true;
    }
});

/*手机号验证判断*/
$('#tel').blur(function(){
    var reg=new RegExp(/^1[34578]\d{9}$/);
    if($("#tel").val()==""){
        $("#tel_msg").html("手机号不能为空!");
        CanSubmit=false;
    }else if(!reg.test($("#tel").val())){
        $("#tel_msg").html("请输入11位有效手机号");
        CanSubmit=false;
    }else{
        $("#tel_msg").html("手机号可注册");
        CanSubmit=true;
    }
});


/** 点击注册按钮 **/
$('#bt-login').click(function(e){
    e.preventDefault();
    if(CanSubmit){
       console.log(CanSubmit);
        var username=$('#uname').val();
        var upwd=$('#upwd').val();
        var tel=$('#tel').val();
        $.ajax({
            type: 'POST',
            /**
             接收客户端注册时提交的用户名，密码，电话，插入数据库
             **/
            url: 'data/3_user_add.php',
            data: {"uname":username,"upwd":upwd,"tel":tel},
            success: function(txt){
                console.log(txt);
                if(txt.msg==='insert err'){  //说明添加失败
                    alert("注册失败！！！")
                }else if(txt.msg==='insert succ'){   //登录成功
                    setTimeout(function(){
                       location.href='index.html';
                    },3000);
                     alert("注册成功！！！ 3s后跳转到首页");
                }else { //其它错误
                    alert("服务器繁忙，请稍后再试！！！")
                }
            }
        });
    }else{
        alert('请完整填写注册资料');
    }

});
