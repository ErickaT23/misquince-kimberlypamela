/**************** RSVP CONFIG ****************/
const RSVP_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzLeNOqdUdwwNq_5IlFkcrdyMY-9pfUm0JiqqSrSweicym2FCgJQRgQy-Jyb35GZaw/exec";

const $ = (s) => document.querySelector(s);

/**************** HELPERS ****************/
function showMsg(el, text, type = "ok") {
  if (!el) return;
  el.textContent = text;
  el.className = `rsvp-msg ${type}`;
  el.style.display = "block";
}

function hideMsg(el) {
  if (!el) return;
  el.style.display = "none";
  el.textContent = "";
}

function formatGuestPasses(adults, teens) {
  const parts = [];

  if (adults > 0) {
    parts.push(`${adults} ${adults === 1 ? "adulto" : "adultos"}`);
  }

  if (teens > 0) {
    parts.push(`${teens} ${teens === 1 ? "adolescente" : "adolescentes"}`);
  }

  return parts.length ? parts.join(" + ") : "Sin pases";
}

function getMesaMessage(adults, teens, tableAdults, tableTeens) {

  // Solo adultos
  if (adults > 0 && teens === 0) {
    return `Gracias, ya has enviado tu confirmación.
Recuerda que tu mesa asignada es la "${tableAdults}".`;
  }

  // Adultos + adolescentes
  if (adults > 0 && teens > 0) {
    return `Gracias, ya has enviado tu confirmación.
Recuerda que tu mesa para adultos es la "${tableAdults}" y que la de adolescentes es "${tableTeens}".`;
  }

  // Solo adolescentes
  if (adults === 0 && teens > 0) {
    return `Gracias, ya has enviado tu confirmación.
Recuerda que tu mesa asignada es la "${tableTeens}" de adolescentes.`;
  }

  return "Gracias, ya has enviado tu confirmación.";
}

/**************** UI: CONFIRMADO ****************/
function markConfirmedUI(message = "Gracias, ya has enviado tu confirmación.") {
  const btn = $("#btnConfirmarRsvp");
  const msg = $("#msgRsvp");

  if (btn) {
    btn.textContent = "Confirmación enviada ✓";
    btn.disabled = true;
    btn.classList.add("rsvp-confirmed");
  }

  if (msg) {
    msg.style.display = "block";
    msg.className = "rsvp-msg ok";
    msg.innerHTML = message.replace(/\n/g, "<br>");
  }
}

function resetConfirmUI() {
  const btn = $("#btnConfirmarRsvp");
  const msg = $("#msgRsvp");

  if (btn) {
    btn.textContent = "Confirmar";
    btn.disabled = false;
    btn.classList.remove("rsvp-confirmed");
  }

  if (msg) {
    msg.style.display = "none";
    msg.textContent = "";
  }
}

/**************** MODAL ****************/
function openRsvpModal() {
  const b = $("#rsvpBackdrop");
  if (!b) return;

  b.style.display = "flex";
  b.setAttribute("aria-hidden", "false");
  setTimeout(() => b.classList.add("show"), 0);

  const firstFocusable = $("#btnRsvpSi") || $("#btnRsvpClose");
  if (firstFocusable) setTimeout(() => firstFocusable.focus(), 50);
}

function closeRsvpModal() {
  const b = $("#rsvpBackdrop");
  if (!b) return;

  b.classList.remove("show");
  setTimeout(() => {
    b.style.display = "none";
    b.setAttribute("aria-hidden", "true");

    const opener = $("#btnConfirmarRsvp");
    if (opener) opener.focus();
  }, 250);
}

/**************** API ****************/
async function apiCheck(id) {
  const r = await fetch(`${RSVP_ENDPOINT}?guestId=${encodeURIComponent(id)}`);
  const text = await r.text();

  let j;
  try {
    j = JSON.parse(text);
  } catch {
    console.warn("apiCheck no devolvió JSON. Respuesta:", text.slice(0, 200));
    return false;
  }

  return j.alreadyConfirmed === true || j.alreadyConfirmed === "true" || j.alreadyConfirmed === 1;
}

async function apiSend(data) {
  const body = new URLSearchParams(data).toString();

  const r = await fetch(RSVP_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body,
  });

  const text = await r.text();
  try {
    return JSON.parse(text);
  } catch {
    console.warn("apiSend no devolvió JSON. Respuesta:", text.slice(0, 200));
    return { ok: false, raw: text };
  }
}

/**************** LOCAL CONFIRM ****************/
function storageKey(id) {
  return `rsvp_confirmed_${id}`;
}

function setConfirmed(id, respuesta) {
  localStorage.setItem(storageKey(id), JSON.stringify({ at: Date.now(), respuesta }));
}

function isConfirmed(id) {
  return !!localStorage.getItem(storageKey(id));
}

