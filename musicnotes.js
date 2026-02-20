(function () {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
  
    function ensureLayer() {
      let layer = document.getElementById("music-notes-layer");
      if (!layer) {
        layer = document.createElement("div");
        layer.id = "music-notes-layer";
        document.body.appendChild(layer);
      }
      return layer;
    }
  
    function createNote(layer) {
      const note = document.createElement("div");
      note.className = "music-note";
      note.textContent = ["♪", "♫", "♩", "♬"][Math.floor(Math.random() * 4)];
  
      // posición horizontal random
      note.style.left = Math.floor(Math.random() * (window.innerWidth - 20)) + "px";
  
      // tamaño y duración random
      note.style.fontSize = (14 + Math.random() * 16).toFixed(1) + "px";
      note.style.animationDuration = (3.5 + Math.random() * 3).toFixed(2) + "s";
  
      // ligera variación de opacidad
      note.style.opacity = (0.25 + Math.random() * 0.45).toFixed(2);
  
      layer.appendChild(note);
  
      note.addEventListener("animationend", () => note.remove());
    }
  
    const layer = ensureLayer();
  
    // primeras notas (para que se note el efecto desde que abre)
    for (let i = 0; i < 6; i++) setTimeout(() => createNote(layer), i * 150);
  
    // flujo constante (ajusta el intervalo si quieres más/menos)
    setInterval(() => {
      // si el tab no está activo, no spameamos
      if (document.hidden) return;
      createNote(layer);
    }, 650);
  })();