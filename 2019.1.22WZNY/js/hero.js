$(function(){
    let Img = [{"src":"108.jpg"},{"src":"117.jpg"},{"src":"124.jpg"},{"src":"134.jpg"}
        ,{"src":"149.jpg"},{"src":"168.jpg"},{"src":"174.jpg"}];

    // console.log($(".parent-type>li").eq(1).is(".current")==false);
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


    // 英雄筛选
    let repeat,nm,numb,nmb,mb;
    $("#types-ms>li").click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        $("#typs>li").removeClass("current");
         nm = $(this).find("label").text();
        if(repeat !== nm){
            if(nm =="全部"){
                chMod("all");
            }else{
                chMod(nm);
            }
        }
            repeat =nm;
    });
    $("#typs>li").click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        $("#types-ms>li").removeClass("current");
        nm = $(this).find("label").text();
        if(repeat !== nm){
            if(nm =="全部"){
                chMod("all");
            }else{
                chMod(nm);
            }
        }
        repeat =nm;
    });
    chMod("all");
    function chMod(name){
        $("#list_content").html("");
        let oData=null;
        let newArr = [];
        $.ajax({
            url:"js/hero.json",
            method:"get",
            success:function (data) {
                oData=data.hero;
                let occpu = new RegExp(name);
                $.each(oData,function(index,item){
                    if( name =="all"){
                        newArr = oData
                    }else if(occpu.test(item.arms)){
                        newArr.push(item)
                    }else if(name=="本周免费"&& item.free =="是"){
                        newArr.push(item)
                    }else if(name=="新手推荐"&& item.groom =="是"){
                        newArr.push(item)
                    }
                });
                // 生成列表
                for(let i = 0;i<newArr.length;i++){
                    $("#list_content").append($(`
                    <li data-id=${newArr[i].id}>
                         <a>
                             <img src=${newArr[i].picImg} alt="">
                               ${newArr[i].name}
                         </a>
                    </li>
                `))
                }
            }
        });
    }
    // 武器筛选
    $("#choice>li").click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        $(".clearfix").eq($(this).index()).addClass("item-types").siblings().removeClass("item-types");
        if($(this).find("a").text() == "局内道具"&& numb !==$(this).index()){
            loadArms("rule","all");
            // if ($(".parent-type>li").eq(1).hasClass(".current")!=="false") {
            //     console.log(12);
            //     weapon("rule");}
        }else if($(this).index()==0 && numb !==$(this).index()){
            chMod("all");
            $("#list_content").on("mouseover",function(e){
                $(".poppup-item").css({
                    display:"none",
                })
            })
        }
        if($(this).index()=="2"){
            $(".herolist-box").css({display :"none"});
            $(".herolist").css({display :"block"})
        }else{
            $(".herolist-box").css({display :"block"});
            $(".herolist").css({display :"none"})
        }
        numb = $(this).index();
    });

    // 武器展示
        let sort = 0;
        let x = 0;
        $("#list_content").on("mousemove",function(event){
            if($("#choice>li").eq(1).hasClass("current")){
                if(event.target.tagName !== "UL"){
                    if (event.pageX>1030){
                        x = event.pageX - 300;
                    } else{
                        x = event.pageX + 50;
                    };
                    $(".poppup-item").css({
                        position:"absolute",
                        top:(event.pageY-50),
                        left:x
                    })
                }
            }
        });
        $("#list_content").on("mouseover",function(event){
            if($("#choice>li").eq(1).hasClass("current")){
                if(event.target.tagName =="A"){
                    sort = $(event.target).parent().attr("data-id");
                }else{
                    sort = $(event.target).parent().parents().attr("data-id");
                }
                if(event.target.tagName !== "UL"){
                    $(".poppup-item").css({
                        display:"block",
                    });
                    if($(".parent-type>li").eq(0).hasClass("current")&& $("#choice>li").eq(1).hasClass("current")){
                        loadNature("rule",sort)
                    }else if($(".parent-type>li").eq(1).hasClass("current")&& $("#choice>li").eq(1).hasClass("current")){
                        loadNature("border",sort)
                    }

                }else{
                    $(".poppup-item").css({
                        display:"none",
                    })
                }

            }


        });
        $("#list_content").on("mouseout",function(event){
            $(".poppup-item").css({
                display:"none",
            })
        });



    // 模式筛选
    $(".parent-type>li").click(function(){
        $(this).addClass("current").siblings().removeClass("current");
        $(".sub-type>li").eq($(this).index()).addClass("current").siblings().removeClass("current");
        for(let i = 0;i<$(".sub-type>li").length;i++){
            if($(".sub-type>li").eq(i).attr("data-parent-type")==$(this).attr("data-type")){
                $(".sub-type>li").eq(i).css({display:"block"})
            }else{
                $(".sub-type>li").eq(i).css({display:"none"})
            }
        }
        if($(this).attr("data-type")==1 && nmb !==$(this).index()){
            loadArms("border","all");
                // weapon("border")

        }else if( nmb !==$(this).index()){
            loadArms("rule","all");
        }
        nmb = $(this).index()
    });
    // 类型筛选
    $(".sub-type>li").click(function(){
        $(this).addClass("current").siblings().removeClass("current");
        if( $(this).find("label").text() =="全部"){
            nm ="all";
        }else{
            nm = $(this).find("label").text();
        }
        if($(this).attr("data-parent-type")==0 && mb !== $(this).index()){
            loadArms("rule",nm)
        }else if($(this).attr("data-parent-type")==1 && mb !== $(this).index()){
            loadArms("border",nm)
        }
        mb = $(this).index()
    });

    function loadArms(mode,name){
        $("#list_content").html("");
        let oData=null;
        let newArr = [];
        $.ajax({
            url:"js/arms.json",
            method:"get",
            success:function (data) {
                if(mode == "rule"){
                    oData=data.arms;
                }else{
                    oData = data.weapon;
                }
                $.each(oData,function(index,item){
                    if( name =="all"){
                        newArr = oData
                    }else if(name == item.type){
                        newArr.push(item)
                    }
                });
                // 生成列表
                for(let i = 0;i<newArr.length;i++){
                    $("#list_content").append($(`
                    <li data-id=${newArr[i].id}>
                         <a>
                             <img src=${newArr[i].picImg} alt="">
                               ${newArr[i].name}
                         </a>
                    </li>
                `))
                }
            }
        });
    }
    // 武器详细展示
    function loadNature(mode,dataId){
        $(".poppup-item").html("");
        let oData=null;
        let newArr = {};
        $.ajax({
            url:"js/arms.json",
            method:"get",
            success:function (data) {
                if(mode == "rule"){
                    oData=data.arms;
                }else{
                    oData = data.weapon;
                }
                $.each(oData,function(index,item){
                    if(dataId == item.id){
                        newArr = item;
                    }
                });
                // 生成列表
                let odiv1 = $("<div id=\"pox\"></div>");
                let odiv2 = $("<div></div>");
                    for(let i = 0;i<newArr.result.length;i++){
                        odiv1.append($(`<p>${newArr.result[i]}</p>`))
                    }
                    for(let i = 0;i<newArr.skill.length;i++){
                        odiv2.append($(`<p>${newArr.skill[i]}</p>`))
                    }
                // }

                if(mode =="rule"){
                    $(".poppup-item").html(`<div>
            <div class="item-title">
                <img src= ${newArr.picImg}>
                <div class="cons">
                    <h4>${newArr.name}</h4>
                    <p>${newArr.price}</p>
                    <p>${newArr.total}</p>
                </div>
            </div>
            <div class="item-desc">
                <div id="Jitem-desc1">
                    ${odiv1.html()}
                </div>
                <div id="Jitem-desc2">
                    ${odiv2.html()}
                </div>
            </div>
        </div>`)
                }else{
                    $(".poppup-item").html(`<div>
            <div class="item-title">
                <img src= ${newArr.picImg}>
                <div class="cons">
                    <h4>${newArr.name}</h4>
                    <p>${newArr.grade}</p>
                </div>
            </div>
            <div class="item-desc">
                <div id="Jitem-desc1">
                    ${odiv1.html()}
                </div>
                <div id="Jitem-desc2">
                    ${odiv2.html()}
                </div>
            </div>
        </div>`)
                }
            }
        });
    }

    // 搜索框英雄事件
    $("#search").on("input",function(){
        $("#types-ms>li").eq(0).addClass("current").siblings().removeClass("current");
        $("#typs>li").removeClass("current");
        let text = $(this).val();
        Mod(text)
    });
    // 搜索英雄框
    function Mod(name){
        $("#list_content").html("");
        let oData=null;
        let newArr = [];
        $.ajax({
            url:"js/hero.json",
            method:"get",
            success:function (data) {
                oData=data.hero;
                let occpu = new RegExp(name);
                $.each(oData,function(index,item){
                     if(occpu.test(item.name)){
                        newArr.push(item)
                    }
                });
                // 生成列表
                for(let i = 0;i<newArr.length;i++){
                    $("#list_content").append($(`
                    <li>
                         <a>
                             <img src=${newArr[i].picImg} alt="">
                               ${newArr[i].name}
                         </a>
                    </li>
                `))
                }
            }
        });
    }
    // 搜索道具
    $("#sea").on("input",function(){
        $(".parent-type>li").eq(0).addClass("current").siblings().removeClass("current");
        $(".sub-type>li").eq(0).addClass("current").siblings().removeClass("current");
        let text = $(this).val();
        Arms(text)
    });

    function Arms(name){
        $("#list_content").html("");
        let oData1=null,
            oData2 =null,
            oData = null;
        let newArr = [];
        let occpu = new RegExp(name);
        $.ajax({
            url:"js/arms.json",
            method:"get",
            success:function (data) {
                    oData1=data.arms;
                    oData2 = data.weapon;
                    oData = oData1.concat(oData2);
                $.each(oData,function(index,item){
                    if(occpu.test(item.name)){
                        newArr.push(item)
                    }
                });
                // 生成列表
                for(let i = 0;i<newArr.length;i++){
                    $("#list_content").append($(`
                    <li data-id=${newArr[i].id}>
                         <a>
                             <img src=${newArr[i].picImg} alt="">
                               ${newArr[i].name}
                         </a>
                    </li>
                `))
                }
            }
        });
    }

   // 技能展示
    $("#skill-list>li").click(function(){
        $(this).addClass("current").siblings().removeClass("current");
        $("#spellDefail>div").eq($(this).index()).addClass("spell-dis").siblings().removeClass("spell-dis");
    });
    // 跳转详情页

        $("#list_content").on("click",function(e){
            let ev = window.event||e;
            let target  = ev.target||ev.srcElement;
            if (target.nodeName =="IMG"&&$("#choice>li").eq(0).hasClass("current")) {
                window.open("details.html?clothid="+$(target).parents("li").attr("data-id"))
            }
        })


});