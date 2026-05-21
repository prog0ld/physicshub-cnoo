const Engine = Matter.Engine, 
    Render = Matter.Render, 
    Runner = Matter.Runner, 
    Bodies = Matter.Bodies, 
    Body = Matter.Body, 
    Composite = Matter.Composite, 
    Events = Matter.Events;

const engine = Engine.create();
engine.gravity.y = 1;

const simDiv = document.getElementById("sim-container");
const W = simDiv.clientWidth;
const H = simDiv.clientHeight;

const render = Render.create({
  element: simDiv,
  engine: engine,
  options: { width: W, height: H, wireframes: false, background: "#0f0f13" }
});
let ctx = render.canvas.getContext("2d");

const g = 9.81, SCALE = 1000, groundY = 180;
const pulleyX = W - 180, pulleyY = groundY, pulleyR = 22, startX = 140;
const mu = 0.17, M = 0.135, m = 0.023;
const Ft = m * g, Ff = mu * M * g, Fnet = Ft - Ff, accel = Fnet / (M + m);

const ground = Bodies.rectangle(W / 2, groundY + 35, W, 40, { isStatic: true, render: { fillStyle: "#222" } });
const support = Bodies.rectangle(pulleyX + 45, groundY + 150, 30, 300, { isStatic: true, render: { fillStyle: "#333" } });
const block = Bodies.rectangle(startX, groundY, 80, 45, { isStatic: true, render: { fillStyle: "#3498db" } });
const hanging = Bodies.rectangle(pulleyX, groundY + 130, 45, 45, { isStatic: true, render: { fillStyle: "#e74c3c" } });

Composite.add(engine.world, [ground, support, block, hanging]);
Render.run(render);
Runner.run(Runner.create(), engine);

const initialVelocity = 1.2;
let velocity = initialVelocity, dist = 0;

Events.on(engine, "beforeUpdate", function() {
  dist += velocity;
  Body.setPosition(block, { x: startX + dist, y: groundY });
  Body.setPosition(hanging, { x: pulleyX, y: groundY + 130 + dist });
  if (block.position.x >= pulleyX - 70) velocity = 0;
});

// reset button logic
const resetBtn = document.getElementById("reset");
if (resetBtn) {
  resetBtn.onclick = function() {
    dist = 0;
    velocity = initialVelocity;
    Body.setPosition(block, { x: startX, y: groundY });
    Body.setPosition(hanging, { x: pulleyX, y: groundY + 130 });
  };
}

function drawArrow(x1, y1, x2, y2, color) {
  let a = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 10 * Math.cos(a - Math.PI / 6), y2 - 10 * Math.sin(a - Math.PI / 6));
  ctx.lineTo(x2 - 10 * Math.cos(a + Math.PI / 6), y2 - 10 * Math.sin(a + Math.PI / 6));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

Events.on(render, "afterRender", function() {
  ctx.beginPath();
  ctx.moveTo(block.position.x + 40, block.position.y);
  ctx.lineTo(pulleyX, pulleyY);
  ctx.lineTo(hanging.position.x, hanging.position.y);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(pulleyX, pulleyY, pulleyR, 0, Math.PI * 2);
  ctx.fillStyle = "#999";
  ctx.fill();
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 2;
  ctx.stroke();

  drawArrow(hanging.position.x, hanging.position.y, hanging.position.x, hanging.position.y + 70, "#e74c3c");
  drawArrow(block.position.x-40, block.position.y+15, block.position.x - 110, block.position.y+15, "#f39c12");

  ctx.font = "bold 16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Ff = " + Ff.toFixed(3) + " N", 20, 35);
});