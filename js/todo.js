const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input")
const todoList = document.querySelector("#todo-list");

// 입력되는 newTodo를 저장할 배열 생성 -> 변경 가능하도록 let으로 선언
// 새로고침하면 작성한 todo가 초기화되고 있기 때문에
// localStorage를 활용하여 작성한 todo값 저장
let todos = [];

// saveTodos라는 문자를 여러 번 입력하기 때문에 대문자로 정의 -> 실수를 줄이기 위함
const TODO_KEY = "saveTodos";

// newTodo를 전달받은 배열(todos)을
// saveTodos라는 이름으로 localStorage에 저장하는 함수
function saveTodos() {
    // JSON.stringify()
    // object, array 등 string이 아닌 코드를 string으로 변경하는 기능
    // 값을 string의 형태로 저장하고 싶을 때 사용
    // localStorage에는 string만 저장할 수 있기 때문에 todos배열을 string으로 변경
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

// todo를 삭제하는 역할 담당 함수 작성
function deleteTodo(event) {
    // button을 눌렀을 때 deleteTodo가 실행되도록 EventListener를 작성
    // button의 부모요소(parentElement)가 li이기 때문에 아래와 같이 작성
    const li = event.target.parentElement;
    li.remove();
    
    // 특정 버튼을 클릭하면 해당 버튼의 부모요소인 li를 삭제한 뒤 새로운 배열을 생성
    // filter를 이용해 삭제된 li의 id와 동일하지 않은 요소만 남긴 새로운 배열 todos 생성
    todos = todos.filter(todo => todo.id !== parseInt(li.id));

    // 새로운 배열 todos를 다시 localStorage에 저장하기 위해 saveTodos 함수 호출
    saveTodos();
}

// todo를 그리는(화면에 표시하는) 역할 담당 함수 작성
// handleTodoSubmit에서 newTodoObj를 전달받아 사용
function paintTodo(newTodoObj) {
    // todoList(ul태그) 안에 들어갈 li 생성
    const li = document.createElement("li");
    li.id = newTodoObj.id;

    // li태그 안에 들어갈 span태그 생성
    const span = document.createElement("span");
    // span태그 안의 텍스트를 newTodoObj의 text로 변경
    span.innerHTML = newTodoObj.text;

    // li태그 안에 들어갈 button태그 생성
    const button = document.createElement("button");
    // button태그 안의 텍스트를 X 아이콘으로 변경
    button.innerHTML = "❌";
    // button태그에 클릭 이벤트 리스너 추가
    // 클릭 이벤트 발생 -> 리스트 삭제
    button.addEventListener("click", deleteTodo);

    // li태그 안에 span태그, button태그를 자식으로 추가
    li.appendChild(span);
    li.appendChild(button);

    // todoList(ul태그) 안에 li태그를 자식으로 추가
    todoList.appendChild(li);
}

// handleSubmit 함수 작성
function handleTodoSubmit(event) {
    // form태그의 기본 동작인 submit 실행 막기
    event.preventDefault();

    // todoInput에 입력되는 value값을 newTodo에 저장
    const newTodo = todoInput.value;

    // submit이 실행되면 입력창이 비워지도록 ""값 작성
    todoInput.value = "";

    // newTodo를 배열이 아닌 object로 만들기 위해 newTodoObj 생성
    // object로 만드는 이유: id값을 부여하기 위해서
    const newTodoObj = {
        text: newTodo,
        // Date.now(): 밀리초를 값으로 주는 함수
        // ↓ 아래와 같이 작성하면 id로 랜덤한 숫자를 얻을 수 있다
        id: Date.now(),
    };

    // todos배열에 newTodoObj를 전달(push)
    todos.push(newTodoObj);

    // newTodoObj를 paintTodo함수에 전달
    paintTodo(newTodoObj);

    // saveTodos 실행 -> 저장
    saveTodos();
}

// todoForm이 submit되면 handleTodoSubmit 함수가 실행
todoForm.addEventListener("submit", handleTodoSubmit);

// localStorage에 저장된 아이템(string 상태)을 불러옴
const savedTodos = localStorage.getItem(TODO_KEY);

// savedTodos는 null(값이 없음)이 될 수도 있음
// null로 인한 오류를 막기 위해 if문 작성
if(savedTodos !== null) {
    // savedTodos가 null이 아니면 savedTodos에 저장된 string을 array로 변경
    // JSON.parse(): string을 array로 변경하는 기능
    const parsedTodos = JSON.parse(savedTodos);

    // todos 배열에 parsedTodos 저장
    todos = parsedTodos;

    // forEach(): parsedTodos에 있는 각각의 요소마다 paintTodo함수를 실행
    parsedTodos.forEach(paintTodo);
}