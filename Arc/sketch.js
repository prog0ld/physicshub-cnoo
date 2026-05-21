var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

var engine = Engine.create();

const simulationDiv = window.parent.document.getElementById("simulation-mount");
const offset = document.getElementById("info").clientHeight + 40;

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: simulationDiv.clientWidth,
        height: simulationDiv.clientHeight - offset,
        wireframes: true
    }
});

const ctx = render.canvas.getContext("2d");
const simWidth = simulationDiv.clientWidth;
const simHeight = simulationDiv.clientHeight - offset;
const springOffsetY = simHeight * 0.2;

function drawLine(ax, ay, bx, by, color, w) {
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.strokeStyle = color;
  ctx.lineWidth = w;
  ctx.stroke();
}

function drawLetter(x, y, letter) {
  ctx.save();
  ctx.translate(x, y);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(letter, 0, 0);
  ctx.restore();
}

var boxA = Bodies.rectangle(simWidth/2, simHeight/2, 60, 60);
var spring = Matter.Constraint.create({
  pointA: { x: simWidth/2, y: simHeight/2 - springOffsetY },
  bodyB: boxA,
  stiffness: 0.01,
  damping: 0.01
});

const m = Matter.Mouse.create(render.canvas);
const mouseConstraint = Matter.MouseConstraint.create(engine, {mouse: m, stiffness: 1, render: {visible: false, lineWidth: 0}});

Composite.add(engine.world, [boxA, spring, mouseConstraint]);
mouseConstraint.constraint.render.visible = false;

Render.run(render);

var runner = Runner.create();
Runner.run(runner, engine);

function loop(){

  let fe = Math.round(((Matter.Vector.magnitude(Matter.Vector.sub(boxA.position, { x: simWidth/2, y: simHeight/2 - springOffsetY })) - spring.length) * spring.stiffness)*100)/100;
  document.getElementById("length").innerText = "l=" + Math.round(Matter.Vector.magnitude(Matter.Vector.sub(boxA.position, { x: simWidth/2, y: simHeight/2 - springOffsetY })))/100 + "m";
  document.getElementById("force").innerText = "Fe=" + fe + "N";

  const g = engine.world.gravity;
  const forceY = boxA.mass * g.y * g.scale * 50000;

  drawLine(boxA.position.x, boxA.position.y, boxA.position.x, boxA.position.y + forceY, "blue", 3);
  drawLine(boxA.position.x, boxA.position.y + forceY, boxA.position.x - 15, boxA.position.y + forceY - 30, "blue", 3);
  drawLine(boxA.position.x, boxA.position.y + forceY, boxA.position.x + 15, boxA.position.y + forceY - 30, "blue", 3);
  drawLetter(boxA.position.x + 15, boxA.position.y + forceY, "G");

  drawLine(
    boxA.position.x, boxA.position.y,
    boxA.position.x + (spring.pointA.x - boxA.position.x) * (1 + fe * 0.1) * 1.6,
    boxA.position.y + (spring.pointA.y - boxA.position.y) * (1 + fe * 0.1) * 1.6,
    "red", 3);

  drawLine(
    boxA.position.x + (spring.pointA.x - boxA.position.x) * (1 + fe * 0.1) * 1.6,
    boxA.position.y + (spring.pointA.y - boxA.position.y) * (1 + fe * 0.1) * 1.6,
    boxA.position.x + (spring.pointA.x - boxA.position.x) * (1 + fe * 0.1) * 1.6 - 20 * ((spring.pointA.x - boxA.position.x) / Math.sqrt((spring.pointA.x - boxA.position.x) ** 2 + (spring.pointA.y - boxA.position.y) ** 2) * Math.cos(Math.PI/6) - (spring.pointA.y - boxA.position.y) / Math.sqrt((spring.pointA.x - boxA.position.x) ** 2 + (spring.pointA.y - boxA.position.y) ** 2) * Math.sin(Math.PI/6)),
    boxA.position.y + (spring.pointA.y - boxA.position.y) * (1 + fe * 0.1) * 1.6 - 20 * ((spring.pointA.y - boxA.position.y) / Math.sqrt((spring.pointA.x - boxA.position.x) ** 2 + (spring.pointA.y - boxA.position.y) ** 2) * Math.cos(Math.PI/6) + (spring.pointA.x - boxA.position.x) / Math.sqrt((spring.pointA.x - boxA.position.x) ** 2 + (spring.pointA.y - boxA.position.y) ** 2) * Math.sin(Math.PI/6)),
    "red", 3);

  drawLine(
    boxA.position.x + (spring.pointA.x - boxA.position.x) * (1 + fe * 0.1) * 1.6,
    boxA.position.y + (spring.pointA.y - boxA.position.y) * (1 + fe * 0.1) * 1.6,
    boxA.position.x + (spring.pointA.x - boxA.position.x) * (1 + fe * 0.1) * 1.6 - 20 * ((spring.pointA.x - boxA.position.x) / Math.sqrt((spring.pointA.x - boxA.position.x) ** 2 + (spring.pointA.y - boxA.position.y) ** 2) * Math.cos(Math.PI/6) + (spring.pointA.y - boxA.position.y) / Math.sqrt((spring.pointA.x - boxA.position.x) ** 2 + (spring.pointA.y - boxA.position.y) ** 2) * Math.sin(Math.PI/6)),
    boxA.position.y + (spring.pointA.y - boxA.position.y) * (1 + fe * 0.1) * 1.6 - 20 * ((spring.pointA.y - boxA.position.y) / Math.sqrt((spring.pointA.x - boxA.position.x) ** 2 + (spring.pointA.y - boxA.position.y) ** 2) * Math.cos(Math.PI/6) - (spring.pointA.x - boxA.position.x) / Math.sqrt((spring.pointA.x - boxA.position.x) ** 2 + (spring.pointA.y - boxA.position.y) ** 2) * Math.sin(Math.PI/6)),
    "red", 3);

  drawLetter(
    boxA.position.x + (spring.pointA.x - boxA.position.x) * (1 + fe * 0.1) * 1.6 - 20 * (spring.pointA.y - boxA.position.y) / Math.sqrt((spring.pointA.x - boxA.position.x) ** 2 + (spring.pointA.y - boxA.position.y) ** 2),
    boxA.position.y + (spring.pointA.y - boxA.position.y) * (1 + fe * 0.1) * 1.6 + 20 * (spring.pointA.x - boxA.position.x) / Math.sqrt((spring.pointA.x - boxA.position.x) ** 2 + (spring.pointA.y - boxA.position.y) ** 2),
    "Fe");

  requestAnimationFrame(loop);
}

loop();