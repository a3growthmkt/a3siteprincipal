/* ===================================================
   WESTFINK CLONE — script.js
   Interactions: sticky header, hamburger, scroll reveal
=================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // === STICKY HEADER ===
  const header = document.getElementById('site-header');
  function handleScroll() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // === HAMBURGER MENU ===
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  hamburgerBtn.addEventListener('click', function () {
    hamburgerBtn.classList.toggle('active');
    mobileNav.classList.toggle('open');
  });

  // Close nav when clicking a link
  const navLinks = mobileNav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      hamburgerBtn.classList.remove('active');
      mobileNav.classList.remove('open');
    });
  });

  // Close nav on outside click
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) {
      hamburgerBtn.classList.remove('active');
      mobileNav.classList.remove('open');
    }
  });

  // === SCROLL REVEAL ===
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for sibling elements
          const siblings = entry.target.parentElement.querySelectorAll('.reveal');
          let index = Array.from(siblings).indexOf(entry.target);
          index = Math.min(index, 4); // cap at 4 for timing
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach(el => observer.observe(el));

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  // === PILLAR CARDS — glow effect on hover ===
  const pillarCards = document.querySelectorAll('.pillar-card');
  pillarCards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  // === METHODOLOGY CAROUSEL (mobile swipe) ===
  // Simple touch handling for method steps on mobile
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  document.addEventListener('touchend', e => { touchEndX = e.changedTouches[0].screenX; }, { passive: true });

  // === SOLUTIONS MODAL LOGIC ===
  const solutionsData = {
    "1": {
      title: "A3 Traffic",
      category: "Gestão de Tráfego Pago",
      headline: "O problema não é falta de verba. É falta de estratégia.",
      description: "Gerenciamos suas campanhas no Google e Meta Ads com foco em custo por lead e custo por aquisição — não em alcance ou impressões. Cada real investido é rastreado até o fechamento, para você saber exatamente o que está gerando retorno.",
      deliverables: [
        "Configuração e gestão de campanhas Google e Meta",
        "Criação e otimização de públicos e segmentações",
        "Testes de criativos e copies com foco em conversão",
        "Relatórios semanais com métricas que importam"
      ],
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>'
    },
    "2": {
      title: "A3 Page",
      category: "Criação de Sites e Landing Pages",
      headline: "Site bonito que não converte é despesa, não investimento.",
      description: "Desenvolvemos páginas com arquitetura de conversão — cada elemento, copy e CTA é pensado para transformar visitante em lead e lead em cliente. Nada de template genérico.",
      deliverables: [
        "Landing pages focadas em conversão para campanhas",
        "Sites institucionais com posicionamento e copy estratégica",
        "Integração com CRM e ferramentas de automação",
        "Otimização para velocidade e SEO técnico"
      ],
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>'
    },
    "3": {
      title: "A3 Creative",
      category: "Criativos para Anúncios",
      headline: "Criativo ruim desperdiça verba. Criativo certo escala resultado.",
      description: "Produzimos peças visuais e copies para anúncios alinhados com sua oferta, seu público e o momento de compra. Testamos formatos e mensagens para descobrir o que converte mais no seu nicho.",
      deliverables: [
        "Criativos estáticos e em vídeo para Meta e Google",
        "Copies de anúncio com foco em clique e conversão",
        "Testes A/B de formatos e mensagens",
        "Produção contínua alinhada com a gestão de tráfego"
      ],
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>'
    },
    "4": {
      title: "A3 Social",
      category: "Gestão de Redes Sociais",
      headline: "Redes sociais não são para entretenimento. São para posicionamento e autoridade.",
      description: "Gerenciamos seu Instagram e LinkedIn com estratégia de conteúdo focada em atrair o cliente certo antes mesmo do primeiro contato comercial — reduzindo o ciclo de vendas e aumentando a taxa de fechamento.",
      deliverables: [
        "Planejamento e produção de conteúdo mensal",
        "Gestão de Instagram e LinkedIn",
        "Estratégia de posicionamento por nicho",
        "Relatório de desempenho e ajuste de estratégia"
      ],
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>'
    },
    "5": {
      title: "A3 Chat",
      category: "Atendimento Comercial com IA",
      headline: "Lead sem atendimento rápido é lead perdido.",
      description: "Implementamos assistentes de IA para qualificar, responder e encaminhar leads em tempo real — 24 horas por dia, 7 dias por semana. Seu time comercial recebe o lead já qualificado, pronto para a abordagem de fechamento.",
      deliverables: [
        "Desenvolvimento e configuração do assistente de IA",
        "Integração com WhatsApp, Instagram e site",
        "Fluxos de qualificação e agendamento automático",
        "Integração direta com o CRM"
      ],
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'
    },
    "7": {
      title: "A3 Insights",
      category: "Implementação de BI",
      headline: "Quem toma decisão com achismo perde dinheiro todo mês.",
      description: "Implementamos dashboards e relatórios que mostram em tempo real onde sua operação ganha, onde perde e onde tem oportunidade. Dados de marketing, vendas e operação integrados em uma visão única.",
      deliverables: [
        "Mapeamento de indicadores críticos do negócio",
        "Desenvolvimento de dashboards personalizados",
        "Integração de fontes de dados — CRM, tráfego, financeiro",
        "Treinamento do time para leitura e uso dos dados"
      ],
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z"/></svg>'
    },
    "8": {
      title: "A3 Playbook",
      category: "Treinamento Comercial",
      headline: "Time sem processo depende de talento individual. Time com processo escala resultado.",
      description: "Estruturamos o playbook comercial completo da sua operação e treinamos o time para executar — da abordagem inicial até o fechamento. Chega de improvisar na hora de vender.",
      deliverables: [
        "Mapeamento do processo comercial atual",
        "Desenvolvimento do playbook de vendas personalizado",
        "Treinamento prático do time comercial",
        "Scripts de abordagem, follow-up e fechamento"
      ],
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>'
    },
    "9": {
      title: "A3 CRM",
      category: "Implementação de CRM",
      headline: "CRM mal configurado é pior do que não ter CRM.",
      description: "Implementamos e configuramos o Kommo CRM sob medida para a sua operação — com funis, automações e integrações que fazem o seu time acompanhar cada lead do primeiro contato até o fechamento, sem deixar nenhuma oportunidade escapar.",
      deliverables: [
        "Configuração completa do Kommo CRM",
        "Criação de funis e etapas do processo comercial",
        "Automações de follow-up e notificações",
        "Treinamento do time e suporte na implantação"
      ],
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>'
    }
  };

  const modal = document.getElementById('solutions-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const pillarLinks = document.querySelectorAll('.pillar-link');

  function openModal(pillarId) {
    const data = solutionsData[pillarId];
    if (!data) return;

    // Populating modal content
    document.getElementById('modal-icon').innerHTML = data.icon;
    document.getElementById('modal-category').innerText = data.category;
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-headline').innerText = data.headline;
    document.getElementById('modal-description').innerText = data.description;

    const list = document.getElementById('modal-deliverables-list');
    list.innerHTML = '';
    data.deliverables.forEach(item => {
      const li = document.createElement('li');
      li.innerText = item;
      list.appendChild(li);
    });

    // Show modal
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  pillarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const card = this.closest('.pillar-card');
      const pillarId = card.getAttribute('data-pillar');
      
      // Skip A3 Voice (Pillar 6)
      if (pillarId === "6" || card.classList.contains('pillar-card--soon')) {
        return; // Normal anchor behavior or nothing
      }

      e.preventDefault();
      openModal(pillarId);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // === HERO FORM HANDLING ===
  const heroForm = document.getElementById('hero-lead-form');
  const phoneInput = document.getElementById('form-telefone');

  if (heroForm && phoneInput) {
    // Simple phone mask (BR format: (00) 00000-0000)
    phoneInput.addEventListener('input', function (e) {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      
      let formatted = '';
      if (v.length > 0) {
        formatted = '(' + v.slice(0, 2);
        if (v.length > 2) {
          formatted += ') ' + v.slice(2, 7);
          if (v.length > 7) {
            formatted += '-' + v.slice(7, 11);
          }
        }
      }
      e.target.value = formatted;
    });

    heroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = heroForm.querySelector('button[type="submit"]');
      const originalBtnText = btn.innerText;

      // Visual feedback
      btn.disabled = true;
      btn.innerText = 'ENVIANDO...';

      const formData = new FormData(heroForm);
      const data = Object.fromEntries(formData.entries());
      
      // Timestamp for the sheet
      data.timestamp = new Date().toLocaleString('pt-BR');

      // Web App URL final gerada e validada pelo agente (a3growthmkt)
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwsKVIn4xw78NdiMfgKFg6kIuIjoKh6tcEfMR0Pn7M0kOQWB84D3EwsyJe14FyHMLgK/exec'; 

      fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(() => {
        heroForm.innerHTML = `
          <div class="form-success-message" style="text-align: center; padding: 40px 0; animation: fadeIn 0.5s ease forwards;">
            <div style="font-size: 4rem; color: var(--primary); margin-bottom: 24px;">✓</div>
            <h3 style="color: var(--white); margin-bottom: 12px; font-size: 1.5rem;">Solicitação Enviada!</h3>
            <p style="color: var(--gray); font-size: 0.95rem; line-height: 1.6;">Obrigado, ${data.nome.split(' ')[0]}! Um de nossos especialistas entrará em contato com você em breve.</p>
          </div>
        `;
      })
      .catch(error => {
        console.error('Error!', error.message);
        btn.disabled = false;
        btn.innerText = originalBtnText;
        alert('Ocorreu um erro ao enviar. Por favor, tente novamente ou fale conosco pelo WhatsApp.');
      });
    });
  }

});

