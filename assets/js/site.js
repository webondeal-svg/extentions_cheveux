/* The Glam Room — maquette. Le site fonctionne sans ce script (menu, choix de réservation, FAQ). */
(function () {
  var html = document.documentElement;
  html.classList.add('js');

  // Repères de maquette : afficher ou masquer les pastilles « à confirmer »
  var boutonReperes = document.querySelector('[data-reperes]');
  function majBouton() {
    if (!boutonReperes) return;
    var actifs = html.classList.contains('annot');
    boutonReperes.textContent = actifs ? 'Masquer les repères' : 'Afficher les repères';
    boutonReperes.setAttribute('aria-pressed', actifs ? 'false' : 'true');
  }
  if (boutonReperes) {
    majBouton();
    boutonReperes.addEventListener('click', function () {
      html.classList.toggle('annot');
      try { localStorage.setItem('tgr-reperes', html.classList.contains('annot') ? '1' : '0'); } catch (e) {}
      majBouton();
    });
  }

  // En-tête : filet au défilement ; barre mobile masquée quand le pied de page est visible
  var entete = document.querySelector('[data-entete]');
  function auDefilement() { if (entete) entete.classList.toggle('defile', window.scrollY > 8); }
  window.addEventListener('scroll', auDefilement, { passive: true });
  auDefilement();
  var barre = document.querySelector('.barre-mobile');
  var pied = document.querySelector('.pied');
  if (barre && pied && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entrees) {
      barre.classList.toggle('cachee', entrees[0].isIntersecting);
    }).observe(pied);
  }

  // Menu mobile : se referme après un clic sur un lien ou avec Échap
  var menu = document.querySelector('[data-menu]');
  if (menu) {
    var syncMenu = function () {
      document.body.classList.toggle('menu-ouvert', menu.hasAttribute('open'));
    };
    menu.addEventListener('toggle', syncMenu);
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.removeAttribute('open');
        syncMenu();
      }
    });
    syncMenu();
  }

  // Choix de réservation : fenêtre accessible (Échap, focus, retour au bouton)
  var modale = document.querySelector('[data-modale]');
  var declencheur = null;
  function ouvrir(e) {
    if (e) e.preventDefault();
    declencheur = document.activeElement;
    if (menu) menu.removeAttribute('open');
    modale.classList.add('ouverte');
    document.body.style.overflow = 'hidden';
    var premier = modale.querySelector('.modale-boite a.btn');
    if (premier) premier.focus({ preventScroll: true });
  }
  function fermer(e) {
    if (e) e.preventDefault();
    modale.classList.remove('ouverte');
    document.body.style.overflow = '';
    if (location.hash === '#rdv') history.replaceState(null, '', location.pathname + location.search);
    if (declencheur && declencheur.focus) declencheur.focus({ preventScroll: true });
  }
  if (modale) {
    document.querySelectorAll('[data-rdv]').forEach(function (a) { a.addEventListener('click', ouvrir); });
    modale.querySelectorAll('[data-fermer]').forEach(function (a) { a.addEventListener('click', fermer); });
    document.addEventListener('keydown', function (e) {
      if (!modale.classList.contains('ouverte')) return;
      if (e.key === 'Escape') fermer(e);
      if (e.key === 'Tab') {
        var f = modale.querySelectorAll('.modale-boite a[href]');
        var premier = f[0], dernier = f[f.length - 1];
        if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
        else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
      }
    });
    if (location.hash === '#rdv') ouvrir();
  }

  // Page Extensions : rubrique en cours dans la sous-navigation
  var sousNav = document.querySelector('.sous-nav');
  if (sousNav && 'IntersectionObserver' in window) {
    var liens = {};
    sousNav.querySelectorAll('a').forEach(function (a) { liens[a.getAttribute('href').slice(1)] = a; });
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(liens).forEach(function (id) { liens[id].classList.toggle('actif', id === en.target.id); });
        var a = liens[en.target.id];
        if (a) a.parentNode.scrollTo({ left: a.offsetLeft - 24, behavior: 'smooth' });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(liens).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) obs.observe(s);
    });
  }

  // Infos pratiques : signale les horaires du jour
  var horaires = document.querySelector('[data-horaires]');
  if (horaires) {
    var jour = String(new Date().getDay());
    horaires.querySelectorAll('tr[data-jours]').forEach(function (tr) {
      if (tr.getAttribute('data-jours').split(' ').indexOf(jour) > -1) tr.classList.add('aujourdhui');
    });
  }
})();
