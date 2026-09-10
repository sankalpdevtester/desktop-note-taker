import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as fsSync from 'fs';

let mainWindow: BrowserWindow | null = null;
const NOTES_DIR = path.join(app.getPath('userData'), 'notes');

// Ensure notes directory exists
if (!fsSync.existsSync(NOTES_DIR)) {
    fsSync.mkdirSync(NOTES_DIR, { recursive: true });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#1e1e2e',
            symbolColor: '#cdd6f4',
            height: 40
        }
    });

    mainWindow.loadFile('dist/index.html');

    // Create menu
    const template: any[] = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Note',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow?.webContents.send('new-note');
                    }
                },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// IPC Handlers
ipcMain.handle('get-notes', async () => {
    try {
        const files = await fs.readdir(NOTES_DIR);
        const notes = await Promise.all(
            files
                .filter(f => f.endsWith('.json'))
                .map(async (file) => {
                    const content = await fs.readFile(
                        path.join(NOTES_DIR, file),
                        'utf-8'
                    );
                    return JSON.parse(content);
                })
        );
        return notes.sort((a, b) => b.updatedAt - a.updatedAt);
    } catch (error) {
        console.error('Error reading notes:', error);
        return [];
    }
});

ipcMain.handle('save-note', async (_, note) => {
    try {
        const filename = `${note.id}.json`;
        const filepath = path.join(NOTES_DIR, filename);
        await fs.writeFile(filepath, JSON.stringify(note, null, 2));
        return { success: true };
    } catch (error) {
        console.error('Error saving note:', error);
        return { success: false, error: String(error) };
    }
});

ipcMain.handle('delete-note', async (_, noteId) => {
    try {
        const filename = `${noteId}.json`;
        const filepath = path.join(NOTES_DIR, filename);
        await fs.unlink(filepath);
        return { success: true };
    } catch (error) {
        console.error('Error deleting note:', error);
        return { success: false, error: String(error) };
    }
});

ipcMain.handle('search-notes', async (_, query) => {
    try {
        const files = await fs.readdir(NOTES_DIR);
        const notes = await Promise.all(
            files
                .filter(f => f.endsWith('.json'))
                .map(async (file) => {
                    const content = await fs.readFile(
                        path.join(NOTES_DIR, file),
                        'utf-8'
                    );
                    return JSON.parse(content);
                })
        );
        
        const lowerQuery = query.toLowerCase();
        return notes.filter(note =>
            note.title.toLowerCase().includes(lowerQuery) ||
            note.content.toLowerCase().includes(lowerQuery) ||
            (note.tags && note.tags.some((tag: string) => 
                tag.toLowerCase().includes(lowerQuery)
            ))
        );
    } catch (error) {
        console.error('Error searching notes:', error);
        return [];
    }
});
