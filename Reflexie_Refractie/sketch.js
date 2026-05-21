    const canvas = document.getElementById("c");
    const ctx = canvas.getContext("2d");

    const infoDiv = document.getElementById("info");
    const outputEl = document.getElementById("output");

    infoDiv.style.color = "white";
    outputEl.style.color = "white";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - infoDiv.offsetHeight - 8;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const L = Math.min(W, H) * 0.33;

    function drawArrow(ax, ay, bx, by, color, w) {
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.strokeStyle = color;
      ctx.lineWidth = w;
      ctx.stroke();

      const angle = Math.atan2(by - ay, bx - ax);
      const s = 12;
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
      ctx.font = "15px Arial";
      ctx.fillStyle = color;
      ctx.fillText(letter, 0, 0);
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      let theta = parseFloat(document.getElementById("angle").value) || 0;
      let n1 = parseFloat(document.getElementById("n1").value) || 1;
      let n2 = parseFloat(document.getElementById("n2").value) || 1.5;

      let t1 = theta * Math.PI / 180;
      let sin2 = (n1 / n2) * Math.sin(t1);
      let tir = sin2 >= 1;
      let t2 = tir ? null : Math.asin(sin2);

      ctx.setLineDash([6, 5]);
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(W, cy);
      ctx.strokeStyle = "#999";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy - 150);
      ctx.lineTo(cx, cy + 150);
      ctx.strokeStyle = "#ccc";
      ctx.stroke();
      ctx.setLineDash([]);

      drawArrow(cx - Math.sin(t1) * L, cy - Math.cos(t1) * L, cx, cy, "blue", 2);
      drawLetter(cx - Math.sin(t1) * L - 14, cy - Math.cos(t1) * L + 10, "I", "blue");

      drawArrow(cx, cy, cx + Math.sin(t1) * L, cy - Math.cos(t1) * L, "red", tir ? 2 : 1.2);
      drawLetter(cx + Math.sin(t1) * L + 14, cy - Math.cos(t1) * L + 10, "R", "red");

      if (!tir) {
        drawArrow(cx, cy, cx + Math.sin(t2) * L, cy + Math.cos(t2) * L, "green", 2);
        drawLetter(cx + Math.sin(t2) * L + 14, cy + Math.cos(t2) * L - 10, "T", "green");
      }
      ctx.font = "13px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("n1=" + n1.toFixed(2), 8, 18);
      ctx.fillText("n2=" + n2.toFixed(2), 8, cy + 18);

      let tc = n2 > n1 ? (Math.asin(n1 / n2) * 180 / Math.PI).toFixed(1) + "°" : "—";
      let t2text = tir ? "TIR" : (t2 * 180 / Math.PI).toFixed(1) + "°";
      document.getElementById("output").innerText = "θr=" + theta.toFixed(1) + "°   θ2=" + t2text;
    }

    document.getElementById("angle").oninput = draw;
    document.getElementById("n1").oninput = draw;
    document.getElementById("n2").oninput = draw;

    draw();