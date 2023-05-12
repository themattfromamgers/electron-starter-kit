const { ipcRenderer } = require('electron')


let todoName = document.querySelector('#todoName')
let todoEkle = document.querySelector('#todoEkle')

todoEkle.addEventListener('click', ()=>{
    ipcRenderer.send('newTodoValue', todoName.value)
})