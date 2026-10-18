// ─────────────────────────────────────────────────────────────
//  Prime English A2 · настройки сайта
//  Меняйте значения здесь — остальной код трогать не нужно.
// ─────────────────────────────────────────────────────────────
window.PE_CONFIG = {
  courseTitle: "Relocation & Business",
  teacherName: "Julie",

  // Общая доска группы в Miro
  miroBoard: "https://miro.com/app/board/uXjVHjdNbo4=/",

  // Ссылка на Zoom для живого урока (четверг). Оставьте пустой, если присылаете в чат.
  zoomLink: "",

  // Куда уходят ответы учениц.
  // 1) submitUrl — адрес веб-приложения Google Apps Script (см. apps-script/Code.gs).
  //    Ответы попадают в таблицу «Lesson Activity_Prime English A2», лист «Ответы»:
  //    https://docs.google.com/spreadsheets/d/1PS6VvWCw6zUpjoV2lSkw-cdihJMEnAyp_Za0l6qBlNM/edit
  // 2) telegramUsername — ник преподавателя в Telegram без @.
  //    Если submitUrl пустой, кнопка «Отправить» открывает Telegram с готовым текстом.
  // 3) teacherEmail — запасной вариант: письмо с ответами.
  submitUrl: "",
  telegramUsername: "",
  teacherEmail: "",
};
