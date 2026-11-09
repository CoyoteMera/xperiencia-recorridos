// Presentación de los recorridos: arma las escenas desde guion.js y maneja la navegación.
(() => {
  'use strict';

  const ICONO = {
    sig: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    ant: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    escritorio: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
    celular: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/></svg>',
    ampliar: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5M11 8v6M8 11h6"/></svg>',
    hecho: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.7 2.7L16 9.8"/></svg>',
    pendiente: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/></svg>',
  };

  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ---------- Lista de escenas ----------
  const escenas = [{ id: 'inicio', tipo: 'portada', nombre: 'Portada' }];
  RECORRIDOS.forEach((r, ri) => {
    escenas.push({ id: r.id, tipo: 'intro', r, ri, nombre: `R${ri + 1} · ${r.titulo}` });
    r.pasos.forEach((p, pi) => {
      escenas.push({ id: `${r.id}-${pi + 1}`, tipo: 'paso', r, ri, p, pi, nombre: `${p.codigo} · ${p.pantalla}` });
    });
  });
  escenas.push({ id: 'porque', tipo: 'porque', nombre: PORQUE.titulo });
  escenas.push({ id: 'cierre', tipo: 'cierre', nombre: 'Qué sigue' });

  function etiqueta(e) {
    if (e.tipo === 'portada') return PORTADA.boton;
    if (e.tipo === 'intro') return 'Ver el recorrido';
    if (e.tipo === 'paso') return e.p.boton || (e.ri < RECORRIDOS.length - 1 ? 'Siguiente recorrido' : PORQUE.titulo);
    if (e.tipo === 'porque') return 'Qué sigue';
    return CIERRE.boton;
  }

  // ---------- Piezas ----------
  const inicial = (nombre) => nombre.trim().charAt(0).toUpperCase();

  function chipPersona(clave, equipo) {
    const per = PERSONAS[clave];
    return `<p class="chip-persona">
      <span class="avatar" aria-hidden="true">${inicial(per.nombre)}</span>
      <span><strong>${per.nombre}${per.corta ? ` (${per.corta})` : ''}</strong> · ${per.rol}</span>
      <span class="chip-persona__equipo">${ICONO[equipo]}${equipo}</span>
    </p>`;
  }

  function nav(e, { atras = true, clase = 'nav-fija' } = {}) {
    return `<div class="nav ${clase}">
      ${atras ? `<button class="btn btn--secundario" type="button" data-ir="ant">${ICONO.ant}<span>Atrás</span></button>` : ''}
      <button class="btn btn--primario" type="button" data-ir="sig"><span>${etiqueta(e)}</span>${ICONO.sig}</button>
    </div>`;
  }

  const tipoRotulo = (tipo) => `<span class="rotulo-tipo">${tipo}</span>`;

  function portada(e) {
    const tarjetas = Object.entries(PERSONAS).map(([clave, per]) => `
      <li class="persona">
        <span class="avatar avatar--grande" aria-hidden="true">${inicial(per.nombre)}</span>
        <p class="persona__nombre">${per.nombre}${per.etiqueta ? ` <span class="persona__etiqueta">(${per.etiqueta})</span>` : ''}</p>
        <p class="persona__rol">${per.rol} · <span class="chip-persona__equipo">${ICONO[per.equipo]}${per.equipo}</span></p>
        <p class="persona__frase">«${per.frase}»</p>
        <p class="persona__recorridos">${per.recorridos}</p>
      </li>`).join('');
    return `<div class="portada">
      <svg class="cordillera" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 320V250l120-60 90 40 150-130 110 90 90-60 170 150 130-110 120 70 160-170 120 110 90-40 90 80v130Z"/>
        <path class="cordillera__linea" d="M0 250l120-60 90 40 150-130 110 90 90-60 170 150 130-110 120 70 160-170 120 110 90-40 90 80"/>
      </svg>
      <div class="portada__contenido">
        <p class="eyebrow anim">${PORTADA.eyebrow}</p>
        <h1 class="portada__titulo anim">${PORTADA.titulo}</h1>
        <p class="portada__texto anim">${PORTADA.texto}</p>
        <ul class="personas anim">${tarjetas}</ul>
        ${nav(e, { atras: false, clase: 'anim nav-fija' })}
        <p class="pie anim">${PORTADA.pie}</p>
      </div>
    </div>`;
  }

  function intro(e) {
    const r = e.r;
    const pasos = r.pasos.map((p, i) => `<li><button type="button" data-salto="${r.id}-${i + 1}">
        <span class="intro__n">${i + 1}</span><span>${p.pantalla}</span></button></li>`).join('');
    return `<div class="intro">
      <p class="intro__num anim" aria-hidden="true">R${e.ri + 1}</p>
      <p class="eyebrow anim">Recorrido ${e.ri + 1} de ${RECORRIDOS.length}</p>
      <h2 class="intro__titulo anim" tabindex="-1">${r.titulo}</h2>
      <div class="anim">${chipPersona(r.persona, r.equipo)}</div>
      <blockquote class="intro__cita anim"><p>«${r.entrada}»</p></blockquote>
      <ol class="intro__pasos anim" aria-label="Pasos de este recorrido">${pasos}</ol>
      ${nav(e, { clase: 'anim nav-fija' })}
    </div>`;
  }

  function paso(e) {
    const { r, p, pi } = e;
    const equipo = p.documento ? 'documento' : (p.w > 600 ? 'escritorio' : 'celular');
    const proporcion = { escritorio: 900 / 1440, celular: 844 / 390, documento: 1128 / 816 }[equipo];
    const largo = p.h / p.w > proporcion + 0.01;
    const segs = r.pasos.map((_, k) => `<span class="${k <= pi ? 'is-on' : ''}"></span>`).join('');
    return `<div class="paso">
      <div class="paso__cab">
        <p class="eyebrow"><button type="button" class="enlace" data-salto="${r.id}">R${e.ri + 1} · ${r.titulo}</button></p>
        ${chipPersona(r.persona, r.equipo)}
        <div class="paso__avance">
          <span>Paso ${pi + 1} de ${r.pasos.length}</span>
          <span class="segmentos" aria-hidden="true">${segs}</span>
        </div>
        <h2 class="paso__titulo" tabindex="-1">${p.pantalla}</h2>
      </div>
      <figure class="pantalla pantalla--${equipo}">
        <figcaption>
          <span class="pantalla__codigo">${p.codigo} · ${p.pantalla}</span>
          ${tipoRotulo(p.tipo)}
          <button type="button" class="btn btn--secundario btn--chico" data-ampliar>${ICONO.ampliar}<span>Ampliar</span></button>
        </figcaption>
        <div class="marco marco--${equipo}${largo ? ' marco--largo' : ''}">
          <div class="marco__vista" data-ampliar>
            <img data-src="img/${p.img}" width="${p.w}" height="${p.h}"
              alt="Pantalla ${p.pantalla}. ${p.texto.replace(/"/g, '&quot;')}">
          </div>
          ${largo ? '<p class="marco__mas" aria-hidden="true">Desliza: la pantalla sigue abajo</p>' : ''}
        </div>
      </figure>
      <div class="paso__relato">
        <blockquote class="cita"><p>${p.texto}</p></blockquote>
        ${p.nota ? `<p class="nota">${p.nota}</p>` : ''}
      </div>
      ${nav(e)}
    </div>`;
  }

  // Muestras vivas de «Por qué se ve así», hechas con los mismos tokens.
  const ESTADOS = [
    ['pendiente', 'Pendiente'], ['confirmada', 'Confirmada'], ['lista', 'Lista para ir'],
    ['validar', 'Por validar'], ['rechazado', 'Rechazado'], ['viajo', 'Viajó'],
  ];
  const pastilla = ([c, t]) => `<span class="pastilla pastilla--${c}">${t}</span>`;

  const MUESTRA = {
    botones: () => `<div class="m-fila">
      <span class="btn btn--primario btn--muestra">Subir comprobante</span>
      <span class="btn btn--secundario btn--muestra">Ver mi voucher</span></div>`,
    estados: () => `<div class="m-pastillas">${ESTADOS.map(pastilla).join('')}</div>`,
    elevacion: () => `<div class="m-elev m-elev--0"><span>fondo</span>
      <div class="m-elev m-elev--1"><span>pantalla</span>
      <div class="m-elev m-elev--2"><span>tarjeta</span>
      <div class="m-elev m-elev--3"><span>selección</span></div></div></div></div>`,
    contraste: () => `<div class="m-contraste">${[
      ['fondo', 'bg', '7,5'], ['pantalla', 's1', '6,7'], ['tarjeta', 's2', '5,8'], ['selección', 's3', '4,9'],
    ].map(([n, c, v]) => `<div class="m-contraste__caja m-contraste__caja--${c}">
      <span class="m-contraste__texto">Texto gris</span><strong>${v}:1</strong><span>${n}</span></div>`).join('')}</div>`,
    fila: () => `<div class="m-fila m-fila--fin">
      <span class="btn btn--texto btn--muestra">··· Más</span>
      <span class="btn btn--secundario btn--muestra">Compartir enlace</span>
      <span class="btn btn--primario btn--muestra">Registrar abono</span></div>`,
    cumbre: () => `<div class="m-cumbre">
      <p class="m-cumbre__cab"><span>Camino a la cumbre</span><span>2 de 5</span></p>
      <span class="m-cumbre__barra" aria-hidden="true"><span></span></span>
      <ul>${[
        ['pendiente', 'Pago completo', 'Falta $2.500.000', 'aviso'],
        ['hecho', 'Documento', 'Listo', 'ok'],
        ['hecho', 'Contacto de emergencia', 'Listo', 'ok'],
        ['pendiente', 'Seguro de viaje', 'Obligatorio', 'peligro'],
        ['pendiente', 'Ficha médica', 'Falta', 'aviso'],
      ].map(([i, t, s, c]) => `<li class="is-${i}">${ICONO[i]}<span>${t}</span><span class="m-cumbre__estado m-cumbre__estado--${c}">${s}</span></li>`).join('')}</ul>
    </div>`,
  };

  const PALETA = [
    ['Marca', [['brand/500', '#FF9700', 'acción'], ['brand/600', '#FC6404', 'hover'], ['brand/300', '#FEBF4D', 'viajó']]],
    ['Neutros', [['bg', '#1E1E1E', 'fondo'], ['surface-1', '#272727', 'pantalla'], ['surface-2', '#323232', 'tarjeta'], ['surface-3', '#3D3D3D', 'selección'], ['border', '#464646', 'bordes'], ['text', '#F2F2F0', 'texto'], ['text/muted', '#AEAEAE', 'texto gris']]],
    ['Estados', [['success', '#3FA66B', 'listo'], ['warning', '#E8B931', 'por validar'], ['danger', '#E5534B', 'rechazado'], ['info', '#5AA9E6', 'confirmada']]],
  ];

  function porque(e) {
    const tarjetas = PORQUE.decisiones.map((d, i) => `<li class="decision anim">
      <p class="decision__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</p>
      <p class="decision__antes"><span class="etq">Lo que pasaba</span>${d.antes}</p>
      <p class="decision__ahora"><span class="etq etq--ahora">Decisión de diseño</span>${d.ahora}</p>
      <div class="muestra" aria-hidden="true">${MUESTRA[d.muestra]()}</div>
    </li>`).join('');
    const paleta = PALETA.map(([grupo, cs]) => `<div class="paleta__grupo">
      <p class="etq">${grupo}</p>
      <ul>${cs.map(([n, hex, uso]) => `<li><span class="paleta__color" style="background:${hex}"></span>
        <span class="paleta__nombre">${n}</span><span class="paleta__hex">${hex} · ${uso}</span></li>`).join('')}</ul>
    </div>`).join('');
    const leyenda = PORQUE.leyenda.map((l) => `<li>${tipoRotulo(l.tipo)}<span>= ${l.texto}</span></li>`).join('');
    return `<div class="porque">
      <p class="eyebrow anim">Decisiones de diseño</p>
      <h2 class="porque__titulo anim" tabindex="-1">${PORQUE.titulo}</h2>
      <p class="porque__entrada anim">${PORQUE.entrada}</p>
      <ol class="decisiones">${tarjetas}</ol>
      <section class="tokens anim" aria-labelledby="tokens-titulo">
        <h3 id="tokens-titulo" class="tokens__titulo">Los tokens, en corto</h3>
        <div class="paleta">${paleta}</div>
        <div class="tipos">
          <div class="tipos__muestra tipos__muestra--montserrat"><span class="tipos__aa" aria-hidden="true">Aa</span>
            <p><strong>Montserrat</strong> · títulos y cifras</p></div>
          <div class="tipos__muestra tipos__muestra--poppins"><span class="tipos__aa" aria-hidden="true">Aa</span>
            <p><strong>Poppins</strong> · texto</p></div>
          <div class="tipos__heroe"><p class="etq">Cifra héroe</p><p class="cifra">$2.500.000 COP</p>
            <p class="tipos__nota">Siempre con su moneda.</p></div>
        </div>
        <div class="leyenda">
          <p class="etq">Los rótulos sobre las pantallas</p>
          <ul>${leyenda}</ul>
        </div>
      </section>
      ${nav(e)}
    </div>`;
  }

  function cierre(e) {
    return `<div class="cierre">
      <p class="eyebrow anim">Qué sigue</p>
      <h2 class="cierre__titulo anim" tabindex="-1">${CIERRE.titulo}</h2>
      <p class="cierre__sub anim">Así seguimos:</p>
      <ol class="cierre__pasos anim">${CIERRE.pasos.map((t) => `<li><span>${t}</span></li>`).join('')}</ol>
      <p class="cierre__fuera anim">${CIERRE.fuera}</p>
      ${nav(e, { clase: 'anim nav-fija' })}
      <p class="pie anim">${CIERRE.pie}</p>
    </div>`;
  }

  const ARMAR = { portada, intro, paso, porque, cierre };

  // ---------- DOM ----------
  const escenario = document.getElementById('escenario');
  escenas.forEach((e, i) => {
    const s = document.createElement('section');
    s.className = `escena escena--${e.tipo}`;
    s.id = e.id;
    s.setAttribute('aria-label', e.nombre);
    s.hidden = true;
    s.innerHTML = ARMAR[e.tipo](e);
    escenario.appendChild(s);
    e.el = s;
    e.i = i;
  });

  const puntos = document.getElementById('puntos');
  puntos.innerHTML = RECORRIDOS.map((r, i) => `<button type="button" class="punto" data-salto="${r.id}"
      aria-label="R${i + 1}: ${r.titulo}" title="R${i + 1}: ${r.titulo}">
      <span class="punto__circulo" aria-hidden="true"></span><span class="punto__txt" aria-hidden="true">R${i + 1}</span></button>`).join('')
    + `<button type="button" class="punto" data-salto="porque" aria-label="${PORQUE.titulo}" title="${PORQUE.titulo}">
      <span class="punto__circulo" aria-hidden="true"></span><span class="punto__txt" aria-hidden="true">D</span></button>`;

  const progreso = document.getElementById('progreso');
  const contador = document.getElementById('contador');
  const anuncio = document.getElementById('anuncio');

  // Avisa que la pantalla sigue abajo hasta que se desliza.
  escenario.querySelectorAll('.marco--largo .marco__vista').forEach((v) => {
    v.addEventListener('scroll', () => v.parentElement.classList.toggle('is-visto', v.scrollTop > 24), { passive: true });
  });

  function cargarImagenes(i) {
    for (let k = i - 1; k <= i + 2; k++) {
      const e = escenas[k];
      if (!e) continue;
      e.el.querySelectorAll('img[data-src]').forEach((img) => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  let actual = -1;

  function ir(n, { foco = true } = {}) {
    n = Math.max(0, Math.min(escenas.length - 1, n));
    if (n === actual) return;
    const dir = n > actual ? 1 : -1;
    const antes = escenas[actual];
    const e = escenas[n];
    cargarImagenes(n);
    if (antes) antes.el.hidden = true;
    e.el.hidden = false;
    e.el.scrollTop = 0;
    e.el.style.setProperty('--dir', dir);
    e.el.classList.remove('is-entrando');
    if (!reducido.matches) {
      void e.el.offsetWidth; // reinicia la animación
      e.el.classList.add('is-entrando');
    }
    actual = n;

    progreso.style.transform = `scaleX(${n / (escenas.length - 1)})`;
    contador.textContent = `${n + 1} / ${escenas.length}`;
    const ri = e.ri ?? (e.tipo === 'portada' ? -1 : RECORRIDOS.length);
    puntos.querySelectorAll('.punto').forEach((b, k) => {
      b.classList.toggle('is-actual', k === ri);
      b.classList.toggle('is-hecho', k < ri);
      if (k === ri) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
    history.replaceState(null, '', n === 0 ? location.pathname : `#${e.id}`);
    document.title = n === 0 ? 'Xperiencia · Recorridos del borrador 1' : `${e.nombre} · Xperiencia`;
    anuncio.textContent = e.tipo === 'paso' ? `Paso ${e.pi + 1} de ${e.r.pasos.length}: ${e.p.pantalla}` : e.nombre;
    if (foco) e.el.querySelector('[data-ir="sig"]')?.focus({ preventScroll: true });
  }

  const sig = () => ir(actual === escenas.length - 1 ? 0 : actual + 1);
  const ant = () => ir(actual - 1);
  const indice = (id) => escenas.findIndex((e) => e.id === id);

  // ---------- Ampliar ----------
  const zoom = document.getElementById('zoom');
  const zoomImg = document.getElementById('zoom-img');
  const zoomTam = document.getElementById('zoom-tam');
  const zoomVista = document.getElementById('zoom-vista');
  let zoomAncho = 0;

  function tamZoom(grande) {
    zoom.classList.toggle('is-grande', grande);
    zoomImg.style.width = grande ? `${zoomAncho}px` : '';
    zoomTam.textContent = grande ? 'Ajustar' : 'Más grande';
  }

  function abrirZoom(e) {
    const p = e.p;
    zoomImg.src = `img/${p.img}`;
    zoomImg.alt = `Pantalla ${p.pantalla}`;
    zoomImg.style.maxWidth = '';
    zoomImg.dataset.w = p.w;
    zoomAncho = p.w * (p.w > 600 && !p.documento ? 1.5 : 2); // tamaño del PNG
    document.getElementById('zoom-titulo').textContent = `${p.codigo} · ${p.pantalla}`;
    zoom.style.setProperty('--ancho', `${p.w}px`);
    tamZoom(false);
    zoom.showModal();
    zoomVista.scrollTo(0, 0);
  }

  zoomTam.addEventListener('click', () => tamZoom(!zoom.classList.contains('is-grande')));
  zoomImg.addEventListener('click', () => tamZoom(!zoom.classList.contains('is-grande')));
  document.getElementById('zoom-cerrar').addEventListener('click', () => zoom.close());
  zoomVista.addEventListener('click', (ev) => { if (ev.target === zoomVista) zoom.close(); });

  // ---------- Entradas ----------
  document.addEventListener('click', (ev) => {
    const t = ev.target.closest('[data-ir], [data-salto], [data-ampliar]');
    if (!t || zoom.open) return;
    if (t.dataset.ir === 'sig') sig();
    else if (t.dataset.ir === 'ant') ant();
    else if (t.dataset.salto) ir(indice(t.dataset.salto));
    else if ('ampliar' in t.dataset) abrirZoom(escenas[actual]);
  });

  document.addEventListener('keydown', (ev) => {
    if (zoom.open || ev.altKey || ev.ctrlKey || ev.metaKey) return;
    if (ev.key === 'ArrowRight' || ev.key === 'PageDown') { ev.preventDefault(); sig(); }
    else if (ev.key === 'ArrowLeft' || ev.key === 'PageUp') { ev.preventDefault(); ant(); }
    else if (ev.key === 'Home') { ev.preventDefault(); ir(0); }
    else if (ev.key === 'End') { ev.preventDefault(); ir(escenas.length - 1); }
  });

  // Deslizar: horizontal y claro, para no confundirlo con bajar la página.
  let toque = null;
  escenario.addEventListener('touchstart', (ev) => {
    if (ev.touches.length !== 1) { toque = null; return; }
    toque = { x: ev.touches[0].clientX, y: ev.touches[0].clientY, t: Date.now() };
  }, { passive: true });
  escenario.addEventListener('touchend', (ev) => {
    if (!toque || zoom.open) return;
    const dx = ev.changedTouches[0].clientX - toque.x;
    const dy = ev.changedTouches[0].clientY - toque.y;
    const rapido = Date.now() - toque.t < 800;
    toque = null;
    if (rapido && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? sig : ant)();
  }, { passive: true });

  window.addEventListener('hashchange', () => {
    const n = indice(location.hash.slice(1));
    if (n >= 0) ir(n, { foco: false });
  });

  ir(Math.max(0, indice(location.hash.slice(1))), { foco: false });
})();
