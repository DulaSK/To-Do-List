function createAppTitle(title) {
    const appTitle = document.createElement('h2')
    appTitle.innerText = title
    return appTitle
}

const createToDoItem = () => {
    //создать элемент
    const form = document.createElement('form')
    const input = document.createElement('input')
    const buttonWrapper = document.createElement('div')
    const button = document.createElement('button')
    
    //добавить класс  
    form.classList.add('input-group' , 'mb-3')
    input.classList.add('form-control')
    input.placeholder = 'Введите название задачи'
    buttonWrapper.classList.add('input-group-append')
    button.classList.add('btn' , 'btn-primary')
    button.innerText = 'Добавить'
    button.type = 'submit'

    //
    buttonWrapper.append(button)
    form.append(input)
    form.append(buttonWrapper)

    return form
}


const createToDoList = () => {
    const list = document.createElement('ul')
    list.classList.add('list-group')
    return list
}

const createToDoListItem = (name , status) => {
    const li = document.createElement('li')
    const buttonGroup = document.createElement('div')
    const doneButton = document.createElement('button')
    const deleteButton = document.createElement('button')
    
    li.classList.add('list-group-item' , 'd-flex' , 'justify-content-between', 'align-items-center')
    if(status){
        li.classList.add('list-group-item-success')
    }
    li.textContent = name
    
    buttonGroup.classList.add('btn-group' , 'btn-group-sm')
    doneButton.classList.add('btn' , 'btn-success')
    doneButton.textContent = 'Done'
    deleteButton.classList.add('btn' , 'btn-danger')
    deleteButton.textContent = 'Delete'
    
    buttonGroup.append(doneButton)
    buttonGroup.append(deleteButton)
    li.append(buttonGroup)
    
    return li
}

let tasks = []
if(localStorage.getItem('todo')){
    tasks = JSON.parse(localStorage.getItem('todo'))
}

const drow = () => {
    const container = document.getElementById('todo-app')
    const title = createAppTitle('Список задач')
    const toDoItem = createToDoItem() // <form> ... </form>
    const toDoList = createToDoList()
    
    container.append(title)
    container.append(toDoItem)
    container.append(toDoList)

    if(tasks.length > 0 ){
        for(let i in tasks){
            let task = createToDoListItem(tasks[i].value , tasks[i].status)
            const doneButton = task.getElementsByClassName('btn-success')[0]
            const deteteButton = task.getElementsByClassName('btn-danger')[0]

            doneButton.addEventListener('click', function() {
                let classItems = [...task.classList]
                if(classItems.includes('list-group-item-success')){
                    tasks[i].status = false
                }else{
                    tasks[i].status = true
                }
                task.classList.toggle('list-group-item-success')
                localStorage.setItem('todo' , JSON.stringify(tasks))
            })
            deteteButton.addEventListener('click', function(){
                if(confirm('Вы уверены?')){
                    tasks.splice(i , 1)
                    task.remove()
                    localStorage.setItem('todo' , JSON.stringify(tasks))
                }
            })
            toDoList.append(task)
        }
    }

    toDoItem.addEventListener('submit' , function(e) {
        e.preventDefault()
        const input = toDoItem.getElementsByTagName('input')[0]

        if(!input.value){
            return
        }

        tasks.push({value: input.value , status: false})
        let taskId = tasks.length-1

        let task = createToDoListItem(input.value , false)
        const doneButton = task.getElementsByClassName('btn-success')[0]
        const deteteButton = task.getElementsByClassName('btn-danger')[0]

        doneButton.addEventListener('click', function() {
            let classItems = [...task.classList]
            if(classItems.includes('list-group-item-success')){
                tasks[taskId].status = false
            }else{
                tasks[taskId].status = true
            }
            task.classList.toggle('list-group-item-success')
            localStorage.setItem('todo' , JSON.stringify(tasks))
        })
        deteteButton.addEventListener('click', function(){
            if(confirm('Вы уверены?')){
                task.remove()
                tasks.splice(taskId , 1)
                localStorage.setItem('todo' , JSON.stringify(tasks))
            }
        })

        toDoList.append(task)
        localStorage.setItem('todo' , JSON.stringify(tasks))
        input.value = ''
    })
}

drow()



// //JSON.stingify
// //JSON.pars
// const me = {
//     id : 1,
//     name : 'Dula',
//     work : 'Businessman'
// }

// localStorage.setItem('me', JSON.stringify(me))
// const item = JSON.parse(localStorage.getItem('me'))
// console.log(localStorage.getItem('me'))
// console.log(item)
// // localStorage.setItem('me' , 'Dula')
// // console.log(localStorage.getItem('me'))
// // localStorage.removeItem('me')
// // localStorage.clear()