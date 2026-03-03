import { eventData } from './config.js';

document.addEventListener('DOMContentLoaded', () => {

  // --- Apertura del sobre ---
  const envelopeimage = document.getElementById('envelopeimage');
  const envelope = document.getElementById('envelope');
  const mainContent = document.querySelector('.main-content');
  const audioPlayer = document.getElementById('audioPlayer');
  const playPauseButton = document.getElementById('playPauseButton');

  envelopeimage.addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(() => {
      envelope.style.display = 'none';
      mainContent.classList.remove('hidden');

      initMusicNotes(mainContent);

      audioPlayer.play();
      playPauseButton.innerText = 'Pause';
    }, 1000);
  });

  // Cargar datos generales del hero
document.getElementById('couple-names').innerText = eventData.couple.names;
document.getElementById('couple-last').innerText = eventData.couple.last;


  // --- Música ---
  audioPlayer.src = eventData.song.file;
  document.getElementById('song-title').innerText = eventData.song.title;

  const progressBar = document.getElementById('progress-bar');
  const currentTime = document.getElementById('current-time');
  const durationTime = document.getElementById('duration-time');

  playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseButton.innerText = 'Pause';
    } else {
      audioPlayer.pause();
      playPauseButton.innerText = 'Play';
    }
  });

  audioPlayer.addEventListener('loadedmetadata', () => {
    durationTime.textContent = formatTime(audioPlayer.duration);
  });

  audioPlayer.addEventListener('timeupdate', () => {
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    currentTime.textContent = formatTime(audioPlayer.currentTime);
  });

  progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

//--- Botón para añadir al calendario ---
window.addToCalendar = function () {
  const calendarURL = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mis+XV+Kimberly+Pamela+V%C3%A1squez+Piedrasanta+%F0%9F%91%91&dates=20260411/20260412&details=Celebraci%C3%B3n+de+XV+a%C3%B1os+de+Kimberly+Pamela+V%C3%A1squez+Piedrasanta&location=Guatemala";
  window.open(calendarURL, "_blank");
}


  // --- Itinerario ---
  // --- Ceremonia ---
  document.getElementById('ceremony-place').innerText = eventData.ceremony.place;
  document.getElementById('ceremony-address').innerText = eventData.ceremony.address;
  document.getElementById('ceremony-date').innerText = eventData.ceremony.date;
  document.getElementById('ceremony-time').innerText = eventData.ceremony.time;
  document.getElementById('ceremony-map').onclick = () => window.open(eventData.ceremony.mapLink, '_blank');

    // --- Recepción ---
  document.getElementById('reception-place').innerText = eventData.reception.place;
  document.getElementById('reception-address').innerText = eventData.reception.address;
  document.getElementById('reception-address1').innerText = eventData.reception.address1;
  document.getElementById('reception-date').innerText = eventData.reception.date;
  document.getElementById('reception-time').innerText = eventData.reception.time;
  document.getElementById('reception-map').onclick = () => window.open(eventData.reception.mapLink, '_blank');

  // --- Lluvia de sobres ---
  document.getElementById('abroad-gift-message').innerText = eventData.abroadGiftMessage;
  

  // --- Playlist ---
  document.getElementById('playlist-description').innerText = eventData.playlistDescription;
  document.getElementById('playlist-button').onclick = () => window.open(eventData.playlistLink, '_blank');

  // --- Dress Code ---
  // DRESS CODE dinámico
const dresscode = eventData.dresscode;

document.getElementById('dresscode-details').innerHTML = `
  <p>${dresscode.description}</p>
`;

//--document.getElementById('dresscode-inspo').innerHTML = `--//
  //--<button onclick="window.open('${dresscode.inspiration.women}', '_blank')">Inspiración para Mujeres</button>--//
 //--<button onclick="window.open('${dresscode.inspiration.men}', '_blank')">Inspiración para Hombres</button>`;--//


  // --- Álbum (QR + link) ---
  document.getElementById('qr-album').src = eventData.album.qrImage;
  document.getElementById('upload-photos').href = eventData.album.uploadLink;
  document.getElementById('upload-description').innerText = eventData.album.uploadDescription;
  document.getElementById('event-hashtag').innerText = eventData.album.hashtag;

//BUENOS DESEOS
// script.js (normal, sin import)
document.getElementById('send-wish').addEventListener('click', () => {
  document.getElementById('wish-form').classList.toggle('hidden');
});

