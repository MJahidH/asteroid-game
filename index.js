const canvas = document.querySelector(`canvas`);
const c = canvas.getContext(`2d`);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// creates a black rectangle that fills the whole canvas 
c.fillStyle = "black";
c.fillRect(0,0,canvas.width,canvas.height)




