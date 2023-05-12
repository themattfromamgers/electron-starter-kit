const {ipcRenderer} = require('electron')

const yeni_ekran = document.querySelector('#yeniEkran')

yeni_ekran.addEventListener('click', ()=>{
    ipcRenderer.send('yeniPencere')
})

ipcRenderer.on('TodoItems', (err, todo)=>{
    let todosUl = document.querySelector('#todos')
    let templateLi = document.createElement('li')
    templateLi.innerHTML = todo.text;
    todosUl.appendChild(templateLi)
})
