(function(){
  const f = document.getElementById('partners-form');
  if(!f) return;
  const phoneIntl = '+351962516005';
  const businessEmail = 'nomadaeuforia@gmail.com';
  const g = n => (f.elements[n]?.value || '').trim();
  const ok = () => f.elements['consent'].checked || (alert('Por favor, aceita o envio dos dados.'), false);
  const msg = () => [
    'Registo de Parceiro — Explore Portugal Experience','',
    `Empresa: ${g('company')}`, `NIF/VAT: ${g('vat')||'-'}`, `Website/Redes: ${g('web')||'-'}`,
    `Segmento: ${g('ptype')}`, '', `Contacto: ${g('contact')} | ${g('email')} | ${g('phone')||'-'}`, '',
    `Mensagem:`, g('message')||'-'
  ].join('\n');

  document.getElementById('partner-email')?.addEventListener('click', ()=>{
    if(!f.reportValidity() || !ok()) return;
    location.href = `mailto:${businessEmail}?subject=${encodeURIComponent('Registo de Parceria')}&body=${encodeURIComponent(msg())}`;
  });
  document.getElementById('partner-whatsapp')?.addEventListener('click', ()=>{
    if(!f.reportValidity() || !ok()) return;
    window.open(`https://wa.me/${phoneIntl.replace(/\D/g,'')}?text=${encodeURIComponent(msg())}`,'_blank','noopener');
  });
})();
