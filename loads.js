const guests = [
  { id: "1", name: "Kevin López y Jessica Juracán", adults: 2, teens: 0, tableAdults: "4", tableTeens: "" },
  { id: "2", name: "Sr. Walfred López y familia pte.", adults: 3, teens: 0, tableAdults: "4", tableTeens: "" },
  { id: "3", name: "Sr.Eddy López y familia pte.", adults: 3, teens: 3, tableAdults: "7", tableTeens: "1" },
  { id: "4", name: "Sr y Sra. López Piedrasanta", adults: 2, teens: 0, tableAdults: "7", tableTeens: "" },
  { id: "5", name: "Antonio Piedrasanta", adults: 1, teens: 0, tableAdults: "3", tableTeens: "" },
  { id: "6", name: "Johanna Arcia y Julio Mancilla Arcia", adults: 1, teens: 1, tableAdults: "4", tableTeens: "8" },
  { id: "7", name: "Thelma Piedrasanta", adults: 1, teens: 0, tableAdults: "3", tableTeens: "" },
  { id: "8", name: "Astrid López y Marvin Arreola", adults: 2, teens: 0, tableAdults: "3", tableTeens: "" },
  { id: "9", name: "Sr. Nelson López y familia pte.", adults: 3, teens: 1, tableAdults: "7", tableTeens: "1" },
  { id: "10", name: "Sr. Carlos Pinto y familia pte.", adults: 3, teens: 0, tableAdults: "5", tableTeens: "" },
  { id: "11", name: "Sr. Jorge Gordillo y familia pte.", adults: 2, teens: 2, tableAdults: "5", tableTeens: "2" },
  { id: "12", name: "Sr. Freddy Pinto", adults: 1, teens: 1, tableAdults: "5", tableTeens: "2" },
  { id: "13", name: "Sr.Antonio Pinto y familia pte.", adults: 3, teens: 1, tableAdults: "5", tableTeens: "2" },
  { id: "14", name: "Sra. Vivian Piedrasanta", adults: 1, teens: 1, tableAdults: "9", tableTeens: "2" },
  { id: "15", name: "Sr y Sra. Méndez Mazariegos", adults: 2, teens: 0, tableAdults: "6", tableTeens: "" },
  { id: "16", name: "Sra. Ericka Barrios", adults: 1, teens: 0, tableAdults: "6", tableTeens: "" },
  { id: "17", name: "Sra. Leticia Mazariegos", adults: 1, teens: 0, tableAdults: "6", tableTeens: "" },
  { id: "18", name: "Sr. Gustavo Colindres y familia pte.", adults: 4, teens: 0, tableAdults: "9", tableTeens: "" },
  { id: "19", name: "Sr. y Sra. Galindo Najarro", adults: 2, teens: 0, tableAdults: "9", tableTeens: "" },
  { id: "20", name: "Sr.Gabriel Leiva y familia pte.", adults: 3, teens: 2, tableAdults: "1", tableTeens: "1" },
  { id: "21", name: "Natali y Alyson", adults: 1, teens: 1, tableAdults: "8", tableTeens: "3" },
  { id: "22", name: "Sr Felix Ajanel y familia pte.", adults: 2, teens: 3, tableAdults: "8", tableTeens: "4" },
  { id: "23", name: "Sra. Victoria Ajanel y familia pte.", adults: 2, teens: 2, tableAdults: "8", tableTeens: "4" },
  { id: "24", name: "Sra. Sobeida Figueroa", adults: 1, teens: 0, tableAdults: "8", tableTeens: "" },
  { id: "25", name: "Sr. Arnold Vásquez y familia pte.", adults: 3, teens: 1, tableAdults: "2", tableTeens: "9" },
  { id: "26", name: "Christian y Adriana", adults: 2, teens: 0, tableAdults: "2", tableTeens: "" },
  { id: "27", name: "Sr. Alberto Ajpacajá y familia pte.", adults: 2, teens: 2, tableAdults: "2", tableTeens: "9" },
  { id: "28", name: "Gabriela y Lesly", adults: 2, teens: 0, tableAdults: "10", tableTeens: "" },
  { id: "29", name: "Sr. y Sra. López Arévalo", adults: 2, teens: 0, tableAdults: "10", tableTeens: "" },
  { id: "30", name: "Familia Jiménez Azurdía", adults: 2, teens: 1, tableAdults: "8", tableTeens: "8" },
  { id: "31", name: "Rosa López", adults: 1, teens: 0, tableAdults: "4", tableTeens: "" },
  { id: "32", name: "Gloria Alvarado", adults: 1, teens: 0, tableAdults: "4", tableTeens: "" },
  { id: "33", name: "Yesenia Yantuche", adults: 1, teens: 0, tableAdults: "4", tableTeens: "" },
  { id: "34", name: "Rosario Ramos", adults: 1, teens: 0, tableAdults: "4", tableTeens: "" },
  { id: "35", name: "Alejandra y Cristhofer", adults: 2, teens: 0, tableAdults: "9", tableTeens: "" },
  { id: "36", name: "Sr.William Najarro", adults: 1, teens: 1, tableAdults: "9", tableTeens: "2" },
  { id: "37", name: "Sr. y Sra. Vásquez Mazariegos", adults: 2, teens: 0, tableAdults: "2", tableTeens: "" },
  { id: "38", name: "Sr. Danilo Mazariegos", adults: 1, teens: 0, tableAdults: "6", tableTeens: "" },
  { id: "39", name: "Sr. Julio Guzmán y familia Pte", adults: 2, teens: 1, tableAdults: "3", tableTeens: "3" },
  { id: "40", name: "Edin Caal y Lesbi Mazariegos", adults: 2, teens: 0, tableAdults: "6", tableTeens: "" },
  { id: "41", name: "Damaris y Gabriel", adults: 1, teens: 1, tableAdults: "1", tableTeens: "1" },
  { id: "42", name: "Danilo y Mary", adults: 2, teens: 0, tableAdults: "6", tableTeens: "" },
  { id: "43", name: "Sr.Sergio Suruy y familia pte.", adults: 4, teens: 0, tableAdults: "10", tableTeens: "" },
  { id: "44", name: "Celeste y sofia", adults: 2, teens: 0, tableAdults: "10", tableTeens: "" },
  { id: "45", name: "Dayana Olivares", adults: 0, teens: 1, tableAdults: "", tableTeens: "5" },
  { id: "46", name: "Familia Palacios Guzmán", adults: 2, teens: 1, tableAdults: "3", tableTeens: "5" },
  { id: "47", name: "Angela Ruíz", adults: 0, teens: 1, tableAdults: "", tableTeens: "5" },
  { id: "48", name: "Diego Cahueque", adults: 0, teens: 1, tableAdults: "", tableTeens: "6" },
  { id: "49", name: "Samuel López", adults: 0, teens: 1, tableAdults: "", tableTeens: "6" },
  { id: "50", name: "Paolo Miranda", adults: 0, teens: 1, tableAdults: "", tableTeens: "6" },
  { id: "51", name: "Sara Yela", adults: 0, teens: 1, tableAdults: "", tableTeens: "5" },
  { id: "52", name: "Eunice Benegas", adults: 0, teens: 1, tableAdults: "", tableTeens: "7" },
  { id: "53", name: "Ingrid Soy", adults: 0, teens: 1, tableAdults: "", tableTeens: "3" },
  { id: "54", name: "Tania Sosa", adults: 0, teens: 1, tableAdults: "", tableTeens: "3" },
  { id: "55", name: "Byron Ixcamparij", adults: 0, teens: 1, tableAdults: "", tableTeens: "8" },
  { id: "56", name: "Isabel Villatoro", adults: 0, teens: 1, tableAdults: "", tableTeens: "5" },
  { id: "57", name: "Sebastián Colón", adults: 0, teens: 1, tableAdults: "", tableTeens: "6" },
  { id: "58", name: "Josué Martínez", adults: 0, teens: 1, tableAdults: "", tableTeens: "6" },
  { id: "59", name: "Caroline y Cristofer", adults: 1, teens: 1, tableAdults: "", tableTeens: "3" },
  { id: "60", name: "Justo Pérez", adults: 0, teens: 1, tableAdults: "", tableTeens: "3" },
  { id: "61", name: "Haiyen Qiu", adults: 0, teens: 1, tableAdults: "", tableTeens: "5" },
  { id: "62", name: "Angel López", adults: 0, teens: 1, tableAdults: "", tableTeens: "8" },
  { id: "63", name: "Daniela Abal", adults: 0, teens: 1, tableAdults: "", tableTeens: "7" },
  { id: "64", name: "María Fernanda de Paz", adults: 0, teens: 1, tableAdults: "", tableTeens: "7" },
  { id: "65", name: "Adriana Tercero", adults: 0, teens: 1, tableAdults: "", tableTeens: "7" },
  { id: "66", name: "Aldair Tóbal", adults: 0, teens: 1, tableAdults: "", tableTeens: "7" },
  { id: "67", name: "Alejandro Beteta", adults: 0, teens: 1, tableAdults: "", tableTeens: "6" },
  { id: "68", name: "Zharick Navichoque Méndez", adults: 0, teens: 1, tableAdults: "", tableTeens: "3" },
  { id: "69", name: "Jordan Arcia y Walter Arcia", adults: 1, teens: 1, tableAdults: "", tableTeens: "8" },
  { id: "70", name: "David Reynoso Maria Monroy", adults: 2, teens: 0, tableAdults: "7", tableTeens: "" },
  { id: "71", name: "Sr. y Sra. Escobar Mazariegos", adults: 2, teens: 0, tableAdults: "1", tableTeens: "" },
  { id: "72", name: "Sr y Sra Najarro Reyes", adults: 2, teens: 0, tableAdults: "2", tableTeens: "" },
  { id: "73", name: "Jean Pérez", adults: 1, teens: 0, tableAdults: "3", tableTeens: "" },
  { id: "74", name: "Sr y Sra. Franco Hernádez", adults: 2, teens: 0, tableAdults: "8", tableTeens: "" },
  { id: "75", name: "Sr.Angel y familia pte.", adults: 4, teens: 0, tableAdults: "", tableTeens: "" },
  { id: "76", name: "Sra. Leydi Melgar", adults: 2, teens: 0, tableAdults: "", tableTeens: "" },
  { id: "77", name: "Julian y Aury", adults: 2, teens: 0, tableAdults: "2", tableTeens: "" }
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
  