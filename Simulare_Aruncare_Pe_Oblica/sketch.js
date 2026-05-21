// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

const simulationDiv = window.parent.document.getElementById("simulation-mount");
const offset = document.getElementById("info").clientHeight + 35;
console.log(offset)

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: simulationDiv.clientWidth,
        height: simulationDiv.clientHeight - offset,
        wireframes: false,
        hasBounds: true
    }
});

const width = simulationDiv.clientWidth;
const height = simulationDiv.clientHeight - offset;
const groundY = height * 0.95;
const circleY = height * 0.9;
const borderHeight = height * 1.2;

let canPress = true;
let del = [];

// create two boxes and a ground
var ground = Bodies.rectangle(width/2, groundY, width+20, 60, { isStatic: true });

var circleA = Bodies.circle((width/2)-(width/2.5), circleY, 10);

var border = Bodies.rectangle(width, (height/2), 30, borderHeight, { isStatic: true });

const camWidth = render.options.width;
const camHeight = render.options.height;

const targetX = ground.position.x - camWidth / 2;
const targetY = ground.position.y - (camHeight / 2)-(height/2)+(height/12);

render.bounds.min.x = targetX;
render.bounds.min.y = targetY;

render.bounds.max.x = targetX + camWidth;
render.bounds.max.y = targetY + camHeight;

// add all of the bodies to the world
Composite.add(engine.world, [circleA, ground, border]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();
// run the engine
Runner.run(runner, engine);

const butt = document.getElementById("click");

butt.onclick = function () {
  del.forEach(b => Matter.Composite.remove(engine.world, b));
  del = [];

  let angleDeg = parseFloat(document.getElementById("angle").value);
  let speed = parseFloat(document.getElementById("speed").value / 100);
  let angle = angleDeg * Math.PI / 180;

  let vx0 = Math.cos(angle) * speed * 100;
  let vy0 = -Math.sin(angle) * speed * 100;

  let simEngine = Matter.Engine.create();
  simEngine.world.gravity.y = engine.world.gravity.y;
  simEngine.world.gravity.scale = engine.world.gravity.scale;

  let simGround = Bodies.rectangle(width/2, groundY, width+20, 60, { isStatic: true });
  let simBorder = Bodies.rectangle(width, (height/2), 30, borderHeight, { isStatic: true });
  let temp = Bodies.circle((width/2)-(width/2.5), circleY, 10);

  Composite.add(simEngine.world, [temp, simGround, simBorder]);

  Matter.Body.setVelocity(temp, {
    x: vx0,
    y: vy0
  });

  let steps = 120;
  let sampleEvery = 1;
  
  for (let i = 0; i < steps; i++) {
    Matter.Engine.update(simEngine, 1000 / 60);

    if (i % sampleEvery === 0) {
        let c = Bodies.circle(temp.position.x, temp.position.y, 1, {
            isStatic: true,
            collisionFilter: {
                category: 0x0001,
                mask: 0x0000
            }
        });

        del.push(c);
        Composite.add(engine.world, c);
    }

    const groundTop = groundY - 30;

    if (temp.position.y >= groundTop - temp.circleRadius) {
        break;
    }
}

  if (canPress) {
    canPress = false;

    Matter.Body.setStatic(circleA, true);
    Matter.Body.setPosition(circleA, { x: ((width/2)-(width/2.5)), y: (height - 80) });

    setTimeout(() => {
      Matter.Body.setStatic(circleA, false);

      Matter.Body.setVelocity(circleA, {
        x: vx0,
        y: vy0
      });

      canPress = true;
    }, 2000);
  }
};