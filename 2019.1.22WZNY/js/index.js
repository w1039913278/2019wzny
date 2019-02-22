
$(function(){
    // 轮播图
    $("#control>span").click(function(){
        let arrName = ["name1","name2","name3","name4","name5"];
        $(this).addClass("rn").siblings().removeClass("rn");
        let aaa = arrName.splice(5-$(this).index());
        let bbb = aaa.concat(arrName);
        for(let i = 0;i<5;i++){
            $("#chart_img>li").eq(i).addClass(bbb[i]).siblings().removeClass(bbb[i]);
        }
    });
    // tab切换
    $(".item_left_head>a").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        $(".item_choice1>div").eq($(this).index("a")-6).addClass("item_display").siblings().removeClass("item_display")
        $(".item_display>a").click(function () {
            $(this).addClass("off").siblings().removeClass("off");
        })
    });
    $(".item_display>a").click(function () {
        $(this).addClass("off").siblings().removeClass("off");
    });
    // 英雄皮肤tab切换
    $(".item_subnav>a").click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        $(".item_right>.item_content").eq($(this).index(".item_subnav>a")).addClass("disimg")
            .siblings().removeClass("disimg")
    });
    // 英雄遮罩层显示
    $(".hero_img>li").mouseover(function(){
        $(this).find("span").css({
            position:"absolute",
            top: 0,
            left: 0
        })
    });
    $(".hero_img>li").mouseout(function(){
        $(this).find("span").css({
            position:"absolute",
            top: "-173px",
            left: 0
        })
    });

    // 新闻列表页
    var listname = "all";
    $(".news_tab>ul>li").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        listname = $(this).text();
        if($(this).text()=="全部"){
            listname = "all";
        }else{
            listname = $(this).text()
        }
        chMod(listname,1);
    });

    chMod("all",1);
    function chMod(name,num){
        $(".news_list").html("");
        let oData=null;
        let newArr = [];
        $.ajax({
            url:"js/news.json",
            method:"get",
            success:function (data) {
                oData=data.news;
                $.each(oData,function(index,item){
                    if(name == item.title){
                        newArr.push(item)
                    }else if(name =="all"){
                        newArr = oData
                    }
                });
                // 生成列表
                if(8*num>newArr.length){
                    m = newArr.length
                }else{
                    m = 8*num
                }
                for(let i = 8*(num-1);i<m;i++){
                    $(".news_list").append($(`
                    <li>
                         <a>${newArr[i].content}</a>
                         <em>${newArr[i].data.slice(-5)}</em>
                    </li>
                `))
                }
                $(".news_list>li").first().addClass("line-sp");
                $(".news_list>li").first().children("em").css({
                    display:"none"
                    }
                )
            }
        });
    }

    // 赛事中心tab切换
    let va = 0;
    let flag = true;
    $(".con_subnav>a").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        if(va !==$(this).index() &&flag){
            flag = false;
            $(".con_item").eq($(this).index()).css({
                zIndex:22
            });
            $(".con_item").eq($(this).index()).addClass("con_display");
            let na = $(this).index();
            setTimeout(function(){
                $(".con_item").eq(na).siblings(".con_item").css({transaction: "none"});
                $(".con_item").eq(na).siblings().removeClass("con_display");
                $(".con_item").eq(na).css({zIndex:11});
                va = na;''
                flag = true;
            },520);

        }
    });
    // 内容中心
    $(".item_display>a").click(function(){
        oImg($(this).index())
    });
    function oImg(k){
        $("#boxImg").html("");
        ajax("get","js/item.json",'',function (data) {
            var mov = JSON.parse(data).List1;
            // console.log( mov[k]);
            for(index in mov[k]){
                let con =   mov[k][index];
                // let lu = document.createElement("ul");
                con.forEach(function (item) {
                    $("#boxImg").append($(`<li>
                            <a href="#">
                                <img src=${item.Img} alt="">
                                <span class="item_first">
                                    <em>${item.Volume}</em>
                                    <em>${item.Data}</em>
                                </span>
                                <span class="item_second">
                                    ${item.Title}
                                </span>
                            </a>
                            <span class="slidiv">
                                <a href="###"></a>
                            </span>
                             </li>`))
                });
                $("#item_content").append($("#boxImg"));
            }
            $("#boxImg>li").bind("mouseenter mouseleave",  function(e) {
                let w = $(this).width();
                let h = $(this).height();
                let x = (e.pageX - ($(this).offset().left) - (w / 2)) * (w > h ? (h / w) : 1);
                let y = (e.pageY - ($(this).offset().top) - (h / 2)) * (h > w ? (w / h) : 1);
                let direction = Math.round((((Math.atan2(y, x) * (180/Math.PI))+180)/90)+3)%4;

                this_slidiv = $(this).find('.slidiv');
                if(e.type == 'mouseenter'){
                    switch(direction){
                        case 0 :
                            this_slidiv.css({top:-h,left:"0px"});
                            break;
                        case 1:
                            this_slidiv.css({top:"0px",left:w});
                            break;
                        case 2:
                            this_slidiv.css({top:h,left:"0px"});
                            break;
                        case 3:
                            this_slidiv.css({top:"0px",left:-w});
                            break;
                    }
                    this_slidiv.stop(true,true).animate({"top":"0px","left":"0px"},"fast");

                }else if(e.type == 'mouseleave'){
                    switch(direction){
                        case 0 :
                            this_slidiv.stop(true,true).animate({"top":-h},"fast");
                            break;
                        case 1:
                            this_slidiv.stop(true,true).animate({"left":w},"fast");
                            break;
                        case 2:
                            this_slidiv.stop(true,true).animate({"top":h},"fast");
                            break;
                        case 3:
                            this_slidiv.stop(true,true).animate({"left":-w},"fast");
                            break;
                    }
                }
            });
        })
    }
    oImg(0);



    // 移动遮罩层
    $(".boxImg>li").bind("mouseenter mouseleave",  function(e) {
        let w = $(this).width();
        let h = $(this).height();
        let x = (e.pageX - ($(this).offset().left) - (w / 2)) * (w > h ? (h / w) : 1);
        let y = (e.pageY - ($(this).offset().top) - (h / 2)) * (h > w ? (w / h) : 1);
        let direction = Math.round((((Math.atan2(y, x) * (180/Math.PI))+180)/90)+3)%4;

        this_slidiv = $(this).find('.slidiv');
        if(e.type == 'mouseenter'){
            switch(direction){
                case 0 :
                    this_slidiv.css({top:-h,left:"0px"});
                    break;
                case 1:
                    this_slidiv.css({top:"0px",left:w});
                    break;
                case 2:
                    this_slidiv.css({top:h,left:"0px"});
                    break;
                case 3:
                    this_slidiv.css({top:"0px",left:-w});
                    break;
            }
            this_slidiv.stop(true,true).animate({"top":"0px","left":"0px"},"fast");

        }else if(e.type == 'mouseleave'){
            switch(direction){
                case 0 :
                    this_slidiv.stop(true,true).animate({"top":-h},"fast");
                    break;
                case 1:
                    this_slidiv.stop(true,true).animate({"left":w},"fast");
                    break;
                case 2:
                    this_slidiv.stop(true,true).animate({"top":h},"fast");
                    break;
                case 3:
                    this_slidiv.stop(true,true).animate({"left":-w},"fast");
                    break;
            }
        }
    });



});
















