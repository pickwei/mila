
/**功能点1：页面加载完后，异步请求页头和页尾**/
$(function(){
    $('div#header').load('header.php', function(){
        //判断当前是否已经登录，修改欢迎消息
        var uname = sessionStorage['LoginName'];
        if(uname){
            $('#welcome').html('欢迎回来：'+'<a href="#">'+uname+'</a>'+'<a href="#" id="logout" >注销登录</a>');
        }

        $('.nav_bar li').hover(function(){
            $(this).find('.nav_box').css({'display': ' block'});
            $(this).siblings().find('.nav_box').css({'display': 'none'})
        },function(){
            $(this).find('.nav_box').css({'display': 'none'});
        });
        navText('蜜蜡首饰');

    });
    $('div#footer').load('footer.php');
});

$('#header').on('click','#logout',function(e){
    e.preventDefault();
    sessionStorage.removeItem('LoginName');
    location.href="login.html";
});

//分页查询指定页面上的产品信息，并重新创建分页条
function loadProduct(pageNum){
    $.ajax({
        type: 'GET',
        url: 'data/9_product_select.php',
        data: {'pageNum': pageNum},
        success: function(pager){
            //解析服务器端返回的JSON数组，转换为HTML片段，追加到产品列表中
            var html = "";
            $.each(pager.data, function(i, p){
                console.log(p.pid);
                html += `
					 <li>
                        <a href=""><img src="${p.pic}" alt=""/></a>
                        <div class="pdlist_text clearfloat">
                        <h3>
                            <p>${p.pname}</p>
                            <span>￥<em>${p.price}</em></span>
                        </h3>
                        <a href="product_detail.html?pid=${p.pid}">查看详情</a>
                        </div>
                    </li>
				`;
            });
            $('.product_list').html(html);
        }
    });
}
/**功能点3：当页面加载完后，异步请求第1页商品数据**/
loadProduct(1);


