const caleRelativaSimulare = {
  arc: "../Arc/index.html",
  ulei: "../Simulare_Ulei/index.html",
  oblica: "../Simulare_Aruncare_Pe_Oblica/index.html",
  plan_inclinat: "../Ff_Plan_Inclinat/index.html",
  plan_orizontal: "../Ff_Plan_Orizontal/index.html",
  comp_f_paralele: "../Comp_F_Paralele/index.html",
  reflexie_refractie: "../Reflexie_Refractie/index.html",
  det_d_f: "../Det_d_focale/index.html",
  echi_rotatie: "../Echilibru_Rotatie/index.html",
  comp_f_paralelogram: "../Comp_F_Paralelogram/index.html",
  rand_plan_inclinat: "../Rand_Plan_Inclinat/index.html",
};

const projects = [
  {
    id: "arc",
    title: "Determinarea constantei elastice a unui resort",
    subtitle: "Legea lui Hooke",
    summary: "Determinarea constanței elastice a unui resort prin legătura liniară între forță și alungire.",
    engine: "matter.js",
    topic: "Mecanică",
    caleSimulare: caleRelativaSimulare.arc,
    descriereProiect: `
      <p class="mb-3">Această simulare didactică arată comportamentul unui resort fixat la un capăt și modul în care o forță aplicată determină alungirea acestuia. Elevii pot varia magnitudinea forței și observa relația liniară dintre forță și deplasare pentru a verifica legea lui Hooke.</p>`,
    ipoteze: ["Deformația este mică și aproximativ liniară.", "Resortul este ideal, fără efecte plastice semnificative."],
    obiective: ["Să înțeleg cum se leagă forța de alungire.", "Să estimez constanta elastică k din datele măsurate."],
    equations: [
      String.raw`F = kx`,
      String.raw`k = \frac{F}{x}`,
      String.raw`x = \frac{F}{k}`,
      String.raw`G = mg`,
    ],
    media: [
       {
            label: "Exemplu Forta Elastica",
            src: "../assets/poze/felastica.jpg", 
        },
        {
            label: "Exemplu Forta Elastica",
            src: "../assets/poze/felastica3.jpg", 
        },
        {
            label: "Exemplu Forta Elastica",
            src: "../assets/poze/felastica2.jpg", 
        },
    ],
    materialStudiu: {
      label: "Fișă de laborator",
      docxFile: "../assets/lucrari-lab/Deteminare constanta elastica.doc",
    },
  },
  {
    id: "simulare-ulei",
    title: "Miscare rectilinie uniformă în ulei",
    subtitle: "Miscare rectilinie uniformă într-un fluid",
    summary: "Demonstrație educațională a mișcării rectilinii uniforme pentru un corp supus unei forțe constante și frecării într-un fluid.",
    engine: "matter.js",
    topic: "Fluide (simplu)",
    caleSimulare: caleRelativaSimulare.ulei,
    descriereProiect: `
      <p class="mb-3">Această simulare prezintă mișcarea rectilinie uniformă a unui corp într-un mediu cu frecare. Elevii și profesorii pot observa cum corpul atinge o viteză constantă atunci când forța de tracțiune este echilibrată de forța de frecare.</p>
    
    `,
    ipoteze: ["Forța de frecare este proporțională cu viteza.", "Forța aplicată este constantă și orientată în aceeași direcție cu mișcarea."],
    obiective: ["Să înțeleagă conceptul de mișcare rectilinie uniformă.", "Să observe când și de ce viteza devine constantă într-un fluid."],
    equations: [
      String.raw`F_f = -kv`,
      String.raw`F_{aplicată} + F_f = 0`,
      String.raw`v = \text{constanta}`,
    ],
    media: [
      {
            label: "Exemplu MRU",
            src: "../assets/inregistrari/Miscarea uniforma.mp4", 
        },
    ],
    materialStudiu: {
      label: "Fișă de laborator",
      docxFile: "../assets/lucrari-lab/Studiu miscarea rectilinie uniforma.docx",
    },
  },
  {
    id: "aruncare-oblica",
    title: "Aruncare pe oblică",
    subtitle: "Lansare sub unghi",
    summary: "Prezentare didactică a traiectoriei parabolice în aruncarea pe oblic.",
    engine: "matter.js",
    topic: "Cinematica (clasa a 9-a)",
    caleSimulare: caleRelativaSimulare.oblica,
    descriereProiect: `
      <p class="mb-3">Această simulare explică traiectoria parabolică a unui proiectil lansat sub un unghi. Elevii pot compara bătaia, înălțimea maximă și timpul de zbor obținute în aplicație cu formulele teoretice pentru mișcare rectilinie uniformă pe Ox și MRUV pe Oy.</p>
    `,
    ipoteze: ["Rezistența aerului este neglijată.", "g este constantă.", "Lansarea și aterizarea se fac la același nivel, dacă este cazul."],
    obiective: ["Să compar bătaia măsurată cu formula.", "Să verific că la 45° bătaia este maximă (dacă nivelul e același)."],
    equations: [
      String.raw`v_{0x}=v_0\cos\alpha,\quad v_{0y}=v_0\sin\alpha`,
      String.raw`x(t)=v_0\cos\alpha\cdot t`,
      String.raw`y(t)=v_0\sin\alpha\cdot t-\tfrac{1}{2}gt^2`,
      String.raw`t=\frac{2v_0\sin\alpha}{g}`,
      String.raw`b=\frac{v_0^2\sin 2\alpha}{g}`,
      String.raw`h_{max}=\frac{v_0^2\sin^2\alpha}{2g}`,
    ],
    media: [
      {
            label: "Exemplu aruncare pe oblica",
            src: "../assets/inregistrari/Video Project 2.mp4", 
        },
    ],
    materialStudiu: {
      label: "Fișă de laborator",
      docxFile: "../assets/lucrari-lab/Studiul aruncării pe oblică.docx",
    },
  },
  {
    id: "coef-frecare-plan-inclinat",
    title: "Determinarea coeficientului de frecare pe plan înclinat",
    subtitle: "Corpul coboară rectiliniu uniform pe planul înclinat",
    summary: "Prezentare educațională a determinării coeficientului de frecare pe plan înclinat.",
    engine: "matter.js",
    topic: "Cinematica (clasa a 9-a)",
    caleSimulare: caleRelativaSimulare.plan_inclinat,
    descriereProiect: `
      <p class="mb-3">Această simulare didactică ilustrează mișcarea unui corp pe un plan înclinat și modul în care accelerația depinde de unghiul de înclinare și de frecare. Elevii pot modifica unghiul și observa când corpul începe să alunece pentru a determina coeficientul de frecare.</p>
    `,
    ipoteze: ["Forța de frecare este proporțională cu forța normală.", "Unghiul de înclinare poate fi reglat continuu."],
    obiective: ["Să determin coeficientul de frecare pe plan inclinat.", "Să compar accelerația măsurată cu valoarea teoretică."],
    equations: [
      String.raw`F_{\parallel} = mg \sin\alpha`,
      String.raw`N = mg \cos\alpha`,
      String.raw`F_f = \mu N`,
      String.raw`a = g(\sin\alpha - \mu\cos\alpha) = 0 \text{ ( in cazul simularii noastre)}`,
    ],
    media: [
        {
            label: "Exemplu forta frecare pe plan inclinat",
            src: "../assets/inregistrari/ff_plan_inclinat.mp4", 
        },
    ],
    materialStudiu: {
      label: "Fișă de laborator",
      docxFile: "../assets/lucrari-lab/Determinarea coeficientului de frecare la alunecare, metoda 222.docx",
    },
  },
  {
    id: "coef-frecare-plan-orizontal",
    title: "Mișcare rectilinie uniformă pe plan orizontal",
    subtitle: "Determinarea coeficientului de frecare prin metoda scripetelui",
    summary: "Simulare interactivă a mișcării rectilinii uniforme folosind un corp pe plan orizontal și o greutate suspendată.",
    engine: "matter.js",
    topic: "Dinamică și frecare (clasa a 9-a)",
    caleSimulare: caleRelativaSimulare.plan_orizontal,
    descriereProiect: `
      <p class="mb-3">Această simulare reproduce experimentul clasic de laborator pentru determinarea coeficientului de frecare la alunecare folosind un plan orizontal, un scripete și o greutate suspendată.</p>

      <p class="mb-3">Corpul paralelipipedic este tras de o greutate prin intermediul unui fir trecut peste un scripete. Pentru anumite valori ale maselor, forța de tracțiune devine aproximativ egală cu forța de frecare, iar sistemul se deplasează rectiliniu uniform.</p>

      <p class="mb-0">În simulare sunt folosite valorile experimentale pentru contact lemn / lemn: M = 135 g, m = 23 g, µ = 0.17.</p>
    `,
    ipoteze: [
      "Firul este ideal și inextensibil.",
      "Scripetele este ideal și fără frecare.",
      "Forța de frecare la alunecare este constantă.",
      "Mișcarea observată este aproximativ rectilinie uniformă."
    ],
    obiective: [
      "Să observ condiția necesară pentru mișcarea rectilinie uniformă.",
      "Să compar forța de tracțiune cu forța de frecare.",
      "Să determin coeficientul de frecare la alunecare."
    ],
    equations: [
      String.raw`F_f = \mu N`,
      String.raw`N = Mg`,
      String.raw`F_t = mg`,
      String.raw`\mu = \frac{m}{M}`,
    ],
    media: [
      {
            label: "Exemplu forta frecare pe plan orizontal",
            src: "../assets/inregistrari/Video Project 3.mp4", 
        },
    ],
    materialStudiu: {
      label: "Fișă de laborator",
      docxFile: "../assets/lucrari-lab/Determinare coeficient de frecare cu planul orizontal.docx",
    },
  },  
  {
    id: "Reflexie_Refractie",
    title: "Reflexia și refracția luminii",
    subtitle: "Legea reflexiei și legea refractiei",
    summary: "Prezentare educațională a reflexiei și refracției unui fascicul luminos.",
    engine: "matter.js",
    topic: "Optică",
    caleSimulare: caleRelativaSimulare.reflexie_refractie,
    descriereProiect: `
      <p class="mb-3">Această simulare didactică arată cum un fascicul luminos se reflectă și se refractă la trecerea între medii. Elevii pot varia unghiul de incidență și pot compara unghiurile reflectat și refractat cu legile optice.</p>
    `,
    ipoteze: ["Suprafața este plană și netedă.", "Mediile sunt omogene și izotrope."],
    obiective: ["Să verific legea reflexiei: unghiul de incidență este egal cu unghiul reflectat.", "Să estimez indicele de refracție al unui mediu transparenț folosind legea lui Snell."],
    equations: [
      String.raw`\theta_i = \theta_r`,
      String.raw`n_1 \sin\theta_1 = n_2 \sin\theta_2`,
    ],
    media: [],
    materialStudiu: {
      label: "Fișă de laborator",
      docxFile: "../assets/lucrari-lab/Studiul reflexiei luminii.docx",
      label: "Fișă de laborator",
      docxFile: "../assets/lucrari-lab/Determinarea indicelui de refracție al sticlei.docx",
    },
  },
  {
    id: "comp_f_paralele",
    title: "Compunerea Forțelor Paralele",
    subtitle: "Momentul forței și echilibrul",
    summary: "Prezentare didactică a compunerii forțelor paralele și a echilibrului de rotație.",
    engine: "matter.js",
    topic: "Mecanică",
    caleSimulare: caleRelativaSimulare.comp_f_paralele,
    descriereProiect: `
      <p class="mb-3">Această simulare didactică exemplifică compunerea a două forțe paralele aplicate la distanțe diferite față de un pivot. Elevii pot urmări cum variază momentele și pot identifica condițiile în care bara este în echilibru.</p>
    `,
    ipoteze: ["Bară rigidă (ideală).", "Pivot central fix.", "Forțe perpendiculare pe bară."],
    obiective: ["Să verific condiția de echilibru: M1 = M2.", "Să înțeleg relația dintre forță, brațul forței și moment."],
    equations: [
      String.raw`M = F \cdot d`,
      String.raw`R = F_1 + F_2`,
      String.raw`M_1 = M_2 \text{ (Echilibru)}`,
    ],
    media: [
      {
            label: "Exemplu forta frecare pe plan inclinat",
            src: "../assets/poze/reflexie1.jpg", 
        },
      {
            label: "Exemplu forta frecare pe plan inclinat",
            src: "../assets/poze/reflexie2.jpg", 
        },
      {
            label: "Exemplu forta frecare pe plan inclinat",
            src: "../assets/poze/refractie1.jpg", 
        },
      {
            label: "Exemplu forta frecare pe plan inclinat",
            src: "../assets/poze/refractie2.jpg", 
        },
    ],
    materialStudiu: {
      label: "Fișă de laborator",
      docxFile: "../assets/lucrari-lab/Compunerea forțelor paralele de același sens.docx",
    },
  },
  {
    id: "comp_f_paralelogram",
    title: "Compunerea forțelor cu regula paralelogramului",
    subtitle: "Regula paralelogramului pentru rezultantă",
    summary: "Prezentare educațională a regulii paralelogramului pentru rezultanta a două forțe.",
    engine: "matter.js",
    topic: "Mecanică",
    caleSimulare: caleRelativaSimulare.comp_f_paralelogram,
    descriereProiect: `
      <p class="mb-3">Această simulare didactică arată construirea geometrică a rezultantei pentru două forțe concurente folosind paralelogramul. Elevii pot modifica unghiul și mărimea forțelor pentru a observa efectul asupra rezultantei.</p>
    `,
    ipoteze: ["Forțele sunt aplicate în același punct.", "Forțele se află în același plan.", "Mărimile forțelor sunt independente și vectoriale."],
    obiective: ["Să construiesc rezultanta vectorială a două forțe.", "Să înțeleg cum depinde rezultanta de unghiul dintre forțe."],
    equations: [
      String.raw`\vec{R} = \vec{F}_1 + \vec{F}_2`,
      String.raw`R^2 = F_1^2 + F_2^2 + 2F_1F_2\cos\theta`,
    ],
    media: [
      {
            label: "Exemplu compunerea fortelor cu regula paralelogramului",
            src: "../assets/poze/paralelogram.jpg", 
        },
    ],
    materialStudiu: {
      label: "Fișă de laborator",
      docxFile: "../assets/lucrari-lab/Compunerea forțelor cu regula paralelogramului.docx",
    },
  },
  {
    id: "echi-rotatie",
    title: "Echilibrul de rotație",
    subtitle: "Momentul forței și condițiile de echilibru",
    summary: "Prezentare didactică a echilibrului de rotație pentru o bară rigidă sprijinită la un pivot.",
    engine: "matter.js",
    topic: "Mecanică",
    caleSimulare: caleRelativaSimulare.echi_rotatie,
    descriereProiect: `
      <p class="mb-3">Această simulare explică conceptul de moment al forței și echilibrul rotațional al unei bare rigide. Elevii pot modifica forțele și distanțele de la pivot pentru a observa când momentele se anulează și când apare rotația.</p>
    `,
    ipoteze: ["Bară rigidă ideală.", "Pivot fix fără frecare importantă.", "Forțele sunt aplicate perpendicular pe bară."],
    obiective: ["Să verific condiția de echilibru M_1 = M_2.", "Să observ influența brațului forței asupra momentului."],
    equations: [
      String.raw`M = F \cdot d`,
      String.raw`M_1 = M_2 \text{ (echilibru)}`,
    ],
    media: [],
    materialStudiu: {
      label: "Fișă de laborator",
      docxFile: "../assets/lucrari-lab/Verificarea exp. a condițiilor de echilibru la rotatie.docx",
    },
  },
  {
    id: "det-dist-focale",
    title: "Determinarea distanței focale a unui lentilă convergentă",
    subtitle: "Metoda distanței focale",
    summary: "Simulare interactivă pentru studiul formării imaginilor de către o lentilă convergentă și determinarea distanței focale.",
    engine: "matter.js",
    topic: "Optică (clasa a 9-a)",
    caleSimulare: caleRelativaSimulare.det_d_f,
    descriereProiect: `
      <p class="mb-3">Această simulare reproduce experimentul de laborator pentru determinarea randamentului mecanic al planului înclinat în cazul ridicării uniforme a unui corp prin intermediul unui scripete.</p>

      <p class="mb-3">Corpul paralelipipedic m₁ este tras pe planul înclinat de greutatea suspendată m₂ prin intermediul unui fir trecut peste un scripete ideal. Simularea permite modificarea unghiului planului, a maselor și a coeficientului de frecare pentru observarea influenței acestora asupra mișcării și randamentului.</p>

      <p class="mb-0">Sunt calculate automat lucrul mecanic util, lucrul mecanic consumat și randamentul planului înclinat pentru fiecare determinare experimentală.</p>
    `,
    ipoteze: [
      "Firul este ideal.",
      "Scripetele este ideal.",
      "Forța de frecare la alunecare este constantă.",
      "Mișcarea are loc pe direcția planului înclinat.",
    ],
    obiective: [
      "Să determin randamentul mecanic al planului înclinat.",
      "Să observ influența frecării asupra mișcării.",
      "Să compar lucrul mecanic util cu lucrul mecanic consumat.",
      "Să analizez dependența randamentului de unghiul planului."
    ],
    equations: [
      String.raw`L_u = G_1 h`,
      String.raw`L_c = G_2 l`,
      String.raw`\eta = \frac{L_u}{L_c} \cdot 100`,
      String.raw`F_f = \mu N`,
      String.raw`F_{net} = G_2 - G_1 \sin\alpha - F_f`,
    ],
    media: [
        {
            label: "Exemplu de tabel pentru notițe",
            src: "../assets/IMG-20260515-WA0036.jpg",
        },
    ],
    materialStudiu: {
      label: "Fișă de laborator",
      docxFile: "../assets/lucrari-lab/Randamentul planului inclinat.doc",
    },
  },
  {
    id: "randament",
    title: "Determinarea radnamentului pe plan înclinat",
    subtitle: "Randamentul mecanic al planului înclinat",
    summary: "-",
    engine: "matter.js",
    topic: "Mecanică",
    caleSimulare: caleRelativaSimulare.rand_plan_inclinat,
    descriereProiect: `
      <p class="mb-3">Această simulare reproduce experimentul de laborator pentru determinarea randamentului mecanic al planului înclinat în cazul ridicării uniforme a unui corp prin intermediul unui scripete.</p>

      <p class="mb-3">Corpul paralelipipedic m₁ este tras pe planul înclinat de greutatea suspendată m₂ prin intermediul unui fir trecut peste un scripete ideal. Simularea permite modificarea unghiului planului, a maselor și a coeficientului de frecare pentru observarea influenței acestora asupra mișcării și randamentului.</p>

      <p class="mb-0">Sunt calculate automat lucrul mecanic util, lucrul mecanic consumat și randamentul planului înclinat pentru fiecare determinare experimentală.</p>
    `,
    ipoteze: [
      "Firul este ideal.",
      "Scripetele este ideal.",
      "Forța de frecare la alunecare este constantă.",
      "Mișcarea are loc pe direcția planului înclinat.",
    ],
    obiective: [
      "Să determin randamentul mecanic al planului înclinat.",
      "Să observ influența frecării asupra mișcării.",
      "Să compar lucrul mecanic util cu lucrul mecanic consumat.",
      "Să analizez dependența randamentului de unghiul planului."
    ],
    equations: [
      String.raw`L_u = G_1 h`,
      String.raw`L_c = G_2 l`,
      String.raw`\eta = \frac{L_u}{L_c} \cdot 100`,
      String.raw`F_f = \mu N`,
      String.raw`F_{net} = G_2 - G_1 \sin\alpha - F_f`,
    ],
    media: [
        {
            label: "Exemplu de tabel pentru notițe",
            src: "../assets/IMG-20260515-WA0036.jpg",
        },
    ],
    materialStudiu: {
      label: "Fișă de laborator",
      docxFile: "../assets/lucrari-lab/Randamentul planului inclinat.doc",
    },
  },
  {
    id: "simulare-ulei",
    title: "Miscare rectilinie uniformă în ulei",
    subtitle: "Miscare rectilinie uniformă într-un fluid",
    summary: "Demonstrație educațională a mișcării rectilinii uniforme pentru un corp supus unei forțe constante și frecării într-un fluid.",
    engine: "matter.js",
    topic: "Fluide (simplu)",
    caleSimulare: caleRelativaSimulare.ulei,
    descriereProiect: `
      <p class="mb-3">Această simulare prezintă mișcarea rectilinie uniformă a unui corp într-un mediu cu frecare. Elevii și profesorii pot observa cum corpul atinge o viteză constantă atunci când forța de tracțiune este echilibrată de forța de frecare.</p>
    
    `,
    ipoteze: ["Forța de frecare este proporțională cu viteza.", "Forța aplicată este constantă și orientată în aceeași direcție cu mișcarea."],
    obiective: ["Să înțeleagă conceptul de mișcare rectilinie uniformă.", "Să observe când și de ce viteza devine constantă într-un fluid."],
    equations: [
      String.raw`F_f = -kv`,
      String.raw`F_{aplicată} + F_f = 0`,
      String.raw`v = \text{constanta}`,
    ],
    media: [],
    materialStudiu: {
      label: "Fișă de laborator",
      docxFile: "../assets/lucrari-lab/Studiu miscarea rectilinie uniforma.docx",
    },
  },
];

function getProjectById(id) {
  return projects.find((project) => project.id === id) ?? projects[0];
}

window.PROJECTS = projects;
window.getProjectById = getProjectById;
