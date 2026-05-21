const Engine = Matter.Engine, 
    Render = Matter.Render, 
    Runner = Matter.Runner,
    Bodies = Matter.Bodies, 
    Body = Matter.Body, 
    Composite = Matter.Composite,
    Events = Matter.Events;

const engine = Engine.create();
engine.gravity.y = 0;

const simDiv = document.getElementById("simulation-mount");
const offset = document.getElementById("info").clientHeight + 20;
const W = simDiv.clientWidth, H = simDiv.clientHeight - offset;

const render = Render.create({
    element: simDiv,
    engine: engine,
    options: { 
        width: W,
        height: H*1.15,
        wireframes: false, 
        background: "#000000" 
    }
});
let ctx = render.canvas.getContext("2d");

const CX = W / 2, CY = H / 2;
const PL = Math.min(Math.max(W * 0.75, 320), 700);
const PT = Math.min(Math.max(H * 0.04, 16), 30);
const PR = Math.min(Math.max(W * 0.03, 12), 24);
const B1W = PL * 0.12;
const B1H = PT * 1.8;
const B2S = PL * 0.1;
const SCALE = 100, g = 9.81;

let angle = 25 * Math.PI / 180;
let simRunning = false, simDone = false;
let b1Dist = 0, b1Vel = 0, b2Vel = 0;
let physAcc = 0, physFnet = 0, physT = 0, physFriction = 0;

let plane = Bodies.rectangle(CX, CY, PL, PT, { isStatic: true, isSensor: true, render: { fillStyle: "#777" } });
let box1  = Bodies.rectangle(0, 0, B1W, B1H, { isStatic: true, isSensor: true, render: { fillStyle: "#3498db" } });
let box2  = Bodies.rectangle(0, 0, B2S, B2S, { isStatic: true, isSensor: true, render: { fillStyle: "#e74c3c" } });
let ground = Bodies.rectangle(CX, simDiv.clientHeight - 10, W, 40, { isStatic: true, render: { fillStyle: "#444" } });

Composite.add(engine.world, [plane, box1, box2, ground]);
Render.run(render);
Runner.run(Runner.create(), engine);

function along(a) { return { x: Math.cos(a), y: -Math.sin(a) }; }
function norm(a)  { return { x: -Math.sin(a), y: -Math.cos(a) }; }
function pulley(a) {
    let al = along(a);
    return { x: CX + al.x * PL / 2, y: CY + al.y * PL / 2 };
}

function Fizica(a, mu, m1, m2) {
    let sinA = Math.sin(a), cosA = Math.cos(a);
    let N = m1 * g * cosA, friction = mu * N;
    let Fnet = m2 * g - m1 * g * sinA - friction;
    let acc  = Fnet / (m1 + m2);
    let T    = m2 * (g - acc);
    let Lplane = PL / SCALE;
    let Lu = m1 * g * Lplane * sinA;
    let Lc = m2 * g * Lplane;
    return { Fnet, acc, T, friction, N, Lu, Lc, eta: Lc > 0 ? Math.min((Lu / Lc) * 100, 100) : 0 };
}

function updateResults(ph) {
    document.getElementById("lu").innerHTML  = "Lu = " + ph.Lu.toFixed(2) + " J";
    document.getElementById("lc").innerHTML  = "Lc = " + ph.Lc.toFixed(2) + " J";
    document.getElementById("eta").innerHTML = "η = "  + ph.eta.toFixed(1) + "%";
    if (document.getElementById("fnet"))    document.getElementById("fnet").innerHTML    = "F_net = " + ph.Fnet.toFixed(2) + " N";
    if (document.getElementById("acc"))     document.getElementById("acc").innerHTML     = "a = " + ph.acc.toFixed(3) + " m/s²";
    if (document.getElementById("tension")) document.getElementById("tension").innerHTML = "T = " + ph.T.toFixed(2) + " N";
}

function drawArrow(x1, y1, x2, y2, color) {
    let a = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 10 * Math.cos(a - Math.PI / 6), y2 - 10 * Math.sin(a - Math.PI / 6));
    ctx.lineTo(x2 - 10 * Math.cos(a + Math.PI / 6), y2 - 10 * Math.sin(a + Math.PI / 6));
    ctx.closePath(); ctx.fillStyle = color; ctx.fill();
}

function updateSimulation() {
    let angleDeg = parseFloat(document.getElementById("angle").value) || 25;
    angle = angleDeg * Math.PI / 180;
    let mu = parseFloat(document.getElementById("friction").value) || 0.15;
    let m1 = parseFloat(document.getElementById("m1").value) || 2;
    let m2 = parseFloat(document.getElementById("m2").value) || 1.5;
    let ph = Fizica(angle, mu, m1, m2);
    updateResults(ph);

    if (ph.Fnet <= 0) {
        document.getElementById("state").innerHTML = "Sistem în repaus, F_net = " + ph.Fnet.toFixed(2) + " N (cutia nu se mișcă)";
        simRunning = false; simDone = true;
    } else {
        physAcc = ph.acc * SCALE; physFnet = ph.Fnet; physT = ph.T; physFriction = ph.friction;
        simRunning = true; simDone = false; b1Vel = 0; b2Vel = 0;
    }

    let al = along(angle), no = norm(angle), perp = B1H / 2 + PT / 2;
    b1Dist = -PL / 2 + B1W / 2 + 10;
    Body.setAngle(plane, -angle);
    Body.setPosition(plane, { x: CX, y: CY });
    Body.setPosition(box1, { x: CX + al.x * b1Dist + no.x * perp, y: CY + al.y * b1Dist + no.y * perp });
    Body.setAngle(box1, -angle);
    let p = pulley(angle);
    Body.setPosition(box2, { x: p.x + PR, y: p.y + 20 });
    Body.setAngle(box2, 0);
}

