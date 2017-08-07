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
});



$(function(){
    if(!sessionStorage['LoginName']){
        $(".cartcon_list").append('<h2>请登录后查看您的购物车 <a href="login.html">去登录</a></h2>');
    }else{
        cartList();
    }
    function cartList(){
        var uname=sessionStorage['LoginName'];
        var html="";
        var countNum =0;
        var priceNum =0.00;
        $.ajax({
            type:"POST",
            url:"data/4_cart_detail_select.php",
            data:{uname:uname},
            success:function(list){
                console.log(list);
                console.log(list.length);
                if(list.msg==='err' || list.length == 0){//如果客户的购物车没有商品
                    $(".cartcon_list").append('<h2>购物车没有产品 <a href="product.html">去购买</a></h2>')
                    $(".product_count").html(0);
                    $(".total_price").html(0);
                }else{
                    $.each(list,function(i,pro){
                        var count=pro.count*pro.price;
                        html+=`
                     <li data-did="${pro.did}" data-pid="${pro.pid}">
                          <input type="checkbox" class="cart_checkbox" />
                          <a href="product_detail.html?pid=${pro.pid}" class="cart_img"><img src="${pro.pic}" alt=""/></a>
                          <a href="product_detail.html?pid=${pro.pid}" class="cart_title">${pro.pname}</a>
                          <i>¥${pro.price}</i>
                          <div>
                            <span class="pro_count">-</span><input type="text" value="${pro.count}"/><span class="pro_count">+</span>
                          </div>
                          <strong>${count}</strong>
                          <em class="remove"></em>
                     </li>`;
                        countNum+=parseInt(pro.count);
                        priceNum+=count;
                    });
                    $(".cartcon_list ul").html(html);
                    $(".product_count").html(countNum);
                    $(".total_price").html(priceNum.toFixed(2));
                }
            }
        })
    }

    //删除商品
    $(".cartcon_list").on("click",".remove",function(){
        var removeList = $(this).parent();
        var did = removeList.attr("data-did");
        $.ajax({
            type:"post",
            url:"data/7_cart_detail_delete.php",
            data:{did:did},
            success:function(d){
                if(d.code==1){//删除列表
                    cartList();
                    //alert("删除成功");
                    confirm("确认删除此商品吗？");
                    removeList.remove();
                    //pro_count();//购物车提示信息
                }
            }
        })
    });

    //增加商品，减少商品
    $(".cartcon_list").on("click",".pro_count",function(){
        var did = $(this).parents("li").attr("data-did");
        var pid = $(this).parents("li").attr("data-pid");
        var count=parseInt($(this).siblings("input").val());
        var text=$(this).html();
        if(text=="-"&&count>1){
            count--;
            $(this).siblings("input").val(count);
        }else if(text=="+"){
            count++;
            $(this).siblings("input").val(count);
        }
        //服务器改数据
        $.ajax({
            type:"post",
            url:"data/5_cart_detail_update.php",
            data:{did:did,pid:pid,count:count},
            success:function(d){
                if(d.code==1){
                    console.log("更新成功");
                    cartList();
                    //pro_count()
                }
            }
        });
    })
});

//全选全不选
function choise(){
    $(".cartcon_title input").change(function(){
        if($(this).prop("checked")){
            $(".cartcon_list input").prop("checked",true);
        }else{
            $(".cartcon_list input").prop("checked",false);
        }
    });
    $(".cartcon_list").on("click","input[type='checkbox']",function(){
        if(!$(this).prop("checked")){
            $(".cartcon_title input").prop("checked",false);
        }else{
            var int=$(".cartcon_list input");
            for(var i=0;i<int.length;i++){
                if(!int[i].checked){
                    $(".cartcon_title input").prop("checked",false);
                    return
                }
            }
            $(".cartcon_title input").prop("checked",true);
        }
    })
}
choise();
