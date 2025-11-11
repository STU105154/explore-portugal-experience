(function () {
  const f = document.getElementById('booking-form');
  if (!f) return;

  const phoneIntl = '+351962516005'; // altera para o teu WhatsApp
  const businessEmail = 'nomadaeuforia@gmail.com'; // altera para o teu email

  function getVal(name) { return (f.elements[name]?.value || '').trim(); }
  function getRadio(name) { return (new FormData(f).get(name) || '').toString(); }
  function assertConsent() {
    if (!f.elements['consent'].checked) {
      alert('Por favor, aceita o envio dos dados para podermos responder.');
      return false;
    }
    return true;
  }
  function buildMessage() {
    const lines = [
      'Pedido de Reserva — Explore Portugal Experience',
      '',
      `Nome: ${getVal('name')}`,
      `Email: ${getVal('email')}`,
      `Telefone: ${getVal('phone') || '-'}`,
      '',
      `Itinerário: ${getVal('pickup')} → ${getVal('dropoff')}`,
      `Data/Hora: ${getVal('date')} ${getVal('time')}`,
      `Tipo de viagem: ${getRadio('triptype')}`,
      '',
      `Passageiros: ${getVal('passengers')}`,
      `Bagagem: ${getVal('luggage') || '0'}`,
      `Veículo: ${getVal('vehicle')}`,
      `Extras: ${getVal('extras') || '-'}`,
    ];
    return lines.join('\n');
  }

  document.getElementById('send-email')?.addEventListener('click', () => {
    if (!f.reportValidity() || !assertConsent()) return;
    const subject = encodeURIComponent('Pedido de Reserva');
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
  });

  document.getElementById('send-whatsapp')?.addEventListener('click', () => {
    if (!f.reportValidity() || !assertConsent()) return;
    const text = encodeURIComponent(buildMessage());
    const url = `https://wa.me/${phoneIntl.replace(/\D/g,'')}?text=${text}`;
    window.open(url, '_blank', 'noopener');
  });
})();