let lastTs = null;
Events.on(engine, "beforeUpdate", function(ev) {
    if (!simRunning || simDone) return;
    let now = ev.timestamp;
    if (lastTs === null) { lastTs = now; return; }
    let dt = Math.min((now - lastTs) / 1000, 0.05);
    lastTs = now;

    let al = along(angle), no = norm(angle), perp = B1H / 2 + PT / 2, p = pulley(angle);
    b1Vel += physAcc * dt; b2Vel += physAcc * dt; b1Dist += b1Vel * dt;
    b1Dist += b1Vel * dt;

    Body.setPosition(box1, { x: CX + al.x * b1Dist + no.x * perp, y: CY + al.y * b1Dist + no.y * perp });
    Body.setAngle(box1, -angle);
    Body.setPosition(box2, { x: p.x + PR, y: box2.position.y + (b2Vel * dt) });
    Body.setAngle(box2, 0);

    if (b1Dist >= PL / 2 - B1W / 2 - PR - 5) {
        simRunning = false; simDone = true;
        document.getElementById("state").innerHTML = "Simulare finalizată — cutia a ajuns la scripete.";
        return;
    }
    document.getElementById("state").innerHTML = "v = " + (b1Vel / SCALE).toFixed(2) + " m/s | a = " + physAcc.toFixed(1) + " px/s²";
});

Events.on(render, "afterRender", function() {
    let al = along(angle), no = norm(angle), p = pulley(angle);
    let rtX = p.x + no.x * PR, rtY = p.y + no.y * PR;

    ctx.beginPath(); ctx.moveTo(box1.position.x, box1.position.y);
    ctx.lineTo(rtX, rtY); ctx.lineTo(p.x + PR, p.y);
    ctx.lineTo(box2.position.x, box2.position.y);
    ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 2; ctx.stroke();

    ctx.beginPath(); ctx.arc(p.x, p.y, PR, 0, 2 * Math.PI);
    ctx.fillStyle = "#999"; ctx.fill();
    ctx.strokeStyle = "#555"; ctx.lineWidth = 1.5; ctx.stroke();

    let m1 = parseFloat(document.getElementById("m1").value) || 2;
    let m2v = parseFloat(document.getElementById("m2").value) || 1.5;
    let g1L = 55 + m1 * 3, g2L = 55 + m2v * 3;
    drawArrow(box1.position.x, box1.position.y, box1.position.x, box1.position.y + g1L, "#e74c3c");
    drawArrow(box2.position.x, box2.position.y, box2.position.x, box2.position.y + g2L, "#e74c3c");

    ctx.font = "14px Arial"; ctx.fillStyle = "#c0392b"; ctx.textAlign = "left";
    ctx.fillText("G₁", box1.position.x + 8, box1.position.y + g1L + 16);
    ctx.fillText("G₂", box2.position.x + 8, box2.position.y + g2L + 16);

    if (simRunning && !simDone) {
        let ffL = Math.min(60, physFriction * 7);
        drawArrow(box1.position.x, box1.position.y, box1.position.x - al.x * ffL, box1.position.y - al.y * ffL, "#f39c12");
        ctx.fillStyle = "#d68910"; ctx.font = "13px Arial";
        ctx.fillText("Ff", box1.position.x - al.x * (ffL + 14), box1.position.y - al.y * (ffL + 14));
        let tL = Math.min(70, physT * 5);
        drawArrow(box1.position.x, box1.position.y, box1.position.x + no.x * tL, box1.position.y + no.y * tL, "#8e44ad");
        ctx.fillStyle = "#6c3483";
        ctx.fillText("T", box1.position.x + no.x * (tL + 14), box1.position.y + no.y * (tL + 14));
    }

    ctx.save(); ctx.translate(box1.position.x, box1.position.y); ctx.rotate(-angle);
    ctx.font = "bold 11px Arial"; ctx.fillStyle = "#fff"; ctx.textAlign = "center";
    ctx.fillText("m₁=" + m1.toFixed(1), 0, 4); ctx.restore();

    ctx.font = "bold 11px Arial"; ctx.fillStyle = "#fff"; ctx.textAlign = "center";
    ctx.fillText("m₂=" + m2v.toFixed(1), box2.position.x, box2.position.y + 4);
    ctx.textAlign = "left";
});

document.getElementById("simulate").addEventListener("click", function() {
    lastTs = null;
    updateSimulation();
});

updateSimulation();