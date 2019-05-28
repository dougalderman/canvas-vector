function drawVector(padding, length, angle, imgSrc, imgWidth, imgHeight) {
  let canvas = document.getElementById('vector');
  if (canvas.getContext) {
    let xlength, ylength;
    let ctx = canvas.getContext('2d');
    if (ctx && ctx.canvas) {
      xlength = ctx.canvas.clientWidth;
      ylength = ctx.canvas.clientHeight;
    }
    const startx = xlength/2;
    const starty = ylength/2;
    const endx = startx + length * Math.cos(angle * Math.PI/180);
    const endy = starty - length * Math.sin(angle * Math.PI/180);
    draw_image(ctx, imgSrc, imgWidth, imgHeight, startx, starty);
    create_axes(ctx, xlength, ylength, padding, startx, starty, endx, endy);
    label_axes(ctx, xlength, ylength, padding, startx, starty, endx, endy);
    draw_arrow(ctx, startx, starty, endx, endy);
    label_arrow(ctx, length, endx, endy);
  }  
} 

function draw_image(context, src, width, height, fromx, fromy) {
  let img = new Image();
  img.onload = function() {
    context.drawImage(img, fromx - 0.5 * width, fromy, width, height);
  };
  img.src = src;
}

function create_axes(context, xlen, ylen, pad, fromx, fromy) {
  context.strokeStyle = 'green';
  context.beginPath();
  context.moveTo(pad, fromy);
  context.lineTo(xlen - pad, fromy);
  context.closePath();
  context.stroke();

  context.beginPath();
  context.moveTo(fromx, pad);
  context.lineTo(fromx, ylen - pad);
  context.closePath();
  context.stroke();
}

function label_axes(context, xlen, ylen, pad, fromx, fromy) {
  context.font = '24px serif';
  context.fillStyle = 'red';
  context.fillText('N', fromx, pad);
  context.fillText('S', fromx, ylen - pad);
  context.fillText('W', pad, fromy);
  context.fillText('E', xlen - pad, fromy);
}

function draw_arrow(context, fromx, fromy, tox, toy){
  context.strokeStyle = 'black';
  context.fillStyle = 'black';
  var headlen = 12;   // length of head in pixels
  var angle = Math.atan2(toy-fromy,tox-fromx);
  context.beginPath();
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.closePath();
  context.stroke();
  
  context.beginPath();
  context.moveTo(tox, toy);
  context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
  context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
  context.fill();
}

function label_arrow(context, length, tox, toy) {
  context.font = '18px serif';
  context.fillStyle = 'black';
  context.fillText(length/2 + ' km/hr', tox, toy);
}  

window.setTimeout(drawVector.bind(null, 50, 100, 45, './assets/images/car.jpg', 84, 50), 1000);