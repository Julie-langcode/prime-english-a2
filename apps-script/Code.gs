/**
 * Prime English A2 · приём ответов с сайта в Google-таблицу.
 *
 * Как подключить (один раз, 3 минуты):
 * 1. Откройте таблицу «Lesson Activity_Prime English A2».
 * 2. Расширения → Apps Script. Удалите всё в Code.gs и вставьте этот файл.
 * 3. Сохраните. Нажмите «Начать развертывание» → «Новое развертывание».
 *    Тип: «Веб-приложение». Запуск от имени: «Я». Доступ: «Все».
 * 4. Разрешите доступ к таблице (Google попросит подтвердить).
 * 5. Скопируйте URL веб-приложения (заканчивается на /exec)
 *    и вставьте его в js/config.js → submitUrl.
 */

const SHEET_NAME = "Ответы";
const HEADERS = ["Дата и время", "Ученица", "Неделя", "День", "Задание", "Тип", "Ответ", "Результат", "Комментарий", "Проверено", "Обратная связь"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    const now = new Date();
    const rows = (data.rows || []).map(function (r, i) {
      return [
        now,
        data.student || "",
        data.week || "",
        data.day || "",
        r.task || "",
        r.type || "",
        r.answer || "",
        r.score || "",
        i === 0 ? data.comment || "" : "",
        false,
        "",
      ];
    });
    if (rows.length) {
      const start = sheet.getLastRow() + 1;
      sheet.getRange(start, 1, rows.length, HEADERS.length).setValues(rows);
      sheet.getRange(start, 10, rows.length, 1).insertCheckboxes();
    }
    return json_({ ok: true, rows: rows.length });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, message: "Prime English A2 · приём ответов работает" });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME, 0);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight("bold").setBackground("#26201C").setFontColor("#F0EBE3");
    sheet.setColumnWidth(5, 220);
    sheet.setColumnWidth(7, 420);
    sheet.setColumnWidth(11, 260);
    sheet.getRange("A:A").setNumberFormat("dd.mm.yyyy hh:mm");
    sheet.getRange("G:G").setWrap(true);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