/**************** GUEST ****************/
function getGuestData() {
  if (window.currentGuest && window.currentGuest.id) {
    return window.currentGuest;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return null;

  return {
    id,
    name: "Invitado",
    adults: 0,
    teens: 0,
    tableAdults: "",
    tableTeens: ""
  };
}

/**************** INIT ****************/
document.addEventListener("DOMContentLoaded", () => {
  const invitado = getGuestData();

  const btnOpen = $("#btnConfirmarRsvp");
  const btnClose = $("#btnRsvpClose");
  const btnSi = $("#btnRsvpSi");
  const btnNo = $("#btnRsvpNo");

  const inputNombre = $("#rsvpNombre");
  const inputPases = $("#rsvpPases");
  const inputMesaAdultos = $("#rsvpMesaAdultos");
  const inputMesaAdolescentes = $("#rsvpMesaAdolescentes");
  const msgModal = $("#rsvpMsgModal");

  if (!btnOpen || !btnSi || !btnNo || !inputNombre || !inputPases || !inputMesaAdultos || !inputMesaAdolescentes) return;

  hideMsg(msgModal);

  if (invitado) {
    inputNombre.value = invitado.name || "Invitado";
    inputPases.value = formatGuestPasses(invitado.adults || 0, invitado.teens || 0);
    inputMesaAdultos.value = invitado.tableAdults || "No asignada";
    inputMesaAdolescentes.value = invitado.tableTeens || "No asignada";
  
    // Estado inicial visual
    if (isConfirmed(invitado.id)) {
      markConfirmedUI();
    } else {
      resetConfirmUI();
    }
  
    // Verificación real contra backend
    (async () => {
      try {
        const ya = await apiCheck(invitado.id);
  
        if (ya) {
          setConfirmed(invitado.id, "YA");
          markConfirmedUI();
        } else {
          // Si en Sheets ya no existe, reinicia el estado local
          clearConfirmed(invitado.id);
          resetConfirmUI();
        }
      } catch (e) {
        console.warn("apiCheck inicial falló:", e);
      }
    })();
  }

  btnSi.type = "button";
  btnNo.type = "button";

  /******** Abrir modal ********/
  btnOpen.addEventListener("click", async () => {
    openRsvpModal();
    hideMsg(msgModal);
  
    if (!invitado) {
      showMsg(msgModal, "No se encontró invitado en la URL. Usa ?id=1", "error");
      return;
    }
  
    try {
      const ya = await apiCheck(invitado.id);
  
      if (ya) {
        setConfirmed(invitado.id, "YA");
        showMsg(msgModal, "Gracias, ya has enviado tu confirmación.", "ok");
        markConfirmedUI();
        setTimeout(closeRsvpModal, 900);
        return;
      }
  
      // Si ya no existe en backend, limpiar estado local para permitir confirmar otra vez
      clearConfirmed(invitado.id);
      resetConfirmUI();
  
    } catch (e) {
      console.error("❌ apiCheck:", e);
  
      // Si falla el backend, usamos respaldo local
      if (isConfirmed(invitado.id)) {
        showMsg(msgModal, "Gracias, ya has enviado tu confirmación.", "ok");
        markConfirmedUI();
        setTimeout(closeRsvpModal, 900);
      }
    }
  });

  /******** Cerrar modal ********/
  if (btnClose) btnClose.addEventListener("click", closeRsvpModal);

  /******** Confirmar ********/
  async function confirmar(respuesta) {
    if (!invitado) return;

    try {
      const yaBackend = await apiCheck(invitado.id);
    
      if (yaBackend) {
        setConfirmed(invitado.id, "YA");
        showMsg(msgModal, "Gracias, ya has enviado tu confirmación.", "ok");
        markConfirmedUI();
        setTimeout(closeRsvpModal, 900);
        return;
      } else {
        clearConfirmed(invitado.id);
      }
    } catch (e) {
      console.warn("No se pudo verificar backend antes de confirmar:", e);
    
      if (isConfirmed(invitado.id)) {
        showMsg(msgModal, "Gracias, ya has enviado tu confirmación.", "ok");
        markConfirmedUI();
        setTimeout(closeRsvpModal, 900);
        return;
      }
    }

    const msgSi = getMesaMessage(invitado.adults || 0,invitado.teens || 0,invitado.tableAdults || "",invitado.tableTeens || "");
    const msgNo = "Lamentamos que no puedas acompañarnos en esta ocasión y agradecemos tu respuesta.";

    try {
      const res = await apiSend({
        guestId: invitado.id,
        nombre: invitado.name,
        adults: String(invitado.adults || 0),
        teens: String(invitado.teens || 0),
        pasesDetalle: formatGuestPasses(invitado.adults || 0, invitado.teens || 0),
        mesaAdultos: invitado.tableAdults || "",
        mesaAdolescentes: invitado.tableTeens || "",
        respuesta,
      });

      if (res && (res.ok === true || res.success === true)) {
        setConfirmed(invitado.id, respuesta);
        if (respuesta === "SI") {
          markConfirmedUI(msgSi);
        } else {
          markConfirmedUI(msgNo);
        }
        
        showMsg(msgModal, respuesta === "SI" ? msgSi : msgNo, "ok");
        setTimeout(closeRsvpModal, 900);
      } else {
        console.warn("Respuesta del endpoint:", res);
        showMsg(msgModal, "No se pudo guardar tu respuesta. Intenta de nuevo.", "error");
      }
    } catch (e) {
      console.error("❌ apiSend:", e);
      showMsg(msgModal, "Error de conexión al enviar tu respuesta.", "error");
    }
  }

  btnSi.addEventListener("click", () => confirmar("SI"));
  btnNo.addEventListener("click", () => confirmar("NO"));
});

function clearConfirmed(id) {
  localStorage.removeItem(storageKey(id));
}