const dark = document.querySelector("#dark");
const light = document.querySelector("#light");

dark.addEventListener('click',function(){
    document.body.classList.add("dark-theme");
    dark.classList.add("active");
    light.classList.remove("active");
})
light.addEventListener('click',function(){
    document.body.classList.remove("dark-theme");
    light.classList.add("active");
    dark.classList.remove("active");
})



let body  =  document.querySelector(".body");
frame.onchange = e =>{
    const [file] = frame.files;
    if(file){
        frameimage.style.display = "block";
        frameimage.src = URL.createObjectURL(file);
        frameimage.style.width = body.clientWidth+"px";
        frameimage.style.height = body.clientHeight+"px";
        frameimage.style.left = body.offsetLeft+"px";
        frameimage.style.top = body.offsetTop+"px";
    }
} 
var imageOrginalWidth ;
var imageOrginalHeight; 
iamge.onchange = e =>{
    const [file] = iamge.files;
    if(file){
        myimage.style.display = "block";
        myimage.src = URL.createObjectURL(file);
    }
    setTimeout(()=>{
        donwloadImage();
        let image  =  document.querySelector("#myimage");
        imageOrginalWidth = image.clientWidth;
        imageOrginalHeight = image.clientHeight; 
    },50)

} 

function donwloadImage(){
    const element = document.querySelector(".body");
    html2canvas(element).then(function(canvas){
        var imageData = canvas.toDataURL("image/png");
        var newData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
        var download = document.querySelector("#download");
        download.href = newData;
        download.download = "image.png";
    })
}

//Move Image

let image  =  document.querySelector("#myimage");


var is_mouse_down = false;
var is_mouse_enter = false;
var initMouseX = 0;
var initMouseY = 0;
var initImageX = 0;
var initImageY = 0;
var margin = body.clientWidth/2;
var footer = document.querySelector('.footer');
var x=0;
var y=0;

window.onmousemove = (e)=>{
    x = e.clientX - initMouseX;
    y = e.clientY - initMouseY;
    if(is_mouse_down && is_mouse_enter)
    {
        e.preventDefault();
        x= initImageX + x;
        y= initImageY + y;

        if(x>margin){x=margin}
        if(y>margin){y=margin}
        if(x<-margin){x=-margin}
        if(y<-margin){y=-margin}

        image.style.left = x + "px";
        image.style.top = y + "px";
        footer.style.opacity = "0.3";
    }
}

function mouse_down(e){
    is_mouse_down = true;
    initMouseX = e.clientX;
    initMouseY = e.clientY;

    initImageX = image.offsetLeft - body.offsetLeft;
    initImageY = image.offsetTop - body.offsetTop;
}

function mouse_up(){
    is_mouse_down = false;
    console.log("ddd");
}

function mouse_enter(){
    is_mouse_enter = true;
}

function mouse_leave(){
    is_mouse_enter = false;
    is_mouse_down = false;
}


var range = document.querySelector("#range");
var isRange =false;
function resize(){   
    if(isRange){
        var w = image.clientWidth;
        var h = image.clientHeight;

        image.style.width = (range.value / 10) * imageOrginalWidth + "px";
        image.style.height = (range.value / 10) * imageOrginalHeight + "px";

        var w1 = image.clientWidth;
        var h1 = image.clientHeight;

        if((w-w1 )!=0){
            var diff = (w1-w)/2;
            var diff2 = (h1-h)/2;

            image.style.left = (image.offsetLeft - body.offsetLeft) + diff;
            image.style.top = (image.offsetTop - body.offsetTop) + diff2;
        };

        margin = image.clientWidth - 200;
    }
}

function hideFooter(){
    footer.style.opacity = "0.3";
    isRange = true;
}

function enableDownload(){
    footer.style.opacity = "1";
    setTimeout(()=>{
        donwloadImage();
    },50)
}

