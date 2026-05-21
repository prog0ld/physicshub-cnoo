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

var boxA = Bodies.rectangle(window.innerWidth/2, window.innerHeight/2, 60, 60);

Composite.add(engine.world, [boxA]);

Render.run(render);

var runner = Runner.create();
Runner.run(runner, engine);

function loop(){
  
  requestAnimationFrame(loop);
}

loop();