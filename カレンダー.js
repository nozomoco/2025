function createCalendar(year, month) {
  const calendar = document.getElementById("calendar");
  const lastDay = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const table = document.createElement("table");

  // 表題
  const titleRow = table.insertRow();
  const titleCell = titleRow.insertCell();
  titleCell.colSpan = 7;
  titleCell.textContent = year + "年" + (month + 1) + "月";
  titleCell.classList.add("calendar-title");

  const headerRow = table.insertRow();
const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

for (let i = 0; i < daysOfWeek.length; i++) {
  const headerCell = headerRow.insertCell();
  headerCell.textContent = daysOfWeek[i];
  headerCell.classList.add("weekdays"); 

  if (i === 0) {
    // 日曜日
    headerCell.classList.add("sunday");
  } else if (i === 6) {
    // 土曜日
    headerCell.classList.add("saturday");
  }
}

  const today = new Date(); 

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = table.insertRow();
    let rowIsEmpty = true; 

    for (let j = 0; j < 7; j++) {
      const cell = row.insertCell();
      if (i === 0 && j < firstDay) {
        //初日までの空白
        cell.textContent = "";
      } else if (date > lastDay) {
        // 月最終日後の空白
        cell.textContent = "";
      } else {
        cell.textContent = date;
        if (j === 6) {
          //土曜日
          cell.classList.add("saturday");
        }
        if (j === 0) {
          // 日曜日
          cell.classList.add("sunday");
        }
        if (
          date === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        ) {
          // 今日の日付
          cell.classList.add("today");
        }
        date++;
        rowIsEmpty = false; // セルにデータがある場合、行は空ではない
      }
    }
    // 行が空である場合は非表示にする
    if (rowIsEmpty) {
      row.style.display = "none";
    }
  }

  calendar.innerHTML = " ";
  calendar.appendChild(table);
}

function AgoMonth() {
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
  createCalendar(currentYear, currentMonth);
}

function NextMonth() {
  currentMonth = (currentMonth + 1) % 12;
  currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
  createCalendar(currentYear, currentMonth);
}

function CurrentMonth(){
  currentMonth = currentDate.getMonth();
  currentYear = currentDate.getFullYear();
  createCalendar(currentYear, currentMonth);
}

// 現在の日付を取得
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

// 今月のカレンダーを作成
createCalendar(currentYear, currentMonth);