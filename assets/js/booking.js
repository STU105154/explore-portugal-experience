(function () {
  const f = document.getElementById('booking-form');
  if (!f) return;

  const phoneIntl = '+351962516005';
  const businessEmail = 'nomadaeuforia@gmail.com';

  const v = n => (f.elements[n]?.value || '').trim();
  const r = n => (new FormData(f).get(n) || '').toString();
  const ok = () => f.elements['consent'].checked || (alert('Por favor, aceita o envio dos dados.'), false);

  function msg(){
    return [
      'Pedido de Reserva — Explore Portugal Experience','',
      `Nome: ${v('name')}`, `Email: ${v('email')}`, `Telefone: ${v('phone') || '-'}`, '',
      `Itinerário: ${v('pickup')} → ${v('dropoff')}`,
      `Data/Hora: ${v('date')} ${v('time')}`, `Tipo de viagem: ${r('triptype')}`, '',
      `Passageiros: ${v('passengers')}`, `Bagagem: ${v('luggage') || '0'}`,
      `Veículo: ${v('vehicle')}`, `Extras: ${v('extras') || '-'}`
    ].join('\n');
  }

  document.getElementById('send-email')?.addEventListener('click', ()=>{
    if(!f.reportValidity() || !ok()) return;
    location.href = `mailto:${businessEmail}?subject=${encodeURIComponent('Pedido de Reserva')}&body=${encodeURIComponent(msg())}`;
  });

  document.getElementById('send-whatsapp')?.addEventListener('click', ()=>{
    if(!f.reportValidity() || !ok()) return;
    window.open(`https://wa.me/${phoneIntl.replace(/\D/g,'')}?text=${encodeURIComponent(msg())}`,'_blank','noopener');
  });
})();
