function draw() {
  let canvas = document.getElementById('vector');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
  }
}

window.setTimeout(draw, 1000);