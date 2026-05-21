var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner;

var engine = Engine.create();
engine.gravity.y = 0;

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
    background: "#0f1115"
  }
});

Render.run(render);

var runner = Runner.create();
Runner.run(runner, engine);

const ctx = render.canvas.getContext("2d");

const angleInput = document.getElementById("angle");
const f1Input = document.getElementById("f1Input");
const f2Input = document.getElementById("f2Input");
const simulateBtn = document.getElementById("simulate");

let origin = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

let F1 = 200;
let F2 = 180;
let angleDeg = 45;

simulateBtn.addEventListener("click", function() {

  F1 = parseFloat(f1Input.value) || 0;
  F2 = parseFloat(f2Input.value) || 0;
  angleDeg = parseFloat(angleInput.value) || 0;

});

function toVec(mag, angleRad) {

  return {
    x: mag * Math.cos(angleRad),
    y: -mag * Math.sin(angleRad)
  };
}

function drawLine(a, b, color, w=3) {

  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);

  ctx.strokeStyle = color;
  ctx.lineWidth = w;
  ctx.stroke();
}

function drawArrow(p, v, color) {

  const end = {
    x: p.x + v.x,
    y: p.y + v.y
  };

  drawLine(p, end, color);

  const angle = Math.atan2(v.y, v.x);
  const size = 10;

  ctx.fillStyle = color;

  ctx.beginPath();

  ctx.moveTo(end.x, end.y);

  ctx.lineTo(
    end.x - size * Math.cos(angle - 0.5),
    end.y - size * Math.sin(angle - 0.5)
  );

  ctx.lineTo(
    end.x - size * Math.cos(angle + 0.5),
    end.y - size * Math.sin(angle + 0.5)
  );

  ctx.closePath();
  ctx.fill();
}

function loop() {

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  let angle = angleDeg * Math.PI / 180;

  let v1 = toVec(F1, 0);
  let v2 = toVec(F2, angle);

  let v1End = {
    x: origin.x + v1.x,
    y: origin.y + v1.y
  };

  let v2End = {
    x: origin.x + v2.x,
    y: origin.y + v2.y
  };

  let R = {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  };

  drawArrow(origin, v1, "#4cc9f0");
  drawArrow(origin, v2, "#f72585");

  drawLine(
    v1End,
    {
      x: v1End.x + v2.x,
      y: v1End.y + v2.y
    },
    "rgba(255,255,255,0.2)"
  );

  drawLine(
    v2End,
    {
      x: v2End.x + v1.x,
      y: v2End.y + v1.y
    },
    "rgba(255,255,255,0.2)"
  );

  // rezultanta
  drawArrow(origin, R, "#00ff88");

  // UI text
  document.getElementById("f1Text").innerText =
    "F1: " + F1;

  document.getElementById("f2Text").innerText =
    "F2: " + F2;

  document.getElementById("angleText").innerText =
    "α: " + angleDeg + "°";

  requestAnimationFrame(loop);
}

loop();