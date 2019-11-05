/* initializing global variables*/
const container = document.querySelector(".outer-wrapper");
const carousel_indicator = document.querySelectorAll(".carousel-indicators li");
const page_container = document.querySelectorAll(".page");
const prev = document.querySelector(".prev span");
const next = document.querySelector(".next span");
const firstpage = 0;
const lastpage = ((document.querySelector(".inner-wrapper").offsetWidth/container.offsetWidth)-1);
let currentpage=0;

/* Onload function to assign methods to elements */
document.addEventListener("DOMContentLoaded", ()=>{
    for (let i = 0; i < carousel_indicator.length; i++) {
        carousel_indicator[i].addEventListener("click", (event)=>{
            if(event.target.classList.contains('active')){ return false; }                        
            if(container.offsetWidth*event.target.id>container.scrollLeft){
                let distance = container.offsetWidth*event.target.id - container.scrollLeft;
                horizontalscroll('right', distance);
            }else if((container.offsetWidth*event.target.id)<container.scrollLeft){
                let distance = container.scrollLeft - container.offsetWidth*event.target.id;
                horizontalscroll('left', distance);
            }            
        });
    }
    if(container.scrollLeft==0){
        prev.style.display = "none";
    }
});

/* Go to previous slide method */
prev.addEventListener("click", ()=>{
    let distance = container.scrollLeft - (container.offsetWidth*(currentpage-1));
    horizontalscroll('left', distance);
});

/* Go to Next slide method */
next.addEventListener("click", ()=>{
    let distance = (container.offsetWidth*(currentpage+1)) - container.scrollLeft;
    horizontalscroll('right', distance);
});

/* Method for scrolling - expect two params (direction of scroll, distance to scroll) */
const horizontalscroll = (direction, distance)=>{
    scrollAmount = 0;
    totalscroll = distance;
    totalframes = distance/10;        

    /* Used set interval method to bring smooth scroll */
    var smoothscroll = setInterval(()=>{
        if(direction == 'left'){
            container.scrollLeft -= totalframes;
        } else {
            container.scrollLeft += totalframes;
        }
        scrollAmount += totalframes;
        
        if(Math.round(scrollAmount) >= totalscroll){
            window.clearInterval(smoothscroll);
        }
    }, 50);

    /* Used set timeout method to assign post scroll values */
    var setindicator = setTimeout(()=>{
        currentpage = Math.round(container.scrollLeft / container.offsetWidth);
        if(document.querySelector('.active')) {document.querySelector('.active').classList.remove('active');}
        document.getElementById(currentpage).classList.add("active");
        if(currentpage!=firstpage && currentpage!=lastpage){
            document.getElementById('indicators-text').innerHTML= "Step "+currentpage+" out of 8 on the path to digital enlightment";
        }else{
            document.getElementById('indicators-text').innerHTML= "";
        }
        if(currentpage==firstpage){
            prev.style.display = "none";
            next.style.display = "block";
        }
        else if(currentpage==lastpage){
            next.style.display = "none";
            prev.style.display = "block";
        }
        else{
            prev.style.display = "block";
            next.style.display = "block";
        }
    }, 500);    
}