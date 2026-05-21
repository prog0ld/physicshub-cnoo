const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const infoDiv = document.getElementById("info");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - infoDiv.offsetHeight - 8;

const W = canvas.width;
const H = canvas.height;
const cx = W / 2;
const cy = H / 2;

const scale = Math.min(W, H) / 14;

function drawArrow(ax, ay, bx, by, color, w) {
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.strokeStyle = color;
  ctx.lineWidth = w;
  ctx.stroke();

  var angle = Math.atan2(by - ay, bx - ax);
  var s = 10;
  ctx.beginPath();
  ctx.moveTo(bx, by);
  ctx.lineTo(bx - s * Math.cos(angle - Math.PI / 7), by - s * Math.sin(angle - Math.PI / 7));
  ctx.lineTo(bx - s * Math.cos(angle + Math.PI / 7), by - s * Math.sin(angle + Math.PI / 7));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLetter(x, y, letter, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "13px Arial";
  ctx.fillStyle = color;
  ctx.fillText(letter, 0, 0);
  ctx.restore();
}

function drawDashed(ax, ay, bx, by, color) {
  ctx.save();
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function drawPoint(x, y, label, color, side) {
  ctx.beginPath();
  ctx.arc(x, cy, 4, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  var lx = side === "left" ? x - 10 : x + 10;
  drawLetter(lx, cy + 16, label, color);
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  var tip = document.getElementById("tip").value;
  var f = parseFloat(document.getElementById("focal").value) || 150;
  var d = parseFloat(document.getElementById("dist").value) || 300;

  var fReal = tip === "convergenta" ? f : -f;
  var dPrim = (fReal * d) / (d - fReal);
  var m = -dPrim / d;
  var fPx = f * scale;

  ctx.beginPath();
  ctx.moveTo(0, cy);
  ctx.lineTo(W, cy);
  ctx.strokeStyle = "#999";
  ctx.lineWidth = 1;
  ctx.stroke();

  var lentH = H * 0.35;
  ctx.beginPath();
  ctx.moveTo(cx, cy - lentH);
  ctx.lineTo(cx, cy + lentH);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();

  if (tip === "convergenta") {
    drawArrow(cx, cy - lentH + 20, cx, cy - lentH, "white", 2);
    drawArrow(cx, cy + lentH - 20, cx, cy + lentH, "white", 2);
  } else {
    drawArrow(cx, cy - lentH, cx, cy - lentH + 20, "white", 2);
    drawArrow(cx, cy + lentH, cx, cy + lentH - 20, "white", 2);
  }

  drawPoint(cx, cy, "O", "white", "right");
  drawPoint(cx - fPx, cy, "F\u2081", "white", "left");
  drawPoint(cx + fPx, cy, "F\u2082", "white", "right");
  drawPoint(cx - 2 * fPx, cy, "C\u2081", "#aaa", "left");
  drawPoint(cx + 2 * fPx, cy, "C\u2082", "#aaa", "right");

  var objH = scale * 1.5;
  var objX = cx - d * scale;
  if (objX < 20) objX = 20;

  drawArrow(objX, cy, objX, cy - objH, "blue", 2);
  drawLetter(objX - 16, cy - objH / 2, "AB", "blue");

  var imgX = cx + dPrim * scale;
  var imgH = objH * Math.abs(m);
  var isReal = dPrim > 0;
  var imgColor = isReal ? "red" : "green";
  var imgTopY = m < 0 ? cy + imgH : cy - imgH;

  if (imgX > 10 && imgX < W - 10) {
    drawArrow(imgX, cy, imgX, imgTopY, imgColor, 2);
    drawLetter(imgX + 16, (cy + imgTopY) / 2, "A'B'", imgColor);
    if (!isReal) drawDashed(imgX, cy, imgX, imgTopY, imgColor);
  }

  var Ax = objX, Ay = cy - objH;

  var r1_lensY = Ay;
  drawArrow(Ax, Ay, cx, r1_lensY, "orange", 1.5);
  if (tip === "convergenta") {
    var slope1 = (cy - r1_lensY) / fPx;
    drawArrow(cx, r1_lensY, W, r1_lensY + slope1 * (W - cx), "orange", 1.5);
  } else {
    var slope1 = (r1_lensY - cy) / fPx;
    drawArrow(cx, r1_lensY, W, r1_lensY + slope1 * (W - cx), "orange", 1.5);
    drawDashed(cx, r1_lensY, cx - fPx, cy, "orange");
  }

  var slopeC = (cy - Ay) / (cx - Ax);
  drawArrow(Ax, Ay, cx, cy, "purple", 1.5);
  drawArrow(cx, cy, W, Ay + slopeC * (W - Ax), "purple", 1.5);

  if (tip === "convergenta") {
    var slope3 = (cy - Ay) / (cx - fPx - Ax);
    var r3_lensY = Ay + slope3 * (cx - Ax);
    drawArrow(Ax, Ay, cx, r3_lensY, "teal", 1.5);
    drawArrow(cx, r3_lensY, W, r3_lensY, "teal", 1.5);
  } else {
    var slope3 = (cy - Ay) / (cx + fPx - Ax);
    var r3_lensY = Ay + slope3 * (cx - Ax);
    drawArrow(Ax, Ay, cx, r3_lensY, "teal", 1.5);
    drawArrow(cx, r3_lensY, W, r3_lensY, "teal", 1.5);
    drawDashed(Ax, Ay, cx + fPx, cy, "teal");
  }

  ctx.font = "12px Arial";
  ctx.fillStyle = "#aaa";
  ctx.fillText("d=" + d.toFixed(0) + "cm", (objX + cx) / 2, cy + 32);
  if (imgX > 10 && imgX < W - 10) {
    ctx.fillText("|d'|=" + Math.abs(dPrim).toFixed(1) + "cm", (cx + imgX) / 2, cy + 32);
  }

  var imgType = tip === "convergenta"
    ? (d > f ? "reala, rasturnata" : "virtuala, dreapta")
    : "virtuala, dreapta";

  document.getElementById("output").innerText =
    "d'=" + dPrim.toFixed(1) + "cm   m=" + m.toFixed(2) + "   imagine: " + imgType;
}

document.getElementById("tip").oninput = draw;
document.getElementById("focal").oninput = draw;
document.getElementById("dist").oninput = draw;

draw();