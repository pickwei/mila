//为“登录”按钮绑定监听函数，实现异步登录验证**/
$('#bt-login').click(function(){
    var uname = $('[name="uname"]').val();
    var upwd = $('[name="upwd"]').val();
    //异步提交给服务器进行验证
    $.ajax({
        type: 'POST',
        url: 'data/1_login.php',
        data: {"uname":uname, "upwd":upwd},
        success:function(d){
            console.log(d);
            console.log(d.code);
            if(d.code==1){//表示登录成功
                sessionStorage['LoginName']=d.uname;
                history.go(-2);
            }else{//登录不成功
                $("p.help-block").html("用户名或者密码不正确");
                alert('请认真检查用户名或密码');
            }
        }
    });
});