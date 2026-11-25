(() => {
  "use strict";

  const CFG = window.PE_CONFIG || {};
  const WEEKS = window.PE_WEEKS || {};
  const main = document.getElementById("main");
  const STUDENTS = ["Tatiana", "Faina"];

  // Модуль 1 · 8 недель. Открыта только текущая.
  const JOURNEY = [
    { n: 1, title: "Hello, World!", note: "Знакомство и работа", state: "done" },
    { n: 2, title: "Touchdown", note: "Аэропорт и граница", state: "done", open: true },
    { n: 3, title: "Home Hunt", note: "Ищем квартиру", state: "done", open: true },
    { n: 4, title: "Review & Shadowing", note: "Повторение и shadowing", state: "done", open: true },
    { n: 5, title: "Bank & Money", note: "Банк, карта, деньги", state: "now" },
    { n: 6, title: "Health & Insurance", note: "Скоро", state: "locked" },
    { n: 7, title: "New Job, New Team", note: "Скоро", state: "locked" },
    { n: 8, title: "My Lisbon Life", note: "Скоро · проект", state: "locked" },
  ];
  const CURRENT = (JOURNEY.find((j) => j.state === "now" && WEEKS[j.n]) || { n: Math.max(...Object.keys(WEEKS).map(Number)) }).n;


  // ───────── storage (best effort)
  const store = {
    get(k, d) {
      try { const v = localStorage.getItem("pe_" + k); return v ? JSON.parse(v) : d; } catch { return d; }
    },
    set(k, v) {
      try { localStorage.setItem("pe_" + k, JSON.stringify(v)); } catch { /* private mode */ }
    },
  };
  let answers = store.get("answers", {});
  const save = () => store.set("answers", answers);
  const ans = (id) => (answers[id] = answers[id] || {});

  // ───────── helpers
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const norm = (s) => String(s || "").toLowerCase().replace(/[’`]/g, "'").replace(/[.?!,]/g, "").replace(/\s+/g, " ").trim();
  const words = (s) => (String(s || "").trim().match(/[A-Za-zА-Яа-яЁё'’-]+/g) || []).length;
  const shuffle = (arr, seed) => {
    const a = arr.slice(); let x = seed || 7;
    for (let i = a.length - 1; i > 0; i--) { x = (x * 9301 + 49297) % 233280; const j = Math.floor((x / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 100000, 11);

  function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("on");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("on"), 2600);
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) return toast("Озвучка не поддерживается в этом браузере");
    const u = new SpeechSynthesisUtterance(text.replace(/\//g, ","));
    u.lang = "en-GB"; u.rate = 0.9;
    const v = speechSynthesis.getVoices().find((v) => /en-GB/i.test(v.lang)) || speechSynthesis.getVoices().find((v) => /^en/i.test(v.lang));
    if (v) u.voice = v;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }

  const student = () => store.get("student", "");

  // ───────── progress
  const autoTypes = new Set(["match", "choice", "tf", "builder", "gap", "order", "sort", "infogap"]);
  function blockDone(b) {
    const a = answers[b.id] || {};
    switch (b.type) {
      case "write": return words(a.text) >= Math.min(b.minWords || 1, 3);
      case "voice": return !!a.recorded;
      case "checklist": return Object.values(a.checks || {}).some(Boolean);
      case "match": case "choice": case "tf": case "builder": case "gap": case "order": case "sort": case "infogap": return !!a.checked;
      case "form": return Object.values(a.vals || {}).filter((v) => String(v).trim()).length >= Math.ceil(b.fields.length / 2);
      case "spinner": return (a.list || []).length > 0;
      case "rate": return Object.keys(a.rate || {}).length === b.items.length;
      default: return null; // не учитывается
    }
  }
  function dayProgress(day) {
    const counted = day.blocks.map(blockDone).filter((v) => v !== null);
    if (!counted.length) return 0;
    return Math.round((counted.filter(Boolean).length / counted.length) * 100);
  }

  // ───────── router
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", parts[0] === a.dataset.nav));
    window.scrollTo(0, 0);
    if (parts[0] === "week" && WEEKS[parts[1]]) {
      const w = WEEKS[parts[1]];
      if (parts[2] === "vocab" && w.vocab) return renderVocab(w);
      if (parts[2]) {
        const d = w.days.find((x) => x.slug === parts[2]);
        if (d) return renderDay(w, d);
      }
      return renderWeek(w);
    }
    renderHome();
  }

  // ───────── имя ученицы (без него сайт работает, имя нужно только для отправки)
  function nameBar() {
    const n = student();
    return `<div class="namebar"><span>${n ? "Вы занимаетесь как" : "Кто вы?"}</span>${STUDENTS.map((s) => `<button type="button" class="chip ${s === n ? "on" : ""}" data-name="${s}">${s}</button>`).join("")}</div>`;
  }
  function wireNames(el) {
    el.querySelectorAll(".namebar [data-name]").forEach((b) => b.addEventListener("click", () => {
      store.set("student", b.dataset.name);
      el.querySelectorAll(".namebar [data-name]").forEach((x) => x.classList.toggle("on", x === b));
      const lbl = el.querySelector(".namebar > span"); if (lbl) lbl.textContent = "Вы занимаетесь как";
      toast(`Отлично, ${b.dataset.name}! Ответы будут подписаны вашим именем`);
    }));
  }

  // ───────── HOME
  function renderHome() {
    const name = student();
    const w = WEEKS[CURRENT];
    main.innerHTML = "";
    const el = h(`
      <section class="home">
        <div class="hero">
          <p class="eyebrow">Module 1 · Flight Plan</p>
          <h1>English for your <em>next chapter</em> abroad</h1>
          <p class="lead">Ваше учебное пространство: план недели, задания на каждый день и связь с преподавателем. Пять дней — одна история переезда.</p>
          <div class="hero-actions">
            <a class="btn primary" href="#/week/${w.id}">Открыть ${esc(w.code.replace("W", "Week "))} · ${esc(w.title)} →</a>
            <a class="btn ghost" href="${esc(CFG.miroBoard)}" target="_blank" rel="noopener">Доска Miro ↗</a>
            ${CFG.zoomLink ? `<a class="btn zoom" href="${esc(CFG.zoomLink)}" target="_blank" rel="noopener">Zoom · Чт 10:00 ↗</a>` : ""}
          </div>
        </div>

        <aside class="hello card">
          <p class="eyebrow">${name ? "С возвращением" : "Давайте знакомиться"}</p>
          <h2>${name ? `Hi, <em>${esc(name)}</em>!` : "Who's studying today?"}</h2>
          <p class="muted">${name ? "Ответы будут подписаны этим именем." : "Выберите своё имя — так преподаватель поймёт, чьи это ответы."}</p>
          <div class="names">
            ${STUDENTS.map((s) => `<button type="button" class="chip ${s === name ? "on" : ""}" data-name="${s}">${s}</button>`).join("")}
          </div>
        </aside>

        <section class="howto">
          <h2 class="section-title">Как устроена неделя</h2>
          <ol class="rhythm">
            <li><span class="r-day">Пн</span><b>Word Power</b><span>новые слова и текст</span></li>
            <li><span class="r-day">Вт</span><b>Grammar Gym</b><span>правило и практика</span></li>
            <li><span class="r-day">Ср</span><b>Voice Day</b><span>говорим и записываем</span></li>
            <li class="live"><span class="r-day">Чт</span><b>Live Lesson</b><span>10:00–11:30 · Zoom + Miro</span></li>
            <li><span class="r-day">Пт</span><b>Polish &amp; Write</b><span>письмо и итог недели</span></li>
          </ol>
        </section>

        <section class="journey">
          <h2 class="section-title">Ваш маршрут · 8 недель</h2>
          <div class="weeks">
            ${JOURNEY.map((j) => {
              const open = (j.state === "now" || j.open) && WEEKS[j.n];
              const tag = j.state === "done" ? "Пройдено" : j.state === "now" ? "Сейчас" : "Скоро";
              const inner = `<span class="wk-n">W${j.n}</span><span class="wk-t">${esc(j.title)}</span><span class="wk-note">${esc(j.note)}</span><span class="wk-tag">${tag}</span>`;
              return open ? `<a class="wk ${j.state} link" href="#/week/${j.n}">${inner}</a>` : `<div class="wk ${j.state}" aria-disabled="true">${inner}</div>`;
            }).join("")}
          </div>
        </section>
      </section>`);
    main.appendChild(el);

    const pick = (n) => {
      store.set("student", n);
      toast(`Отлично, ${n}! Открываю неделю`);
      setTimeout(() => (location.hash = `#/week/${CURRENT}`), 500);
    };
    el.querySelectorAll("[data-name]").forEach((b) => b.addEventListener("click", () => pick(b.dataset.name)));
  }

  // ───────── WEEK
  // ───────── шаги недели (вместо дней)
  const stepNo = (w, d) => w.days.indexOf(d) + 1;
  const stepName = (d) => d.step || d.label;
  const stepTag = (w, d) => (d.live ? `${d.day} ${d.date}` : `Шаг ${stepNo(w, d)}`);
  const stepLine = (w, d) => (d.live ? `Живая встреча · ${d.day} ${d.date} · ${stepName(d)}` : `Шаг ${stepNo(w, d)} · ${stepName(d)}`);
  function pace(w, d) {
    if (d.live) return `${d.day} ${d.date} · ${d.where.split("·").pop().trim()}`;
    const live = w.days.findIndex((x) => x.live);
    return live >= 0 && w.days.indexOf(d) < live ? "В своём темпе · лучше до живой встречи" : "В своём темпе · до воскресенья, 20:00";
  }

  // ───────── WEEK
  function renderWeek(w) {
    main.innerHTML = "";
    const el = h(`
      <section class="week">
        <a class="back" href="#/">← Главная</a>
        <div class="pass">
          <div class="pass-main">
            <p class="eyebrow">Boarding pass · ${esc(w.dates)}</p>
            <h1><span class="code">${esc(w.code)}</span> ${esc(w.title)}</h1>
            <p class="pass-sub">${esc(w.subtitle)}</p>
            <p class="story">${esc(w.story)}</p>
          </div>
          <div class="pass-stub">
            <div><span>From</span><b>${esc(w.from || "")}</b></div>
            <div class="plane" aria-hidden="true">✈</div>
            <div><span>To</span><b>${esc(w.to || "")}</b></div>
            <a class="btn light" href="${esc(CFG.miroBoard)}" target="_blank" rel="noopener">Доска Miro ↗</a>
          </div>
        </div>

        <h2 class="section-title">Маршрут недели</h2>
        <p class="route-note">Шаги проходите в своём темпе, в любые удобные дни. Главное — сделать шаги до живой встречи, а остальное — до воскресенья.</p>
        <div class="days">
          ${w.days.map((d, i) => {
            const p = dayProgress(d);
            return `<a class="day ${d.live ? "live" : ""}" href="#/week/${w.id}/${d.slug}" style="--i:${i}">
              <span class="day-top"><span class="day-date">${stepTag(w, d)}</span></span>
              <span class="day-d">${esc(stepName(d))}</span>
              <span class="day-label">${esc(d.label)}</span>
              <span class="day-title">${esc(d.title)}</span>
              <span class="day-where">${esc(d.where)}</span>
              ${d.live ? `<span class="day-badge">Живой урок</span>` : `<span class="bar"><i style="width:${p}%"></i></span><span class="day-pct">${p ? p + "% готово" : "Не начато"}</span>`}
            </a>`;
          }).join("")}
        </div>

        ${w.vocab ? `<a class="vocab-card" href="#/week/${w.id}/vocab">
          <span><span class="eyebrow">Словарь недели</span><b>${w.vocab.reduce((s, g) => s + g.items.length, 0)} слов и фраз</b><span class="muted">${w.vocab.map((g) => esc(g.group.replace(/^⭐\s*/, ""))).join(" · ")}</span></span>
          <span class="vc-go">Учить слова →</span></a>` : ""}

        <div class="two">
          <section class="card">
            <h2 class="card-title">К концу недели я смогу</h2>
            <ul class="cando">${w.canDo.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
          </section>
          <section class="card">
            <h2 class="card-title">Грамматика недели</h2>
            <ul class="gram">${w.grammar.map((g) => `<li><b>${esc(g.t)}</b><span>${esc(g.s)}</span></li>`).join("")}</ul>
          </section>
        </div>
      </section>`);
    main.appendChild(el);
  }

  // ───────── DAY
  function renderDay(w, d) {
    main.innerHTML = "";
    const idx = w.days.indexOf(d);
    const prev = w.days[idx - 1], next = w.days[idx + 1];
    const hasWork = d.blocks.some((b) => ["write", "voice", "choice", "gap", "match", "tf", "builder", "order", "checklist", "sort", "infogap", "form", "spinner", "rate"].includes(b.type));
    const heads = d.blocks.filter((b) => b.type === "heading" && b.id);
    const el = h(`
      <section class="dayview">
        <a class="back" href="#/week/${w.id}">← ${esc(w.code)} · ${esc(w.title)}</a>
        <header class="day-head ${d.live ? "live" : ""}">
          <div>
            <p class="eyebrow">${esc(stepLine(w, d))} · ${esc(d.label)}</p>
            <h1>${esc(d.title)}</h1>
            <p class="goal"><b>Цель:</b> ${esc(d.goal)}</p>
          </div>
          <dl class="meta">
            <div><dt>Формат</dt><dd>${esc(d.where)}</dd></div>
            <div><dt>Когда</dt><dd>${esc(pace(w, d))}</dd></div>
          </dl>
          ${hasWork ? `<div class="progress"><span class="bar"><i id="dayBar"></i></span><span id="dayPct"></span></div>` : ""}
          ${nameBar()}
        </header>
        ${d.live ? `<div class="present-bar"><button type="button" class="btn small ghost" id="presentBtn">⛶ Режим показа для Zoom</button><span class="muted">Крупный шрифт и широкий экран — удобно показывать через демонстрацию экрана</span></div>` : ""}
        <nav class="jump" aria-label="Задания дня">${heads.length >= 4 ? heads.map((b) => `<button type="button" data-jump="${b.id}">${esc(b.title)}</button>`).join("") : (() => { let k = 0; return d.blocks.filter((b) => b.type !== "heading").map((b) => `<button type="button" data-jump="${b.id}"><b>${String(++k).padStart(2, "0")}</b> ${esc(b.title.split(" · ")[0])}</button>`).join(""); })()}</nav>
        <div class="blocks"></div>
        ${hasWork ? sendPanelHtml() : ""}
        <nav class="pager">
          ${prev ? `<a href="#/week/${w.id}/${prev.slug}">← ${esc(stepName(prev))}</a>` : "<span></span>"}
          ${next ? `<a href="#/week/${w.id}/${next.slug}">${esc(stepName(next))} →</a>` : `<a href="#/week/${w.id}">К плану недели →</a>`}
        </nav>
      </section>`);
    main.appendChild(el);

    wireNames(el);
    const pb = el.querySelector("#presentBtn");
    if (pb) {
      const sync = () => { pb.textContent = document.body.classList.contains("present") ? "✕ Выйти из режима показа" : "⛶ Режим показа для Zoom"; };
      pb.addEventListener("click", () => { document.body.classList.toggle("present"); sync(); });
      sync();
    } else document.body.classList.remove("present");
    el.querySelectorAll("[data-jump]").forEach((j) => j.addEventListener("click", () => {
      const t = document.getElementById(j.dataset.jump);
      if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 130, behavior: "smooth" });
    }));
    const wrap = el.querySelector(".blocks");
    let k = 0;
    d.blocks.forEach((b) => wrap.appendChild(renderBlock(b, b.type === "heading" ? 0 : ++k, w, d)));

    const refresh = () => {
      const bar = el.querySelector("#dayBar"); if (!bar) return;
      const p = dayProgress(d); bar.style.width = p + "%";
      el.querySelector("#dayPct").textContent = p + "%";
    };
    refresh();
    el.addEventListener("pe-change", refresh);
    if (hasWork) wireSend(el, w, d);
  }

  const changed = (node) => { save(); node.dispatchEvent(new CustomEvent("pe-change", { bubbles: true })); };

  function shell(b, n, inner) {
    return h(`
      <article class="block card" id="${b.id}">
        <header class="block-head">
          <span class="num">${String(n).padStart(2, "0")}</span>
          <div>${b.source ? `<p class="src">📘 ${esc(b.source)}</p>` : ""}<h2>${esc(b.title)}</h2>${b.task ? `<p class="task">${esc(b.task)}</p>` : ""}</div>
        </header>
        <div class="block-body">${inner}</div>
      </article>`);
  }

  function checkBar(b) {
    return `<div class="checkbar"><button type="button" class="btn small primary" data-check>Проверить</button><button type="button" class="btn small ghost" data-reveal hidden>Показать ответы</button><button type="button" class="btn small ghost" data-reset>Заново</button><span class="score" aria-live="polite"></span></div>`;
  }

  function renderBlock(b, n, w, d) {
    if (b.type === "heading") return h(`<h2 class="blocks-heading ${b.stage ? "stage" : ""}" ${b.id ? `id="${b.id}"` : ""}>${b.stage ? `<span class="stage-n">${esc(b.stage)}</span>` : ""}<span>${esc(b.title)}</span>${b.min ? `<span class="stage-m">${b.min} мин</span>` : ""}</h2>`);
    const r = { vocab, vocabref, order, listen, links, match, choice, tf, builder, gap, write, voice, checklist, info, rule, lesson, video, sort, flip, cards, infogap, form, spinner, rate }[b.type];
    const el = r ? r(b, n, w, d) : shell(b, n, "");
    if (b.timer) addTimer(el, b.timer);
    const rv = el.querySelector("[data-reveal]");
    if (rv) {
      const a = ans(b.id);
      const sync = () => { rv.hidden = !a.checked || a.revealed; };
      sync();
      el.querySelector("[data-check]").addEventListener("click", () => setTimeout(sync, 0));
      rv.addEventListener("click", () => {
        if (!a.firstScore) a.firstScore = a.score;
        fillCorrect(b, a); a.revealed = true; a.checked = true; save();
        const fresh = renderBlock(b, n, w, d); el.replaceWith(fresh);
        const sc = fresh.querySelector(".score"); if (sc) sc.textContent = `Ваш результат: ${a.firstScore.replace("/", " из ")} · ответы показаны`;
      });
      el.querySelector("[data-reset]").addEventListener("click", () => { delete a.revealed; delete a.firstScore; });
    }
    return el;
  }

  function fillCorrect(b, a) {
    switch (b.type) {
      case "match": a.sel = {}; b.pairs.forEach((p, i) => (a.sel[i] = p[1])); break;
      case "choice": a.sel = {}; b.items.forEach((it, i) => (a.sel[i] = it[2])); break;
      case "tf": a.sel = {}; b.items.forEach((it, i) => (a.sel[i] = it[1])); break;
      case "gap": a.val = {}; b.items.forEach((it, i) => (a.val[i] = it[1][0])); break;
      case "order": a.seq = b.items.map((_, i) => i); break;
      case "builder": a.built = {}; b.items.forEach((s, i) => (a.built[i] = s.split(" ").map((_, k) => k))); break;
      case "sort": a.place = {}; b.items.forEach((it, i) => (a.place[i] = it[1])); break;
      case "infogap": { const me = igSide(b); if (me) { a.vals = a.vals || {}; a.vals[me.partner] = {}; b.fields.forEach((f, i) => (a.vals[me.partner][i] = b.banks[me.partner].rows[i])); } break; }
    }
  }

  // ───────── словарь недели (отдельная страница)
  function vocabList(items) {
    return `<ul class="vocab">${items.map(([en, ru, ex, star]) => `
      <li class="${star ? "star" : ""}"><button type="button" class="say" data-say="${esc(en)}" aria-label="Послушать ${esc(en)}">▶</button>
        <div><b>${star ? "⭐ " : ""}${esc(en)}</b><span class="ru">${esc(ru)}</span>${ex ? `<i>${esc(ex)}</i>` : ""}</div></li>`).join("")}
    </ul>`;
  }
  function bindSay(el) { el.querySelectorAll("[data-say]").forEach((x) => x.addEventListener("click", () => speak(x.dataset.say))); }

  function vocabref(b, n, w) {
    const groups = (b.groups || []).map((i) => w.vocab[i]).filter(Boolean);
    const el = shell(b, n, `
      ${groups.map((g) => `<h3 class="vgroup">${esc(g.group)}</h3>${vocabList(g.items)}`).join("")}
      <a class="btn small ghost vlink" href="#/week/${w.id}/vocab">Весь словарь недели и тренажёр →</a>`);
    bindSay(el);
    return el;
  }

  function renderVocab(w) {
    main.innerHTML = "";
    const all = w.vocab.flatMap((g) => g.items);
    const quiz = w.vocabQuiz || {
      match: shuffle(all.filter((x) => !x[3]), hash(w.code)).slice(0, 8).map(([en, ru]) => [en, ru]),
    };
    const el = h(`
      <section class="dayview">
        <a class="back" href="#/week/${w.id}">← ${esc(w.code)} · ${esc(w.title)}</a>
        <header class="day-head">
          <div>
            <p class="eyebrow">Vocabulary · ${esc(w.code)}</p>
            <h1>Словарь недели</h1>
            <p class="goal">${all.length} слов и фраз по теме «${esc(w.subtitle)}». Нажимайте ▶, чтобы послушать, и проверьте себя тренажёром внизу.</p>
          </div>
          <div class="vtools">
            <button type="button" class="btn small ghost" id="hideRu">Скрыть перевод</button>
          </div>
        </header>
        <div class="blocks">
          ${w.vocab.map((g) => `<article class="card block"><h2 class="vtitle">${esc(g.group)}</h2>${vocabList(g.items)}</article>`).join("")}
        </div>
        <h2 class="section-title">Тренажёр</h2>
        <div class="blocks" id="vq"></div>
      </section>`);
    main.appendChild(el);
    bindSay(el);
    el.querySelector("#hideRu").addEventListener("click", (e) => {
      const on = el.classList.toggle("hide-ru");
      e.target.textContent = on ? "Показать перевод" : "Скрыть перевод";
    });
    const vq = el.querySelector("#vq");
    vq.appendChild(match({ id: `${w.code}-vq-match`, title: "Слово ↔ значение", task: "Соедините слово и значение.", pairs: quiz.match }, 1));
    if (quiz.spell) vq.appendChild(gap({ id: `${w.code}-vq-spell`, title: "Напишите слово", task: "Вспомните слово по-английски.", items: quiz.spell }, 2));
  }

  // order — расставить по порядку
  function order(b, n) {
    const a = ans(b.id);
    if (!a.seq || a.seq.length !== b.items.length) a.seq = shuffle(b.items.map((_, i) => i), hash(b.id));
    const el = shell(b, n, `<ol class="order"></ol>${checkBar(b)}`);
    const list = el.querySelector(".order");
    const draw = (show) => {
      list.innerHTML = a.seq.map((k, pos) => `
        <li class="${show ? (k === pos ? "ok" : "no") : ""}"><span>${esc(b.items[k])}</span>
          <span class="ord-btns"><button type="button" class="mv" data-pos="${pos}" data-d="-1" aria-label="Выше" ${pos === 0 ? "disabled" : ""}>↑</button><button type="button" class="mv" data-pos="${pos}" data-d="1" aria-label="Ниже" ${pos === a.seq.length - 1 ? "disabled" : ""}>↓</button></span></li>`).join("");
      list.querySelectorAll(".mv").forEach((m) => m.addEventListener("click", () => {
        const p = +m.dataset.pos, q = p + +m.dataset.d;
        [a.seq[p], a.seq[q]] = [a.seq[q], a.seq[p]]; a.checked = false;
        el.querySelector(".score").textContent = ""; draw(false); changed(el);
      }));
      return a.seq.filter((k, pos) => k === pos).length;
    };
    const check = () => { const ok = draw(true); a.checked = true; a.score = `${ok}/${b.items.length}`; el.querySelector(".score").textContent = `${ok} из ${b.items.length}`; changed(el); };
    el.querySelector("[data-check]").addEventListener("click", check);
    el.querySelector("[data-reset]").addEventListener("click", () => { answers[b.id] = {}; el.replaceWith(renderBlock(b, n)); save(); });
    draw(false); if (a.checked) check();
    return el;
  }

  // links — внешние ресурсы
  function links(b, n) {
    return shell(b, n, `<ul class="res">${b.items.map(([t, url, desc, tag]) => `
      <li><a href="${esc(url)}" target="_blank" rel="noopener"><span class="res-top">${tag ? `<span class="res-tag">${esc(tag)}</span>` : ""}<b>${esc(t)}</b><span class="res-go">↗</span></span>${desc ? `<span class="res-desc">${esc(desc)}</span>` : ""}</a></li>`).join("")}</ul>`);
  }

  // listen — озвученный текст
  function listen(b, n) {
    const el = shell(b, n, `
      <div class="listen">
        <button type="button" class="btn primary small" data-all>▶ Слушать всё</button>
        ${b.hideText ? `<button type="button" class="btn ghost small" data-show>Показать текст</button>` : ""}
      </div>
      <ol class="lines ${b.hideText ? "hidden" : ""}">${b.lines.map((l) => `<li><button type="button" class="say" data-say="${esc(l)}" aria-label="Послушать">▶</button><span>${esc(l)}</span></li>`).join("")}</ol>`);
    bindSay(el);
    el.querySelector("[data-all]").addEventListener("click", () => speak(b.lines.join(" ")));
    const sh = el.querySelector("[data-show]");
    if (sh) sh.addEventListener("click", () => { el.querySelector(".lines").classList.toggle("hidden"); sh.textContent = sh.textContent.includes("Показать") ? "Скрыть текст" : "Показать текст"; });
    return el;
  }

  // vocab — карточки со звуком
  function vocab(b, n) {
    const el = shell(b, n, `
      <ul class="vocab">${b.items.map(([en, ru, ex]) => `
        <li><button type="button" class="say" data-say="${esc(en)}" aria-label="Послушать ${esc(en)}">▶</button>
          <div><b>${esc(en)}</b><span class="ru">${esc(ru)}</span><i>${esc(ex)}</i></div></li>`).join("")}
      </ul>
      ${b.chunks ? `<div class="chunks"><p class="eyebrow">⭐ Главные фразы недели</p>${b.chunks.map((c) => `<button type="button" class="chunk" data-say="${esc(c)}">${esc(c)}</button>`).join("")}</div>` : ""}`);
    el.querySelectorAll("[data-say]").forEach((x) => x.addEventListener("click", () => speak(x.dataset.say)));
    return el;
  }

  // match — выпадающие списки
  function match(b, n) {
    const opts = shuffle(b.pairs.map((p) => p[1]), hash(b.id));
    const a = ans(b.id); a.sel = a.sel || {};
    const el = shell(b, n, `
      <ol class="match">${b.pairs.map(([l], i) => `
        <li data-i="${i}"><b>${esc(l)}</b>
          <select aria-label="Определение для ${esc(l)}"><option value="">— выберите —</option>${opts.map((o) => `<option ${a.sel[i] === o ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>
          <span class="mark"></span></li>`).join("")}
      </ol>${checkBar(b)}`);
    el.querySelectorAll("select").forEach((s) => s.addEventListener("change", () => { a.sel[s.closest("li").dataset.i] = s.value; a.checked = false; changed(el); }));
    const check = () => {
      let ok = 0;
      el.querySelectorAll("li[data-i]").forEach((li) => {
        const i = li.dataset.i, right = a.sel[i] === b.pairs[i][1];
        ok += right; li.className = a.sel[i] ? (right ? "ok" : "no") : "";
        li.querySelector(".mark").textContent = a.sel[i] && !right ? "→ " + b.pairs[i][1] : "";
      });
      a.checked = true; a.score = `${ok}/${b.pairs.length}`;
      el.querySelector(".score").textContent = `${ok} из ${b.pairs.length}`; changed(el);
    };
    el.querySelector("[data-check]").addEventListener("click", check);
    el.querySelector("[data-reset]").addEventListener("click", () => { answers[b.id] = {}; el.replaceWith(renderBlock(b, n)); save(); });
    if (a.checked) check();
    return el;
  }

  // choice — выбор в пропуске
  function choice(b, n) {
    const a = ans(b.id); a.sel = a.sel || {};
    const el = shell(b, n, `
      ${b.map ? streetMap() : ""}
      ${b.listen ? `<div class="listen"><button type="button" class="btn small ghost" data-dialog>▶ Послушать диалог</button></div>` : ""}
      ${b.note ? `<p class="note">${esc(b.note)}</p>` : ""}
      <ol class="choice">${b.items.map(([q, opts], i) => `
        <li data-i="${i}"><p>${esc(q).replace("___", '<span class="slot">___</span>')}</p>
          <div class="opts">${opts.map((o, j) => `<button type="button" class="opt ${a.sel[i] === j ? "on" : ""}" data-j="${j}">${esc(o)}</button>`).join("")}</div></li>`).join("")}
      </ol>${checkBar(b)}`);
    const paint = (show) => {
      let ok = 0;
      el.querySelectorAll("li[data-i]").forEach((li) => {
        const i = +li.dataset.i, item = b.items[i], s = a.sel[i];
        const slot = li.querySelector(".slot");
        if (slot) slot.textContent = s !== undefined ? item[1][s] : "___";
        li.querySelectorAll(".opt").forEach((o) => {
          const j = +o.dataset.j;
          o.classList.toggle("on", s === j);
          o.classList.toggle("ok", show && j === item[2] && s !== undefined);
          o.classList.toggle("no", show && s === j && j !== item[2]);
        });
        li.className = show && s !== undefined ? (s === item[2] ? "ok" : "no") : "";
        if (s === item[2]) ok++;
      });
      return ok;
    };
    const dl = el.querySelector("[data-dialog]");
    if (dl) dl.addEventListener("click", () => speak(b.listen.map((l) => l.replace(/^\w+:\s*/, "")).join(" ")));
    el.querySelectorAll(".opt").forEach((o) => o.addEventListener("click", () => {
      a.sel[+o.closest("li").dataset.i] = +o.dataset.j; a.checked = false;
      el.querySelector(".score").textContent = ""; paint(false); changed(el);
    }));
    const check = () => { const ok = paint(true); a.checked = true; a.score = `${ok}/${b.items.length}`; el.querySelector(".score").textContent = `${ok} из ${b.items.length}`; changed(el); };
    el.querySelector("[data-check]").addEventListener("click", check);
    el.querySelector("[data-reset]").addEventListener("click", () => { answers[b.id] = {}; el.replaceWith(renderBlock(b, n)); save(); });
    paint(false); if (a.checked) check();
    return el;
  }

  // tf — true / false
  function tf(b, n) {
    const a = ans(b.id); a.sel = a.sel || {};
    const el = shell(b, n, `
      <ol class="tf">${b.items.map(([q], i) => `
        <li data-i="${i}"><p>${esc(q)}</p>
          <div class="opts"><button type="button" class="opt" data-v="1">True</button><button type="button" class="opt" data-v="0">False</button></div>
          <span class="why"></span></li>`).join("")}
      </ol>${checkBar(b)}`);
    const paint = (show) => {
      let ok = 0;
      el.querySelectorAll("li[data-i]").forEach((li) => {
        const i = +li.dataset.i, [, right, why] = b.items[i], s = a.sel[i];
        li.querySelectorAll(".opt").forEach((o) => o.classList.toggle("on", s === (o.dataset.v === "1")));
        const good = s === right;
        li.className = show && s !== undefined ? (good ? "ok" : "no") : "";
        li.querySelector(".why").textContent = show && s !== undefined && !good ? (right ? "True" : "False") + (why ? " — " + why : "") : "";
        if (good) ok++;
      });
      return ok;
    };
    el.querySelectorAll(".opt").forEach((o) => o.addEventListener("click", () => {
      a.sel[+o.closest("li").dataset.i] = o.dataset.v === "1"; a.checked = false;
      el.querySelector(".score").textContent = ""; paint(false); changed(el);
    }));
    const check = () => { const ok = paint(true); a.checked = true; a.score = `${ok}/${b.items.length}`; el.querySelector(".score").textContent = `${ok} из ${b.items.length}`; changed(el); };
    el.querySelector("[data-check]").addEventListener("click", check);
    el.querySelector("[data-reset]").addEventListener("click", () => { answers[b.id] = {}; el.replaceWith(renderBlock(b, n)); save(); });
    paint(false); if (a.checked) check();
    return el;
  }

  // builder — собрать предложение из слов
  function builder(b, n) {
    const a = ans(b.id); a.built = a.built || {};
    const el = shell(b, n, `<ol class="builder">${b.items.map((s, i) => `
      <li data-i="${i}"><div class="built" aria-live="polite"></div><div class="pool"></div><span class="mark"></span></li>`).join("")}
      </ol>${checkBar(b)}`);
    const tokens = (s) => s.split(" ");
    const draw = (li, show) => {
      const i = +li.dataset.i, target = tokens(b.items[i]);
      const built = a.built[i] || [];
      const pool = shuffle(target.map((t, k) => k), hash(b.id + i)).filter((k) => !built.includes(k));
      li.querySelector(".built").innerHTML = built.length
        ? built.map((k, pos) => `<button type="button" class="tok in" data-pos="${pos}">${esc(target[k])}</button>`).join("")
        : `<span class="ph">Нажимайте на слова ниже…</span>`;
      li.querySelector(".pool").innerHTML = pool.map((k) => `<button type="button" class="tok" data-k="${k}">${esc(target[k])}</button>`).join("");
      const sentence = built.map((k) => target[k]).join(" ");
      const right = norm(sentence) === norm(b.items[i]);
      li.className = show && built.length ? (right ? "ok" : "no") : "";
      li.querySelector(".mark").textContent = show && built.length && !right ? "→ " + b.items[i] : "";
      li.querySelectorAll(".pool .tok").forEach((t) => t.addEventListener("click", () => { (a.built[i] = built.concat(+t.dataset.k)); a.checked = false; draw(li, false); changed(el); }));
      li.querySelectorAll(".built .tok").forEach((t) => t.addEventListener("click", () => { built.splice(+t.dataset.pos, 1); a.built[i] = built; a.checked = false; draw(li, false); changed(el); }));
      return right;
    };
    const all = (show) => [...el.querySelectorAll("li[data-i]")].map((li) => draw(li, show)).filter(Boolean).length;
    const check = () => { const ok = all(true); a.checked = true; a.score = `${ok}/${b.items.length}`; a.text = b.items.map((s, i) => (a.built[i] || []).map((k) => tokens(s)[k]).join(" ")); el.querySelector(".score").textContent = `${ok} из ${b.items.length}`; changed(el); };
    el.querySelector("[data-check]").addEventListener("click", check);
    el.querySelector("[data-reset]").addEventListener("click", () => { answers[b.id] = {}; el.replaceWith(renderBlock(b, n)); save(); });
    all(false); if (a.checked) check();
    return el;
  }

  // gap — вписать форму глагола
  function gap(b, n) {
    const a = ans(b.id); a.val = a.val || {};
    const extra =
      (b.diary ? `<table class="mini"><caption>Anna's diary</caption><tbody>${b.diary.map(([d, t]) => `<tr><th>${esc(d)}</th><td>${esc(t)}</td></tr>`).join("")}</tbody></table>` : "") +
      (b.board ? `<div class="board"><p>${esc(b.board.title)}</p><table><thead><tr>${b.board.head.map((x) => `<th>${esc(x)}</th>`).join("")}</tr></thead><tbody>${b.board.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : "");
    const el = shell(b, n, `${extra}<ol class="gap">${b.items.map(([q], i) => {
      const [pre, post] = q.split("___");
      return `<li data-i="${i}"><p>${esc(pre)}<input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(a.val[i] || "")}" aria-label="Ответ ${i + 1}">${esc(post || "")}</p><span class="mark"></span></li>`;
    }).join("")}</ol>${checkBar(b)}`);
    el.querySelectorAll("input").forEach((inp) => inp.addEventListener("input", () => { a.val[inp.closest("li").dataset.i] = inp.value; a.checked = false; el.querySelector(".score").textContent = ""; inp.closest("li").className = ""; changed(el); }));
    const check = () => {
      let ok = 0;
      el.querySelectorAll("li[data-i]").forEach((li) => {
        const i = +li.dataset.i, acc = b.items[i][1], v = a.val[i] || "";
        const right = acc.some((x) => norm(x) === norm(v));
        ok += right; li.className = v ? (right ? "ok" : "no") : "";
        li.querySelector(".mark").textContent = v && !right ? "→ " + acc[0] : "";
      });
      a.checked = true; a.score = `${ok}/${b.items.length}`; el.querySelector(".score").textContent = `${ok} из ${b.items.length}`; changed(el);
    };
    el.querySelector("[data-check]").addEventListener("click", check);
    el.querySelector("[data-reset]").addEventListener("click", () => { answers[b.id] = {}; el.replaceWith(renderBlock(b, n)); save(); });
    if (a.checked) check();
    return el;
  }

  // write — свободный ответ, проверяет преподаватель
  function write(b, n) {
    const a = ans(b.id);
    const el = shell(b, n, `
      ${b.prompt ? `<p class="prompt">${esc(b.prompt)}</p>` : ""}
      ${b.example ? `<details class="example"><summary>Показать образец</summary><pre>${esc(b.example)}</pre></details>` : ""}
      <textarea rows="${b.big ? 9 : 4}" placeholder="Write in English…">${esc(a.text || "")}</textarea>
      <div class="wc"><span class="count"></span><span class="tag">Проверит ${esc(CFG.teacherName || "преподаватель")}</span></div>
      ${b.key ? `<details class="example keybox"><summary>Ключ (откройте после выполнения)</summary><pre>${esc(b.key)}</pre></details>` : ""}`);
    const ta = el.querySelector("textarea"), cnt = el.querySelector(".count");
    const upd = () => { const c = words(ta.value); cnt.textContent = `${c} ${c === 1 ? "слово" : "слов"}${b.minWords ? ` · цель ${b.minWords}+` : ""}`; cnt.classList.toggle("ok", c >= (b.minWords || 1)); };
    ta.addEventListener("input", () => { a.text = ta.value; upd(); changed(el); });
    upd();
    return el;
  }

  // voice — запись голоса прямо в браузере
  function voice(b, n) {
    const a = ans(b.id);
    const el = shell(b, n, `
      ${b.prompt ? `<p class="prompt">${esc(b.prompt)}</p>` : ""}
      ${b.example ? `<details class="example"><summary>Опора</summary><pre>${esc(b.example)}</pre></details>` : ""}
      <div class="rec">
        <button type="button" class="recbtn" aria-label="Начать запись"><span></span></button>
        <div class="rec-info"><b class="rec-state">Нажмите, чтобы записать</b><span class="rec-time">0:00</span></div>
      </div>
      <div class="rec-out" hidden><audio controls></audio><a class="btn small ghost dl" download>Скачать файл</a></div>
      <p class="hint">После записи скачайте файл и отправьте голосовое в чат группы или ${esc(CFG.teacherName || "преподавателю")} лично. Можно записать и сразу в Telegram — главное, отметить здесь, что задание сделано.</p>
      <label class="selfmark"><input type="checkbox" ${a.recorded ? "checked" : ""}> Голосовое записано и отправлено</label>`);
    const btn = el.querySelector(".recbtn"), state = el.querySelector(".rec-state"), time = el.querySelector(".rec-time");
    let rec = null, chunks = [], t0 = 0, timer = null;
    btn.addEventListener("click", async () => {
      if (rec && rec.state === "recording") { rec.stop(); return; }
      if (!navigator.mediaDevices || !window.MediaRecorder) return toast("Запись не поддерживается — запишите голосовое в Telegram");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        rec = new MediaRecorder(stream); chunks = [];
        rec.ondataavailable = (e) => chunks.push(e.data);
        rec.onstop = () => {
          stream.getTracks().forEach((t) => t.stop()); clearInterval(timer);
          btn.classList.remove("on"); state.textContent = "Готово! Послушайте себя";
          const blob = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
          const url = URL.createObjectURL(blob);
          const out = el.querySelector(".rec-out"); out.hidden = false;
          out.querySelector("audio").src = url;
          const dl = out.querySelector(".dl"); dl.href = url;
          dl.download = `${(student() || "student")}-${b.id}.${/mp4/.test(blob.type) ? "m4a" : "webm"}`;
        };
        rec.start(); t0 = Date.now(); btn.classList.add("on"); state.textContent = "Идёт запись… нажмите, чтобы остановить";
        timer = setInterval(() => { const s = Math.floor((Date.now() - t0) / 1000); time.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }, 250);
      } catch { toast("Нет доступа к микрофону"); }
    });
    el.querySelector(".selfmark input").addEventListener("change", (e) => { a.recorded = e.target.checked; changed(el); });
    return el;
  }

  // video — YouTube (аутентичное видео)
  function video(b, n) {
    const id = encodeURIComponent(b.youtube);
    return shell(b, n, `
      <div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="${esc(b.title)}" loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
      ${b.note ? `<p class="hint">${esc(b.note)}</p>` : ""}
      <div class="video-links"><a class="btn small primary" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">▶ Открыть на YouTube ↗</a>${b.backup ? `<a class="btn small ghost" href="https://www.youtube.com/watch?v=${encodeURIComponent(b.backup)}" target="_blank" rel="noopener">Запасное видео ↗</a>` : ""}</div>`);
  }

  // ───────── таймер для любого блока (b.timer = секунды)
  function addTimer(el, sec) {
    const head = el.querySelector(".block-head"); if (!head) return;
    const fmt = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
    const t = h(`<button type="button" class="timer" aria-live="polite">⏱ <span>${fmt(sec)}</span> · старт</button>`);
    let left = sec, iv = null;
    const paint = () => { t.querySelector("span").textContent = fmt(left); };
    t.addEventListener("click", () => {
      if (iv) { clearInterval(iv); iv = null; t.lastChild.textContent = " · дальше"; return; }
      if (left <= 0) { left = sec; t.classList.remove("done"); }
      t.lastChild.textContent = " · пауза";
      iv = setInterval(() => { left--; paint(); if (left <= 0) { clearInterval(iv); iv = null; t.classList.add("done"); t.lastChild.textContent = " · время!"; toast("⏱ Время вышло!"); } }, 1000);
    });
    head.appendChild(t);
  }

  // sort — разложить слова по коробкам (нажмите слово, потом коробку; или перетащите)
  function sort(b, n) {
    const a = ans(b.id); a.place = a.place || {};
    const el = shell(b, n, `
      <p class="hint">Нажмите на слово, потом на коробку. На компьютере можно перетаскивать мышкой. Слово в коробке — нажмите, чтобы вернуть.</p>
      <div class="sort-pool" data-bin="pool"></div>
      <div class="sort-bins">${b.bins.map((name, k) => `<div class="sort-bin" data-bin="${k}"><p class="sort-name">${esc(name)}</p><div class="sort-drop"></div></div>`).join("")}</div>
      ${checkBar(b)}`);
    let picked = null;
    const order = shuffle(b.items.map((_, i) => i), hash(b.id));
    const draw = (show) => {
      let ok = 0;
      const chip = (i) => {
        const p = a.place[i], right = p === b.items[i][1];
        if (show && p !== undefined && right) ok++;
        return `<button type="button" class="tok sort-chip ${picked === i ? "picked" : ""} ${show && p !== undefined ? (right ? "good" : "bad") : ""}" draggable="true" data-i="${i}">${esc(b.items[i][0])}</button>`;
      };
      el.querySelector(".sort-pool").innerHTML = order.filter((i) => a.place[i] === undefined).map(chip).join("") || `<span class="ph">Все слова разложены ✓</span>`;
      el.querySelectorAll(".sort-bin").forEach((bin) => { bin.querySelector(".sort-drop").innerHTML = order.filter((i) => a.place[i] === +bin.dataset.bin).map(chip).join(""); });
      el.querySelectorAll(".sort-chip").forEach((c) => {
        c.addEventListener("click", (e) => {
          e.stopPropagation(); const i = +c.dataset.i;
          if (a.place[i] !== undefined) { delete a.place[i]; picked = null; a.checked = false; draw(false); changed(el); return; }
          picked = picked === i ? null : i; draw(false);
        });
        c.addEventListener("dragstart", (e) => { e.dataTransfer.setData("text/plain", c.dataset.i); });
      });
      return ok;
    };
    const drop = (i, k) => { if (k === "pool") delete a.place[i]; else a.place[i] = +k; picked = null; a.checked = false; el.querySelector(".score").textContent = ""; draw(false); changed(el); };
    el.querySelectorAll("[data-bin]").forEach((zone) => {
      zone.addEventListener("click", () => { if (picked !== null) drop(picked, zone.dataset.bin); });
      zone.addEventListener("dragover", (e) => { e.preventDefault(); zone.classList.add("over"); });
      zone.addEventListener("dragleave", () => zone.classList.remove("over"));
      zone.addEventListener("drop", (e) => { e.preventDefault(); zone.classList.remove("over"); drop(+e.dataTransfer.getData("text/plain"), zone.dataset.bin); });
    });
    const check = () => { const ok = draw(true); a.checked = true; a.score = `${ok}/${b.items.length}`; el.querySelector(".score").textContent = `${ok} из ${b.items.length}`; changed(el); };
    el.querySelector("[data-check]").addEventListener("click", check);
    el.querySelector("[data-reset]").addEventListener("click", () => { answers[b.id] = {}; el.replaceWith(renderBlock(b, n)); save(); });
    draw(false); if (a.checked) check();
    return el;
  }

  // flip — карточки-перевёртыши (лицо / оборот, озвучка оборота)
  function flip(b, n) {
    const el = shell(b, n, `<div class="flips ${b.small ? "small" : ""}">${b.cards.map(([front, back, say], i) => `
      <button type="button" class="flipcard" data-i="${i}" aria-pressed="false">
        <span class="fc-front">${esc(front)}</span>
        <span class="fc-back">${esc(back)}</span>
      </button>`).join("")}</div>
      <div class="flip-tools"><button type="button" class="btn small ghost" data-all>Открыть все</button><button type="button" class="btn small ghost" data-none>Закрыть все</button></div>`);
    el.querySelectorAll(".flipcard").forEach((c) => c.addEventListener("click", () => {
      const on = c.classList.toggle("flipped"); c.setAttribute("aria-pressed", on);
      const card = b.cards[+c.dataset.i];
      if (on && card[2] !== false && !b.mute) speak(typeof card[2] === "string" ? card[2] : card[1]);
    }));
    el.querySelector("[data-all]").addEventListener("click", () => el.querySelectorAll(".flipcard").forEach((c) => c.classList.add("flipped")));
    el.querySelector("[data-none]").addEventListener("click", () => el.querySelectorAll(".flipcard").forEach((c) => c.classList.remove("flipped")));
    return el;
  }

  // cards — карточки ролей / шагов
  function cards(b, n) {
    return shell(b, n, `<div class="rolecards cols-${b.cols || b.cards.length}">${b.cards.map(([title, text, tone]) => `
      <div class="rolecard ${tone || ""}"><p class="rc-title">${esc(title)}</p><div class="rc-text">${text}</div></div>`).join("")}</div>`);
  }

  // infogap — у каждой своя карточка банка, о второй нужно спросить
  function igSide(b) {
    const me = student(); const names = Object.keys(b.banks);
    if (!names.includes(me)) return null;
    return { me, partner: names.find((x) => x !== me) };
  }
  function infogap(b, n) {
    const a = ans(b.id); a.vals = a.vals || {};
    const side = igSide(b);
    if (!side) {
      const el = shell(b, n, `<div class="ig-pick"><p>Кто вы? Карточка у каждой своя — не показывайте её партнёрше.</p>
        <div class="opts">${Object.keys(b.banks).map((s) => `<button type="button" class="opt" data-me="${s}">Я ${s}</button>`).join("")}</div></div>`);
      el.querySelectorAll("[data-me]").forEach((x) => x.addEventListener("click", () => {
        store.set("student", x.dataset.me);
        document.querySelectorAll(".namebar [data-name]").forEach((c) => c.classList.toggle("on", c.dataset.name === x.dataset.me));
        el.replaceWith(renderBlock(b, n));
      }));
      return el;
    }
    const mine = b.banks[side.me], theirs = b.banks[side.partner];
    a.vals[side.partner] = a.vals[side.partner] || {};
    const v = a.vals[side.partner];
    const el = shell(b, n, `
      <div class="ig">
        <div class="ig-card"><p class="ig-tag">🔒 Ваша карточка · ${esc(side.me)}</p><h3>${esc(mine.name)}</h3>
          <dl>${b.fields.map((f, i) => `<div><dt>${esc(f)}</dt><dd>${esc(mine.rows[i])}</dd></div>`).join("")}</dl></div>
        <div class="ig-ask"><p class="ig-tag">❓ Спросите ${esc(side.partner)} · ${esc(theirs.name)}</p>
          <ol class="gap ig-fields">${b.fields.map((f, i) => `<li data-i="${i}"><label>${esc(f)}<input type="text" autocomplete="off" value="${esc(v[i] || "")}"></label><span class="mark"></span></li>`).join("")}</ol></div>
      </div>
      <p class="ig-q">Задавайте вопросы: ${b.questions.map((q) => `<button type="button" class="tok" data-say="${esc(q)}">▶ ${esc(q)}</button>`).join(" ")}</p>
      <label class="ig-decision"><b>Our choice for Anna:</b><textarea rows="2" placeholder="Banco … because …">${esc(a.decision || "")}</textarea></label>
      ${checkBar(b)}`);
    bindSay(el);
    el.querySelectorAll(".ig-fields input").forEach((inp) => inp.addEventListener("input", () => { v[inp.closest("li").dataset.i] = inp.value; a.checked = false; el.querySelector(".score").textContent = ""; inp.closest("li").className = ""; changed(el); }));
    el.querySelector(".ig-decision textarea").addEventListener("input", (e) => { a.decision = e.target.value; changed(el); });
    const check = () => {
      let ok = 0;
      el.querySelectorAll(".ig-fields li").forEach((li) => {
        const i = +li.dataset.i, val = norm(v[i] || ""), keys = theirs.keys[i];
        const right = !!val && keys.every((k) => val.includes(norm(k)));
        ok += right; li.className = val ? (right ? "ok" : "no") : "";
        li.querySelector(".mark").textContent = val && !right ? "→ " + theirs.rows[i] : "";
      });
      a.checked = true; a.score = `${ok}/${b.fields.length}`; el.querySelector(".score").textContent = `${ok} из ${b.fields.length}`; changed(el);
    };
    el.querySelector("[data-check]").addEventListener("click", check);
    el.querySelector("[data-reset]").addEventListener("click", () => { answers[b.id] = {}; el.replaceWith(renderBlock(b, n)); save(); });
    if (a.checked) check();
    return el;
  }

  // form — анкета (заполняет «сотрудник банка»)
  function form(b, n) {
    const a = ans(b.id); a.vals = a.vals || {};
    const el = shell(b, n, `<div class="bankform"><p class="bf-head">${esc(b.formTitle || "Account opening form")}</p>
      ${b.fields.map((f, i) => `<label><span>${esc(f)}</span><input type="text" autocomplete="off" value="${esc(a.vals[i] || "")}"></label>`).join("")}</div>`);
    el.querySelectorAll(".bankform input").forEach((inp, i) => inp.addEventListener("input", () => { a.vals[i] = inp.value; changed(el); }));
    return el;
  }

  // spinner — колесо ситуаций: крутите, задайте вежливый вопрос, сравните с образцом
  function spinner(b, n) {
    const a = ans(b.id); a.list = a.list || [];
    const el = shell(b, n, `
      <div class="spin">
        <div class="spin-wheel" aria-hidden="true"><span>?</span></div>
        <div class="spin-side">
          <button type="button" class="btn primary" data-spin>🎡 Крутить колесо</button>
          <p class="spin-sit" aria-live="polite">Нажмите — и получите ситуацию в банке.</p>
          <div class="spin-answer" hidden>
            <input type="text" placeholder="Ваш вежливый вопрос…" autocomplete="off">
            <div class="spin-actions"><button type="button" class="btn small primary" data-save>Сохранить</button><button type="button" class="btn small ghost" data-model>Показать образец</button></div>
            <p class="spin-model" hidden></p>
          </div>
        </div>
      </div>
      <ol class="spin-log">${a.list.map((x) => `<li><b>${esc(x.sit)}</b><span>${esc(x.q)}</span></li>`).join("")}</ol>`);
    let cur = null;
    const wheel = el.querySelector(".spin-wheel"), sit = el.querySelector(".spin-sit"), box = el.querySelector(".spin-answer"), inp = box.querySelector("input"), model = el.querySelector(".spin-model");
    el.querySelector("[data-spin]").addEventListener("click", () => {
      let k = 0, i = 0; wheel.classList.add("go"); box.hidden = true; model.hidden = true;
      const iv = setInterval(() => {
        i = Math.floor(Math.random() * b.options.length); sit.textContent = b.options[i][0];
        if (++k > 14) { clearInterval(iv); wheel.classList.remove("go"); cur = i; wheel.querySelector("span").textContent = String(i + 1); box.hidden = false; inp.value = ""; inp.focus(); }
      }, 90);
    });
    el.querySelector("[data-model]").addEventListener("click", () => { if (cur === null) return; model.textContent = "Образец: " + b.options[cur][1]; model.hidden = false; speak(b.options[cur][1]); });
    el.querySelector("[data-save]").addEventListener("click", () => {
      if (cur === null || !inp.value.trim()) return toast("Сначала напишите вопрос");
      a.list.push({ sit: b.options[cur][0], q: inp.value.trim() }); changed(el);
      el.querySelector(".spin-log").insertAdjacentHTML("beforeend", `<li><b>${esc(b.options[cur][0])}</b><span>${esc(inp.value.trim())}</span></li>`);
      toast("Сохранено ✓ Крутите ещё!"); inp.value = "";
    });
    return el;
  }

  // rate — самооценка: not yet / almost / confident
  function rate(b, n) {
    const a = ans(b.id); a.rate = a.rate || {};
    const lv = b.levels || ["not yet", "almost", "confident"];
    const el = shell(b, n, `<ol class="rate">${b.items.map((it, i) => `<li data-i="${i}"><p>${esc(it)}</p><div class="opts">${lv.map((l, j) => `<button type="button" class="opt lv${j} ${a.rate[i] === j ? "on" : ""}" data-j="${j}">${esc(l)}</button>`).join("")}</div></li>`).join("")}</ol>`);
    el.querySelectorAll(".opt").forEach((o) => o.addEventListener("click", () => {
      const li = o.closest("li"); a.rate[li.dataset.i] = +o.dataset.j; a.levels = lv; a.items = b.items;
      li.querySelectorAll(".opt").forEach((x) => x.classList.toggle("on", x === o)); changed(el);
    }));
    return el;
  }

  // checklist
  function checklist(b, n, w) {
    const a = ans(b.id); a.checks = a.checks || {};
    const items = b.fromCanDo ? w.canDo : b.items;
    const el = shell(b, n, `<ul class="checks">${items.map((it, i) => `
      <li><label><input type="checkbox" data-i="${i}" ${a.checks[i] ? "checked" : ""}><span>${esc(it)}</span></label></li>`).join("")}</ul>`);
    el.querySelectorAll("input").forEach((c) => c.addEventListener("change", () => { a.checks[c.dataset.i] = c.checked; a.items = items; changed(el); }));
    a.items = items;
    return el;
  }

  // info — объявление о квартире
  function info(b, n) {
    if (b.message) {
      const el = shell(b, n, `
        <div class="msg"><p class="msg-from">${esc(b.message.from)}</p><p class="bubble">${esc(b.message.text)}</p>
        <button type="button" class="btn small ghost" data-msg>▶ Послушать</button></div>`);
      el.querySelector("[data-msg]").addEventListener("click", () => speak(b.message.text));
      return el;
    }
    const ad = b.advert;
    return shell(b, n, `
      <figure class="advert">
        <div class="ad-photo" aria-hidden="true">${flatArt()}</div>
        <figcaption>
          <p class="ad-tag">For rent · Alfama</p>
          <h3>${esc(ad.head)}</h3>
          <p class="ad-price">${esc(ad.price)}</p>
          <p class="ad-text">${esc(ad.text)}</p>
          <button type="button" class="btn small ghost" data-say>▶ Послушать текст</button>
        </figcaption>
      </figure>`);
  }

  // rule — карточка правила
  function rule(b, n) {
    const t = b.table;
    return shell(b, n, `
      <div class="rule">
        <table><thead><tr>${t.head.map((x) => `<th>${x}</th>`).join("")}</tr></thead>
        <tbody>${t.rows.map((r) => `<tr>${r.map((c, i) => i ? `<td>${c}</td>` : `<th scope="row" class="sign">${c}</th>`).join("")}</tr>`).join("")}</tbody></table>
        <ul class="tips">${b.tips.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>`);
  }

  // lesson — карта живого урока
  function lesson(b, n) {
    const total = b.stages.reduce((s, x) => s + x[3], 0);
    const el = shell(b, n, `
      <div class="live-links">
        ${b.onPage ? `<button type="button" class="btn primary" data-start>Начать урок ↓</button>` : `<a class="btn primary" href="${esc(CFG.miroBoard)}" target="_blank" rel="noopener">Открыть доску Miro ↗</a>`}
        ${CFG.zoomLink ? `<a class="btn ghost" href="${esc(CFG.zoomLink)}" target="_blank" rel="noopener">Войти в Zoom ↗</a>` : `<span class="muted">Ссылку на Zoom ${esc(CFG.teacherName || "преподаватель")} пришлёт в чат</span>`}
      </div>
      <ol class="stages">${b.stages.map(([num, t, d, m, target]) => `
        <li style="--w:${(m / total) * 100}%" ${target ? `data-go="${target}" class="go" tabindex="0" role="button"` : ""}><span class="st-n">${num}</span><div><b>${esc(t)}</b><span>${esc(d)}</span></div><span class="st-m">${m} мин</span></li>`).join("")}
      </ol>
      <p class="muted">Всего ${total} минут${b.onPage ? " · нажмите на этап, чтобы перейти к заданиям" : ""}.</p>`);
    const go = (id) => { const t = document.getElementById(id); if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" }); };
    el.querySelectorAll("[data-go]").forEach((li) => { li.addEventListener("click", () => go(li.dataset.go)); li.addEventListener("keydown", (e) => { if (e.key === "Enter") go(li.dataset.go); }); });
    const st = el.querySelector("[data-start]"); if (st) st.addEventListener("click", () => go(b.stages[0][4]));
    return el;
  }

  // Иллюстрации (inline SVG)
  function streetMap() {
    return `<figure class="street" aria-label="План улицы: кафе, дом Анны, пекарня; напротив кафе — аптека; метро рядом с парком">
      <svg viewBox="0 0 640 260" role="img">
        <rect x="0" y="118" width="640" height="34" fill="var(--sand)"/>
        <line x1="0" y1="135" x2="640" y2="135" stroke="var(--line)" stroke-dasharray="14 10" stroke-width="2"/>
        <text x="320" y="140" text-anchor="middle" class="sv-street">Rua das Flores</text>
        ${[["Café", 40, "var(--blush)"], ["Anna's building", 220, "var(--rust)"], ["Bakery", 400, "var(--blush)"]].map(([t, x, c]) => `
          <g><rect x="${x}" y="20" width="160" height="88" rx="10" fill="${c}" opacity="${c.includes("rust") ? 1 : 0.85}"/>
          <text x="${x + 80}" y="70" text-anchor="middle" class="sv-label ${c.includes("rust") ? "inv" : ""}">${t}</text></g>`).join("")}
        <g><rect x="40" y="162" width="160" height="80" rx="10" fill="var(--ink)" opacity=".9"/><text x="120" y="208" text-anchor="middle" class="sv-label inv">Pharmacy</text></g>
        <g><rect x="400" y="162" width="130" height="80" rx="10" fill="#8FA67A"/><text x="465" y="208" text-anchor="middle" class="sv-label inv">Park</text></g>
        <g><circle cx="588" cy="202" r="30" fill="var(--paper)" stroke="var(--ink)" stroke-width="3"/><text x="588" y="209" text-anchor="middle" class="sv-label">M</text></g>
      </svg>
    </figure>`;
  }
  function flatArt() {
    return `<svg viewBox="0 0 320 220" aria-hidden="true">
      <rect width="320" height="220" fill="var(--blush)"/>
      <circle cx="252" cy="54" r="26" fill="var(--paper)" opacity=".9"/>
      <rect x="60" y="56" width="150" height="164" fill="var(--paper)"/>
      <polygon points="50,60 135,18 220,60" fill="var(--rust)"/>
      ${[0, 1, 2].map((r) => [0, 1].map((c) => `<rect x="${82 + c * 62}" y="${78 + r * 44}" width="44" height="30" rx="4" fill="var(--sand)" stroke="var(--brown)" stroke-width="2"/>`).join("")).join("")}
      <rect x="76" y="160" width="118" height="8" fill="var(--brown)"/>
      <rect x="120" y="186" width="30" height="34" rx="3" fill="var(--brown)"/>
      <rect x="0" y="206" width="320" height="14" fill="var(--brown)" opacity=".35"/>
    </svg>`;
  }

  // ───────── отправка преподавателю
  function sendPanelHtml() {
    return `
      <section class="send card">
        <div>
          <p class="eyebrow">Готово?</p>
          <h2>Отправьте ответы ${esc(CFG.teacherName || "преподавателю")}</h2>
          <p class="muted">Автопроверка уже показала результат. Письменные ответы проверит преподаватель и вернёт обратную связь.</p>
        </div>
        <label>Комментарий или вопрос (по желанию)
          <textarea rows="2" id="sendNote" placeholder="Например: не поняла пункт 3"></textarea>
        </label>
        <div class="send-actions">
          <button type="button" class="btn primary" id="sendBtn">Отправить на проверку</button>
          <button type="button" class="btn ghost" id="copyBtn">Скопировать ответы</button>
        </div>
        <p class="sent-at muted" id="sentAt"></p>
      </section>`;
  }

  const TYPE_RU = { match: "сопоставление", choice: "выбор", tf: "true/false", builder: "сборка фраз", gap: "пропуски", order: "порядок", write: "письменно", voice: "голос", checklist: "чек-лист", sort: "сортировка", infogap: "info gap", form: "анкета", spinner: "колесо вопросов", rate: "самооценка" };

  // Строки для таблицы: одна строка = одно задание
  function rowsFor(w, d) {
    const rows = [];
    let n = 0;
    d.blocks.forEach((b) => {
      if (b.type === "heading") return;
      n++;
      if (!TYPE_RU[b.type]) return;
      const a = answers[b.id] || {};
      let answer = "";
      switch (b.type) {
        case "choice": answer = b.items.map((it, k) => `${k + 1}) ${a.sel && a.sel[k] !== undefined ? it[1][a.sel[k]] + (a.sel[k] === it[2] ? " ✓" : " ✗") : "—"}`).join("\n"); break;
        case "tf": answer = b.items.map((it, k) => `${k + 1}) ${a.sel && a.sel[k] !== undefined ? (a.sel[k] ? "True" : "False") + (a.sel[k] === it[1] ? " ✓" : " ✗") : "—"}`).join("\n"); break;
        case "match": answer = b.pairs.map((p, k) => `${p[0]} → ${(a.sel && a.sel[k]) || "—"}${a.sel && a.sel[k] === p[1] ? " ✓" : a.sel && a.sel[k] ? " ✗" : ""}`).join("\n"); break;
        case "gap": answer = b.items.map((it, k) => { const v = (a.val && a.val[k]) || ""; const ok = it[1].some((x) => norm(x) === norm(v)); return `${k + 1}) ${v || "—"}${v ? (ok ? " ✓" : " ✗") : ""}`; }).join("\n"); break;
        case "builder": answer = (a.text || []).map((t, k) => `${k + 1}) ${t || "—"}`).join("\n"); break;
        case "order": answer = (a.seq || []).map((k, pos) => `${pos + 1}) ${b.items[k]}${k === pos ? " ✓" : " ✗"}`).join("\n"); break;
        case "write": answer = (a.text || "").trim() || "— пусто —"; break;
        case "voice": answer = a.recorded ? "голосовое записано, отправлено отдельно" : "нет записи"; break;
        case "sort": answer = b.bins.map((bn, k) => `${bn}: ${b.items.filter((_, i) => a.place && a.place[i] === k).map((it) => it[0] + (it[1] === k ? " ✓" : " ✗")).join(", ") || "—"}`).join("\n"); break;
        case "infogap": { const side = igSide(b); const v = side && a.vals ? a.vals[side.partner] || {} : {}; answer = side ? `Банк партнёрши: ${b.banks[side.partner].name}\n` + b.fields.map((f, i) => `${f}: ${v[i] || "—"}`).join("\n") + `\nВыбор: ${a.decision || "—"}` : "— имя не выбрано —"; break; }
        case "form": answer = b.fields.map((f, i) => `${f}: ${(a.vals && a.vals[i]) || "—"}`).join("\n"); break;
        case "spinner": answer = (a.list || []).map((x, i) => `${i + 1}) ${x.sit} → ${x.q}`).join("\n") || "—"; break;
        case "rate": { const lv = b.levels || ["not yet", "almost", "confident"]; answer = b.items.map((it, i) => `${it}: ${a.rate && a.rate[i] !== undefined ? lv[a.rate[i]] : "—"}`).join("\n"); break; }
        case "checklist": { const items = b.fromCanDo ? w.canDo : b.items; answer = items.map((it, k) => `${a.checks && a.checks[k] ? "✅" : "▫️"} ${it}`).join("\n"); break; }
      }
      rows.push({ n, task: `${n}. ${b.title}`, type: TYPE_RU[b.type], answer, score: autoTypes.has(b.type) ? (a.checked ? (a.firstScore ? `${a.firstScore} (потом открыла ответы)` : a.score) : "не проверено") : "" });
    });
    return rows;
  }

  function report(w, d, note) {
    const lines = [`Prime English A2 · ${w.code} ${w.title} · ${stepLine(w, d)} · ${d.label}`, `Ученица: ${student() || "—"}`, ""];
    rowsFor(w, d).forEach((r) => lines.push(`${r.task}${r.score ? " — " + r.score : ""}`, r.answer, ""));
    if (note) lines.push(`Комментарий: ${note}`);
    return lines.join("\n");
  }

  function wireSend(el, w, d) {
    const key = `sent_${w.id}_${d.slug}`;
    const stamp = el.querySelector("#sentAt");
    const prevSent = store.get(key, "");
    if (prevSent) stamp.textContent = `Последняя отправка: ${prevSent}`;
    const note = () => el.querySelector("#sendNote").value.trim();

    el.querySelector("#copyBtn").addEventListener("click", async () => {
      const text = report(w, d, note());
      try { await navigator.clipboard.writeText(text); toast("Ответы скопированы — вставьте в чат"); }
      catch { prompt("Скопируйте текст:", text); }
    });

    el.querySelector("#sendBtn").addEventListener("click", async () => {
      if (!student()) { toast("Выберите своё имя вверху страницы"); el.querySelector(".namebar").scrollIntoView({ behavior: "smooth", block: "center" }); el.querySelector(".namebar").classList.add("flash"); return; }
      const text = report(w, d, note());
      const mark = () => { const t = new Date().toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }); store.set(key, t); stamp.textContent = `Последняя отправка: ${t}`; };
      if (CFG.submitUrl) {
        const btn = el.querySelector("#sendBtn"); btn.disabled = true; btn.textContent = "Отправляю…";
        const payload = JSON.stringify({ student: student(), week: `${w.code} · ${w.title}`, day: `${stepLine(w, d)} · ${d.label}`, comment: note(), rows: rowsFor(w, d) });
        const done = (msg) => { mark(); btn.disabled = false; btn.textContent = "Отправить ещё раз"; toast(msg); };
        try {
          // Простой POST (text/plain) — Apps Script отвечает JSON, и мы видим, что строки записались
          const res = await fetch(CFG.submitUrl, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: payload });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.ok) return done(`Отправлено! ✨ Записано заданий: ${data.rows}`);
          throw new Error(data.error || "HTTP " + res.status);
        } catch (err) {
          console.warn("Отправка не подтверждена:", err);
          try { await navigator.clipboard.writeText(report(w, d, note())); } catch { /* ignore */ }
          btn.disabled = false; btn.textContent = "Отправить ещё раз";
          stamp.textContent = "Не удалось отправить. Ответы скопированы — вставьте их в чат с преподавателем.";
          toast("Не получилось отправить — ответы скопированы, вставьте их в чат 🙏");
          return;
        }
      }
      if (CFG.telegramUsername) {
        try { await navigator.clipboard.writeText(text); } catch { /* ignore */ }
        window.open(`https://t.me/${encodeURIComponent(CFG.telegramUsername)}`, "_blank", "noopener");
        mark(); return toast("Ответы скопированы — вставьте их в чат Telegram");
      }
      if (CFG.teacherEmail) {
        location.href = `mailto:${CFG.teacherEmail}?subject=${encodeURIComponent(`${w.code} · ${stepName(d)} · ${student()}`)}&body=${encodeURIComponent(text)}`;
        mark(); return;
      }
      window.open(`https://t.me/share/url?url=${encodeURIComponent(" ")}&text=${encodeURIComponent(text)}`, "_blank", "noopener");
      mark(); toast("Выберите чат с преподавателем в Telegram");
    });
  }

  // ───────── шапка
  document.getElementById("miroTop").href = CFG.miroBoard || "#";
  const navWeek = document.querySelector('[data-nav="week"]'); if (navWeek) navWeek.href = `#/week/${CURRENT}`;
  const zt = document.getElementById("zoomTop"); if (CFG.zoomLink) zt.href = CFG.zoomLink; else zt.remove();
  document.getElementById("footTeacher").textContent = `преподаватель ${CFG.teacherName || ""}`;

  // озвучка объявления
  document.addEventListener("click", (e) => {
    const t = e.target.closest(".advert [data-say]");
    if (t) speak(t.closest(".advert").querySelector(".ad-text").textContent);
  });

  window.addEventListener("hashchange", route);
  route();
})();
