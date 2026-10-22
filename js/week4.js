// Week 4 · Review & Shadowing — повторение Present Simple / Present Continuous + shadowing.
window.PE_WEEKS = window.PE_WEEKS || {};

(function () {
  const W = window.PE_WEEKS;
  const stars = (n) => (W[n] && W[n].vocab ? W[n].vocab.flatMap((g) => g.items.filter((x) => x[3])) : []);

  W[4] = {
    id: 4,
    code: "W4",
    title: "Review & Shadowing",
    subtitle: "Повторяем Simple и Continuous, говорим вслух",
    dates: "26–30 октября",
    from: "Week 1–3",
    to: "Confidence",
    story:
      "Новой темы нет. Анна живёт в Лиссабоне уже месяц: у неё появился свой распорядок, а жизнь всё ещё меняется. На этой неделе мы собираем всё, что прошли, доводим Present Simple и Present Continuous до автоматизма и учимся говорить вслух с помощью shadowing.",
    canDo: [
      "I can talk about my routine with Present Simple: I usually…, She doesn't…",
      "I can talk about now and this week with Present Continuous: I'm staying…, She isn't working…",
      "I can ask questions and give short answers: Do you…? — Yes, I do. Are you…? — No, I'm not.",
      "I can choose: timetable (Simple) or my plans (Continuous).",
      "I can shadow a short dialogue and record myself.",
    ],
    grammar: [
      { t: "Present Simple: +, −, ?", s: "MyGrammarLab · Units 37–38 · стр. 90–93" },
      { t: "Present Continuous: +, −, ?", s: "MyGrammarLab · Units 39–40 · стр. 94–97" },
      { t: "Simple или Continuous?", s: "MyGrammarLab · Unit 41 · стр. 98–99" },
      { t: "Расписание и планы", s: "MyGrammarLab · Unit 59 · стр. 146–147" },
      { t: "Повторение модуля", s: "MyGrammarLab · Module 5 Review & Test · стр. 103–106" },
    ],
    vocab: [
      { group: "⭐ Фразы Week 2 · Touchdown", items: stars(2) },
      { group: "⭐ Фразы Week 3 · Home Hunt", items: stars(3) },
      {
        group: "Маркеры времени",
        items: [
          ["always / usually / often", "всегда / обычно / часто", "I usually check emails at 9."],
          ["sometimes / never", "иногда / никогда", "I never work on Sundays."],
          ["every day / every week", "каждый день / каждую неделю", "She goes to the gym every week."],
          ["now / right now", "сейчас / прямо сейчас", "I'm writing a report right now."],
          ["at the moment", "в данный момент", "He's in a meeting at the moment."],
          ["this week / this month", "на этой неделе / в этом месяце", "This month I'm working from home."],
          ["these days", "в последнее время", "These days I'm learning Portuguese."],
          ["on Friday / tomorrow at 5", "в пятницу / завтра в 5", "I'm meeting HR tomorrow at 5."],
        ],
      },
    ],
    days: [
      // ───────────────────────── MON · Present Simple
      {
        slug: "mon",
        day: "Пн",
        date: "26.10",
        label: "Simple Gym",
        title: "My new routine",
        where: "Сайт + MyGrammarLab · 30 минут",
        deadline: "до вторника, 10:00",
        goal: "Довести Present Simple до автоматизма: окончание -s, do / does, вопросы и короткие ответы.",
        blocks: [
          {
            type: "rule", id: "w4-mon-rule", title: "Rule recap · Present Simple",
            source: "MyGrammarLab · Units 37–38 · стр. 90–93",
            table: {
              head: ["", "I / you / we / they", "he / she / it"],
              rows: [
                ["+", "I <b>work</b> in finance.", "She <b>works</b> in marketing."],
                ["−", "I <b>don't work</b> on Sundays.", "She <b>doesn't work</b> on Sundays."],
                ["?", "<b>Do</b> you <b>work</b> from home?<br><span class='muted'>Yes, I do. / No, I don't.</span>", "<b>Does</b> she <b>work</b> from home?<br><span class='muted'>Yes, she does. / No, she doesn't.</span>"],
              ],
            },
            tips: [
              "Когда: привычки, распорядок, факты, расписание.",
              "После <b>doesn't</b> и <b>does</b> глагол без -s: <s>She doesn't works</s> → <i>She doesn't work.</i>",
              "Наречия частоты — перед глаголом, но после <b>be</b>: <i>I usually walk. I'm usually late.</i>",
            ],
          },
          {
            type: "choice", id: "w4-mon-s", title: "-s, -es или -ies?",
            task: "Выберите правильную форму для he / she / it.",
            items: [
              ["Anna ___ to work by metro.", ["gos", "goes", "go"], 1],
              ["Her boss ___ emails all day.", ["watchs", "watches", "watch"], 1],
              ["Rui ___ to answer quickly.", ["trys", "tries", "try"], 1],
              ["The office ___ at 9.", ["opens", "opennes", "open"], 0],
              ["She ___ her bag every morning.", ["carrys", "carries", "carry"], 1],
              ["He ___ the dishes after dinner.", ["washes", "washs", "wash"], 0],
            ],
          },
          {
            type: "gap", id: "w4-mon-anna", title: "Anna's routine in Lisbon",
            task: "Впишите глагол в Present Simple.",
            items: [
              ["Anna ___ (get up) at 7 every day.", ["gets up"]],
              ["She ___ (not / drive) to work.", ["doesn't drive", "does not drive"]],
              ["She usually ___ (take) the metro.", ["takes"]],
              ["Her colleagues ___ (have) lunch at one.", ["have"]],
              ["Anna ___ (not / eat) meat.", ["doesn't eat", "does not eat"]],
              ["___ she speak Portuguese? — Not yet!", ["Does"]],
              ["The bank ___ (close) at 4 on Fridays.", ["closes"]],
              ["We never ___ (work) at the weekend.", ["work"]],
            ],
          },
          {
            type: "choice", id: "w4-mon-dodoes", title: "Do or Does?",
            task: "Выберите слово для вопроса.",
            items: [
              ["___ you work in an office?", ["Do", "Does"], 0],
              ["___ your company have an office in Lisbon?", ["Do", "Does"], 1],
              ["Where ___ Tatiana live?", ["do", "does"], 1],
              ["What time ___ the shops open?", ["do", "does"], 0],
              ["___ Faina travel for work?", ["Do", "Does"], 1],
              ["How often ___ you call your family?", ["do", "does"], 0],
            ],
          },
          {
            type: "builder", id: "w4-mon-build", title: "Questions & short answers",
            task: "Соберите вопрос и короткий ответ.",
            items: [
              "Do you usually work from home? No, I don't.",
              "Does your manager speak Russian? No, she doesn't.",
              "Does the agency open on Saturdays? Yes, it does.",
              "What time do you start work? At nine.",
              "How often does Anna go to the gym? Twice a week.",
            ],
          },
          {
            type: "gap", id: "w4-mon-freq", title: "Where does it go?",
            task: "Перепишите предложение с наречием в скобках — впишите всё предложение.",
            items: [
              ["I check my emails at 8. (always) → ___", ["I always check my emails at 8.", "I always check my emails at 8"]],
              ["She is late. (never) → ___", ["She is never late.", "She's never late.", "She is never late", "She's never late"]],
              ["We have meetings on Mondays. (usually) → ___", ["We usually have meetings on Mondays.", "We usually have meetings on Mondays"]],
              ["He is tired after work. (often) → ___", ["He is often tired after work.", "He's often tired after work.", "He is often tired after work", "He's often tired after work"]],
            ],
          },
          {
            type: "write", id: "w4-mon-write", title: "My routine",
            task: "Опишите свой обычный рабочий день: 5–6 предложений. Используйте usually, often, never и одно отрицание.",
            example: "I usually get up at 7. I don't have breakfast at home — I buy coffee near the office. I start work at 9 and I often have meetings in the morning. I never work late on Fridays.",
            minWords: 35, big: true,
          },
          {
            type: "checklist", id: "w4-mon-book", title: "MyGrammarLab · в тетрадь",
            task: "Если что-то из этого не сделано раньше — сделайте сейчас.",
            items: [
              "Unit 37 · стр. 91 · упражнения 2–3",
              "Unit 38 · стр. 93 · упражнения 1–2",
              "Выписать в тетрадь 5 своих ошибок из прошлых недель и исправить их",
            ],
          },
        ],
      },

      // ───────────────────────── TUE · Present Continuous
      {
        slug: "tue",
        day: "Вт",
        date: "27.10",
        label: "Continuous Gym",
        title: "Life is changing",
        where: "Сайт + MyGrammarLab · 30 минут",
        deadline: "до среды, 10:00",
        goal: "Довести Present Continuous до автоматизма: am / is / are + -ing, вопросы, короткие ответы и «временно».",
        blocks: [
          {
            type: "rule", id: "w4-tue-rule", title: "Rule recap · Present Continuous",
            source: "MyGrammarLab · Units 39–40 · стр. 94–97",
            table: {
              head: ["", "Форма", "Пример"],
              rows: [
                ["+", "am / is / are + -ing", "I'm staying in a hotel. They're looking for a flat."],
                ["−", "am not / isn't / aren't + -ing", "She isn't working today."],
                ["?", "Am / Is / Are + кто + -ing?", "Are you waiting for Rui? — <span class='muted'>Yes, I am. / No, I'm not.</span>"],
              ],
            },
            tips: [
              "Когда: прямо сейчас, временно (this week, these days), договорённости (I'm meeting HR on Friday).",
              "Орфография: make → making, sit → sitting, lie → lying.",
              "После Yes не сокращаем: <s>Yes, I'm</s> → <i>Yes, I am.</i>",
              "Не ставим в -ing: like, love, want, need, know, understand.",
            ],
          },
          {
            type: "choice", id: "w4-tue-ing", title: "Spelling -ing",
            task: "Выберите правильное написание.",
            items: [
              ["make → ___", ["makeing", "making"], 1],
              ["sit → ___", ["siting", "sitting"], 1],
              ["wait → ___", ["waitting", "waiting"], 1],
              ["move → ___", ["moving", "moveing"], 0],
              ["plan → ___", ["planing", "planning"], 1],
              ["lie → ___", ["lying", "lieing"], 0],
            ],
          },
          {
            type: "gap", id: "w4-tue-now", title: "What's happening now?",
            task: "Сейчас вторник, 11 утра. Впишите глагол в Present Continuous.",
            items: [
              ["Anna ___ (talk) to her new landlord.", ["is talking", "'s talking"]],
              ["Her colleagues ___ (have) a meeting.", ["are having", "'re having"]],
              ["Rui ___ (not / work) today — he's ill.", ["isn't working", "is not working", "'s not working"]],
              ["I ___ (write) this sentence right now.", ["'m writing", "am writing"]],
              ["___ you listening to music? — No, I'm not.", ["Are"]],
              ["We ___ (not / use) the car this week.", ["aren't using", "are not using", "'re not using"]],
            ],
          },
          {
            type: "builder", id: "w4-tue-build", title: "Questions & short answers",
            task: "Соберите вопрос и короткий ответ.",
            items: [
              "Are you staying in a hotel? Yes, I am.",
              "Is Anna working today? No, she isn't.",
              "Are they looking for a flat? Yes, they are.",
              "What are you doing this weekend? I'm visiting friends.",
              "Where is she living at the moment? In Alfama.",
            ],
          },
          {
            type: "choice", id: "w4-tue-short", title: "Short answers",
            task: "Выберите правильный короткий ответ.",
            items: [
              ["Is she sleeping?", ["Yes, she's.", "Yes, she is.", "Yes, she sleeping."], 1],
              ["Are you working from home?", ["No, I'm not.", "No, I don't.", "No, I amn't."], 0],
              ["Are the children watching TV?", ["Yes, they're.", "Yes, they do.", "Yes, they are."], 2],
              ["Is it raining?", ["No, it isn't.", "No, it doesn't.", "No, it's not raining yes."], 0],
            ],
          },
          {
            type: "write", id: "w4-tue-write", title: "These days…",
            task: "Что в вашей жизни меняется сейчас? 5 предложений с this week / this month / these days. Одно — отрицание.",
            example: "This month I'm preparing for the move. I'm learning English three times a week. These days I'm reading a lot about Lisbon. I'm not working on Fridays this month. My husband is looking for a school for our son.",
            minWords: 30, big: true,
          },
          {
            type: "checklist", id: "w4-tue-book", title: "MyGrammarLab · в тетрадь",
            task: "Отметьте, что сделали.",
            items: [
              "Unit 39 · стр. 95 · упражнения 1–3",
              "Unit 40 · стр. 97 · упражнения 2–3",
            ],
          },
        ],
      },

      // ───────────────────────── WED · Shadowing
      {
        slug: "wed",
        day: "Ср",
        date: "28.10",
        label: "Shadowing Day",
        title: "Listen. Repeat. Record.",
        where: "Голос · 20–25 минут",
        deadline: "до четверга, 09:00",
        goal: "Научиться технике shadowing: повторять за диктором с той же скоростью и интонацией.",
        blocks: [
          {
            type: "rule", id: "w4-wed-how", title: "Что такое shadowing и как его делать",
            table: {
              head: ["", "Шаг", "Что делать"],
              rows: [
                ["1", "Listen", "Послушайте фразу 1–2 раза и прочитайте текст. Поймите смысл."],
                ["2", "Mumble", "Повторяйте шёпотом вместе с диктором, следите за ритмом."],
                ["3", "Shadow", "Говорите вслух одновременно с диктором или сразу после него, копируйте интонацию и паузы."],
                ["4", "Record", "Запишите себя и сравните с оригиналом: где быстрее, где другое ударение?"],
              ],
            },
            tips: [
              "5–10 минут каждый день лучше, чем час раз в неделю.",
              "Начинайте с коротких фраз. Скорость можно снизить в плеере YouTube (⚙ → 0.75).",
              "Не гонитесь за идеальным произношением: главное — ритм, ударения и связность.",
            ],
          },
          {
            type: "listen", id: "w4-wed-set1", title: "Set 1 · Simple: my routine",
            task: "Нажимайте ▶ у каждой фразы и повторяйте сразу за диктором. 3 круга: с текстом, шёпотом, вслух.",
            lines: [
              "I work for an international company.",
              "I usually start work at nine.",
              "I don't drive to work. I take the metro.",
              "Do you work from home? — No, I don't.",
              "What time does the office open?",
            ],
          },
          {
            type: "listen", id: "w4-wed-set2", title: "Set 2 · Continuous: life right now",
            task: "Та же техника. Обратите внимание на слабое «are»: What are you → [wɒtə jə].",
            lines: [
              "I'm staying in a hotel at the moment.",
              "We're looking for a flat near the office.",
              "What are you doing this weekend?",
              "I'm meeting the agent on Friday.",
              "Are you travelling alone? — Yes, I am.",
            ],
          },
          {
            type: "listen", id: "w4-wed-set3", title: "Set 3 · Mini-dialogue: a new colleague",
            task: "Сначала прослушайте весь диалог («Слушать всё»), потом повторяйте реплики по одной.",
            lines: [
              "Hi! Are you new here?",
              "Yes, I am. I'm Anna. I'm working in the marketing team.",
              "Nice to meet you! Where do you live?",
              "I'm staying in a hotel at the moment, but I'm looking for a flat.",
              "Do you like Lisbon?",
              "I love it! I usually walk to work along the river.",
            ],
          },
          {
            type: "voice", id: "w4-wed-rec1", title: "Запись 1 · Shadow the dialogue",
            task: "Запишите Set 3 целиком: прочитайте обе роли с той же скоростью и интонацией, что у диктора.",
          },
          {
            type: "voice", id: "w4-wed-rec2", title: "Запись 2 · Your version",
            task: "Теперь о себе (40–60 секунд): ответьте на вопросы из диалога своими словами.",
            prompt: "Are you new here? What are you doing these days? Where do you live? What do you usually do after work?",
            example: "Hi! I'm Tatiana. I work as an accountant. These days I'm preparing for the move, and I'm learning English. I live in Moscow at the moment. After work I usually go for a walk.",
          },
          {
            type: "links", id: "w4-wed-res", title: "Ресурсы для shadowing (A2)",
            task: "Выберите один ресурс и делайте 5–10 минут каждый день. Все — бесплатно, с текстом диалога.",
            items: [
              ["VOA · Let's Learn English, Lesson 7: What Are You Doing?", "https://learningenglish.voanews.com/a/lets-learn-english-lesson-7-what-are-you-doing/3240468.html", "Короткие сцены про Анну, которая переехала в Вашингтон — прямо как наша Анна. Present Continuous, медленная речь, есть транскрипт и разделы Speaking и Pronunciation. Если видео не грузится, найдите урок на YouTube-канале VOA Learning English.", "Continuous"],
              ["VOA · Lesson 8: Are You Busy?", "https://learningenglish.voanews.com/a/lets-learn-english-lesson-8-are-you-busy/3253185.html", "Продолжение истории: вопросы и короткие ответы в Continuous.", "Continuous"],
              ["VOA · Lesson 2: Hello, I'm Anna!", "https://learningenglish.voanews.com/a/lets-learn-english-lesson-2-hello/3113733.html", "Анна знакомится с коллегами на новом месте: Present Simple, фразы знакомства.", "Simple"],
              ["ELLLO · A2-03 Present Continuous", "https://elllo.org/book/A2/A2-03-Present-Continuous.html", "Четыре коротких живых диалога с аудио и скриптом (вкладка Script). Хорошо для shadowing по одной реплике.", "Continuous"],
              ["ELLLO · A2-01 Present Simple", "https://elllo.org/book/A2/A2-01-Present-Simple.html", "Живые носители рассказывают о работе и привычках. Аудио + скрипт.", "Simple"],
              ["British Council · A morning briefing", "https://learnenglish.britishcouncil.org/free-resources/listening/a2/morning-briefing", "Рабочая планёрка: распорядок и планы на день. Аудио, транскрипт и задания.", "Work"],
              ["British Council · Changing a meeting time", "https://learnenglish.britishcouncil.org/free-resources/listening/a2/changing-meeting-time", "Коллеги переносят встречу — полезные фразы для договорённостей. Аудио + транскрипт.", "Work"],
              ["British Council · Who's who in the office", "https://learnenglish.britishcouncil.org/free-resources/listening/a2/whos-who-office", "Знакомство с офисом: кто чем занимается. Present Simple в рабочем контексте.", "Work"],
            ],
          },
          {
            type: "checklist", id: "w4-wed-check", title: "Проверьте себя",
            task: "За каждый пункт — звезда ⭐",
            items: [
              "Я прошла 3 круга по каждому сету",
              "Я записала диалог и переслушала себя",
              "Я выбрала ресурс и сделала 5 минут shadowing",
              "Я заметила 1–2 слова, которые произношу иначе, чем диктор",
            ],
          },
        ],
      },

      // ───────────────────────── THU · Live lesson
      {
        slug: "thu",
        day: "Чт",
        date: "29.10",
        label: "Live Lesson",
        title: "Review Studio",
        where: "Zoom + Miro · 10:00–11:30",
        deadline: "до урока и после него",
        live: true,
        goal: "Свободно переключаться между Simple и Continuous в живой речи.",
        blocks: [
          {
            type: "lesson", id: "w4-thu-map", title: "Карта урока",
            stages: [
              ["01", "Check-in", "Одна новость недели: This week I'm…", 5],
              ["02", "Shadowing warm-up", "Хором и по ролям: диалог Set 3", 8],
              ["03", "Grammar auction", "«Покупаем» правильные предложения", 12],
              ["04", "Usually vs this week", "Карточки: обычно я… / на этой неделе я…", 12],
              ["05", "Find someone who…", "Вопросы Do you…? / Are you…? по кругу", 13],
              ["06", "Picture story", "Что делают люди на фото и что они делают обычно", 12],
              ["07", "Diary clash", "Договариваемся о встрече по ежедневникам", 13],
              ["08", "Mistake Wall", "Исправляем фразы урока вместе", 10],
              ["09", "Next stop", "Can-do и анонс пятницы", 5],
            ],
          },
          { type: "heading", id: "w4-thu-before", title: "До урока · 10 минут" },
          {
            type: "write", id: "w4-thu-diary", title: "My diary for next week",
            task: "Запишите 4 реальных дела на следующую неделю (день + время). Они понадобятся в игре Diary clash.",
            example: "Mon 9:00 — meeting with the CFO\nTue 18:00 — gym\nWed 14:00 — call with the bank\nFri — flying to Kazan",
            minWords: 12,
          },
          { type: "heading", id: "w4-thu-after", title: "После урока · 5 минут" },
          {
            type: "write", id: "w4-thu-after-note", title: "My best sentence today",
            task: "Запишите одну фразу с урока, которой вы гордитесь, и одну ошибку, которую больше не сделаете.",
            minWords: 8,
          },
        ],
      },

      // ───────────────────────── FRI · Mixed review
      {
        slug: "fri",
        day: "Пт",
        date: "30.10",
        label: "Polish & Write",
        title: "One month in Lisbon",
        where: "Сайт · 30 минут",
        deadline: "до воскресенья, 20:00",
        goal: "Проверить себя на смешанных заданиях и написать письмо о первом месяце.",
        blocks: [
          {
            type: "choice", id: "w4-fri-mix", title: "Simple or Continuous?",
            source: "По MyGrammarLab · Unit 41 · стр. 98–99",
            task: "Выберите правильную форму.",
            items: [
              ["Anna ___ in marketing.", ["works", "is working"], 0],
              ["This month she ___ from the hotel.", ["works", "is working"], 1],
              ["Shh! Rui ___ on the phone.", ["talks", "is talking"], 1],
              ["I ___ what you mean.", ["understand", "'m understanding"], 0],
              ["We usually ___ lunch at one.", ["have", "are having"], 0],
              ["Look! It ___ again.", ["rains", "is raining"], 1],
              ["She ___ coffee — she prefers tea.", ["doesn't like", "isn't liking"], 0],
              ["These days I ___ a lot about Portugal.", ["read", "'m reading"], 1],
            ],
          },
          {
            type: "choice", id: "w4-fri-future", title: "Timetable or my plan?",
            source: "По MyGrammarLab · Unit 59 · стр. 146",
            task: "Расписание — Simple, договорённость — Continuous.",
            items: [
              ["The train to Porto ___ at 7:15.", ["leaves", "is leaving"], 0],
              ["I ___ the landlord on Monday at 6.", ["meet", "'m meeting"], 1],
              ["The bank ___ at 9:30 on weekdays.", ["opens", "is opening"], 0],
              ["Sorry, I can't come on Friday. I ___ to Kazan.", ["fly", "'m flying"], 1],
              ["What time ___ the film start?", ["does", "is"], 0],
              ["___ anything this weekend?", ["Do you do", "Are you doing"], 1],
            ],
          },
          {
            type: "gap", id: "w4-fri-fix", title: "Fix the mistake",
            task: "В каждом предложении одна ошибка. Напишите правильную часть.",
            items: [
              ["She work in a bank. → She ___ in a bank.", ["works"]],
              ["Does he lives in Lisbon? → Does he ___ in Lisbon?", ["live"]],
              ["I am agree with you. → I ___ with you.", ["agree"]],
              ["Are you knowing the answer? → ___ you know the answer?", ["Do"]],
              ["He working from home today. → He ___ from home today.", ["is working", "'s working"]],
              ["— Is she ready? — Yes, she's. → Yes, ___.", ["she is"]],
              ["I meet my boss tomorrow at 10. → I ___ my boss tomorrow at 10.", ["'m meeting", "am meeting"]],
            ],
          },
          {
            type: "write", id: "w4-fri-letter", title: "Letter home · One month in Lisbon",
            task: "Вы — Анна (или вы сами после переезда). Напишите письмо подруге 70–90 слов: 3 предложения про обычную жизнь (Simple), 3 — что происходит сейчас (Continuous), 1 — план на следующую неделю.",
            example: "Hi Lena!\nI'm in Lisbon now and I love it. I usually get up at 7 and walk to the office. I work with a great team and we often have lunch together. At the moment I'm staying in a small flat in Alfama, and I'm looking for something bigger. I'm also learning Portuguese! Next Saturday I'm visiting Sintra with my colleagues.\nMiss you!\nAnna",
            minWords: 70, big: true,
          },
          { type: "checklist", id: "w4-fri-cando", title: "Can-do · месяц 1", task: "Отметьте, что у вас уже получается.", fromCanDo: true },
          {
            type: "write", id: "w4-fri-reflect", title: "Reflection",
            task: "Можно по-русски.",
            prompt: "1) Что после месяца занятий получается легче? 2) Где вы ещё путаете Simple и Continuous? 3) Понравился ли shadowing — будете продолжать?",
            minWords: 10,
          },
        ],
      },
    ],
  };
})();
