/**************** RSVP CONFIG ****************/
const RSVP_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwCy-cIhlFAKoH4EYSijSwqJpTClitROFQ_vYR3Hn99Y_nOByYqUU9zpToi5UJFs6m0/exec";

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

/**************** UI: CONFIRMADO ****************/
function markConfirmedUI() {
  const btn = $("#btnConfirmarRsvp");
  const msg = $("#msgRsvp"); // mensaje debajo del botón (en la sección)

  if (btn) {
    btn.textContent = "Confirmación enviada ✓";
    btn.disabled = true;
    btn.classList.add("rsvp-confirmed");
  }

  if (msg) {
    msg.style.display = "block";
    msg.className = "rsvp-msg ok";
    msg.textContent = "Gracias, ya has enviado tu confirmación.";
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
  b.setAttribute("aria-hidden", "false"); // ✅ evita warning
  setTimeout(() => b.classList.add("show"), 0);

  // foco inicial
  const firstFocusable = $("#btnRsvpSi") || $("#btnRsvpClose");
  if (firstFocusable) setTimeout(() => firstFocusable.focus(), 50);
}

function closeRsvpModal() {
  const b = $("#rsvpBackdrop");
  if (!b) return;

  b.classList.remove("show");
  setTimeout(() => {
    b.style.display = "none";
    b.setAttribute("aria-hidden", "true"); // ✅ evita warning

    // devolver foco al botón principal
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

/**************** LOCAL CONFIRM (anti doble) ****************/
function storageKey(id) {
  return `rsvp_confirmed_${id}`;
}

function setConfirmed(id, respuesta) {
  localStorage.setItem(storageKey(id), JSON.stringify({ at: Date.now(), respuesta }));
}

function isConfirmed(id) {
  return !!localStorage.getItem(storageKey(id));
}

/**************** GUEST desde URL + DOM ****************/
function getGuestFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return null;

  const nameEl = document.getElementById("guest-name");
  const passesEl = document.getElementById("passes");

  const nombre = (nameEl?.textContent || "Invitado")
    .replace(/^¡/, "")
    .replace(/,?\s*(están invitados|estás invitado)!?$/i, "")
    .trim() || "Invitado";

  const pases = Number.parseInt(passesEl?.textContent || "1", 10);
  return { id, nombre, pases: Number.isFinite(pases) ? pases : 1 };
}

/**************** INIT ****************/
document.addEventListener("DOMContentLoaded", () => {
  const invitado = getGuestFromURL();

  const btnOpen = $("#btnConfirmarRsvp");
  const btnClose = $("#btnRsvpClose");
  const btnSi = $("#btnRsvpSi");
  const btnNo = $("#btnRsvpNo");

  const inputNombre = $("#rsvpNombre");
  const inputPases = $("#rsvpPases");
  const msgModal = $("#rsvpMsgModal");

  // Si falta algo clave, no rompemos
  if (!btnOpen || !btnSi || !btnNo || !inputNombre || !inputPases) return;

  hideMsg(msgModal);

  // Si no hay invitado, dejamos botón activo, pero al abrir avisamos
  if (invitado) {
    inputNombre.value = invitado.nombre;
    inputPases.value = invitado.pases;

    // ✅ Estado inicial: si ya confirmó localmente, pintamos UI como la otra invitación
    if (isConfirmed(invitado.id)) {
      markConfirmedUI();
    } else {
      resetConfirmUI();
    }

    // ✅ Verificación backend “silenciosa” para pintar UI aunque cambie de dispositivo
    (async () => {
      try {
        const ya = await apiCheck(invitado.id);
        if (ya) {
          setConfirmed(invitado.id, "YA");
          markConfirmedUI();
        }
      } catch (e) {
        // no molestamos al usuario si falla el check
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

    // ✅ bloqueo inmediato por localStorage
    if (isConfirmed(invitado.id)) {
      showMsg(msgModal, "Gracias, ya has enviado tu confirmación.", "ok");
      markConfirmedUI();
      setTimeout(closeRsvpModal, 900);
      return;
    }

    // ✅ verificación backend (por si confirmó en otro teléfono)
    try {
      const ya = await apiCheck(invitado.id);
      if (ya) {
        setConfirmed(invitado.id, "YA");
        showMsg(msgModal, "Gracias, ya has enviado tu confirmación.", "ok");
        markConfirmedUI();
        setTimeout(closeRsvpModal, 900);
      }
    } catch (e) {
      console.error("❌ apiCheck:", e);
    }
  });

  /******** Cerrar modal ********/
  if (btnClose) btnClose.addEventListener("click", closeRsvpModal);

  /******** Confirmar ********/
  async function confirmar(respuesta) {
    if (!invitado) return;

    // si ya confirmó, no permitir doble
    if (isConfirmed(invitado.id)) {
      showMsg(msgModal, "Gracias, ya has enviado tu confirmación.", "ok");
      markConfirmedUI();
      setTimeout(closeRsvpModal, 900);
      return;
    }

    const msgSi = "Gracias por confirmar tu asistencia y hacer este día aún más especial.";
    const msgNo = "Lamentamos que no puedas acompañarnos en esta ocasión y agradecemos tu respuesta.";

    try {
      const res = await apiSend({
        guestId: invitado.id,
        nombre: invitado.nombre,
        pases: String(invitado.pases),
        respuesta,
      });

      if (res && (res.ok === true || res.success === true)) {
        setConfirmed(invitado.id, respuesta);
        markConfirmedUI();
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