// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

const simulationDiv = window.parent.document.getElementById("simulation-mount");
const offset = document.getElementById("info").clientHeight + 20;

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: simulationDiv.clientWidth,
        height: simulationDiv.clientHeight - offset,
        wireframes: false
    }
});

const simWidth = simulationDiv.clientWidth;
const simHeight = simulationDiv.clientHeight - offset;
const lineOffset = simWidth * 0.15;
const lineY = simHeight * 0.55;
const lineHeight = simHeight * 0.6;
const waterY = simHeight * 0.08;
const groundY = simHeight * 0.9;
const groundWidth = simWidth * 1.2;
const oilWidth = simWidth * 0.27;
const oilHeight = simHeight * 0.6;
const velocityThreshold = simHeight * 0.25;

var line1 = Bodies.rectangle((simWidth/2)-lineOffset, lineY, 10, lineHeight, { isStatic: true });
var line2 = Bodies.rectangle((simWidth/2)+lineOffset, lineY, 10, lineHeight, { isStatic: true });
var water = Bodies.circle((simWidth/2), waterY, 10, {render: {fillStyle: 'blue',strokeStyle: "blue",lineWidth: 3}});
var ground = Bodies.rectangle((simWidth/2), groundY, groundWidth, 60, { isStatic: true });
var oil = Bodies.rectangle((simWidth/2), lineY, oilWidth, oilHeight, { isStatic: true, render: {fillStyle: 'rgba(240, 181, 5, 0.5)',lineWidth: 3}, collisionFilter: {
    category: 0x0001,
    mask: 0x0000
  }})
oil.isSensor = true;

var button = document.getElementById("reset");

button.onclick = function(){
  Matter.Body.set(water, 'position', { x: (simWidth/2), y: waterY })
  Matter.Body.set(water, "velocity", { x: 0,  y: 0})
};

// add all of the bodies to the world
Composite.add(engine.world, [line1, line2, oil, water, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

function loop() {
  document.getElementById("viteza").innerText = "Viteza=" + Math.round(water.velocity.y*100)/1000 + "m/s"
  if(water.position.y > velocityThreshold && water.velocity.y > 0.25)
    {
      Matter.Body.set(water, "velocity", {x:0, y:0.25});
    }
  requestAnimationFrame(loop);
}

loop();