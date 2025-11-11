(function(){
  const f = document.getElementById('partners-form');
  if(!f) return;

  const phoneIntl = '+351962516005';
  const businessEmail = 'nomadaeuforia@gmail.com';

  const get = n => (f.elements[n]?.value || '').trim();

  function consentOk(){
    if(!f.elements['consent'].checked){
      alert('Por favor, aceita o envio dos dados para avançarmos.');
      return false;
    }
    return true;
  }

  function msg(){
    return [
      'Registo de Parceiro — Explore Portugal Experience',
      '',
      `Empresa: ${get('company')}`,
      `NIF / VAT: ${get('vat') || '-'}`,
      `Pessoa de contacto: ${get('contact')}`,
      `Email: ${get('email')}`,
      `Telefone: ${get('phone') || '-'}`,
      `Website / Redes: ${get('web') || '-'}`,
      `Tipo de parceria: ${get('ptype')}`,
      '',
      'Mensagem:',
      get('message') || '-'
    ].join('\n');
  }

  document.getElementById('partner-email')?.addEventListener('click', ()=>{
    if(!f.reportValidity() || !consentOk()) return;
    const subject = encodeURIComponent('Registo de Parceiro');
    const body = encodeURIComponent(msg());
    window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
  });

  document.getElementById('partner-whatsapp')?.addEventListener('click', ()=>{
    if(!f.reportValidity() || !consentOk()) return;
    const text = encodeURIComponent(msg());
    const url = `https://wa.me/${phoneIntl.replace(/\D/g,'')}?text=${text}`;
    window.open(url,'_blank','noopener');
  });
})();
