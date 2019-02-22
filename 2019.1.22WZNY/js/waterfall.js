$(function(){

    let dataImg = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}
            ,{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"}
            ,{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"},{"src":"16.jpg"},{"src":"17.jpg"}
            ,{"src":"18.jpg"},{"src":"19.jpg"},{"src":"20.jpg"},{"src":"21.jpg"},{"src":"22.jpg"},{"src":"23.jpg"}
            ,{"src":"24.jpg"},{"src":"25.jpg"}]};
    window.onscroll = function(){
        // console.log(scrollside());
        if(scrollside()){
            $.each(dataImg.data,function(index,value){
                let box = $("<div>").addClass("box").appendTo($("#con"));
                let content = $("<div>").addClass("content").appendTo(box);
                $("<img>").attr("src","img/"+$(value).attr("src")).appendTo(content);
            });
            imgLocation();
        }
    };
    function scrollside() {
        let box = $(".box");
        let lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height()/2);
        let documentHeight = $(document).width();
        let scrollHeight = document.documentElement.scrollTop;
        return (lastboxHeight < scrollHeight + documentHeight) ? true : false;
    }
    imgLocation();
    function imgLocation(){
        // 获取所有的图片
        let box= $(".box");
        // 获取其中一个宽
        let boxWidth = box.eq(0).width();
        let num = Math.floor($(window).width()/boxWidth);
        let boxArr  = [];
        box.each(function(index,value){
            let boxHeight = box.eq(index).height();
            if(index<num){
                boxArr[index] = boxHeight;
            }else{
                let minboxHeight = Math.min.apply(null,boxArr);
                let minboxIndex = $.inArray(minboxHeight,boxArr);
                // console.log(minboxHeight);
                $(value).css({
                    position:"absolute",
                    top:minboxHeight,
                    left:box.eq(minboxIndex).position().left
                });
                // 每个高度逐渐增加
                boxArr[minboxIndex]+=box.eq(index).height();
            }
        })
    }

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
    })




});








