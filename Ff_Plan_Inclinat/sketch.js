var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events;

var engine = Engine.create();

const simulationDiv = window.parent.document.getElementById("simulation-mount");
const offset = document.getElementById("info").clientHeight + 40;
const MAX_ANGLE_DEG = 50;
var angleInput = document.getElementById("angle");
let angleDeg = Math.min(parseFloat(angleInput.value) || 0, MAX_ANGLE_DEG);
angleInput.value = angleDeg;
let angle = angleDeg * Math.PI / 180;

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

var planeWidth = simulationDiv.clientWidth / 2;
var planeThickness = 10;
var boxWidth = 60;
var boxHeight = 30;

var boxA = Bodies.rectangle(simulationDiv.clientWidth/2, simulationDiv.clientHeight/2, boxWidth, boxHeight, {
    isStatic: false,
    frictionAir: 0.002,
    frictionStatic: 0.05,
    friction: 0.02,
    restitution: 0
});
var ground = Bodies.rectangle(simulationDiv.clientWidth/2, simulationDiv.clientHeight-offset, simulationDiv.clientWidth, 30, {isStatic: true});
var plane = Bodies.rectangle(
    simulationDiv.clientWidth/2,
    simulationDiv.clientHeight-offset-10,
    planeWidth,
    planeThickness,
    {isStatic: true}
);
Matter.Body.setCentre(plane, { x: -planeWidth / 2, y: 0 }, true);
Composite.add(engine.world, [boxA, ground, plane]);

Render.run(render);

function drawArrowHead(x, y, angle, color) {
    var size = 10;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-size, -size / 2);
    ctx.lineTo(-size, size / 2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}

function drawForceArrow(start, vector, color) {
    var endX = start.x + vector.x;
    var endY = start.y + vector.y;
    drawLine(start.x, start.y, endX, endY, color, 3);
    var angle = Math.atan2(vector.y, vector.x);
    drawArrowHead(endX, endY, angle, color);
}

function drawForceLabels(start, vector, label, offsetY) {
    drawLetter(start.x + vector.x + 10, start.y + vector.y + offsetY, label);
}

function drawForces() {
    var pos = boxA.position;
    var planeAngle = plane.angle;
    var tangent = { x: Math.cos(planeAngle), y: Math.sin(planeAngle) };
    var gravity = { x: 0, y: 1 };

    if (gravity.x * tangent.x + gravity.y * tangent.y < 0) {
        tangent.x *= -1;
        tangent.y *= -1;
    }

    var normal = { x: -tangent.y, y: tangent.x };
    var normalDotGravity = gravity.x * normal.x + gravity.y * normal.y;
    if (normalDotGravity < 0) {
        normal.x *= -1;
        normal.y *= -1;
        normalDotGravity *= -1;
    }

    var GtComp = gravity.x * tangent.x + gravity.y * tangent.y;
    var GtMag = Math.abs(GtComp);
    var GnMag = normalDotGravity;
    var scale = 100;

    var Gnv = { x: normal.x * GnMag * scale, y: normal.y * GnMag * scale };
    var Gtv = { x: tangent.x * GtComp * scale, y: tangent.y * GtComp * scale };

    var velAlong = boxA.velocity.x * tangent.x + boxA.velocity.y * tangent.y;
    var motionDirection = velAlong !== 0 ? Math.sign(velAlong) : Math.sign(GtComp);
    var Ffv = {
        x: -motionDirection * tangent.x * GtMag * scale,
        y: -motionDirection * tangent.y * GtMag * scale
    };

    var Nv = {
    x: -Gnv.x,
    y: -Gnv.y
    };

    drawForceArrow(pos, Gnv, "blue");
    drawForceArrow(pos, Nv, "cyan");
    drawForceArrow(pos, Gtv, "green");
    drawForceArrow(pos, Ffv, "orange");

    drawForceLabels(pos, Gnv, "Gn", -10);
    drawForceLabels(pos, Nv, "N", -10);
    drawForceLabels(pos, Gtv, "Gt", 10);
    drawForceLabels(pos, Ffv, "Ff", 20);
}

Events.on(render, "afterRender", function() {
    drawForces();
});

function updatePositions() {
    angleDeg = Math.min(parseFloat(angleInput.value) || 0, MAX_ANGLE_DEG);
    angleInput.value = angleDeg;
    angle = angleDeg * Math.PI / 180;
    var pivotX = simulationDiv.clientWidth / 2;
    var pivotY = simulationDiv.clientHeight - offset - 15 - planeThickness / 2;
    var alongX = Math.cos(angle);
    var alongY = -Math.sin(angle);
    var normX = -Math.sin(angle);
    var normY = -Math.cos(angle);

    var distAlongPlane = planeWidth - boxWidth / 2;
    var perp = boxHeight / 2 + planeThickness / 2;

    Matter.Body.setPosition(plane, {
        x: pivotX,
        y: pivotY
    });
    Matter.Body.setAngle(plane, -angle);
    Matter.Body.setPosition(boxA, {
        x: pivotX + alongX * distAlongPlane + normX * perp,
        y: pivotY + alongY * distAlongPlane + normY * perp - 10
    });
    Matter.Body.setAngle(boxA, -angle);

    Matter.Body.setVelocity(boxA, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(boxA, 0);
    document.getElementById("cf").innerHTML = "μ: " + (Math.tan(angle)).toFixed(2);
    Matter.Body.applyForce(boxA, boxA.position, {
        x: -0.00025 * Math.cos(angle),
        y: 0.00025 * Math.sin(angle)
    });
}

document.getElementById("angle").addEventListener("change", updatePositions);

var speedHistory = [];
var speedSampleCount = 6;

updatePositions();

var runner = Runner.create();
Runner.run(runner, engine);

let lastS = Math.sqrt(boxA.velocity.x**2 + boxA.velocity.y**2);
let lastTimestamp = null;

function loop(timestamp){
  var speed = Math.sqrt(boxA.velocity.x**2 + boxA.velocity.y**2);
  speedHistory.push(speed);
  if (speedHistory.length > speedSampleCount) speedHistory.shift();
  var smoothSpeed = speedHistory.reduce(function(sum, value) { return sum + value; }, 0) / speedHistory.length;
  var deltaTime = lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 0;
  var acceleration = deltaTime ? (speed - lastS) / deltaTime : 0;
  document.getElementById("vit").innerHTML = "Viteza: " + Math.abs(smoothSpeed).toFixed(1) + " px/s";
  document.getElementById("acc").innerHTML = "Acceleratie: " + Math.abs(acceleration).toFixed(2) + " px/s²";
  lastS = speed;
  lastTimestamp = timestamp;
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);