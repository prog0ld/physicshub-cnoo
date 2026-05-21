var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Events = Matter.Events;

var engine = Engine.create();
engine.gravity.y = 1;

const simulationDiv = document.getElementById("simulation-mount");
const offset = document.getElementById("info").clientHeight + 20;

var render = Render.create({
    element: document.getElementById("simulation-mount"),
    engine: engine,
    options: {
        width: document.getElementById("simulation-mount").clientWidth,
        height: document.getElementById("simulation-mount").clientHeight,
        wireframes: false,
        background: "#0d1117"
    }
});

const ctx = render.canvas.getContext("2d");
var centerX = simulationDiv.clientWidth / 2;
var beamY = 250;
var scale = 25;

var currentF1 = 0;
var currentF2 = 0;
var currentD1 = 0;
var currentD2 = 0;

var beam = Bodies.rectangle(centerX, beamY, 500, 20, {
    density: 0.01,
    frictionAir: 0.05,
    restitution: 0.1,
    render: { fillStyle: "#888" }
});

var pivot = Constraint.create({
    pointA: { x: centerX, y: beamY },
    bodyB: beam,
    pointB: { x: 0, y: 0 },
    stiffness: 1,
    length: 0
});

var cevaholder = Bodies.rectangle(centerX, beamY + 110, 6, 200, { 
    isStatic: true, 
    render: { visible: false } 
});

Composite.add(engine.world, [beam, pivot, cevaholder]);
Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

function updateSimulation() {
    currentF1 = parseFloat(document.getElementById("force1").value) || 0;
    currentF2 = parseFloat(document.getElementById("force2").value) || 0;

    var inputD1 = parseFloat(document.getElementById("d1").value) || 0;
    var inputD2 = parseFloat(document.getElementById("d2").value) || 0;
    
    currentD1 = Math.max(0, Math.min(10, inputD1));
    currentD2 = Math.max(0, Math.min(10, inputD2));
    
    document.getElementById("d1").value = currentD1;
    document.getElementById("d2").value = currentD2;

    Body.setPosition(beam, { x: centerX, y: beamY });
    Body.setAngle(beam, 0);
    Body.setVelocity(beam, { x: 0, y: 0 });
    Body.setAngularVelocity(beam, 0);
}

updateSimulation();

var simulateButton = document.querySelector("button") || document.querySelector("input[type='button']");
if (simulateButton) {
    simulateButton.addEventListener("click", updateSimulation);
}

Events.on(engine, "beforeUpdate", function() {
    var angle = beam.angle;
    
    var f1Vec = { 
        x: -Math.sin(angle) * (currentF1 * 0.001), 
        y: Math.cos(angle) * (currentF1 * 0.001) 
    };
    var f2Vec = { 
        x: -Math.sin(angle) * (currentF2 * 0.001), 
        y: Math.cos(angle) * (currentF2 * 0.001) 
    };

    Body.applyForce(beam, { 
        x: beam.position.x - (currentD1 * scale) * Math.cos(angle), 
        y: beam.position.y - (currentD1 * scale) * Math.sin(angle) 
    }, f1Vec);

    Body.applyForce(beam, { 
        x: beam.position.x + (currentD2 * scale) * Math.cos(angle), 
        y: beam.position.y + (currentD2 * scale) * Math.sin(angle) 
    }, f2Vec);
});

Events.on(render, "afterRender", function() {
    var cosA = Math.cos(beam.angle);
    var sinA = Math.sin(beam.angle);
    
    var p1x = beam.position.x - (currentD1 * scale) * cosA;
    var p1y = beam.position.y - (currentD1 * scale) * sinA;
    var p2x = beam.position.x + (currentD2 * scale) * cosA;
    var p2y = beam.position.y + (currentD2 * scale) * sinA;

    ctx.save();
    ctx.font = "16px Arial";
    ctx.lineWidth = 3;

    var arrowLen1 = Math.max(30, currentF1 * 1.5);
    ctx.fillStyle = "#3498db";
    ctx.strokeStyle = "#3498db";
    ctx.textAlign = "center";
    ctx.beginPath(); ctx.arc(p1x, p1y, 8, 0, 2 * Math.PI); ctx.fill();
    ctx.beginPath(); ctx.moveTo(p1x, p1y); ctx.lineTo(p1x, p1y + arrowLen1);
    ctx.lineTo(p1x - 5, p1y + arrowLen1 - 7); ctx.moveTo(p1x, p1y + arrowLen1); ctx.lineTo(p1x + 5, p1y + arrowLen1 - 7); ctx.stroke();
    ctx.fillText("F1 = " + currentF1 + " N", p1x, p1y + arrowLen1 + 20);
    ctx.fillText("d1 = " + currentD1 + " m", p1x, p1y - 20);

    var arrowLen2 = Math.max(30, currentF2 * 1.5);
    ctx.fillStyle = "#e74c3c";
    ctx.strokeStyle = "#e74c3c";
    ctx.beginPath(); ctx.arc(p2x, p2y, 8, 0, 2 * Math.PI); ctx.fill();
    ctx.beginPath(); ctx.moveTo(p2x, p2y); ctx.lineTo(p2x, p2y + arrowLen2);
    ctx.lineTo(p2x - 5, p2y + arrowLen2 - 7); ctx.moveTo(p2x, p2y + arrowLen2); ctx.lineTo(p2x + 5, p2y + arrowLen2 - 7); ctx.stroke();
    ctx.fillText("F2 = " + currentF2 + " N", p2x, p2y + arrowLen2 + 20);
    ctx.fillText("d2 = " + currentD2 + " m", p2x, p2y - 20);

    ctx.fillStyle = "#2ecc71";
    ctx.beginPath(); ctx.arc(beam.position.x, beam.position.y, 6, 0, 2 * Math.PI); ctx.fill();
    ctx.fillText("R = " + (currentF1 + currentF2) + " N", beam.position.x, beam.position.y - 40);

    ctx.restore();
});