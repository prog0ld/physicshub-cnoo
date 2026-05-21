var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite;

var engine = Engine.create();

const simulationDiv = window.parent.document.getElementById("simulation-mount");
const offset = document.getElementById("info").clientHeight + 40;

let masaC1 = 2;
let masaC2 = 4;

let distantaBrat1 = 120;
let distantaBrat2 = 60;

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: simulationDiv.clientWidth,
        height: simulationDiv.clientHeight - offset,
        wireframes: true,
        background: "#111"
    }
});

const ctx = render.canvas.getContext("2d");
const simWidth = simulationDiv.clientWidth;
const simHeight = simulationDiv.clientHeight - offset;

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

let momentStanga = masaC1 * distantaBrat1;
let momentDreapta = masaC2 * distantaBrat2;

const unghiMaxim = Math.PI / 6;

let rotatie = 0;

function updateRotationAndPositions() {
    momentStanga = masaC1 * distantaBrat1;
    momentDreapta = masaC2 * distantaBrat2;

    const diferenta = momentDreapta - momentStanga;
    if (diferenta !== 0) {
        rotatie = (diferenta / Math.max(Math.abs(momentStanga), Math.abs(momentDreapta))) * unghiMaxim;
    } else {
        rotatie = 0;
    }

    Body.setAngle(bara, rotatie);

    const p1 = rotatePoint(-distantaBrat1, 0, rotatie);
    const p2 = rotatePoint(distantaBrat2, 0, rotatie);

    Body.setPosition(corp1, p1);
    Body.setPosition(corp2, p2);
}

var bara = Bodies.rectangle(
    simWidth / 2,
    simHeight / 2,
    400,
    20,
    {
        isStatic: true,
        angle: rotatie
    }
);

function rotatePoint(x, y, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
        x: simWidth / 2 + x * cos - y * sin,
        y: simHeight / 2 + x * sin + y * cos
    };
}

const p1 = rotatePoint(-distantaBrat1, 0, rotatie);
const p2 = rotatePoint(distantaBrat2, 0, rotatie);

var corp1 = Bodies.circle(
    p1.x,
    p1.y,
    30,
    {
        isStatic: true
    }
);

var corp2 = Bodies.circle(
    p2.x,
    p2.y,
    30,
    {
        isStatic: true
    }
);

Composite.add(engine.world, [
    bara,
    corp1,
    corp2
]);

Render.run(render);

var runner = Runner.create();
Runner.run(runner, engine);

function change(){
    masaC1 = parseFloat(document.getElementById("m1").value) || masaC1;
    masaC2 = parseFloat(document.getElementById("m2").value) || masaC2;

    distantaBrat1 = parseFloat(document.getElementById("b1").value) || distantaBrat1;
    distantaBrat2 = parseFloat(document.getElementById("b2").value) || distantaBrat2;

    Body.setMass(corp1, masaC1);
    Body.setMass(corp2, masaC2);

    updateRotationAndPositions();
}

document.getElementById("m1").addEventListener("input", change);
document.getElementById("m2").addEventListener("input", change);
document.getElementById("b1").addEventListener("input", change);
document.getElementById("b2").addEventListener("input", change);

Matter.Events.on(render, "afterRender", function () {

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    ctx.fillText(
        "Moment stanga: " + momentStanga,
        20,
        30
    );

    ctx.fillText(
        "Moment dreapta: " + momentDreapta,
        20,
        60
    );

    ctx.fillText(
        "Rotatie: " + (rotatie * 180 / Math.PI).toFixed(2) + "°",
        20,
        90
    );

    drawLetter(corp1.position.x, corp1.position.y, "1");
    drawLetter(corp2.position.x, corp2.position.y, "2");
});