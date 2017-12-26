'use strict';

{

  var $todosList = document.getElementById(`todosList`),
    $insertTodoForm = document.getElementById(`insertTodoForm`),
    $inputText = document.getElementById(`inputText`);

  var init = function init() {
    if ($todosList) {
      loadTodos();
    }
    if ($insertTodoForm) {
      $insertTodoForm.addEventListener(`submit`, handleSubmitInsertTodoForm);
    }
  };

  var loadTodos = function loadTodos() {
    fetch(`index.php`, {
      headers: new Headers({
        Accept: `application/json`
      })
    }).then(function (r) {
      return r.json();
    }).then(function (data) {
      return handleLoadTodos(data);
    });
  };

  var handleLoadTodos = function handleLoadTodos(data) {
    $todosList.innerHTML = data.map(function (todo) {
      return createTodoListItem(todo);
    }).join(``);
  };

  var createTodoListItem = function createTodoListItem(todo) {
    return `<li>` + todo.text + `</li>`;
  };

  var handleSubmitInsertTodoForm = function handleSubmitInsertTodoForm(e) {
    e.preventDefault();
    fetch($insertTodoForm.getAttribute(`action`), {
      headers: new Headers({
        Accept: `application/json`
      }),
      method: `post`,
      body: new FormData($insertTodoForm)
    }).then(function (r) {
      return r.json();
    }).then(function (data) {
      return handleLoadSubmit(data);
    });
  };

  var handleLoadSubmit = function handleLoadSubmit(data) {
    var $errorText = document.querySelector(`.error--text`);
    $errorText.textContent = ``;
    if (data.result == `ok`) {
      $inputText.value = ``;
      loadTodos();
    } else {
      if (data.errors.text) {
        $errorText.textContent = data.errors.text;
      }
    }
  };

  init();
}
