document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");
  const budgetWidget = document.getElementById("budget-widget");
  const budgetButton = document.getElementById("budget-button");
  const budgetMenu = document.getElementById("budget-menu");
  const budgetClose = document.getElementById("budget-close");
  const budgetOptions = document.querySelectorAll(".budget-options button");
  const whatsappNumber = "5511952339356";

  function openNav() {
    siteNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Fechar menu");
  }

  function closeNav() {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
  }

  function openBudgetMenu() {
    budgetMenu.hidden = false;
    budgetButton.setAttribute("aria-expanded", "true");
  }

  function closeBudgetMenu() {
    budgetMenu.hidden = true;
    budgetButton.setAttribute("aria-expanded", "false");
  }

  function openWhatsApp(service) {
    const message =
      service === "Outro Serviço"
        ? "Olá! Gostaria de conversar sobre um serviço sob medida."
        : `Olá! Gostaria de solicitar um orçamento para ${service}.`;

    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  navToggle.addEventListener("click", () => {
    if (siteNav.classList.contains("is-open")) {
      closeNav();
      return;
    }

    openNav();
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  budgetButton.addEventListener("click", () => {
    if (budgetMenu.hidden) {
      openBudgetMenu();
      return;
    }

    closeBudgetMenu();
  });

  budgetClose.addEventListener("click", closeBudgetMenu);

  budgetOptions.forEach((option) => {
    option.addEventListener("click", () => {
      openWhatsApp(option.dataset.service);
      closeBudgetMenu();
    });
  });

  document.addEventListener("click", (event) => {
    const clickedOutsideNav = !siteNav.contains(event.target) && !navToggle.contains(event.target);
    const clickedOutsideBudget = !budgetWidget.contains(event.target);

    if (clickedOutsideNav) {
      closeNav();
    }

    if (clickedOutsideBudget) {
      closeBudgetMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    closeNav();
    closeBudgetMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1040) {
      closeNav();
    }
  });
});
