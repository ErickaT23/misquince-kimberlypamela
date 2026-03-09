const guests = [
  {id: "1", name: "Anabella & Leandro",adults: 2, teens: 1, tableAdults: "5", tableTeens: "A2"},
  {id: "2",name: "Macarena & Rogelio",adults: 2,teens: 0,tableAdults: "3",tableTeens: ""},
  {id: "3",name: "Valentina",adults: 0,teens: 1,tableAdults: "",tableTeens: "J1"}
];

document.addEventListener("DOMContentLoaded", () => {
  function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split("&");

    for (const pair of pairs) {
      if (!pair) continue;
      const [key, value] = pair.split("=");
      params[decodeURIComponent(key)] = decodeURIComponent((value || "").replace(/\+/g, " "));
    }

    return params;
  }

  function formatGuestPasses(adults, teens) {
    const parts = [];

    if (adults > 0) {
      parts.push(`${adults} ${adults === 1 ? "adulto" : "adultos"}`);
    }

    if (teens > 0) {
      parts.push(`${teens} ${teens === 1 ? "adolescente" : "adolescentes"}`);
    }

    return parts.join(" + ");
  }

  const queryParams = getQueryParams();
  const guestId = queryParams.id;
  const guest = guests.find(g => g.id === guestId);

  if (guest) {
    const invitationText = `¡${guest.name}!`;
    const passesText = formatGuestPasses(guest.adults || 0, guest.teens || 0);

    document.getElementById("guest-name").textContent = invitationText;
    document.getElementById("passes").textContent = passesText;

    // Guardamos toda la info para usarla luego en RSVP
    window.currentGuest = {
      id: guest.id,
      name: guest.name,
      adults: guest.adults || 0,
      teens: guest.teens || 0,
      tableAdults: guest.tableAdults || "",
      tableTeens: guest.tableTeens || ""
    };
  } else {
    document.getElementById("guest-name").textContent = "¡Invitado no encontrado!";
    const invitationInfo = document.querySelector(".invitation-info-section");
    if (invitationInfo) invitationInfo.style.display = "none";
  }
});
  