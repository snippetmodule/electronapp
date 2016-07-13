import {app, ipcMain, nativeImage, BrowserWindow, screen} from "electron";
//import {menu} from "./Menu";
import {readFileSync} from "fs";
import {windowBoundsFilePath} from "../utils/Common";

if (app.dock) {
    app.dock.setIcon(nativeImage.createFromPath("build/icon.png"));
}

app.on("ready", () => {
    const bounds = windowBounds();

    let options: Electron.BrowserWindowOptions = {
        webPreferences: {
            experimentalFeatures: true,
            experimentalCanvasFeatures: true,
        },
        titleBarStyle: "hidden",
        resizable: true,
        minWidth: 500,
        minHeight: 300,
        width: bounds.width,
        height: bounds.height,
        x: bounds.x,
        y: bounds.y,
        show: false,
    };
    const browserWindow = new BrowserWindow(options);

    if (process.env.REACT_EXTENSION_PATH) {
        BrowserWindow.addDevToolsExtension(process.env.REACT_EXTENSION_PATH);
    }

    browserWindow.loadURL("file://" + __dirname + "/../views/index.html");
    //menu.setMenu(app, browserWindow);

    browserWindow.on("focus", () => app.dock && app.dock.setBadge(""));

    browserWindow.webContents.on("did-finish-load", () => {
        browserWindow.show();
        browserWindow.focus();
    });

    app.on("open-file", (event, file) => browserWindow.webContents.send("change-working-directory", file));
});

app.on("mainWindow-all-closed", () => process.platform === "darwin" || app.quit());

ipcMain.on("quit", app.quit);

function windowBounds(): Electron.Bounds {
    try {
        return JSON.parse(readFileSync(windowBoundsFilePath).toString());
    } catch (error) {
        const workAreaSize = screen.getPrimaryDisplay().workAreaSize;

        return {
            width: workAreaSize.width,
            height: workAreaSize.height,
            x: 0,
            y: 0,
        };
    }
}
