const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

let ngrokProcess = null;
let currentUrl = null;

function startNgrok() {
    console.log('Starting ngrok...');
    
    ngrokProcess = spawn('ngrok', ['http', '3000', '--log=stdout'], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    ngrokProcess.stdout.on('data', (data) => {
        const output = data.toString();
        console.log(output);
        
        // URL'yi yakala
        const urlMatch = output.match(/https:\/\/[a-z0-9-]+\.ngrok\.io/);
        if (urlMatch && urlMatch[0] !== currentUrl) {
            currentUrl = urlMatch[0];
            console.log(`\n🚀 New ngrok URL: ${currentUrl}`);
            updateConfigFile(currentUrl);
        }
    });

    ngrokProcess.stderr.on('data', (data) => {
        console.error(`ngrok error: ${data}`);
    });

    ngrokProcess.on('close', (code) => {
        console.log(`ngrok process exited with code ${code}`);
        console.log('Restarting in 5 seconds...');
        setTimeout(startNgrok, 5000);
    });
}

function updateConfigFile(url) {
    try {
        // API config dosyasını güncelle
        const configPath = path.join(__dirname, 'config', 'api.ts');
        if (fs.existsSync(configPath)) {
            let content = fs.readFileSync(configPath, 'utf8');
            
            // Eski ngrok URL'sini yeni ile değiştir
            content = content.replace(
                /const\s+NGROK_URL\s*=\s*['"`][^'"`]*['"`]/,
                `const NGROK_URL = '${url}'`
            );
            
            fs.writeFileSync(configPath, content);
            console.log(`✅ Updated config/api.ts with new URL: ${url}`);
        }
    } catch (error) {
        console.error('Error updating config file:', error);
    }
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down ngrok...');
    if (ngrokProcess) {
        ngrokProcess.kill();
    }
    process.exit(0);
});

startNgrok();

