/*
  Цель задания: Разработать функционал для удаления фильма из списка с использованием паттерна MVC. После удаления фильма, необходимо отобразить сообщение "Фильм успешно удалён!" в message-box

  При возникновении сложностей можете ознакомиться с пошаговым планом реализации ниже, но лучше попробовать сначала самостоятельно 🧙‍♂️

Пошаговый план реализации:

1. Реализовать метод deleteMovie в объекте model:
  - метод должен принимать id фильма, который необходимо удалить
  - метод должен удалить фильм из массива movies
  - метод должен обновить отображение фильмов на странице

2. Добавить обработчик события для удаления фильмов:
  - в метода view.init добавить обработчик события на список фильмов
  - используя делегирование событий, обработать клик на кнопке удаления фильма
  - при клике на кнопку удаления, получить id фильма из родительского элемента и передать его в метод deleteMovie объекта controller

3. Реализовать метод deleteMovie в объекте controller:
  - метод должен принимать id фильма
  - метод должен передать id фильма в метод deleteMovie объекта model
  - метод должен отобразить сообщение "Фильм успешно удалён!" в message-box
*/

const model = {
  movies: [],

  addMovie(title, description) {
    // 🔥 Генерируем уникальный строковый ID (надёжнее, чем Math.random())
    const id = crypto.randomUUID();
    const newMovie = { id, title, description };
    this.movies.push(newMovie);
    view.renderMovies(this.movies);
  },

  // 🔥 Метод удаления фильма
  deleteMovie(id) {
    // Фильтруем массив: оставляем все фильмы, кроме того, чей id совпадает
    this.movies = this.movies.filter(movie => movie.id !== id);
    // Обновляем отображение
    view.renderMovies(this.movies);
  }
};

const view = {
  init() {
    this.renderMovies(model.movies);

    // 🔥 Ищем элементы с правильными селекторами
    const form = document.querySelector('.lesson-10 .form');
    const inputTitle = document.querySelector('.input-title');
    const inputDescription = document.querySelector('.input-description');
    const list = document.querySelector('.lesson-10 .list');  // 🔥 Добавил .lesson-10

    // 🔥 ПРОВЕРКИ: если элементы не найдены — выходим
    if (!form) {
      console.error('❌ Форма не найдена!');
      return;
    }
    if (!inputTitle || !inputDescription) {
      console.error('❌ Поля ввода не найдены!');
      return;
    }
    if (!list) {
      console.error('❌ Список не найден!');
      return;
    }

    // Обработчик добавления фильма
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const title = inputTitle.value;
      const description = inputDescription.value;
      controller.addMovie(title, description);
      inputTitle.value = '';
      inputDescription.value = '';
    });

    // 🔥 ДЕЛЕГИРОВАНИЕ: теперь ищем правильный список
    list.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-button')) {
        const movieElement = event.target.closest('.movie');
        if (movieElement) {
          const movieId = movieElement.id;
          controller.deleteMovie(movieId);
        }
      }
    });
  },

  renderMovies(movies) {
    const list = document.querySelector('.lesson-10 .list');

    if (!list) {
      console.error('❌ Список фильмов не найден в renderMovies!');
      return;
    }

    if (movies.length === 0) {
      list.innerHTML = '<li style="color: #666; text-align: center;">Список фильмов пуст</li>';
      return;
    }

    let moviesHTML = '';
    for (const movie of movies) {
      moviesHTML += `
        <li id="${movie.id}" class="movie">
          <div class="movie-info">
            <b class="movie-title">${movie.title}</b>
            <p class="movie-description">${movie.description}</p>
          </div>
          <button class="delete-button" type="button">Удалить 🗑</button>
        </li>
      `;
    }
    list.innerHTML = moviesHTML;
  },

  displayMessage(message, isError = false) {
    const messageBox = document.querySelector('.lesson-10 .message-box');
    if (!messageBox) {
      console.error('❌ Message box не найден!');
      return;
    }

    messageBox.textContent = message;

    if (isError) {
      messageBox.classList.remove('success');
      messageBox.classList.add('error');
    } else {
      messageBox.classList.remove('error');
      messageBox.classList.add('success');
    }

    setTimeout(() => {
      messageBox.textContent = '';
      messageBox.classList.remove('success', 'error');
    }, 3000);
  }
};

const controller = {
  addMovie(title, description) {
    if (title.trim() !== '' && description.trim() !== '') {
      model.addMovie(title, description);
      view.displayMessage('Фильм добавлен успешно!');
    } else {
      view.displayMessage('Заполните все поля!', true);
    }
  },

  // 🔥 Метод удаления фильма в контроллере
  deleteMovie(id) {
    // Передаём id в модель для удаления из данных
    model.deleteMovie(id);
    // Показываем сообщение об успехе
    view.displayMessage('Фильм успешно удалён!');
  }
};

function init() {
  view.init();
}
document.addEventListener('DOMContentLoaded', init);