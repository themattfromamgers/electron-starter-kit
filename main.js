const electron = require('electron');
const path = require('path')
const url = require('url')

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow, ekleEkran;
let todoList = []

app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        // frame: false
    })

    mainWindow.setResizable(false)

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "mainWindow.html"),
        protocol: "file:",
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)

    Menu.setApplicationMenu(mainMenu)

    ipcMain.on('yeniPencere', ()=>{
      yeni_pencere()
    })

    ipcMain.on('newTodoValue', (err, data)=>{
      if(data){
        var todo = {
          id: todoList.length + 1,
          text: data
        }
        todoList.push(
          todo
        )
      }
      mainWindow.webContents.send('TodoItems', todo)
      

      getTodolist()

      
    })
    
})

const mainMenuTemplate = [
    {
      label: "xaw",
      submenu: [
        {
          label: "todo ekle",
          click(){ 
            yaratEkran()
          }
        },
        {
          label:"tümün sil"
        },
        {
          label:"çıkıs",
          accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
          role: "quit"
        }
      ]
    },
   ]

if(process.platform == 'darwin') {

}

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push(
        {
            label: "gelitirisici araclari",
            submenu: [
                {
                    label: "gelistirici ayar",
                    click(Item, focusWindow){
                        focusWindow.toggleDevTools()
                    }
                },
                {
                    label: "reload",
                    role: "reload"
                }
            ]
        }
    )
}

function yeni_pencere(){
	ekleEkran = new BrowserWindow({
    // frame: false,
		width: 482,
		height: 200,
		title: "yeni bir pencere"
	})

    ekleEkran.setResizable(false)
	
	ekleEkran.loadURL(url.format({
      pathname: path.join(__dirname, "pages/index.html"),
      protocol: "file:",
      slashes: true
    })
)
}


function getTodolist(){
  console.log(todoList)
}