document.getElementById('submit-wish').addEventListener('click', () => {
  const name = document.getElementById('wish-name').value.trim();
  const message = document.getElementById('wish-message').value.trim();

  if (name && message) {
    guardarDeseo(name, message)
      .then(() => {
        alert("¡Deseo enviado!");
        document.getElementById('wish-name').value = '';
        document.getElementById('wish-message').value = '';
        document.getElementById('wish-form').classList.add('hidden');
      })
      .catch(err => console.error("❌ Error al guardar el deseo:", err));
  } else {
    alert("Por favor, completá ambos campos.");
  }
});

document.getElementById('show-wishes').addEventListener('click', () => {
  const container = document.getElementById('wishes-container');
  container.classList.toggle('hidden');

  if (!container.classList.contains('hidden')) {
    escucharDeseos((lista) => {
      container.innerHTML = '';
      lista.forEach(deseo => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${deseo.nombre}</strong>: ${deseo.mensaje}`;
        container.appendChild(p);
      });
    });
  }
});


  // --- Final: Foto y Frase ---
  document.getElementById('final-message').innerText = eventData.finalMessage;

  // --- Footer (redes sociales) ---
  const socialIcons = document.getElementById('social-icons');

socialIcons.innerHTML = `
  <a href="${eventData.footer.social.whatsapp}" target="_blank" aria-label="Whatsapp">
    <i class="fab fa-whatsapp"></i>
  </a>
  <a href="${eventData.footer.social.facebook}" target="_blank" aria-label="Facebook">
    <i class="fab fa-facebook"></i>
  </a>
  <a href="${eventData.footer.social.instagram}" target="_blank" aria-label="Instagram">
    <i class="fab fa-instagram"></i>
  </a>
`;

document.getElementById('footer-logo').src = eventData.footer.logo;


  // --- Animaciones Scroll (fade-in) ---
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });

  function initMusicNotes(mainContent) {
    // Evita duplicar listeners si se vuelve a ejecutar
    if (window.__notesInitialized) return;
    window.__notesInitialized = true;
  
    // Scroll real: si main-content es el que scrollea, usamos ese.
    // Si no, usamos document.scrollingElement (html)
    const scroller =
      (mainContent && mainContent.scrollHeight > mainContent.clientHeight + 5)
        ? mainContent
        : document.scrollingElement;
  
    // Capa fija para que nunca quede detrás
    let layer = document.getElementById("notes-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "notes-layer";
      document.body.appendChild(layer);
    }
  
    // Mini burst inicial (prueba visible)
    burstNotes(layer, 8);
  
    let last = scroller.scrollTop || 0;
    let lock = false;
  
    scroller.addEventListener("scroll", () => {
      const now = scroller.scrollTop || 0;
      if (Math.abs(now - last) < 40) return;
  
      if (lock) return;
      lock = true;
      setTimeout(() => (lock = false), 250);
  
      burstNotes(layer, 6 + Math.floor(Math.random() * 6));
      last = now;
    }, { passive: true });
  }
  
  function burstNotes(layer, count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => createNote(layer), i * 70);
    }
  }
  
  function createNote(layer) {
    const note = document.createElement("div");
    note.className = "music-note";
    note.textContent = ["♪","♫","♩","♬"][Math.floor(Math.random() * 4)];
  
    note.style.left = Math.floor(Math.random() * (window.innerWidth - 20)) + "px";
    note.style.top  = Math.floor(Math.random() * 40 + 10) + "px";
  
    note.style.fontSize = (9 + Math.random() * 5).toFixed(1) + "px";
    note.style.opacity  = (0.35 + Math.random() * 0.45).toFixed(2);
    note.style.animationDuration = (2.0 + Math.random() * 1.2).toFixed(2) + "s";
  
    layer.appendChild(note);
    note.addEventListener("animationend", () => note.remove());
  }
  
  // --- Contador regresivo ---
  const [day, month, year] = eventData.couple.date.split('.').map(s => s.trim());
  const weddingDate = new Date(`${year}-${month}-${day}T00:00:00`);
  const countdown = setInterval(() => {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      clearInterval(countdown);
      document.getElementById('countdown').innerHTML = "<h2>¡Hoy es el gran día!</h2>";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
  }, 1000);

});

//galeria
document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll(".galeria-xv-img");
  const lightbox = document.getElementById("lightbox-xv");
  const lightboxImg = document.getElementById("lightbox-xv-img");
  const closeBtn = document.getElementById("lightbox-xv-close");

  if (!lightbox || !lightboxImg || !closeBtn) return;

  imgs.forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.style.display = "block";
    });
  });

  function closeLightbox(){
    lightbox.style.display = "none";
    lightboxImg.src = "";
    document.body.style.overflow = "";          // ✅ devuelve el scroll
  }

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "block") closeLightbox();
  });
});