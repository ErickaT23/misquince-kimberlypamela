const guests = [
    { id: "1", name: "Anabella & Leandro", passes: 2 },
    { id: "2", name: "Macarena & Rogelio", passes: 2 },
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
  
    function getQueryParams() {
      const params = {};
      const queryString = window.location.search.substring(1);
      const pairs = queryString.split("&");
      for (const pair of pairs) {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent((value || '').replace(/\+/g, ' '));
      }
      return params;
    }
  
    const queryParams = getQueryParams();
    const guestId = queryParams.id;
    const guest = guests.find(g => g.id === guestId);
  
    if (guest) {
      const invitationText = guest.passes > 1
        ? `¡${guest.name}, están invitados!`
        : `¡${guest.name}, estás invitado!`;
  
      document.getElementById('guest-name').textContent = invitationText;
      document.getElementById('passes').textContent = `${guest.passes} ${guest.passes === 1 ? 'persona' : 'personas'}`;
    } else {
      document.getElementById('guest-name').textContent = `¡Invitado no encontrado!`;
      const invitationInfo = document.querySelector('.invitation-info-section');
      if (invitationInfo) invitationInfo.style.display = 'none';
    }
  
  });
  