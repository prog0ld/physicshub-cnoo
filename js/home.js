const grilaProiecte = document.querySelector("#project-grid");
const listaProiecte = window.PROJECTS ?? [];

function sablonCardDosar(proiect, index) {
  const esteGol = Boolean(proiect.placeholder);
  const clasaMod = esteGol ? "card-lab--gol" : "";
  const eticheta = esteGol ? "Slot liber" : "Simulare";
  const tintaLink = `./project.html?id=${proiect.id}`;

  return `
    <a href="${tintaLink}" class="card-lab ${clasaMod}" style="animation-delay:${index * 0.06}s">
      <span class="card-lab__nr">#${String(index + 1).padStart(2, "0")}</span>
      <span class="card-lab__eticheta">${eticheta}</span>
      <h2 class="card-lab__titlu mono-heading">${proiect.title}</h2>
      <p class="card-lab__sub">${proiect.subtitle}</p>
      <p class="card-lab__rezumat">${proiect.summary}</p>
      <div class="card-lab__jos">
        <span class="tag-tehnic">Motor: ${proiect.engine}</span>
        <span class="tag-tehnic">Tema: ${proiect.topic}</span>
      </div>
      <div class="card-lab__cta">
        <span>${esteGol ? "Configureaza dosarul" : "Deschide pagina proiectului"}</span>
        <span aria-hidden="true">→</span>
      </div>
    </a>
  `;
}

if (grilaProiecte) {
  grilaProiecte.innerHTML = listaProiecte.length
    ? listaProiecte.map(sablonCardDosar).join("")
    : '<p class="mono-heading text-sm text-[var(--text-sobit)]">Nu exista proiecte incarcate.</p>';
}
