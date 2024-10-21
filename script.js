const input = document.querySelector("div.todo-input > input[type=text]")
const allTodoContainer = document.querySelector(".all-todos-scroll-container")
const addBtn = document.querySelector(".add-icon")
const darkBtn = document.querySelector(".dark-btn")
const filterContainer = document.querySelector('.all-todos-container-footer')
const leftItems = filterContainer.children[0]


let todoData = JSON.parse(localStorage.getItem('todo')) || []
let whichFilter = JSON.parse(localStorage.getItem('filter')) || {
    onActive: false,
    onCompleted: false,
}
localStorage.setItem('filter', JSON.stringify(whichFilter))
let isDarkMode = JSON.parse(localStorage.getItem('theme')) || false
localStorage.setItem('theme', JSON.stringify(isDarkMode))


function addTodos(addTodo) {
    todoData.push({ todo: input.value.trim(), isCompleted: false })
    localStorage.setItem('todo', JSON.stringify(todoData))
    displayTodo(input.value)
    showAll()
    input.value = ''
    addTodo.target.classList.add('bx-tada')
    setTimeout(() => {
        addTodo.target.classList.remove('bx-tada')
    }, 800);
}


function showTodoFromLocal(todoArr) {
    todoArr.forEach((todoText) => {
        displayTodo(todoText)
    });
    addActiveStates(filterContainer.children[1].children[0], filterContainer.children[1].children[1], filterContainer.children[1].children[2])

    showLeftItems()
}
showTodoFromLocal(todoData)
function displayTodo(todoContent) {
    allTodoContainer.innerHTML += `<div class="todo-container">
    <div class="check-container">
      <img src="./images/icon-check.svg" alt="" class="check-icon">
    </div>
    <span class="todo-content">${todoContent.todo || input.value}</span>
    <img src="./images/icon-cross.svg" alt="" class="cross-icon">
  </div>`
}


function selectBtns(e) {
    if (e.target.classList.contains('cross-icon')) {
        const todoContainer = e.target.parentElement
        deleteTodos(todoContainer)
    } else if (e.target.className === 'check-container' || e.target.className === 'check-icon') {
        let checkBtn = e.target
        if (e.target.className === 'check-icon') {
            checkBtn = e.target.parentElement
        }
        checkCompleteTodo(checkBtn)
        showActive()
    }

}


function addActiveStates(currentElem, nextElem, lastElem) {
    currentElem.classList.add('active-blue')
    nextElem.classList.remove('active-blue')
    lastElem.classList.remove('active-blue')
}


function filterBtns(e) {
    if (e.target.className === 'show-all') {
        addActiveStates(e.target, e.target.nextElementSibling, e.target.nextElementSibling.nextElementSibling)
        showAll()

    } else if (e.target.className === 'show-active') {
        addActiveStates(e.target, e.target.previousElementSibling, e.target.nextElementSibling)
        getActive()
    } else if (e.target.className === 'show-completed') {
        addActiveStates(e.target, e.target.previousElementSibling, e.target.previousElementSibling.previousElementSibling)
        getCompleted()
    } else if (e.target.className === 'remove-completed') {
        getRemovedAll()
    } else {
        return
    }
}


function deleteTodos(deleteItem) {
    deleteItem.remove()
    let index = todoData.findIndex((i) => {
        return deleteItem.children[1].innerText === i.todo
    })

    todoData.splice(index, 1)
    localStorage.setItem('todo', JSON.stringify(todoData))

    showLeftItems()
}

function showLeftItems() {
    let leftItemsArr = todoData.filter((data) => {
        return !data.isCompleted
    })
    if (todoData.length !== 0) {
        leftItems.innerText = `${leftItemsArr.length} items left`
    } else {
        leftItems.innerText = '0 items left'
    }
}


function checkCompleteTodo(checkItem) {
    checkItem.classList.add('check')
    checkItem.firstElementChild.classList.add('show')
    if (checkItem.nextElementSibling) {
        checkItem.nextElementSibling.classList.add('line')

        let index = todoData.findIndex((i) => {
            return checkItem.nextElementSibling.innerText === i.todo
        })

        todoData[index].isCompleted = true
        localStorage.setItem('todo', JSON.stringify(todoData))

        let leftItemsArr = todoData.filter((data) => {
            return !data.isCompleted
        })
        leftItems.innerText = `${leftItemsArr.length} items left`
    } else {
        return
    }
}

