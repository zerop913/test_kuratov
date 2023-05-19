// Обработчик события отправки формы
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Предотвращаем перезагрузку страницы

  // Создаем объект FormData для сбора данных формы
  var formData = new FormData(this);

  // Создаем объект XMLHttpRequest для отправки запроса
  var xhr = new XMLHttpRequest();

  // Настройка запроса
  xhr.open("POST", "process_form.php", true);

  // Отправка запроса
  xhr.send(formData);

  // Обработка ответа от сервера
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Ответ успешный
        if (xhr.responseText === "success") {
          // Очищаем поля формы
          document.querySelector("form").reset();
          alert("Комментарий успешно добавлен!");
        } else {
          alert(xhr.responseText);
        }

        // Получаем обновленный список комментариев
        getComments();
      } else {
        // Ошибка
        alert("Ошибка при отправке комментария.");
      }
    }
  };
});

// Функция для получения комментариев с сервера
function getComments() {
  var xhr = new XMLHttpRequest();

  // Настройка запроса
  xhr.open("GET", "get_comments.php", true);

  // Отправка запроса
  xhr.send();

  // Обработка ответа от сервера
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Ответ успешный
        var comments = JSON.parse(xhr.responseText); // Убрать парсинг JSON
        displayComments(comments);
      } else {
        // Ошибка
        console.error("Ошибка при получении комментариев.");
      }
    }
  };
}

// Функция для отображения комментариев в графическом виде
function displayComments(comments) {
  var commentsContainer = document.getElementById("comments-container");

  // Очищаем контейнер комментариев
  commentsContainer.innerHTML = "";

  // Переменная для определения, нужно ли располагать комментарий справа
  var alignRight = false;

  // Перебираем комментарии и создаем элементы для каждого
  comments.forEach(function (comment, index) {
    // Добавлен параметр 'index'
    var commentBlock = document.createElement("div");
    commentBlock.classList.add("comment-block");

    // Добавляем класс 'comment-block-right' при необходимости
    if (alignRight) {
      commentBlock.classList.add("comment-block-right");
    }

    // Добавляем класс 'comment-block-even' при необходимости
    if (index % 2 === 1) {
      commentBlock.classList.add("comment-block-even");
    }

    var nameElement = document.createElement("div");
    nameElement.classList.add("name");
    nameElement.textContent = comment.name;
    commentBlock.appendChild(nameElement);

    var emailElement = document.createElement("div");
    emailElement.classList.add("email");
    emailElement.textContent = comment.email;
    commentBlock.appendChild(emailElement);

    var commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.textContent = comment.comment;
    commentBlock.appendChild(commentElement);

    // Добавляем блок комментария в контейнер комментариев
    commentsContainer.appendChild(commentBlock);

    // Инвертируем значение переменной 'alignRight' для следующего комментария
    alignRight = !alignRight;
  });
}

// Получаем список комментариев при загрузке страницы
window.addEventListener("load", function () {
  getComments();
});
