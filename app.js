const canvas = document.getElementById("jsCanvas");
const ctx=canvas.getContext('2d');
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const saveBtn=document.getElementById("jsSave");
canvas.width=500;
canvas.height=500;//픽셀사이즈 주기 pixel modifier

ctx.fillStyle='white';
ctx.fillRect(0,0,500,500);

ctx.strokeStyle="black";
ctx.fillStyle="black";
ctx.lineWidth=2.5;

function startPainting(){
    painting=true;
}
let painting=false;
let filling=false;
function stopPainting(){
    painting=false;
}
function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseUp(event){
    stopPainting();
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}
function handleCM(event){
    event.preventDefault();
}
if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);   
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}
function handleColorClick(event){
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

Array.from(colors).forEach(color=>
    color.addEventListener("click",handleColorClick)
);

function handleRangeChange(event){
    ctx.lineWidth=event.target.value;
}
if(range){
    range.addEventListener("input",handleRangeChange)
}

function handleModeClick(){
    if(filling===true){
        filling=false;
        mode.innerText="Fill";
    }else{
        filling=true;
        mode.innerText="Paint";
    }
}
if(mode){
    mode.addEventListener("click",handleModeClick);
}

function handleSaveClick(){
    const image=canvas.toDataURL("image/png");
    const link=document.createElement('a');
    link.href=image;
    link.download="image";
    link.click();
}
if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}