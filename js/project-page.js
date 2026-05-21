const parametriUrl = new URLSearchParams(window.location.search);
const idProiect = parametriUrl.get("id");
const proiect = window.getProjectById ? window.getProjectById(idProiect) : null;

if (!proiect) {
  throw new Error("Datele proiectului nu sunt incarcate. Include js/projects.js inainte de js/project-page.js.");
}

const nodTitlu = document.querySelector("#project-title");
const nodSubtitlu = document.querySelector("#project-subtitle");
const nodActualizare = document.querySelector("#last-updated");
const nodDescriere = document.querySelector("#project-description");
const nodIpoteze = document.querySelector("#project-ipoteze");
const nodObiective = document.querySelector("#project-obiective");
const nodEtichete = document.querySelector("#project-tags");
const nodEcuatii = document.querySelector("#equation-list");
const nodNotite = document.querySelector("#lab-note-list");
const nodMedia = document.querySelector("#lab-media");
const nodSimulare = document.querySelector("#simulation-mount");
const etichetaSimTehnic = document.querySelector("#sim-tech-label");

if (nodTitlu) nodTitlu.textContent = proiect.title;
if (nodSubtitlu) nodSubtitlu.textContent = proiect.subtitle;

if (nodActualizare) {
  if (!proiect.lastUpdated) {
    nodActualizare.textContent = "—";
  } else {
    const dataActualizare = new Date(proiect.lastUpdated);
    nodActualizare.textContent = Number.isNaN(dataActualizare.valueOf())
      ? "—"
      : `${dataActualizare.toLocaleDateString("ro-RO")} ${dataActualizare.toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}`;
  }
}

if (nodDescriere) {
  nodDescriere.innerHTML = proiect.descriereProiect || "<p>TODO: scrie descriere.</p>";
}

function umpleLista(nod, elemente) {
  if (!nod) return;
  if (!elemente || !elemente.length) {
    nod.innerHTML = '<li class="text-[var(--text-sobit)]">—</li>';
    return;
  }
  nod.innerHTML = elemente.map((linie) => `<li>${linie}</li>`).join("");
}

umpleLista(nodIpoteze, proiect.ipoteze);
umpleLista(nodObiective, proiect.obiective);

if (nodEtichete) {
  nodEtichete.innerHTML = `
    <span class="tag-tehnic">Motor: ${proiect.engine}</span>
    <span class="tag-tehnic">Tema: ${proiect.topic}</span>
  `;
}

if (etichetaSimTehnic) {
  etichetaSimTehnic.textContent = proiect.caleSimulare ? "iframe · simulare integrata" : "fara iframe configurat";
}

if (nodEcuatii) {
  if (!proiect.equations || !proiect.equations.length) {
    nodEcuatii.innerHTML = '<p class="text-sm text-[var(--text-sobit)]">TODO: pune 1-2 formule simple.</p>';
  } else {
    nodEcuatii.innerHTML = proiect.equations
      .map((eq) => `<div class="card-eq">\\(${eq}\\)</div>`)
      .join("");
  }
}

if (nodNotite) {
  if (!proiect.notes || !proiect.notes.length) {
    nodNotite.innerHTML = "<li>—</li>";
  } else {
    nodNotite.innerHTML = proiect.notes.map((nota) => `<li>${nota}</li>`).join("");
  }
}

if (nodMedia) {
  const mediaContent = [];

  // Helper function to detect media type
  function isVideoFile(src) {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => src.toLowerCase().endsWith(ext));
  }

  // Adaugă imagini si video-uri din media array
  if (proiect.media && proiect.media.length) {
    mediaContent.push(
      proiect.media
        .map(
          (elementMedia) => {
            const isVideo = elementMedia.src && isVideoFile(elementMedia.src);
            const mediaElement = isVideo
              ? `<video controls class="max-w-full max-h-full object-contain">
                   <source src="${elementMedia.src}" type="video/mp4">
                   Browserul tău nu suportă tag-ul video.
                 </video>`
              : `<img src="${elementMedia.src}" alt="${elementMedia.label}" class="max-w-full max-h-full object-contain">`;
            
            return `<div class="card-eq">
               <p class="mono-heading text-[0.65rem] text-[var(--text-sobit)] mb-2">${elementMedia.label}</p>
               <div class="flex min-h-[10rem] items-center justify-center rounded-lg border border-[var(--contur)] bg-[rgba(0,0,0,0.25)] text-xs text-[var(--text-sobit)]">
                 ${elementMedia.src ? mediaElement : "TODO: pune fisier"}
               </div>
             </div>`;
          },
        )
        .join("")
    );
  }

  // Adaugă link descărcare pentru docx
  if (proiect.materialStudiu && proiect.materialStudiu.docxFile) {
    mediaContent.push(`
      <div class="card-eq">
        <p class="mono-heading text-[0.65rem] text-[var(--text-sobit)] mb-2">${proiect.materialStudiu.label || "Material de studiu"}</p>
        <a 
          href="${proiect.materialStudiu.docxFile}" 
          download
          class="flex h-[10rem] items-center justify-center rounded-lg border border-[var(--accent)] bg-[rgba(255,165,0,0.1)] text-center text-sm font-medium text-[var(--accent)] hover:bg-[rgba(255,165,0,0.2)] transition"
        >
          ⬇️ Descarcă material
        </a>
      </div>
    `);
  }

  if (mediaContent.length === 0) {
    nodMedia.innerHTML =
      '<p class="text-sm text-[var(--text-sobit)]">TODO: adauga resurse (media + docx) in <code class="text-[var(--accent)]">projects.js</code>.</p>';
  } else {
    nodMedia.innerHTML = mediaContent.join("");
  }
}

if (nodSimulare) {
  const cale = proiect.caleSimulare;
  if (cale) {
    nodSimulare.innerHTML = `
      <iframe
        class="sim-iframe"
        title="Simulare integrata"
        id="simNode"
        src="${cale}"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    `;
  } else {
    nodSimulare.innerHTML = `
      <div class="flex h-full min-h-[320px] flex-col items-center justify-center gap-2 p-6 text-center text-sm text-[var(--text-sobit)]">
        <p>TODO: seteaza <code class="text-[var(--accent)]">caleSimulare</code> in <code class="text-[var(--accent)]">projects.js</code>.</p>
      </div>
    `;
  }
}

if (window.MathJax?.typesetPromise) {
  window.MathJax.typesetPromise();
}
