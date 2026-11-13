// Week 5 · Bank & Money — реальная ситуация: банк, карта, деньги. Ведущий навык — speaking.
// Новой грамматики нет: Do / Does / Can I / Could you / I'd like внутри темы.
window.PE_WEEKS = window.PE_WEEKS || {};

(function () {
  const W = window.PE_WEEKS;

  W[5] = {
    id: 5,
    code: "W5",
    title: "Bank & Money",
    subtitle: "Открываем счёт, решаем проблему с картой, понимаем цифры",
    dates: "16–20 ноября",
    from: "Без счёта",
    to: "Свой банк",
    story:
      "У Анны есть квартира и работа в Лиссабоне, но зарплату нужно куда-то получать. На этой неделе она открывает счёт в Banco Atlântico, разбирается с комиссиями, а в пятницу получает SMS: карта заблокирована. Ведущий навык недели — speaking: учимся спрашивать, уточнять и решать проблему по телефону.",
    canDo: [
      "I can open a bank account and ask what documents I need.",
      "I can ask about fees: How much does it cost? Is it free?",
      "I can understand and say numbers, prices, dates and phone numbers.",
      "I can report a problem with my card on the phone.",
      "I can ask someone to repeat or speak more slowly.",
    ],
    grammar: [
      { t: "Вопросы Do / Does: Do I need…? Does it cost…?", s: "Повторение · MyGrammarLab · Unit 38 · стр. 92–93" },
      { t: "Просьбы: Can I…? / Could you…?", s: "Готовые фразы, без новой грамматики" },
      { t: "I'd like to… — вежливое желание", s: "Готовая фраза" },
      { t: "Числа, деньги, даты, телефоны", s: "Navigator недели · вторник" },
    ],
    vocab: [
      {
        group: "At the bank",
        items: [
          ["open an account", "открыть счёт", "I'd like to open an account.", true],
          ["current account", "текущий счёт", "I need a current account for my salary."],
          ["savings account", "сберегательный счёт", "Do you have a savings account?"],
          ["proof of address", "подтверждение адреса", "Here's my rental contract as proof of address.", true],
          ["ID / passport", "удостоверение / паспорт", "Can I see your passport, please?"],
          ["NIF (tax number)", "налоговый номер в Португалии", "You need a NIF to open an account in Portugal."],
          ["form", "анкета, бланк", "Please fill in this form."],
          ["fill in", "заполнить", "Can you fill in the form, please?", true],
          ["sign", "подписать", "Sign here, please."],
          ["bank clerk", "сотрудник банка", "The bank clerk was very helpful."],
        ],
      },
      {
        group: "Cards & payments",
        items: [
          ["bank card / debit card", "банковская / дебетовая карта", "Your new debit card arrives in five days."],
          ["PIN", "пин-код", "Never tell anyone your PIN."],
          ["cash machine (ATM)", "банкомат", "Is there a cash machine near here?"],
          ["take out money", "снять деньги", "I take out money once a week."],
          ["pay by card / in cash", "платить картой / наличными", "Can I pay by card?", true],
          ["transfer", "перевод; переводить", "I'd like to transfer 500 euros.", true],
          ["fee", "комиссия, плата", "Is there a monthly fee?", true],
          ["balance", "остаток на счёте", "I want to check my balance."],
          ["statement", "выписка", "Can I get a statement for October?"],
          ["block a card", "заблокировать карту", "My card is blocked.", true],
          ["lost / stolen", "потерянный / украденный", "I think my card is stolen."],
          ["online banking / app", "онлайн-банк / приложение", "I usually pay my bills in the app."],
        ],
      },
      {
        group: "Polite phrases",
        items: [
          ["Could you repeat that, please?", "Не могли бы вы повторить?", "", true],
          ["Could you speak more slowly, please?", "Не могли бы вы говорить медленнее?", "", true],
          ["How much does it cost?", "Сколько это стоит?", "How much does a new card cost?"],
          ["Is it free?", "Это бесплатно?", "Is the app free?"],
          ["What documents do I need?", "Какие документы нужны?", "", true],
          ["How long does it take?", "Сколько времени это займёт?", "How long does it take to get a card?"],
          ["I'm afraid…", "Боюсь, что… (мягко о проблеме)", "I'm afraid my card doesn't work."],
        ],
      },
    ],
    days: [
      // ───────────────────────── MON · Words & reading
      {
        slug: "mon",
        day: "Пн",
        date: "16.11",
        label: "Money Words",
        title: "Anna opens an account",
        where: "Сайт + видео · 50 минут",
        deadline: "до вторника, 10:00",
        goal: "Выучить слова темы, понять настоящее видео о банковском счёте, SMS от банка и таблицу комиссий.",
        blocks: [
          {
            type: "write", id: "w5-mon-warm", title: "Warm-up · You and your bank",
            task: "Ответьте на вопросы 3–4 предложениями.",
            prompt: "How do you usually pay — by card or in cash? Do you use a bank app? How often do you take out money?",
            example: "I usually pay by card. I use my bank app every day. I never take out money — I don't need cash.",
            minWords: 15,
          },
          { type: "vocabref", id: "w5-mon-words", title: "Bank & Money words", task: "Нажимайте ▶ и повторяйте вслух. Фразы со ⭐ нужны на уроке в четверг.", groups: [0, 1] },
          {
            type: "match", id: "w5-mon-match", title: "Match it",
            task: "Соедините слово с определением.",
            pairs: [
              ["proof of address", "a document that shows where you live"],
              ["fee", "money you pay for a bank service"],
              ["balance", "how much money is in your account"],
              ["PIN", "a secret number for your card"],
              ["statement", "a list of all payments for a month"],
              ["transfer", "sending money to another account"],
              ["cash machine", "a machine where you take out money"],
            ],
          },

          // ── Authentic video: Khan Academy · Opening a bank account (≈2.5 min)
          { type: "heading", id: "w5-mon-video-h", title: "Real English · видео из жизни · 20 минут" },
          {
            type: "rule", id: "w5-mon-video-how", title: "Как смотреть настоящее видео",
            task: "Это видео не для учеников: носитель говорит в обычном темпе. Понимать каждое слово не нужно — задания простые, и каждое просит найти что-то одно.",
            table: {
              head: ["", "Просмотр", "Что делаем"],
              rows: [
                ["1", "Gist", "Смотрим без субтитров и без паузы. Вопрос: о чём видео в целом?"],
                ["2", "Order", "Смотрим ещё раз и ставим темы видео по порядку. Можно пауза."],
                ["3", "Details", "Включаем субтитры (CC) и скорость 0.75 (⚙). Отвечаем True / False."],
              ],
            },
            tips: [
              "Не понимаете слово — пропускайте, смотрите на картинку и ищите знакомые: bank, account, fee, online.",
              "Видео американское: <b>checking account</b> = наш current account, <b>ATM</b> = cash machine.",
              "Перед просмотром сделайте два задания ниже — они настроят уши на тему.",
            ],
          },
          {
            type: "write", id: "w5-mon-video-predict", title: "Before you watch · Predict",
            task: "Как вы думаете, что нужно, чтобы открыть счёт? Напишите 3 вещи по-английски. После видео проверите себя.",
            example: "a passport\nproof of address\nsome money",
            minWords: 4,
          },
          {
            type: "match", id: "w5-mon-video-words", title: "Before you watch · Key words",
            task: "Эти слова прозвучат в видео. Соедините слово и значение.",
            pairs: [
              ["interest", "extra money the bank pays you"],
              ["checking account", "an account for everyday spending"],
              ["savings account", "an account to keep money and get interest"],
              ["branch", "a bank office in your town"],
              ["minimum balance", "the smallest amount you must keep in the account"],
              ["deposit", "money you put into your account"],
              ["ID", "a document with your photo and name"],
            ],
          },
          {
            type: "video", id: "w5-mon-video", title: "Watch · Opening a bank account",
            source: "Khan Academy · Sal Khan · ≈2,5 минуты · английский США",
            youtube: "UtM1hDlP62o",
            note: "Просмотр 1 — без субтитров. Просмотр 3 — включите CC и скорость 0.75 (⚙ в плеере).",
          },
          {
            type: "choice", id: "w5-mon-video-gist", title: "Watch 1 · Gist",
            task: "Первый просмотр без субтитров. Выберите ответ.",
            items: [
              ["The video is about…", ["how to choose and open a bank account", "how to get a loan", "how to send money abroad"], 0],
              ["The speaker talks to people who…", ["work in a bank", "want to open an account", "want to buy a house"], 1],
              ["The speaker's style is…", ["a dialogue in a bank", "one person explains, like a teacher", "a news report"], 1],
            ],
          },
          {
            type: "order", id: "w5-mon-video-order", title: "Watch 2 · Put the topics in order",
            task: "Второй просмотр. В каком порядке говорит Сэл? Поставьте темы стрелками.",
            items: [
              "Choosing a bank: compare interest",
              "Fees: what happens under the minimum balance",
              "Convenience: ATMs, branches and online banking",
              "Checking account or savings account?",
              "Opening the account: in person or online",
              "Documents and the first deposit",
            ],
          },
          {
            type: "tf", id: "w5-mon-video-tf", title: "Watch 3 · True or False?",
            task: "Третий просмотр — с субтитрами и на скорости 0.75. Отметьте T или F.",
            items: [
              ["Higher interest is usually better for you.", true, ""],
              ["If your balance is under the minimum, the bank can take a fee.", true, "A maintenance fee."],
              ["Savings accounts usually pay less interest than checking accounts.", false, "Savings accounts usually pay more interest."],
              ["A checking account is good for everyday spending.", true, ""],
              ["You can open an account only in a branch.", false, "In person or online."],
              ["You need ID and proof of address.", true, "And a Social Security number in the USA."],
              ["The first deposit is always big — 500 dollars or more.", false, "It can be as small as 5 dollars."],
            ],
          },
          {
            type: "match", id: "w5-mon-video-usuk", title: "After you watch · USA → Europe",
            task: "В видео американские слова. Найдите, как это называется в Европе и в Португалии.",
            pairs: [
              ["checking account", "current account"],
              ["ATM", "cash machine"],
              ["Social Security number", "NIF (tax number) in Portugal"],
              ["driver's license", "driving licence"],
              ["check", "cheque"],
            ],
          },
          {
            type: "write", id: "w5-mon-video-after", title: "After you watch · Me and my bank",
            task: "4–5 предложений: 1) Что из вашего Predict было в видео? 2) Какой совет из видео полезен вам в Лиссабоне? 3) Вам нужен checking account, savings account или оба — почему?",
            example: "In the video you need ID and proof of address — I wrote it too! The best tip for me: compare the fees. In Lisbon I need a current account for my salary. I think I need a savings account too, because I want to save money for a car.",
            minWords: 30, big: true,
          },

          { type: "heading", id: "w5-mon-bank-h", title: "Anna's bank · чтение" },
          {
            type: "gap", id: "w5-mon-fees", title: "Banco Atlântico · fees",
            task: "Посмотрите на таблицу комиссий и ответьте числом (например, 4.50).",
            board: {
              title: "Banco Atlântico · Current account",
              head: ["Service", "Price"],
              rows: [
                ["Monthly fee", "€4.50 (free if your salary comes to this account)"],
                ["First debit card", "Free"],
                ["New card (lost / stolen)", "€10"],
                ["Cash machine in Portugal", "Free"],
                ["Cash machine abroad", "€2.50"],
                ["Transfer in the EU", "Free"],
                ["Transfer outside the EU", "€15"],
              ],
            },
            items: [
              ["Anna's salary doesn't come to this account yet. The monthly fee is € ___.", ["4.50", "4,50"]],
              ["Anna loses her card. A new card costs € ___.", ["10"]],
              ["She takes out money in Lisbon. It costs € ___.", ["0", "0.00"]],
              ["She takes out money in Madrid twice. It costs € ___.", ["5", "5.00"]],
              ["She sends money to her mum in Russia. The fee is € ___.", ["15"]],
            ],
          },
          {
            type: "info", id: "w5-mon-sms", title: "A message from the bank",
            task: "Прочитайте SMS, которое Анна получила в пятницу вечером. Потом ответьте True или False.",
            message: {
              from: "Banco Atlântico · SMS · Fri 21:40",
              text: "Dear customer, your card ending 4521 is blocked for security reasons. Please call us on 21 345 67 89, Monday to Friday, 8:00 to 20:00. Do not reply to this message. We never ask for your PIN.",
            },
          },
          {
            type: "tf", id: "w5-mon-tf", title: "True or False?",
            task: "Отметьте T или F по тексту SMS.",
            items: [
              ["Anna's card is blocked.", true, ""],
              ["The card number ends in 4521.", true, ""],
              ["Anna can call the bank on Saturday.", false, "Only Monday to Friday."],
              ["Anna should reply to the SMS.", false, "Do not reply to this message."],
              ["The bank sometimes asks for your PIN.", false, "We never ask for your PIN."],
              ["Anna can call the bank at 7 pm on Monday.", true, "The phone line works from 8:00 to 20:00."],
            ],
          },
          {
            type: "checklist", id: "w5-mon-check", title: "Перед вторником",
            task: "Отметьте, что сделали.",
            items: [
              "Я прослушала все слова и повторила вслух",
              "Я выписала 5 фраз со ⭐ в тетрадь",
              "Я открыла словарь недели и прошла тренажёр",
            ],
          },
        ],
      },

      // ───────────────────────── TUE · Numbers & polite questions
      {
        slug: "tue",
        day: "Вт",
        date: "17.11",
        label: "Numbers & Requests",
        title: "Could you repeat that, please?",
        where: "Сайт · 30 минут",
        deadline: "до среды, 10:00",
        goal: "Понимать на слух цифры, суммы и даты; задавать вежливые вопросы в банке.",
        blocks: [
          {
            type: "rule", id: "w5-tue-numbers", title: "How to say numbers",
            table: {
              head: ["", "Пишем", "Говорим"],
              rows: [
                ["€", "€4.50", "four euros fifty"],
                ["€", "€1,250", "one thousand two hundred <b>and</b> fifty euros"],
                ["📅", "21 November", "the twenty-first <b>of</b> November"],
                ["☎", "21 345 67 89", "two one, three four five, six seven, eight nine — по одной цифре"],
                ["0", "in phone numbers", "<b>oh</b>: 0 4 2 → oh four two"],
                ["⏰", "8:30", "eight thirty / half past eight"],
              ],
            },
            tips: [
              "В английском запятая отделяет тысячи (1,250), а точка — копейки/центы (4.50).",
              "Не поняли цифру — переспросите: <i>Sorry, was that fifteen or fifty?</i>",
              "-teen и -ty различаются ударением: four<b>TEEN</b> — <b>FOR</b>ty.",
            ],
          },
          {
            type: "listen", id: "w5-tue-dict", title: "Listen to numbers",
            task: "Нажмите «Слушать всё» — 6 фраз с цифрами. Слушайте 2–3 раза и запишите цифры в задании ниже. «Показать текст» — только для самопроверки.",
            hideText: true,
            lines: [
              "The monthly fee is four euros fifty.",
              "The transfer is one thousand two hundred and fifty euros.",
              "Please call us on two one, three four five, six seven, eight nine.",
              "Your appointment is on the twenty-first of November.",
              "The bank opens at half past eight.",
              "Your new card costs fifteen euros, not fifty.",
            ],
          },
          {
            type: "gap", id: "w5-tue-dict-gap", title: "Write the numbers",
            task: "Запишите то, что услышали, цифрами.",
            items: [
              ["The monthly fee is € ___.", ["4.50", "4,50"]],
              ["The transfer is € ___.", ["1250", "1,250", "1 250"]],
              ["The last four numbers of the phone: ___", ["6789", "67 89"]],
              ["The appointment is on ___ November.", ["21", "21st"]],
              ["The bank opens at ___.", ["8:30", "8.30", "08:30"]],
              ["The new card costs € ___.", ["15"]],
            ],
          },
          {
            type: "choice", id: "w5-tue-choice", title: "Do, Does or Can?",
            task: "Выберите слово для вопроса.",
            items: [
              ["___ I open an account here?", ["Do", "Can"], 1],
              ["What documents ___ I need?", ["do", "does"], 0],
              ["How much ___ a new card cost?", ["do", "does"], 1],
              ["___ you repeat that, please?", ["Could", "Do"], 0],
              ["___ the app work in English?", ["Does", "Is"], 0],
              ["I ___ like to transfer some money.", ["'d", "do"], 0],
              ["___ there a cash machine near here?", ["Is", "Does"], 0],
            ],
          },
          {
            type: "builder", id: "w5-tue-build", title: "Polite questions",
            task: "Соберите вежливый вопрос или просьбу.",
            items: [
              "I'd like to open an account, please.",
              "What documents do I need?",
              "How much does a new card cost?",
              "Could you speak more slowly, please?",
              "How long does it take to get a card?",
            ],
          },
          {
            type: "order", id: "w5-tue-order", title: "At the bank · dialogue",
            task: "Поставьте реплики диалога Анны и сотрудника банка по порядку.",
            items: [
              "Clerk: Good morning. How can I help you?",
              "Anna: Hello. I'd like to open an account, please.",
              "Clerk: Of course. Can I see your passport and your NIF?",
              "Anna: Here you are. Do you need proof of address too?",
              "Clerk: Yes, please. A rental contract or a bill is fine.",
              "Anna: Here's my contract. Is there a monthly fee?",
              "Clerk: It's four fifty, but it's free if your salary comes here.",
              "Anna: Great. How long does it take to get a card?",
              "Clerk: About five days. Please fill in this form and sign here.",
            ],
          },
        ],
      },

      // ───────────────────────── WED · Shadowing
      {
        slug: "wed",
        day: "Ср",
        date: "18.11",
        label: "Shadowing Day",
        title: "Bank talk out loud",
        where: "Голос · 20–25 минут",
        deadline: "до четверга, 09:00",
        goal: "Довести банковские фразы до автоматизма через shadowing и записать свою версию диалога.",
        blocks: [
          {
            type: "listen", id: "w5-wed-set1", title: "Set 1 · Key phrases",
            task: "3 круга: с текстом → шёпотом → вслух вместе с диктором. Копируйте вежливую интонацию.",
            lines: [
              "I'd like to open an account, please.",
              "What documents do I need?",
              "Is there a monthly fee?",
              "Can I pay by card?",
              "Could you repeat that, please?",
              "Could you speak more slowly, please?",
            ],
          },
          {
            type: "listen", id: "w5-wed-set2", title: "Set 2 · Opening an account",
            task: "Сначала «Слушать всё», потом повторяйте по одной реплике. Это диалог из вторника.",
            lines: [
              "Good morning. How can I help you?",
              "Hello. I'd like to open an account, please.",
              "Of course. Can I see your passport and your NIF?",
              "Here you are. Do you need proof of address too?",
              "Yes, please. A rental contract or a bill is fine.",
              "Here's my contract. Is there a monthly fee?",
              "It's four fifty, but it's free if your salary comes here.",
            ],
          },
          {
            type: "listen", id: "w5-wed-set3", title: "Set 3 · On the phone: my card is blocked",
            task: "Телефонный звонок. Обратите внимание на ритм цифр: four five two one.",
            lines: [
              "Banco Atlântico, Marta speaking. How can I help?",
              "Hello. I'm afraid my card is blocked.",
              "I'm sorry to hear that. What's your name, please?",
              "Anna Petrova. The card number ends in four five two one.",
              "Thank you. Do you have your card with you?",
              "Yes, I do. I got a message last night.",
              "OK, I can unblock it now. Is there anything else?",
              "No, that's all. Thank you very much!",
            ],
          },
          {
            type: "voice", id: "w5-wed-rec1", title: "Запись 1 · Shadow the phone call",
            task: "Запишите Set 3 целиком: обе роли, в темпе диктора.",
          },
          {
            type: "voice", id: "w5-wed-rec2", title: "Запись 2 · Your call to the bank",
            task: "Теперь ваша версия (40–60 секунд): вы звоните в банк. Проблема — на выбор: карта заблокирована, карта потерялась или в приложении странный платёж.",
            prompt: "Say hello → explain the problem → give your name and the last 4 numbers of the card → ask one question (How long…? How much…?) → say thank you.",
            example: "Hello. I'm afraid I lost my card yesterday. My name is Faina Ivanova. The card number ends in 7 3 0 8. Can you block it, please? How much does a new card cost? … OK, thank you very much!",
          },
          {
            type: "links", id: "w5-wed-res", title: "Ресурсы недели",
            task: "Выберите один ресурс и занимайтесь 5–10 минут каждый день.",
            items: [
              ["ShadowingEnglish · Bank Conversation (A1–A2)", "https://shadowingenglish.com/practice/bank-conversation-real-life-english-conversation-for-beginners-a1-a2-level-Q3zeHig8mKM", "Диалог об открытии счёта: 17 фраз с текстом и режимом Shadowing — повторяете каждую фразу за диктором. Американский вариант: checking account = current account.", "Shadowing"],
              ["British Council · A2 Listening", "https://learnenglish.britishcouncil.org/free-resources/listening/a2", "Короткие бытовые и рабочие аудио с транскриптом и заданиями. Возьмите любое на этой неделе.", "Listening"],
              ["EL Civics · Banking lesson", "https://www.elcivics.com/esl-banking-lesson.html", "Простой текст о банковских услугах + кроссворд. Хорошо для повторения слов (американский вариант).", "Words"],
              ["LingoClip · English through songs", "https://lingoclip.app/en", "Английский через песни, как обсуждали на уроке. Для свободной практики и удовольствия.", "Songs"],
            ],
          },
          {
            type: "checklist", id: "w5-wed-check", title: "Проверьте себя",
            task: "За каждый пункт — звезда ⭐",
            items: [
              "Я прошла 3 круга по каждому сету",
              "Я записала телефонный звонок и переслушала себя",
              "Я записала свою версию звонка в банк",
              "Я сделала 5 минут shadowing по ресурсу недели",
            ],
          },
        ],
      },

      // ───────────────────────── THU · Live lesson
      {
        slug: "thu",
        day: "Чт",
        date: "19.11",
        label: "Live Lesson",
        title: "At the Bank · Role-play Studio",
        where: "Zoom + Miro · 10:00–11:30",
        deadline: "до урока и после него",
        live: true,
        goal: "Уверенно провести два банковских разговора: открыть счёт в отделении и решить проблему с картой по телефону.",
        blocks: [
          {
            type: "lesson", id: "w5-thu-map", title: "Карта урока",
            stages: [
              ["01", "Check-in", "Cash or card? Ваши привычки с деньгами", 5],
              ["02", "Shadowing warm-up", "Ключевые фразы и звонок из среды", 7],
              ["03", "Word sprint", "Слова недели на скорость в Miro", 8],
              ["04", "Numbers race", "Диктант цифр: суммы, даты, телефоны", 8],
              ["05", "Info gap", "Какие документы нужны? У каждой — половина информации", 12],
              ["06", "Role-play 1", "Открываем счёт в отделении", 15],
              ["07", "Role-play 2", "Звонок: карта заблокирована + сюрпризы от банка", 15],
              ["08", "Mistake Wall", "Исправляем фразы урока вместе", 10],
              ["09", "Next stop", "Can-do и задания на пятницу", 5],
            ],
          },
          { type: "heading", id: "w5-thu-before", title: "До урока · 10 минут" },
          {
            type: "write", id: "w5-thu-prep", title: "My bank questions",
            task: "Напишите 4 вопроса, которые вы реально зададите в банке после переезда. Они понадобятся в ролевой игре.",
            example: "What documents do I need?\nIs there a monthly fee?\nCan I use the app in English?\nHow long does it take to get a card?",
            minWords: 12,
          },
          { type: "heading", id: "w5-thu-after", title: "После урока · 5 минут" },
          {
            type: "write", id: "w5-thu-after-note", title: "My best sentence today",
            task: "Запишите одну фразу с урока, которой вы гордитесь, и одну ошибку, которую больше не сделаете.",
            minWords: 8,
          },
        ],
      },

      // ───────────────────────── FRI · Writing & review
      {
        slug: "fri",
        day: "Пт",
        date: "20.11",
        label: "Write & Review",
        title: "An email to the bank",
        where: "Сайт · 30 минут",
        deadline: "до воскресенья, 20:00",
        goal: "Повторить фразы недели и написать короткое письмо в банк.",
        blocks: [
          {
            type: "choice", id: "w5-fri-mix", title: "Bank situations",
            task: "Выберите лучший ответ.",
            items: [
              ["You didn't understand the number. You say:", ["Could you repeat that, please?", "Repeat!", "What do you say?"], 0],
              ["You want to know the price:", ["How much does it cost?", "How many does it cost?", "How much it costs?"], 0],
              ["The clerk asks for proof of address. You give:", ["your passport", "your rental contract", "your PIN"], 1],
              ["Your card is in a stranger's bag. It is:", ["blocked", "stolen", "free"], 1],
              ["You want to send money to your mum. You make a:", ["transfer", "statement", "balance"], 0],
              ["The clerk speaks very fast. You say:", ["Could you speak more slowly, please?", "Speak slowly!", "You are fast."], 0],
            ],
          },
          {
            type: "gap", id: "w5-fri-fix", title: "Fix the mistake",
            task: "В каждом предложении одна ошибка. Напишите правильную часть.",
            items: [
              ["What documents I need? → What documents ___ I need?", ["do"]],
              ["How much does a new card costs? → How much does a new card ___?", ["cost"]],
              ["I like to open an account. (вежливо) → I ___ like to open an account.", ["'d", "would"]],
              ["Can I pay with card? → Can I pay ___ card?", ["by"]],
              ["My card don't work. → My card ___ work.", ["doesn't", "does not"]],
              ["Is there a monthly fee? — Yes, there's. → Yes, there ___.", ["is"]],
            ],
          },
          {
            type: "write", id: "w5-fri-email", title: "Email to the bank",
            task: "Напишите письмо в Banco Atlântico (50–70 слов). Выберите ситуацию: 1) вы потеряли карту, 2) в выписке странный платёж, 3) вы хотите открыть счёт и спрашиваете о документах. Используйте: Dear…, I'm writing because…, Could you…?, Thank you, Best regards.",
            example: "Dear Sir or Madam,\nI'm writing because I lost my debit card yesterday. The card number ends in 4521. Could you block it, please? I'd also like to order a new card. How much does it cost and how long does it take? I usually check my balance in the app, and there are no new payments.\nThank you for your help.\nBest regards,\nAnna Petrova",
            minWords: 50, big: true,
          },
          { type: "checklist", id: "w5-fri-cando", title: "Can-do · Bank & Money", task: "Отметьте, что у вас уже получается.", fromCanDo: true },
          {
            type: "write", id: "w5-fri-reflect", title: "Reflection",
            task: "Можно по-русски.",
            prompt: "1) Какая банковская ситуация теперь кажется простой? 2) Что было трудно на слух — цифры, скорость, слова? 3) Какой вопрос вы бы ещё хотели уметь задать в банке?",
            minWords: 10,
          },
        ],
      },
    ],
  };
})();
