$(function(){
    let Img = [{"src":"108.jpg"},{"src":"117.jpg"},{"src":"124.jpg"},{"src":"134.jpg"}
        ,{"src":"149.jpg"},{"src":"168.jpg"},{"src":"174.jpg"}];

    let ImgHove = [{"src":"108-freehover.png"},{"src":"117-freehover.png"},{"src":"124-freehover.png"},
        {"src":"134-freehover.png"},{"src":"149-freehover.png"},{"src":"168-freehover.png"},{"src":"174-freehover.png"},]

    for(let i = 0; i<Img.length;i++ ){
        $("<img>").attr("src","img/"+Img[i].src).appendTo($("#list-img>li").eq(i));
        $("#list-img .act>img").attr("src","img/"+ImgHove[0].src);
    }
    $("#list-img>li").mouseover(function(){
        $(this).addClass("act").siblings().removeClass("act");
        for(let i = 0; i<Img.length;i++ ){
            if($("#list-img>li").eq(i).is(".act")){
                $("#list-img>li").eq(i).find("img").attr("src","img/"+ImgHove[i].src)
            }else{
                $("#list-img>li").eq(i).find("img").attr("src","img/"+Img[i].src)
            }
        }
    });


    // 列表页筛选
    var listname = "all";
    $(".list_tab>a").click(function () {
        $(this).addClass("curr").siblings().removeClass("curr");
        listname = $(this).text();
        if($(this).text()=="热门"){
            listname = "all";
        }else{
            listname = $(this).text()
        }
        chMod(listname,1);
    });

    chMod("all",1);
    function chMod(name,num){
        $("#list_content").html("");
        $(".list_cho").html("");
        let oData=null;
        let labelArr = [];
        let newArr = [];
        $.ajax({
            url:"js/news.json",
            method:"get",
            success:function (data) {
                oData=data.news;
                // console.log(oData);
                $.each(oData,function(index,item){
                    if(name == item.title){
                        newArr.push(item)
                    }else if(name =="all"){
                        newArr = oData
                    }
                });
                // 创建下标页
                let n = Math.ceil(newArr.length/20);
                for(let i = 1;i<n+1;i++){
                    labelArr.push(i)
                }
                // 生成列表
                if(20*num>newArr.length){
                     m = newArr.length
                }else{
                     m = 20*num
                }
                for(let i = 20*(num-1);i<m;i++){
                    $("#list_content").append($(`
                    <li>
                         <a>[${newArr[i].title}]</a>
                         <a>${newArr[i].content}</a>
                         <span>${newArr[i].data}</span>
                    </li>
                `))
                }
                for(let i = 0;i<labelArr.length;i++){
                    $(".list_cho").append($(`
                <div>${labelArr[i]}</div>
                `))
                }
                $(".list_cho>div").eq(num-1).addClass("active");
                $(".list_cho>div").click(function(){
                    chMod(listname,$(this).index()+1);
                    $(this).addClass("active").siblings().removeClass("active");
                    console.log(1);
                })
            }
        });
    }




});





















