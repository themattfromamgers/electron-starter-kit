
const electron = require("electron");
const path = require('path')
const url = require("url");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow,ekleEkran;

app.on("ready", () => {

  mainWindow = new BrowserWindow({});

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)

  Menu.setApplicationMenu(mainMenu)
  
  ipcMain.on("xd", (err, data)=>{
	  console.log(data)
  })
  
  ipcMain.on("username", (err, data)=>{
	  console.log("username:", data)
  })
  
    ipcMain.on("yenipencereac", ()=>{
	  yaratEkran()
  })
  
  mainWindow.on('close', ()=>{
	  app.quit()
  })
 })

 const mainMenuTemplate = [
  {
    label: "xaw",
    submenu: [
      {
        label: "todo ekle"
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

function yaratEkran(){
	ekleEkran = new BrowserWindow({
		width: 482,
		height: 200,
		title: "yeni bir pencere"
	})
	
	ekleEkran.loadURL(url.format({
      pathname: path.join(__dirname, "newWindow.html"),
      protocol: "file:",
      slashes: true
    })
)
}

