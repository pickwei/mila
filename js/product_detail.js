/**页面加载完后，异步请求页头和页尾**/
$(function(){
    $('div#header').load('header.php', function(){
        //判断当前是否已经登录，修改欢迎消息
        var uname = sessionStorage['LoginName'];
        if(uname){
            $('#welcome').html('欢迎回来：'+'<a href="#">'+uname+'</a>'+'<a href="#" id="logout" >注销登录</a>');
        }
    });
    $('div#footer').load('footer.php');



    var str=location.href;
    var pid=str.substr(str.lastIndexOf("=")+1);
    console.log(pid);
    $(function(){
        var html="";
        $.ajax({
            type:"POST",
            url:"data/10_product_detail.php",
            data:{pid:pid},
            success:function(d){
                console.log(d);
                html=`
                      <div class="pd_info clearfloat">
                            <div class="pdinfo_img">
                                <img src="${d.pic}" alt=""/>
                            </div>
                            <div class="pdinfo_text">
                                <h2>${d.pname}</h2>
                                <ul>
                                    <li>型号：波罗的海琥珀</li>
                                    <li>${d.pname}</li>
                                    <li>${d.detail}</li>
                                </ul>
                                <p>价格：<span>¥</span><strong id="price">${d.price}</strong></p>
                                <a href="" id="addCart"><span class="icon_cart"></span>加入购物车</a>
                                <div class="alert"></div>
                            </div>
                      </div>
                      <div class="details_box">
                            <h2 class="title">产品详情</h2>
                            <div class="pd_details">
                                <p>${d.detail}</p>
                                <img src="${d.pic_lg}" alt="${d.detail}"/>
                            </div>
                      </div>
                `;
                $('.detail').html(html);
            }
        })
    });
    //加入购物车
    $(".detail").on('click','#addCart',function(e){
        e.preventDefault();
        console.log(e.target.tagName);
        var n=4;
        if(!sessionStorage['LoginName']){//如果未登录
            alert("请先登录");
            var timer = setInterval(function(){
                n--;
                $(".alert").html(n+"秒跳转到登录页面");
                if(n<1){
                    location.href="login.html";
                    clearInterval(timer);
                    timer=null;
                }
            },1000);
        }else{
            var uname=sessionStorage['LoginName'];
            $.ajax({
                type:"POST",
                url:"data/6_cart_detail_add.php",
                data:{uname:uname,pid:pid},
                success:function(d){
                    console.log(d);
                    if(d.code==1){
                        alert("添加成功")
                    }
                }
            })
        }
    })
});
