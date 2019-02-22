$(function(){
    let  num=location.search.substring(location.search.indexOf("=") + 1,);
    // console.log(num);
    let oData=null;
    let newArr = {};
    $.ajax({
        url:"js/skin.json",
        method:"get",
        success:function (data) {
            oData=data.skin;
            $.each(oData,function(index,item){
                if(num == item.id){
                    newArr = item;
                }
            });
            let oImg = $("<div ></div>");
            let odiv = $("<div></div>");
            for(let i = 0;i<newArr.bag.length;i++){
                oImg.append($(`<img src=${newArr.bag[i]} alt="">`))
            }
            for(let i = 0;i<newArr.hero.length;i++){
                let arr = Object.keys(newArr.hero[i]);
                odiv.append($(`<li class="hero_img">
                            <i>
                                <img src=${newArr.hero[i][arr]} alt="">
                            </i>
                            <p>${arr}</p>
                        </li>`))
            }
            oImg.find("img").eq(0).addClass("act");
            odiv.find("li").eq(0).find("i").addClass("curr");
            // console.log(newArr.position);
            // 生成列表
            $(".wrapper").html(`
                <div class="box-img">
                    ${oImg.html()}
                </div>
                <div class="box-content">
                    <div class="cover">
                        <h3>${Object.keys(newArr.hero[0])}</h3>
                        <h2>${newArr.name}</h2>
                        <span >
                            <i class="back-img"></i>
                        </span>
                        <a >
                            <span></span>
                            <img src=${newArr.bag[0]} alt="">
                            <i></i>
                        </a>
                        <ul>
                            <li>
                                <em>生存能力</em>
                                <span class="data-bar1">
                                    <b></b>
                                    <i></i>
                                </span>
                            </li>
                            <li>
                                <em>攻击伤害</em>
                                <span class="data-bar2">
                                    <b></b>
                                    <i></i>
                                </span>
                            </li>
                            <li>
                                <em>技能效果</em>
                                <span class="data-bar3">
                                    <b></b>
                                    <i></i>
                                </span>
                            </li>
                            <li>
                                <em>上手难度</em>
                                <span class="data-bar4">
                                    <b></b>
                                    <i></i>
                                </span>
                            </li>
                        </ul>
                        <div>
                            <a href="javascript:;">英雄故事</a>
                        </div>
                    </div>
                    <div class="pic-pf">
                        <a href="javascript:;">
                            皮
                            <br>
                            肤
                        </a>
                    <ul id="choice-img">
                       ${odiv.html()}
                    </ul>
                </div>
            </div>
            `);
            $(".back-img").css({backgroundPositionY:newArr.positiom+"px"});
            $(".data-bar1>i").css({width:newArr.vianility});
            $(".data-bar2>i").css({width:newArr.attack});
            $(".data-bar3>i").css({width:newArr.skill});
            $(".data-bar4>i").css({width:newArr.diff});


            $("#choice-img>li").click(function(){
                $(this).find("i").addClass("curr");
                $(this).siblings().find("i").removeClass("curr");
                $(".box-img>img").eq($(this).index()).addClass("act").siblings().removeClass("act");
                $(".cover>h3").text(Object.keys(newArr.hero[$(this).index()]))
            })


        }

    });






});

























