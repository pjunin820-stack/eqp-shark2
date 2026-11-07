/* ==========================================================================
   DEVERA — SCRIPT PRINCIPAL (MINIMALISTA, FUNCIONAL, REFINADO)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── UTILIDADES ─────────────────────────────────────────────────────────────

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function showToast(text, type = 'success') {
    const toast = $('#authToast');
    const msg   = $('#toastMessage');
    const icon  = toast?.querySelector('.toast-icon');
    if (!toast || !msg) return;
    msg.textContent = text;
    if (icon) {
      icon.className = type === 'success'
        ? 'toast-icon fa-solid fa-circle-check'
        : 'toast-icon fa-solid fa-circle-info';
      icon.style.color = type === 'success' ? '#10b981' : '#38bdf8';
    }
    toast.classList.remove('hidden');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.add('hidden'), 4000);
  }

  function saveSession(user) {
    try { localStorage.setItem('devera_user_session', JSON.stringify(user)); } catch {}
  }

  function loadSession() {
    try { return JSON.parse(localStorage.getItem('devera_user_session')); } catch { return null; }
  }

  function clearSession() {
    try { localStorage.removeItem('devera_user_session'); } catch {}
  }

  // ── 1. CANVAS DE PARTÍCULAS (MINIMALISTA) ─────────────────────────────────
  const canvas = $('#matrixCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const mouse = { x: null, y: null };
    let W, H;

    const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseout', () => { mouse.x = mouse.y = null; });

    const count = innerWidth < 768 ? 30 : 55;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random() * 0.4 + 0.1,
    }));

    function loop() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // subtle mouse repulsion
        if (mouse.x !== null) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < 100) { p.x += dx / d * 1.2; p.y += dy / d * 1.2; }
        }

        // draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${p.a})`;
        ctx.fill();

        // connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(56,189,248,${(1 - dist / 110) * 0.12})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ── 2. TYPEWRITER ──────────────────────────────────────────────────────────
  const typedEl = $('#typedText');
  if (typedEl) {
    const phrases = [
      'Java 21 LTS & Virtual Threads.',
      'HTML5 Semântico & Acessibilidade.',
      'Arquitetura de Alta Performance.',
      'Engenharia de Soluções Críticas.',
      'Inteligência Artificial & Agentes.',
    ];
    let pi = 0, ci = 0, del = false, speed = 85;

    function type() {
      const ph = phrases[pi];
      typedEl.textContent = del ? ph.slice(0, --ci) : ph.slice(0, ++ci);
      speed = del ? 35 : 85;
      if (!del && ci === ph.length) { speed = 2000; del = true; }
      else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; speed = 400; }
      setTimeout(type, speed);
    }
    type();
  }

  // ── 3. SCROLL REVEAL (SUAVE E MINIMALISTA) ─────────────────────────────────
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-revealed'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  $$('.reveal-on-scroll').forEach(el => revealObs.observe(el));

  // ── 4. CONTADOR ANIMADO ────────────────────────────────────────────────────
  const countObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.getAttribute('data-count'));
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const dur = 1600, start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const v = target * ease;
        el.textContent = `${prefix}${target % 1 ? v.toFixed(1) : Math.floor(v)}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = `${prefix}${target}${suffix}`;
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  $$('[data-count]').forEach(el => countObs.observe(el));

  // ── 5. TILT 3D MINIMALISTA ─────────────────────────────────────────────────
  if (innerWidth > 992) {
    $$('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 6;
        const y = ((e.clientY - r.top)  / r.height - 0.5) * -6;
        card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-3px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ── 6. NAVBAR SCROLL ───────────────────────────────────────────────────────
  const navbar = $('#navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', scrollY > 20);
  }, { passive: true });

  // ── 7. NAV ATIVO POR SEÇÃO ─────────────────────────────────────────────────
  const sections = $$('section[id]');
  const navItems = $$('.nav-item');
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navItems.forEach(a => a.classList.remove('active'));
        const link = $$(`.nav-item[href="#${e.target.id}"]`);
        link.forEach(a => a.classList.add('active'));
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => secObs.observe(s));

  // ── 8. MENU MOBILE ─────────────────────────────────────────────────────────
  const mobileToggle = $('#mobileToggle');
  const navLinks     = $('#navLinks');
  mobileToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const ic = mobileToggle.querySelector('i');
    ic.classList.toggle('fa-bars');
    ic.classList.toggle('fa-xmark');
  });
  $$('.nav-item').forEach(a => a.addEventListener('click', () => {
    navLinks?.classList.remove('active');
    const ic = mobileToggle?.querySelector('i');
    if (ic) { ic.classList.add('fa-bars'); ic.classList.remove('fa-xmark'); }
  }));

  // ── 9. ABAS JAVA / HTML ────────────────────────────────────────────────────
  $$('.tech-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.tech-tab').forEach(t => t.classList.remove('active'));
      $$('.tech-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      $(`#${tab.dataset.target}`)?.classList.add('active');
    });
  });

  // ── 10. COPIAR CÓDIGO ──────────────────────────────────────────────────────
  $$('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const el = $(btn.dataset.clipboardTarget);
      if (!el) return;
      try {
        await navigator.clipboard.writeText(el.innerText);
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981"></i>';
        setTimeout(() => btn.innerHTML = orig, 2000);
      } catch {}
    });
  });

  // ── 11. CHECKLIST COM CONFETE ──────────────────────────────────────────────
  const checks   = $$('.task-check');
  const progBar  = $('#progressBar');
  const progText = $('#progressText');
  let celebrated = false;

  function updateProgress() {
    const done = checks.filter(c => c.checked).length;
    const pct  = Math.round((done / checks.length) * 100);
    if (progBar)  progBar.style.width  = `${pct}%`;
    if (progText) progText.textContent = `${pct}% Concluído`;
    if (pct === 100 && !celebrated) { launchConfetti(); celebrated = true; }
    if (pct < 100) celebrated = false;
    const state = {};
    checks.forEach(c => state[c.dataset.id] = c.checked);
    try { localStorage.setItem('devera_checklist', JSON.stringify(state)); } catch {}
  }

  try {
    const saved = JSON.parse(localStorage.getItem('devera_checklist') || '{}');
    checks.forEach(c => { if (saved[c.dataset.id]) c.checked = true; });
  } catch {}
  updateProgress();
  checks.forEach(c => c.addEventListener('change', updateProgress));

  // ── 12. CONFETE (CANVAS) ───────────────────────────────────────────────────
  function launchConfetti() {
    const cv = $('#confettiCanvas');
    if (!cv) return;
    const c = cv.getContext('2d');
    cv.width = innerWidth; cv.height = innerHeight;
    const cols = ['#00f2fe','#38bdf8','#a855f7','#ec4899','#f89820','#10b981','#fff'];
    const bits = Array.from({ length: 80 }, () => ({
      x: innerWidth / 2, y: innerHeight * 0.4,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.9) * 14,
      size: Math.random() * 7 + 3,
      color: cols[Math.floor(Math.random() * cols.length)],
      rot: Math.random() * 360,
      rs: (Math.random() - 0.5) * 10,
      alpha: 1,
    }));
    const t0 = performance.now();
    function draw(now) {
      c.clearRect(0, 0, cv.width, cv.height);
      bits.forEach(b => {
        b.x += b.vx; b.y += b.vy; b.vy += 0.3;
        b.rot += b.rs; b.alpha -= 0.013;
        c.save();
        c.translate(b.x, b.y);
        c.rotate(b.rot * Math.PI / 180);
        c.fillStyle = b.color;
        c.globalAlpha = Math.max(b.alpha, 0);
        c.fillRect(-b.size / 2, -b.size / 2, b.size, b.size);
        c.restore();
      });
      if (now - t0 < 3500 && bits.some(b => b.alpha > 0)) requestAnimationFrame(draw);
      else c.clearRect(0, 0, cv.width, cv.height);
    }
    requestAnimationFrame(draw);
  }

  // ── 13. QUIZ ────────────────────────────────────────────────────────────────
  const quizForm    = $('#eraQuizForm');
  const quizResult  = $('#quizResult');
  const resetQuizBtn = $('#resetQuizBtn');

  if (quizForm) {
    quizForm.addEventListener('submit', e => {
      e.preventDefault();
      const q1 = +($('input[name="q1"]:checked', quizForm)?.value || 0);
      const q2 = +($('input[name="q2"]:checked', quizForm)?.value || 0);
      const q3 = +($('input[name="q3"]:checked', quizForm)?.value || 0);
      const total = q1 + q2 + q3;

      quizForm.style.display = 'none';
      quizResult?.classList.remove('hidden');
      quizResult?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      launchConfetti();

      const data = total <= 4
        ? { title: 'Aprendiz da Transição', icon: 'fa-seedling',
            text: 'Você ainda utiliza ferramentas modernas de forma passiva. Foque nas fundações antes de avançar.',
            tips: ['Leia cada linha de código antes de usar.','Pratique HTML5 semântico puro.','Estude Java básico a intermediário.'] }
        : total <= 7
        ? { title: 'Desenvolvedor Conectado', icon: 'fa-laptop-code',
            text: 'Boa base, mas há espaço para liderar tecnicamente. Aprofunde seus fundamentos avançados.',
            tips: ['Domine Virtual Threads do Java 21.','Aprimore engenharia de prompt com esquemas JSON.','Otimize performance e acessibilidade web (a11y).'] }
        : { title: 'Arquiteto da Nova Era 🚀', icon: 'fa-crown',
            text: 'Excelente! Você combina fundamentos sólidos com uso inteligente de IA — o perfil mais valorizado do mercado.',
            tips: ['Construa agentes autônomos especializados.','Mentore outros desenvolvedores da sua equipe.','Publique arquiteturas de alta concorrência em produção.'] };

      $('#resultTitle').textContent = data.title;
      $('#resultScore').textContent = `Pontuação: ${total} de 9 pontos`;
      $('#resultIcon').innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
      $('#resultText').textContent = data.text;
      $('#resultTips').innerHTML = `
        <h5><i class="fa-solid fa-compass"></i> Próximas ações:</h5>
        <ul>${data.tips.map(t => `<li><i class="fa-solid fa-arrow-right text-cyan"></i> ${t}</li>`).join('')}</ul>`;
    });

    resetQuizBtn?.addEventListener('click', () => {
      quizForm.reset();
      quizResult?.classList.add('hidden');
      quizForm.style.display = 'flex';
      quizForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  //  14. SISTEMA DE AUTENTICAÇÃO & EDIÇÃO DE PERFIL (COMPLETO E FUNCIONAL)
  // ══════════════════════════════════════════════════════════════════════════

  // Elementos de autenticação
  const loginGmailBtn     = $('#loginGmailBtn');
  const gmailModal        = $('#gmailModal');
  const closeGmailModal   = $('#closeGmailModalBtn');
  const userProfileMenu   = $('#userProfileMenu');
  const userProfileToggle = $('#userProfileToggle');
  const userDropdownCard  = $('#userDropdownCard');
  const logoutBtn         = $('#logoutBtn');
  const customGmailForm   = $('#customGmailForm');
  const accountItemBtns   = $$('.account-item-btn');

  // Elementos de edição de perfil
  const openEditProfileBtn      = $('#openEditProfileBtn');
  const editProfileModal        = $('#editProfileModal');
  const closeEditProfileModal   = $('#closeEditProfileModalBtn');
  const cancelEditProfileBtn    = $('#cancelEditProfileBtn');
  const editProfileForm         = $('#editProfileForm');
  const editNameInput           = $('#editNameInput');
  const editAvatarPreview       = $('#editAvatarPreview');
  const avatarFileInput         = $('#avatarFileInput');
  const avatarPresetsGrid       = $('#avatarPresetsGrid');

  // Avatares pré-definidos com tema tech
  const AVATAR_PRESETS = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
  ];

  // Estado temporário do editor de perfil
  let pendingAvatarDataUrl = null;

  // Monta a grade de avatares pré-definidos
  if (avatarPresetsGrid) {
    AVATAR_PRESETS.forEach((url, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'preset-avatar-btn';
      btn.title = `Avatar ${i + 1}`;
      btn.innerHTML = `<img src="${url}" alt="Avatar ${i + 1}" loading="lazy">`;
      btn.addEventListener('click', () => {
        $$('.preset-avatar-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        pendingAvatarDataUrl = url;
        if (editAvatarPreview) editAvatarPreview.src = url;
      });
      avatarPresetsGrid.appendChild(btn);
    });
  }

  // Atualiza toda a UI com os dados do usuário
  function applyUserToUI(user) {
    const avatarUrl = user.avatar || generateAvatar(user.name);
    $$('#userAvatar, #dropdownAvatar, #editAvatarPreview').forEach(img => {
      if (img) {
        img.src = avatarUrl;
        img.onerror = () => { img.src = generateAvatar(user.name || 'Dev'); };
      }
    });
    const nameEls = $$('#userName, #dropdownName');
    nameEls.forEach(el => { if (el) el.textContent = user.name; });
    const emailEl = $('#dropdownEmail');
    if (emailEl) emailEl.textContent = user.email || '';
  }

  function generateAvatar(name) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00f2fe&color=030712&bold=true&size=120`;
  }

  // Login: exibe perfil, oculta botão de login
  function loginUser(user, notify = true) {
    if (!user) return;
    saveSession(user);
    loginGmailBtn?.style && (loginGmailBtn.style.display = 'none');
    userProfileMenu?.classList.remove('hidden');
    gmailModal?.classList.add('hidden');
    applyUserToUI(user);
    if (notify) {
      showToast(`Bem-vindo(a), ${user.name}! 🎉`, 'success');
      launchConfetti();
    }
  }

  // Logout
  function logoutUser() {
    clearSession();
    userProfileMenu?.classList.add('hidden');
    userDropdownCard?.classList.add('hidden');
    userProfileToggle?.classList.remove('active');
    loginGmailBtn?.style && (loginGmailBtn.style.display = '');
    showToast('Você saiu da sua conta.', 'info');
  }

  // Carrega sessão persistida
  const session = loadSession();
  if (session) loginUser(session, false);

  // ── Eventos do Modal de Login ─────────────────────────────────────────────
  loginGmailBtn?.addEventListener('click', () => gmailModal?.classList.remove('hidden'));
  closeGmailModal?.addEventListener('click', () => gmailModal?.classList.add('hidden'));
  gmailModal?.addEventListener('click', e => { if (e.target === gmailModal) gmailModal.classList.add('hidden'); });

  accountItemBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      loginUser({
        name:   btn.dataset.name,
        email:  btn.dataset.email,
        avatar: btn.dataset.avatar,
      });
    });
  });

  customGmailForm?.addEventListener('submit', e => {
    e.preventDefault();
    const name  = $('#customNameInput')?.value.trim() || 'Desenvolvedor';
    let   email = $('#customEmailInput')?.value.trim() || '';
    if (email && !email.includes('@')) email += '@gmail.com';
    loginUser({ name, email, avatar: generateAvatar(name) });
    customGmailForm.reset();
  });

  // ── Dropdown do Perfil ────────────────────────────────────────────────────
  userProfileToggle?.addEventListener('click', e => {
    e.stopPropagation();
    userDropdownCard?.classList.toggle('hidden');
    userProfileToggle.classList.toggle('active');
  });

  document.addEventListener('click', e => {
    if (userDropdownCard && !userDropdownCard.contains(e.target) && e.target !== userProfileToggle) {
      userDropdownCard.classList.add('hidden');
      userProfileToggle?.classList.remove('active');
    }
  });

  logoutBtn?.addEventListener('click', e => { e.preventDefault(); logoutUser(); });

  // ── Abrir Modal de Edição de Perfil ───────────────────────────────────────
  openEditProfileBtn?.addEventListener('click', () => {
    const user = loadSession();
    if (!user) return;

    // Pré-preenche o formulário com dados atuais
    if (editNameInput) editNameInput.value = user.name || '';
    if (editAvatarPreview) editAvatarPreview.src = user.avatar || generateAvatar(user.name);

    // Reseta seleção de presets
    $$('.preset-avatar-btn').forEach(b => b.classList.remove('active'));
    pendingAvatarDataUrl = null;

    // Fecha dropdown e abre modal de edição
    userDropdownCard?.classList.add('hidden');
    userProfileToggle?.classList.remove('active');
    editProfileModal?.classList.remove('hidden');
  });

  // Fecha o modal de edição
  function closeEditModal() { editProfileModal?.classList.add('hidden'); }
  closeEditProfileModal?.addEventListener('click', closeEditModal);
  cancelEditProfileBtn?.addEventListener('click', closeEditModal);
  editProfileModal?.addEventListener('click', e => { if (e.target === editProfileModal) closeEditModal(); });

  // ── Upload de Imagem do Dispositivo ──────────────────────────────────────
  avatarFileInput?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = ev => {
      pendingAvatarDataUrl = ev.target.result;
      if (editAvatarPreview) editAvatarPreview.src = pendingAvatarDataUrl;
      // Desmarca presets
      $$('.preset-avatar-btn').forEach(b => b.classList.remove('active'));
    };
    reader.readAsDataURL(file);
  });

  // ── Salvar Edições de Perfil ──────────────────────────────────────────────
  editProfileForm?.addEventListener('submit', e => {
    e.preventDefault();
    const user = loadSession();
    if (!user) return;

    const newName   = editNameInput?.value.trim() || user.name;
    const newAvatar = pendingAvatarDataUrl || user.avatar || generateAvatar(newName);

    const updated = { ...user, name: newName, avatar: newAvatar };
    saveSession(updated);
    applyUserToUI(updated);
    closeEditModal();
    showToast('Perfil atualizado com sucesso! ✅', 'success');
  });

});
