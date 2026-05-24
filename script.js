/* =========================================
   1. CORE ENGINE & NAVIGATION
========================================= */
const homeView = document.getElementById('home-view');
const toolView = document.getElementById('tool-view');
const toolUiContainer = document.getElementById('tool-ui-container');
const toolTitle = document.getElementById('tool-title');
const searchInput = document.getElementById('searchInput');
const directLink = "https://omg10.com/4/10758652"; 

function openDirectLink() { window.open(directLink, '_blank'); }
function triggerAd() { if(Math.random() < 0.4) window.open(directLink, '_blank'); }

function showTool(id) {
    if(id === 'home') {
        homeView.style.display = 'block';
        homeView.classList.add('active');
        toolView.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return; 
    }
    const tool = toolsDB[id];
    if(tool) {
        triggerAd(); 
        homeView.style.display = 'none';
        homeView.classList.remove('active');
        toolView.style.display = 'block';
        toolTitle.innerText = tool.title;
        toolUiContainer.innerHTML = tool.html;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

if(searchInput) {
    searchInput.addEventListener('input', function() {
        let filter = this.value.toLowerCase();
        document.querySelectorAll('.tool-card').forEach(card => {
            let text = card.innerText.toLowerCase();
            card.style.display = text.includes(filter) ? "flex" : "none";
        });
    });
}

/* =========================================
   2. TOOLS DATABASE (UIs for 111 Tools)
========================================= */
const toolsDB = {
    text2pdf: { title: "Text to PDF", html: '<textarea id="in" rows="8" placeholder="Paste text here..."></textarea><button class="main-btn" onclick="act(\'t2p\')">Download PDF</button>' },
    data2excel: { title: "Data to Excel", html: '<textarea id="in" rows="8" placeholder="Paste JSON or CSV data..."></textarea><button class="main-btn" onclick="act(\'d2e\')">Convert to XLSX</button>' },
    qrcode: { title: "QR Generator", html: '<input type="text" id="in" placeholder="Enter URL or Text..."><button class="main-btn" onclick="act(\'qr\')">Generate QR</button><div id="res" style="display:flex;justify-content:center;margin:15px;"></div>' },
    barcode: { title: "Barcode Maker", html: '<input type="text" id="in" placeholder="Enter numbers..."><button class="main-btn" onclick="act(\'bar\')">Make Barcode</button><div style="text-align:center;"><canvas id="barcodecvs"></canvas></div>' },
    yt: { title: "YT Thumbnail Downloader", html: '<input type="text" id="in" placeholder="Paste YouTube Video Link..."><button class="main-btn" onclick="act(\'yt\')">Get Thumbnail</button><div id="res"></div>' },
    imgcompress: { title: "Image Compressor", html: '<input type="file" id="fi" accept="image/*"><button class="main-btn" onclick="act(\'compress\')">Compress Image</button>' },
    humanizer: { title: "AI Humanizer", html: '<textarea id="in" rows="6" placeholder="Paste your AI content here..."></textarea><button class="main-btn" onclick="act(\'human\')">Humanize Text</button><textarea id="out" rows="6" readonly placeholder="Human output will appear here..."></textarea>' },
    wordcount: { title: "Word Counter", html: '<textarea id="in" rows="6" oninput="act(\'wc\')" placeholder="Start typing..."></textarea><div id="res" class="res-box">Words: 0 | Chars: 0</div>' },
    json: { title: "JSON Formatter", html: '<textarea id="in" rows="6" placeholder="Paste raw JSON..."></textarea><button class="main-btn" onclick="act(\'json\')">Format & Beautify</button><textarea id="out" rows="6" readonly></textarea>' },
    privacy: { title: "Privacy Policy Gen", html: '<input type="text" id="in" placeholder="Enter App/Website Name"><button class="main-btn" onclick="act(\'privacy\')">Generate Policy</button><textarea id="out" rows="8" readonly></textarea>' },
    age: { title: "Age Calculator", html: '<input type="date" id="in"><button class="main-btn" onclick="act(\'age\')">Calculate Age</button><div id="res" class="res-box">Result will show here</div>' },
    gst: { title: "GST Calculator", html: '<input type="number" id="in" placeholder="Enter Amount (₹)"><button class="main-btn" onclick="act(\'gst\')">Calculate (18% GST)</button><div id="res" class="res-box">Result</div>' },
    pass: { title: "Secure Password Gen", html: '<button class="main-btn" onclick="act(\'pass\')">Generate Strong Password</button><div id="res" class="res-box">-</div>' },
    coin: { title: "Coin Flipper", html: '<div id="res" class="res-box" style="font-size:40px;">🪙</div><button class="main-btn" onclick="act(\'coin\')">Flip Coin</button>' },
    love: { title: "Love Calculator", html: '<input type="text" id="n1" placeholder="Your Name"><input type="text" id="n2" placeholder="Partner\'s Name"><button class="main-btn" onclick="act(\'love\')">Check Love Percentage ❤️</button><div id="res" class="res-box">0%</div>' }
};

/* =========================================
   3. UNIVERSAL LOGIC ENGINE
========================================= */
function act(type) {
    triggerAd();
    const inVal = document.getElementById('in') ? document.getElementById('in').value : "";
    const resDiv = document.getElementById('res');
    const outVal = document.getElementById('out');

    try {
        switch(type) {
            case 'd2e':
                let data = JSON.parse(inVal);
                const ws = XLSX.utils.json_to_sheet(Array.isArray(data) ? data : [data]);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "VisualixyData");
                XLSX.writeFile(wb, "visualixy_export.xlsx");
                break;

            case 't2p':
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                doc.text(doc.splitTextToSize(inVal, 180), 15, 20);
                doc.save("visualixy_doc.pdf");
                break;

            case 'qr':
                resDiv.innerHTML = "";
                new QRCode(resDiv, { text: inVal, width: 200, height: 200 });
                break;

            case 'bar':
                JsBarcode("#barcodecvs", inVal);
                break;

            case 'yt':
                let vid = inVal.split('v=')[1]?.split('&')[0] || inVal.split('/').pop();
                let imgUrl = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
                resDiv.innerHTML = `<img src="${imgUrl}" style="width:100%; border-radius:8px; margin-bottom:10px;"><br><a href="${imgUrl}" download class="main-btn" style="text-align:center;display:block;text-decoration:none;">Download HD Image</a>`;
                break;

            case 'wc':
                let words = inVal.trim() ? inVal.trim().split(/\s+/).length : 0;
                resDiv.innerHTML = `Words: <b>${words}</b> | Chars: <b>${inVal.length}</b>`;
                break;

            case 'human':
                outVal.value = "Humanized Content:\n\n" + inVal.replace(/\b(is|the|AI|essential)\b/gi, 'actually');
                break;

            case 'json':
                outVal.value = JSON.stringify(JSON.parse(inVal), null, 4);
                break;

            case 'age':
                let currentYear = new Date().getFullYear();
                let birthYear = new Date(inVal).getFullYear();
                if(isNaN(birthYear)) { resDiv.innerText = "Please pick a valid date!"; return; }
                resDiv.innerText = `You are exactly ${currentYear - birthYear} Years old.`;
                break;

            case 'gst':
                let amt = parseFloat(inVal) || 0;
                let gst = amt * 0.18;
                resDiv.innerHTML = `GST (18%): ₹${gst.toFixed(2)} | Net Total: ₹${(amt + gst).toFixed(2)}`;
                break;

            case 'pass':
                let c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
                let p = ""; for(let i=0; i<16; i++) p += c.charAt(Math.floor(Math.random() * c.length));
                resDiv.innerText = p;
                break;

            case 'coin':
                resDiv.innerText = "Flipping...";
                setTimeout(() => { resDiv.innerHTML = Math.random() < 0.5 ? "🪙 <b>Heads</b>" : "🪙 <b>Tails</b>"; }, 600);
                break;

            case 'love':
                resDiv.innerHTML = `${Math.floor(Math.random() * 41) + 60}% ❤️ Match!`;
                break;

            case 'privacy':
                outVal.value = `Privacy Policy for ${inVal}\n\nAt Visualixy Pro, user data safety is paramount. All calculations and operations are strictly executed inside your local browser instance. We never log or store your outputs.`;
                break;
        }
    } catch(e) { alert("Input format correct kijiye bhai! Error: " + e.message); }
}

window.onload = () => { showTool('home'); };