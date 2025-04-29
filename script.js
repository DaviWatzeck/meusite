/**
 * CORK Admin Dashboard - Scripts
 * Tema Dark - Portfolio Davi
 */

// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
  // Elementos do layout
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainContent = document.getElementById('main-content');
  const header = document.getElementById('header');
  const pageTitle = document.getElementById('page-title');
  const menuLinks = document.querySelectorAll('.menu-link');
  const sections = document.querySelectorAll('section');

  // Elementos do chat
  const chatWidget = document.getElementById('chat-widget');
  const chatButton = document.getElementById('chat-button');
  const chatBox = document.getElementById('chat-box');
  const chatClose = document.getElementById('chat-close');
  const chatOptions = document.querySelectorAll('.chat-option');

  // Objeto com títulos das seções
  const sectionTitles = {
    'home': 'Dashboard',
    'sobre': 'Sobre Mim',
    'servicos': 'Serviços',
    'projetos': 'Projetos',
    'skills': 'Minhas Skills',
    'contato': 'Contato'
  };

  // Número de telefone para WhatsApp
  const whatsappNumber = '5511952339356';

  // Alterna o estado da sidebar
  function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    header.classList.toggle('expanded');

    // Alterna o ícone do botão
    const icon = sidebarToggle.querySelector('i');
    if (sidebar.classList.contains('collapsed')) {
      icon.classList.remove('fa-chevron-left');
      icon.classList.add('fa-chevron-right');
    } else {
      icon.classList.remove('fa-chevron-right');
      icon.classList.add('fa-chevron-left');
    }
  }

  // Alterna o menu mobile
  function toggleMobileMenu() {
    sidebar.classList.toggle('mobile-active');

    // Alterna o ícone do botão mobile
    const icon = mobileToggle.querySelector('i');
    if (sidebar.classList.contains('mobile-active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  }

  // Define qual link do menu está ativo com base na rolagem
  function setActiveMenu() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    if (current) {
      // Remove classe ativa de todos os links
      menuLinks.forEach(link => {
        link.classList.remove('active');
      });

      // Adiciona classe ativa ao link correspondente à seção atual
      const activeLink = document.querySelector(`.menu-link[href="#${current}"]`);
      if (activeLink) {
        activeLink.classList.add('active');

        // Atualiza o título da página
        if (sectionTitles[current]) {
          pageTitle.textContent = sectionTitles[current];
        }
      }
    }
  }

  // Rolagem suave para as seções
  function smoothScroll(e) {
    e.preventDefault();

    // Fecha o menu mobile se estiver aberto
    if (sidebar.classList.contains('mobile-active')) {
      toggleMobileMenu();
    }

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Cálculo do offset considerando o header
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Aplicar animações quando os elementos entrarem na viewport
  function setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observar cards e outros elementos
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .skill-category, .about-content, .contact-container');
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  // Abre a caixa de chat
  function openChat() {
    chatBox.classList.add('active');
  }

  // Fecha a caixa de chat
  function closeChat() {
    chatBox.classList.remove('active');
  }

  // Redireciona para o WhatsApp com o serviço selecionado
  function redirectToWhatsApp(service) {
    if (service === 'Outro Serviço') {
        const text = encodeURIComponent(`Olá! Gostaria de saber sobre outros serviços que você oferece.`);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${text}`;
        window.open(whatsappUrl, '_blank');
    } else {
        const text = encodeURIComponent(`Olá! Gostaria de solicitar um orçamento para o serviço de ${service}.`);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${text}`;
        window.open(whatsappUrl, '_blank');
    }
  }

  // Abre o chat automaticamente após alguns segundos
  setTimeout(() => {
    if (!chatBox.classList.contains('active')) {
      openChat();
    }
  }, 5000);

  // Evento de rolagem
  window.addEventListener('scroll', () => {
    setActiveMenu();

    // Adiciona efeito de sombra ao header quando rolar
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Event listeners
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  // Adiciona evento de clique para links do menu
  menuLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });

  // Eventos do chat
  if (chatButton) {
    chatButton.addEventListener('click', openChat);
  }

  if (chatClose) {
    chatClose.addEventListener('click', closeChat);
  }

  // Adiciona eventos para as opções de chat
  chatOptions.forEach(option => {
    option.addEventListener('click', function() {
      const service = this.getAttribute('data-service');
      redirectToWhatsApp(service);
    });
  });

  // Inicialização
  setActiveMenu(); // Define o menu ativo inicialmente
  setupIntersectionObserver(); // Configura as animações de entrada

  // Preloader (opcional)
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500);
});