function getCheckTodoFromLocal() {
    const allCircle = document.querySelectorAll(".check-container")
    let isCheck = todoData.filter((e) => {
        return e.isCompleted
    })

    isCheck.forEach(checked => {
        allCircle.forEach((e) => {
            if (e.nextElementSibling.innerText === checked.todo) {
                e.classList.add('check')
                e.firstElementChild.classList.add('show')
                e.nextElementSibling.classList.add('line')
            }
        })
    });
}
getCheckTodoFromLocal()


// creating filters options functionality
function showAll() {
    whichFilter.onActive = false
    whichFilter.onCompleted = false
    localStorage.setItem('filter', JSON.stringify(whichFilter))

    allTodoContainer.innerHTML = ''
    showTodoFromLocal(todoData)
    getCheckTodoFromLocal()
}

function getActive() {
    whichFilter.onActive = true
    whichFilter.onCompleted = false
    localStorage.setItem('filter', JSON.stringify(whichFilter))

    let active = todoData.filter((data) => {
        return !data.isCompleted
    })

    allTodoContainer.innerHTML = ''

    active.forEach((show) => {
        displayTodo(show)
    })
}
function showActive() {
    if (whichFilter.onActive) {
        let active = todoData.filter((data) => {
            return !data.isCompleted
        })
        allTodoContainer.innerHTML = ''
        active.forEach((show) => {
            displayTodo(show)
        })
        addActiveStates(filterContainer.children[1].children[1], filterContainer.children[1].children[0], filterContainer.children[1].children[2])
    }
}
showActive()

function getCompleted() {
    whichFilter.onCompleted = true
    localStorage.setItem('filter', JSON.stringify(whichFilter))

    let active = todoData.filter((data) => {
        return data.isCompleted
    })

    allTodoContainer.innerHTML = ''

    active.forEach((show) => {
        displayTodo(show)
        getCheckTodoFromLocal()
    })
}
function showCompleted() {
    if (whichFilter.onCompleted) {
        let active = todoData.filter((data) => {
            return data.isCompleted
        })
        allTodoContainer.innerHTML = ''
        active.forEach((show) => {
            displayTodo(show)
            getCheckTodoFromLocal()
        })
        addActiveStates(filterContainer.children[1].children[2], filterContainer.children[1].children[0], filterContainer.children[1].children[1])
    }
}
showCompleted()

function getRemovedAll() {
    let removed = todoData.map((data) => {
        return data.isCompleted
    })

    let removeIndex = []
    for (let i = 0; i < removed.length; i++) {
        if (removed[i] === true) {
            removeIndex.push(i)
        }
    }

    for (let i = removeIndex.length - 1; i >= 0; i--) {
        todoData.splice(removeIndex[i], 1)
        localStorage.setItem('todo', JSON.stringify(todoData))
    }

    allTodoContainer.innerHTML = ''
    showTodoFromLocal(todoData)
}

// add dark mode functionality===>
function darkModeToggle() {

    if (darkBtn.classList.contains('light') && !isDarkMode) {
        darkBtn.classList.replace('light', 'dark')
        isDarkMode = true
        localStorage.setItem('theme', JSON.stringify(isDarkMode))
    } else {
        darkBtn.classList.replace('dark', 'light')
        isDarkMode = false
        localStorage.setItem('theme', JSON.stringify(isDarkMode))
    }
    setDarkMode()
}

function setDarkMode() {
    if (isDarkMode) {
        darkBtn.classList.add('active')
        darkBtn.src = 'images/icon-sun.svg'
        document.querySelector("#container > div").classList.add('darkModeImg')
        document.body.classList.add('dark-mode')
    }else{
        darkBtn.src = 'images/icon-moon.svg'
        document.querySelector("#container > div").classList.remove('darkModeImg')
        document.body.classList.remove('dark-mode')
    }
}
setDarkMode()


// all eventListners==>
addBtn.addEventListener('click', addTodos)
allTodoContainer.addEventListener('click', selectBtns)
filterContainer.addEventListener('click', filterBtns)
darkBtn.addEventListener('click', darkModeToggle)
