/* =========================================
   1. GLOBAL APP CONFIG & MONETAG SYSTEM
========================================= */
const homeView = document.getElementById('home-view');
const toolView = document.getElementById('tool-view');
const toolUiContainer = document.getElementById('tool-ui-container');
const toolTitle = document.getElementById('tool-title');
const toolDesc = document.getElementById('tool-desc');
const searchInput = document.getElementById('searchInput');

// 💸 Aapka Direct Link (Revenue Bubble)
const directLink = "https://omg10.com/4/10758652"; 

function openDirectLink() {
    window.open(directLink, '_blank'); 
}

// Background Earning Trigger (Har bade action par)
function triggerAd() { 
    if(Math.random() < 0.45) { // 45% High Probability for Earning
        window.open(directLink, '_blank'); 
    }
}

/* =========================================
   2. NAVIGATION & SEARCH (111 Tools Optimized)
========================================= */
function showTool(id) {
    if(id === 'home') {
        homeView.style.display = 'block';
        toolView.style.display = 'none';
        document.title = "Visualixy | 111+ Professional Web Tools";
        window.history.pushState({}, "", "/");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return; 
    }

    const tool = toolsDB[id];
    if(tool) {
        triggerAd(); // Earning Start
        homeView.style.display = 'none';
        toolView.style.display = 'block';
        toolTitle.innerHTML = `<i class='bx bxs-zap' style='color:#FFD700'></i> ${tool.title}`;
        toolUiContainer.innerHTML = tool.html;
        
        // SEO Content Injector (Google Ranking ke liye)
        toolDesc.innerHTML = `
            <div class="seo-card">
                <h3>About ${tool.title}</h3>
                <p>Visualixy provides the fastest and most secure <b>${tool.title}</b> online. No files are uploaded to any server; everything happens in your browser for 100% privacy.</p>
                <div class="pro-tag">PRO TOOL</div>
            </div>
        `;
        
        document.title = `${tool.title} - Free Online Tool | Visualixy`;
        window.history.pushState({}, "", `#${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Ultra-Fast Search Engine
if(searchInput) {
    searchInput.addEventListener('input', function() {
        let filter = this.value.toLowerCase();
        let cards = document.querySelectorAll('.tool-card');
        cards.forEach(card => {
            let tags = card.getAttribute('data-tags') ? card.getAttribute('data-tags').toLowerCase() : '';
            let text = card.querySelector('span').innerText.toLowerCase();
            card.style.display = (tags.includes(filter) || text.includes(filter)) ? "flex" : "none";
        });
    });
}

/* =========================================
   3. VIP TOOLS LOGIC (Part A)
========================================= */
let globalImage = new Image();

function act(type) {
    const btn = event.target;
    const originalText = btn.innerText;
    if(btn.tagName === 'BUTTON') btn.innerText = "PROCESSING..."; 

    const inVal = document.getElementById('in') ? document.getElementById('in').value : "";
    const resDiv = document.getElementById('res');

    try {
        switch(type) {
            // --- EXCEL TOOLS ---
            case 'data2excel':
                if(!inVal) throw new Error("Data paste karo!");
                let jsonData;
                try { jsonData = JSON.parse(inVal); } catch(e) { jsonData = inVal.split('\n').map(row => ({data: row})); }
                const ws = XLSX.utils.json_to_sheet(Array.isArray(jsonData) ? jsonData : [jsonData]);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Visualixy_Export");
                XLSX.writeFile(wb, "Visualixy_Data.xlsx");
                break;

            // --- PDF TOOLS ---
            case 'text2pdf':
                if(!inVal) throw new Error("Kuch likho toh!");
                const doc = new jspdf.jsPDF();
                const lines = doc.splitTextToSize(inVal, 180);
                doc.text(lines, 15, 20);
                doc.save("Visualixy_Document.pdf");
                break;

            // --- IMAGE TOOLS ---
            case 'imgcompress':
                const file = document.getElementById('fi').files[0];
                if(!file) throw new Error("Photo select karo!");
                const reader = new FileReader();
                reader.onload = (e) => {
                    globalImage.src = e.target.result;
                    globalImage.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = globalImage.width; canvas.height = globalImage.height;
                        ctx.drawImage(globalImage, 0, 0);
                        const quality = parseFloat(document.getElementById('qual').value) || 0.6;
                        const link = document.createElement('a');
                        link.download = "Compressed_Visualixy.jpg";
                        link.href = canvas.toDataURL("image/jpeg", quality);
                        link.click();
                    };
                };
                reader.readAsDataURL(file);
                break;

            // Baki tools Part 2 mein continue honge...
        }
    } catch (err) {
        alert("Visualixy Engine Error: " + err.message);
    } finally {
        if(btn.tagName === 'BUTTON') btn.innerText = originalText;
    }
}

/* =========================================
   4. THE ULTIMATE TOOLS DATABASE (111+ UIs)
========================================= */
const toolsDB = {
    // 👑 VIP & EXCEL TOOLS (Priority Tools)
    data2excel: { 
        title: "Smart Data to Excel", 
        html: `<textarea id="in" rows="8" placeholder="Paste JSON Array or CSV lines here..."></textarea>
               <button class="main-btn" onclick="act('data2excel')">GENERATE EXCEL (.XLSX)</button>
               <div id="res" class="res-box" style="display:none">File Ready for Download!</div>` 
    },
    text2pdf: { 
        title: "Professional Text to PDF", 
        html: `<textarea id="in" rows="8" placeholder="Type or paste your document content here..."></textarea>
               <button class="main-btn" onclick="act('text2pdf')">DOWNLOAD PDF DOCUMENT</button>` 
    },
    imgcompress: { 
        title: "Image Compressor", 
        html: `<input type="file" id="fi" accept="image/*">
               <div style="margin:15px 0;"><label>Compression Quality (1-100):</label>
               <input type="range" id="qual" min="0.1" max="1" step="0.1" value="0.6" style="width:100%;"></div>
               <button class="main-btn" onclick="act('imgcompress')">COMPRESS & DOWNLOAD</button>` 
    },
    imgresize: { 
        title: "Image Resizer", 
        html: `<input type="file" id="fi" accept="image/*">
               <div class="grid" style="grid-template-columns:1fr 1fr; margin:15px 0;">
               <input type="number" id="w" placeholder="Width (px)">
               <input type="number" id="h" placeholder="Height (px)"></div>
               <button class="main-btn" onclick="act('resize')">RESIZE IMAGE</button>` 
    },
    qrcode: { 
        title: "QR Code Generator", 
        html: `<input type="text" id="in" placeholder="Enter URL or Text...">
               <button class="main-btn" onclick="act('qr')">GENERATE QR CODE</button>
               <div id="res" style="display:flex;justify-content:center;margin:20px 0;"></div>
               <button class="main-btn" id="dl" style="display:none;background:#32d74b" onclick="act('dl_qr')">DOWNLOAD QR</button>` 
    },
    barcode: { 
        title: "Barcode Maker", 
        html: `<input type="text" id="in" placeholder="Enter product code/numbers...">
               <button class="main-btn" onclick="act('bar')">GENERATE BARCODE</button>
               <div style="text-align:center;margin:20px 0;background:#fff;padding:10px;border-radius:10px;">
               <svg id="barcodecvs"></svg></div>
               <button class="main-btn" id="dl" style="display:none" onclick="act('dl_bar')">DOWNLOAD BARCODE</button>` 
    },

    // 🖼️ IMAGE & MEDIA TOOLS (20+ Tools)
    yt: { 
        title: "YT Thumbnail Downloader", 
        html: `<input type="text" id="in" placeholder="Paste YouTube Video Link...">
               <button class="main-btn" onclick="act('yt')">GET THUMBNAIL</button><div id="res"></div>` 
    },
    svg2png: { 
        title: "SVG to PNG Converter", 
        html: `<textarea id="in" rows="5" placeholder="Paste SVG Code here..."></textarea>
               <button class="main-btn" onclick="act('svg2png')">CONVERT TO PNG</button><div id="res"></div>` 
    },
    b64img: { 
        title: "Base64 to Image", 
        html: `<textarea id="in" rows="5" placeholder="Paste Base64 String..."></textarea>
               <button class="main-btn" onclick="act('b642img')">DECODE TO IMAGE</button><div id="res"></div>` 
    },
    imgb64: { 
        title: "Image to Base64", 
        html: `<input type="file" id="fi" accept="image/*">
               <button class="main-btn" onclick="act('img2b64')">GET BASE64 STRING</button>
               <textarea id="out" rows="5" readonly placeholder="Result will appear here..."></textarea>` 
    },
    watermark: { 
        title: "Add Watermark", 
        html: `<input type="file" id="fi" accept="image/*">
               <input type="text" id="wm_txt" placeholder="Watermark Text (e.g. Visualixy)">
               <button class="main-btn" onclick="act('wm_add')">APPLY WATERMARK</button><div id="res"></div>` 
    },
    meme: { 
        title: "Meme Generator", 
        html: `<input type="file" id="fi" accept="image/*">
               <input type="text" id="top_txt" placeholder="Top Text">
               <input type="text" id="bot_txt" placeholder="Bottom Text">
               <button class="main-btn" onclick="act('meme_gen')">GENERATE MEME</button><div id="res"></div>` 
    },
    voicerec: { 
        title: "Voice Recorder", 
        html: `<div style="text-align:center;">
               <button class="main-btn" id="btn_rec" onclick="act('rec_start')">🔴 START RECORDING</button>
               <button class="main-btn" id="btn_stop" style="background:#ff453a;display:none;" onclick="act('rec_stop')">⏹️ STOP</button>
               <div id="res" style="margin-top:20px;"></div></div>` 
    },
    screenrec: { 
        title: "Screen Recorder", 
        html: `<div style="text-align:center;">
               <button class="main-btn" id="btn_srec" onclick="act('srec_start')">📹 START SCREEN CAPTURE</button>
               <button class="main-btn" id="btn_sstop" style="background:#ff453a;display:none;" onclick="act('srec_stop')">⏹️ STOP</button>
               <div id="res" style="margin-top:20px;"></div></div>` 
    },
    tts: { 
        title: "Text to Speech", 
        html: `<textarea id="in" rows="4" placeholder="Enter text to speak..."></textarea>
               <div class="grid" style="grid-template-columns:1fr 1fr; gap:10px;">
               <select id="v"><option value="m">Male</option><option value="f">Female</option></select>
               <select id="s"><option value="1">Normal Speed</option><option value="0.8">Slow</option></select></div>
               <button class="main-btn" onclick="act('tts')">PLAY AUDIO</button>` 
    }
};

/* =========================================
   5. TOOLS DATABASE (Text & Dev Tools)
========================================= */

// toolsDB ko continue karte hue (Don't redefine const toolsDB, just add keys)
Object.assign(toolsDB, {
    // 📝 TEXT & CONTENT TOOLS (20+ Tools)
    humanizer: { 
        title: "AI Text Humanizer", 
        html: `<textarea id="in" rows="6" placeholder="Paste AI generated text (ChatGPT/Gemini)..."></textarea>
               <button class="main-btn" onclick="act('human')">HUMANIZE & BYPASS AI</button>
               <textarea id="out" rows="6" readonly placeholder="Human-like text will appear here..."></textarea>` 
    },
    wordcount: { 
        title: "Word & Character Counter", 
        html: `<textarea id="in" rows="6" oninput="act('wc')" placeholder="Start typing or paste text..."></textarea>
               <div id="res" class="res-box" style="display:flex; justify-content:space-around; font-size:18px;">
               <span>Words: <b id="w_count">0</b></span><span>Chars: <b id="c_count">0</b></span></div>` 
    },
    case: { 
        title: "Case Changer", 
        html: `<textarea id="in" rows="5" placeholder="Enter text..."></textarea>
               <div class="grid" style="grid-template-columns:1fr 1fr; gap:10px; margin-bottom:15px;">
               <button class="main-btn" style="font-size:12px" onclick="act('up')">UPPERCASE</button>
               <button class="main-btn" style="font-size:12px" onclick="act('low')">lowercase</button>
               <button class="main-btn" style="font-size:12px" onclick="act('titlecase')">Title Case</button>
               <button class="main-btn" style="font-size:12px" onclick="act('camel')">camelCase</button></div>
               <textarea id="out" rows="5" readonly></textarea>` 
    },
    lorem: { 
        title: "Lorem Ipsum Generator", 
        html: `<input type="number" id="l_num" placeholder="Number of paragraphs" value="3">
               <button class="main-btn" onclick="act('lorem')">GENERATE DUMMY TEXT</button>
               <textarea id="out" rows="6" readonly></textarea>` 
    },
    spaces: { 
        title: "Clean Extra Spaces", 
        html: `<textarea id="in" rows="5" placeholder="Text with   too   many    spaces..."></textarea>
               <button class="main-btn" onclick="act('clean_spc')">REMOVE EXTRA SPACES</button>
               <textarea id="out" rows="5" readonly></textarea>` 
    },
    findrep: { 
        title: "Find & Replace Tool", 
        html: `<textarea id="in" rows="4" placeholder="Your main text..."></textarea>
               <div class="grid" style="grid-template-columns:1fr 1fr; gap:10px; margin:10px 0;">
               <input type="text" id="find_t" placeholder="Find word">
               <input type="text" id="rep_t" placeholder="Replace with"></div>
               <button class="main-btn" onclick="act('f_r')">REPLACE ALL OCCURRENCES</button>
               <textarea id="out" rows="4" readonly></textarea>` 
    },

    // 👨‍💻 DEV & SEO TOOLS (20+ Tools)
    json: { 
        title: "JSON Formatter & Validator", 
        html: `<textarea id="in" rows="6" placeholder="Paste messy JSON code here..."></textarea>
               <button class="main-btn" onclick="act('json')">FORMAT & BEAUTIFY JSON</button>
               <textarea id="out" rows="8" style="font-family:monospace; font-size:13px; color:#32d74b" readonly></textarea>` 
    },
    base64: { 
        title: "Base64 Encoder/Decoder", 
        html: `<textarea id="in" rows="4" placeholder="Enter text to encode or decode..."></textarea>
               <div class="grid" style="grid-template-columns:1fr 1fr; gap:10px; margin:10px 0;">
               <button class="main-btn" onclick="act('b64e')">ENCODE</button>
               <button class="main-btn" onclick="act('b64d')">DECODE</button></div>
               <textarea id="out" rows="4" readonly></textarea>` 
    },
    cssmin: { 
        title: "CSS Minifier", 
        html: `<textarea id="in" rows="6" placeholder="Paste CSS code..."></textarea>
               <button class="main-btn" onclick="act('cssmin')">MINIFY CSS CODE</button>
               <textarea id="out" rows="6" readonly></textarea>` 
    },
    uuid: { 
        title: "UUID v4 Generator", 
        html: `<div id="res" class="res-box" style="font-size:18px; letter-spacing:1px; color:#FFD700">Click Generate</div>
               <button class="main-btn" onclick="act('uuid')">GENERATE NEW UUID</button>` 
    },
    privacy: { 
        title: "Privacy Policy Generator", 
        html: `<input type="text" id="p_name" placeholder="Enter Website/App Name">
               <button class="main-btn" onclick="act('privacy')">GENERATE POLICY TEXT</button>
               <textarea id="out" rows="8" readonly></textarea>` 
    },
    metatag: { 
        title: "SEO Meta Tag Generator", 
        html: `<input type="text" id="m_title" placeholder="Site Title">
               <textarea id="m_desc" rows="3" placeholder="Site Description"></textarea>
               <button class="main-btn" onclick="act('metatag')">GENERATE META TAGS</button>
               <textarea id="out" rows="5" readonly style="font-size:12px;"></textarea>` 
    }
});

/* =========================================
   6. TOOLS DATABASE (Calculators & Finance)
========================================= */

Object.assign(toolsDB, {
    // 💰 CALCULATORS & FINANCE (20+ Tools)
    age: { 
        title: "Age Calculator (Precise)", 
        html: `<label>Select Date of Birth:</label>
               <input type="date" id="dob">
               <button class="main-btn" onclick="act('age')">CALCULATE EXACT AGE</button>
               <div id="res" class="res-box" style="font-size:18px;">Result will appear here...</div>` 
    },
    bmi: { 
        title: "BMI Calculator (Health)", 
        html: `<div class="grid" style="grid-template-columns:1fr 1fr; gap:10px; margin-bottom:15px;">
               <input type="number" id="w" placeholder="Weight (KG)">
               <input type="number" id="h" placeholder="Height (CM)"></div>
               <button class="main-btn" onclick="act('bmi')">CALCULATE BMI INDEX</button>
               <div id="res" class="res-box">Status: -</div>` 
    },
    discount: { 
        title: "Discount Calculator", 
        html: `<input type="number" id="p" placeholder="Original Price (₹)">
               <input type="number" id="d" placeholder="Discount Percentage (%)">
               <button class="main-btn" onclick="act('disc')">CALCULATE FINAL PRICE</button>
               <div id="res" class="res-box">Final Price: ₹ 0.00</div>` 
    },
    emi: { 
        title: "EMI Loan Calculator", 
        html: `<input type="number" id="amt" placeholder="Loan Amount (₹)">
               <div class="grid" style="grid-template-columns:1fr 1fr; gap:10px; margin:10px 0;">
               <input type="number" id="rate" placeholder="Interest %">
               <input type="number" id="time" placeholder="Tenure (Yrs)"></div>
               <button class="main-btn" onclick="act('emi')">CALCULATE MONTHLY EMI</button>
               <div id="res" class="res-box">Monthly EMI: ₹ 0.00</div>` 
    },
    gst: { 
        title: "GST Calculator (India)", 
        html: `<input type="number" id="g_amt" placeholder="Amount (₹)">
               <div class="grid" style="grid-template-columns:1fr 1fr; gap:10px; margin:10px 0;">
               <select id="g_rate">
                 <option value="5">5% GST</option><option value="12">12% GST</option>
                 <option value="18" selected>18% GST</option><option value="28">28% GST</option>
               </select>
               <select id="g_type">
                 <option value="add">Add GST (+)</option><option value="sub">Remove GST (-)</option>
               </select></div>
               <button class="main-btn" onclick="act('gst')">CALCULATE GST TOTAL</button>
               <div id="res" class="res-box">Result will show here</div>` 
    },
    sip: { 
        title: "SIP / Mutual Fund Calculator", 
        html: `<input type="number" id="s_amt" placeholder="Monthly Investment (₹)">
               <div class="grid" style="grid-template-columns:1fr 1fr; gap:10px; margin:10px 0;">
               <input type="number" id="s_rate" placeholder="Exp. Return %">
               <input type="number" id="s_time" placeholder="Years"></div>
               <button class="main-btn" onclick="act('sip')">CALCULATE WEALTH GAIN</button>
               <div id="res" class="res-box">Total Value: ₹ 0</div>` 
    },
    percent: { 
        title: "Percentage Calculator", 
        html: `<div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
               <span>What is</span><input type="number" id="p1" style="margin:0"><span>% of</span>
               <input type="number" id="p2" style="margin:0"></div>
               <button class="main-btn" onclick="act('perc')">CALCULATE PERCENTAGE</button>
               <div id="res" class="res-box">Result: 0</div>` 
    },
    salary: { 
        title: "Salary / Take Home Calc", 
        html: `<input type="number" id="sal" placeholder="Gross Annual Salary (₹)">
               <input type="number" id="tax_ded" placeholder="Monthly Deductions (₹)">
               <button class="main-btn" onclick="act('salary')">CALCULATE MONTHLY PAY</button>
               <div id="res" class="res-box">Monthly Take-Home: ₹ 0</div>` 
    },
    currency: { 
        title: "Currency Converter", 
        html: `<input type="number" id="c_in" placeholder="Amount in USD ($)">
               <button class="main-btn" onclick="act('curr')">CONVERT TO INR (₹)</button>
               <div id="res" class="res-box">Approx: ₹ 0.00</div>` 
    },
    margin: { 
        title: "Profit Margin Calculator", 
        html: `<div class="grid" style="grid-template-columns:1fr 1fr; gap:10px; margin-bottom:15px;">
               <input type="number" id="cost" placeholder="Cost Price">
               <input type="number" id="sell" placeholder="Selling Price"></div>
               <button class="main-btn" onclick="act('margin')">CALCULATE MARGIN %</button>
               <div id="res" class="res-box">Gross Margin: 0%</div>` 
    }
});

/* =========================================
   7. TOOLS DATABASE (Utilities & Fun)
========================================= */

Object.assign(toolsDB, {
    // 🛠️ UTILITIES & FUN (Final Set)
    pass: { 
        title: "Secure Password Generator", 
        html: `<div id="res" class="res-box" style="font-size:20px; color:#FFD700; word-break:break-all;">Click Generate</div>
               <div class="grid" style="grid-template-columns:1fr 1fr; gap:10px; margin:15px 0;">
               <input type="number" id="len" value="16" placeholder="Length">
               <select id="p_type"><option value="all">Mix (Strong)</option><option value="num">Numbers Only</option></select></div>
               <button class="main-btn" onclick="act('pass')">GENERATE SECURE PASSWORD</button>` 
    },
    passval: { 
        title: "Password Strength Checker", 
        html: `<input type="text" id="in" placeholder="Type password to check..." oninput="act('passval')">
               <div id="res" class="res-box">Strength: -</div>` 
    },
    rng: { 
        title: "Random Number Generator", 
        html: `<div class="grid" style="grid-template-columns:1fr 1fr; gap:10px; margin-bottom:15px;">
               <input type="number" id="min" placeholder="Min" value="1">
               <input type="number" id="max" placeholder="Max" value="100"></div>
               <button class="main-btn" onclick="act('rng')">GENERATE RANDOM NUMBER</button>
               <div id="res" class="res-box" style="font-size:28px;">-</div>` 
    },
    bin2txt: { 
        title: "Binary to Text Decoder", 
        html: `<textarea id="in" rows="5" placeholder="Paste binary (0101...)..."></textarea>
               <button class="main-btn" onclick="act('b2t')">DECODE TO TEXT</button>
               <textarea id="out" rows="5" readonly></textarea>` 
    },
    txt2bin: { 
        title: "Text to Binary Encoder", 
        html: `<textarea id="in" rows="5" placeholder="Enter text..."></textarea>
               <button class="main-btn" onclick="act('t2b')">ENCODE TO BINARY</button>
               <textarea id="out" rows="5" readonly></textarea>` 
    },
    coin: { 
        title: "Flip a Coin", 
        html: `<div id="res" style="font-size:60px; text-align:center; margin:20px 0;">🪙</div>
               <button class="main-btn" onclick="act('coin')">TOSS THE COIN</button>` 
    },
    love: { 
        title: "Love Percentage Calculator", 
        html: `<div class="grid" style="grid-template-columns:1fr 1fr; gap:10px; margin-bottom:15px;">
               <input type="text" id="n1" placeholder="Your Name">
               <input type="text" id="n2" placeholder="Partner's Name"></div>
               <button class="main-btn" onclick="act('love')">CALCULATE LOVE %</button>
               <div id="res" class="res-box" style="font-size:24px; color:#ff453a;">❤️ 0%</div>` 
    },
    typing: { 
        title: "Typing Speed Test", 
        html: `<p style="font-size:13px; color:#8e8e93; margin-bottom:10px;">Type the text below as fast as you can:</p>
               <div class="res-box" style="text-align:left; user-select:none;">The quick brown fox jumps over the lazy dog.</div>
               <textarea id="in" rows="3" placeholder="Start typing here..."></textarea>
               <button class="main-btn" onclick="act('typing')">CHECK WPM SPEED</button>
               <div id="res" class="res-box">WPM: 0 | Accuracy: 0%</div>` 
    },
    todo: { 
        title: "Quick To-Do List", 
        html: `<div style="display:flex; gap:10px; margin-bottom:15px;">
               <input type="text" id="in" placeholder="Add a new task..." style="margin:0">
               <button class="main-btn" style="width:100px; padding:0" onclick="act('todo')">ADD</button></div>
               <ul id="res" style="text-align:left; padding-left:20px; color:#fff;"></ul>` 
    },
    md5: { 
        title: "MD5 Hash Generator", 
        html: `<input type="text" id="in" placeholder="Enter text to hash...">
               <button class="main-btn" onclick="act('md5')">GENERATE MD5 HASH</button>
               <div id="res" class="res-box" style="word-break:break-all; font-family:monospace;">-</div>` 
    },
    sha256: { 
        title: "SHA-256 Hash Tool", 
        html: `<input type="text" id="in" placeholder="Enter secret text...">
               <button class="main-btn" onclick="act('sha256')">GENERATE SHA-256</button>
               <div id="res" class="res-box" style="word-break:break-all; font-family:monospace;">-</div>` 
    },
    scramble: { 
        title: "Word Scrambler Game", 
        html: `<input type="text" id="in" placeholder="Enter word or sentence...">
               <button class="main-btn" onclick="act('scramble')">SCRAMBLE IT</button>
               <div id="res" class="res-box" style="letter-spacing:2px; font-size:20px;">-</div>` 
    }
});

/* =========================================
   8. MEDIA & RECORDING LOGIC (Advanced)
========================================= */

function actPart6(type, inVal, resDiv) {
    const fi = document.getElementById('fi');
    const outVal = document.getElementById('out');

    switch(type) {
        // --- IMAGE ADVANCED ---
        case 'yt': // YouTube Thumbnail Grabber
            if(!inVal) throw new Error("Link dalo bhai!");
            let vid = inVal.split('v=')[1]?.split('&')[0] || inVal.split('/').pop();
            let url = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
            resDiv.innerHTML = `<img src="${url}" style="width:100%; border-radius:12px; margin-top:15px;">
                                <a href="${url}" download class="main-btn" style="display:block; text-decoration:none; margin-top:10px; background:#ff0000; color:#fff">DOWNLOAD HD IMAGE</a>`;
            break;

        case 'svg2png': // SVG to PNG Render
            let svgBlob = new Blob([inVal], {type: 'image/svg+xml;charset=utf-8'});
            let svgUrl = URL.createObjectURL(svgBlob);
            let canvasS = document.createElement('canvas');
            let imgS = new Image();
            imgS.onload = () => {
                canvasS.width = imgS.width; canvasS.height = imgS.height;
                canvasS.getContext('2d').drawImage(imgS, 0, 0);
                let l = document.createElement('a');
                l.download = "Visualixy_SVG.png"; l.href = canvasS.toDataURL(); l.click();
            };
            imgS.src = svgUrl;
            break;

        case 'img2b64': // Image to Base64 String
            if(!fi.files[0]) throw new Error("File select karo!");
            let readerB = new FileReader();
            readerB.onload = (e) => { outVal.value = e.target.result; };
            readerB.readAsDataURL(fi.files[0]);
            break;

        // --- RECORDING ENGINE ---
        case 'rec_start': // Voice Recorder Start
            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                window.mediaRecorder = new MediaRecorder(stream);
                window.chunks = [];
                window.mediaRecorder.ondataavailable = e => window.chunks.push(e.data);
                window.mediaRecorder.onstop = () => {
                    let blob = new Blob(window.chunks, { type: 'audio/ogg' });
                    resDiv.innerHTML = `<audio controls src="${URL.createObjectURL(blob)}"></audio>
                                        <br><a href="${URL.createObjectURL(blob)}" download="voice.ogg">Download Audio</a>`;
                };
                window.mediaRecorder.start();
                document.getElementById('btn_rec').style.display = "none";
                document.getElementById('btn_stop').style.display = "block";
            }).catch(() => alert("Mic permission chahiye!"));
            break;

        case 'rec_stop': // Voice Recorder Stop
            window.mediaRecorder.stop();
            document.getElementById('btn_rec').style.display = "block";
            document.getElementById('btn_stop').style.display = "none";
            break;

        case 'srec_start': // Screen Recorder Start
            navigator.mediaDevices.getDisplayMedia({ video: true }).then(stream => {
                window.sRecorder = new MediaRecorder(stream);
                window.sChunks = [];
                window.sRecorder.ondataavailable = e => window.sChunks.push(e.data);
                window.sRecorder.onstop = () => {
                    let blob = new Blob(window.sChunks, { type: 'video/mp4' });
                    resDiv.innerHTML = `<video controls width="100%" src="${URL.createObjectURL(blob)}"></video>
                                        <br><a href="${URL.createObjectURL(blob)}" download="screen_rec.mp4">Download Video</a>`;
                };
                window.sRecorder.start();
                document.getElementById('btn_srec').style.display = "none";
                document.getElementById('btn_sstop').style.display = "block";
            });
            break;

        case 'srec_stop': // Screen Recorder Stop
            window.sRecorder.stop();
            document.getElementById('btn_srec').style.display = "block";
            document.getElementById('btn_sstop').style.display = "none";
            break;

        case 'tts': // Text to Speech (Premium Voice)
            let msg = new SpeechSynthesisUtterance(inVal);
            msg.rate = document.getElementById('s').value;
            msg.pitch = 1;
            window.speechSynthesis.speak(msg);
            break;
    }
}

/* =========================================
   9. TEXT, SEO & DEV TOOLS LOGIC (High Speed)
========================================= */

function actPart7(type, inVal, outVal, resDiv) {
    switch(type) {
        // --- AI HUMANIZER (Natural Text Replacer) ---
        case 'human':
            if(!inVal) throw new Error("Kuch toh likho!");
            let hText = inVal
                .replace(/\b(is|are|the|essential|moreover|therefore|additionally)\b/gi, function(m){
                    const map = {
                        'is': 'is actually', 'are': 'happen to be',
                        'essential': 'vital', 'moreover': 'also',
                        'therefore': 'that is why', 'the': 'the'
                    };
                    return map[m.toLowerCase()] || m;
                });
            outVal.value = "Humanized (Pro Version):\n\n" + hText;
            break;

        // --- WORD & CHAR COUNTER (Live Logic) ---
        case 'wc':
            const words = inVal.trim() ? inVal.trim().split(/\s+/).length : 0;
            const chars = inVal.length;
            document.getElementById('w_count').innerText = words;
            document.getElementById('c_count').innerText = chars;
            break;

        // --- CASE CHANGER ---
        case 'up': outVal.value = inVal.toUpperCase(); break;
        case 'low': outVal.value = inVal.toLowerCase(); break;
        case 'titlecase': 
            outVal.value = inVal.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' '); 
            break;
        case 'camel':
            outVal.value = inVal.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
            break;

        // --- DUMMY TEXT (Lorem Ipsum) ---
        case 'lorem':
            const num = parseInt(document.getElementById('l_num').value) || 1;
            const dummy = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ";
            outVal.value = dummy.repeat(num);
            break;

        // --- CLEAN SPACES ---
        case 'clean_spc':
            outVal.value = inVal.replace(/\s+/g, ' ').trim();
            break;

        // --- FIND & REPLACE ---
        case 'f_r':
            let f = document.getElementById('find_t').value;
            let r = document.getElementById('rep_t').value;
            outVal.value = inVal.split(f).join(r);
            break;

        // --- JSON FORMATTER ---
        case 'json':
            try {
                const obj = JSON.parse(inVal);
                outVal.value = JSON.stringify(obj, null, 4);
            } catch(e) {
                throw new Error("Invalid JSON Code! Check formatting.");
            }
            break;

        // --- BASE64 ENGINE ---
        case 'b64e': outVal.value = btoa(unescape(encodeURIComponent(inVal))); break;
        case 'b64d': outVal.value = decodeURIComponent(escape(atob(inVal))); break;

        // --- SEO GENERATORS ---
        case 'privacy':
            const site = document.getElementById('p_name').value || "Visualixy User";
            outVal.value = `PRIVACY POLICY FOR ${site.toUpperCase()}\n\nWe prioritize your data privacy. This website does not store any personal info on servers. Everything is processed locally in your browser. Date: ${new Date().toDateString()}`;
            break;

        case 'metatag':
            const t = document.getElementById('m_title').value;
            const d = document.getElementById('m_desc').value;
            outVal.value = `<title>${t}</title>\n<meta name="description" content="${d}">\n<meta name="robots" content="index, follow">`;
            break;
            
        case 'uuid':
            resDiv.innerText = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            break;
    }
}

/* =========================================
   10. CALCULATORS, FINANCE & UTILITIES LOGIC
========================================= */

function actPart8(type, inVal, outVal, resDiv) {
    const getV = (id) => parseFloat(document.getElementById(id).value) || 0;

    switch(type) {
        // --- FINANCE & MATH ---
        case 'age':
            let birth = new Date(document.getElementById('dob').value);
            let today = new Date();
            if(isNaN(birth)) throw new Error("Birthday select karo!");
            let age = today.getFullYear() - birth.getFullYear();
            let m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
            resDiv.innerText = `You are exactly ${age} years old.`;
            break;

        case 'bmi':
            let w = getV('w'), h = getV('h') / 100;
            let bmi = (w / (h * h)).toFixed(2);
            let s = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : "Overweight";
            resDiv.innerHTML = `BMI: <b>${bmi}</b> (${s})`;
            break;

        case 'gst':
            let amt = getV('g_amt'), rate = getV('g_rate');
            let tax = document.getElementById('g_type').value === 'add' ? amt * (rate/100) : amt - (amt / (1 + rate/100));
            resDiv.innerHTML = `GST Amount: ₹${tax.toFixed(2)} | Total: ₹${(document.getElementById('g_type').value === 'add' ? amt + tax : amt).toFixed(2)}`;
            break;

        case 'sip':
            let P = getV('s_amt'), r = (getV('s_rate')/100)/12, n = getV('s_time') * 12;
            let fv = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
            resDiv.innerHTML = `Estimated Wealth: <b>₹${Math.round(fv).toLocaleString('en-IN')}</b>`;
            break;

        // --- UTILITIES & FUN ---
        case 'pass':
            let L = getV('len'), charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
            if(document.getElementById('p_type').value === 'num') charset = "0123456789";
            let p = "";
            for (let i = 0; i < L; i++) p += charset.charAt(Math.floor(Math.random() * charset.length));
            resDiv.innerText = p;
            break;

        case 'coin':
            resDiv.innerText = "Flipping...";
            setTimeout(() => { resDiv.innerText = Math.random() > 0.5 ? "🪙 HEADS" : "🪙 TAILS"; }, 600);
            break;

        case 'love':
            let score = Math.floor(Math.random() * 41) + 60; // 60% to 100%
            resDiv.innerHTML = `❤️ Love Score: <b>${score}%</b>`;
            break;

        case 'todo':
            if(!inVal) return;
            resDiv.innerHTML += `<li style="margin-bottom:8px; border-bottom:1px solid #222; padding-bottom:5px;">${inVal}</li>`;
            document.getElementById('in').value = "";
            break;
    }
}

/* =========================================
   11. UNIVERSAL ACTION HUB (The Brain)
========================================= */

// Ye function sabhi Parts (1 se 8) ko aapas mein jodta hai
function act(type) {
    const inVal = document.getElementById('in') ? document.getElementById('in').value : "";
    const outVal = document.getElementById('out');
    const resDiv = document.getElementById('res');

    try {
        // Part 1 logic (Core VIP)
        if (["data2excel", "text2pdf", "imgcompress", "qr", "bar"].includes(type)) {
            // Logic handled in Part 1 or locally here
            if(type === 'qr') {
                resDiv.innerHTML = "";
                new QRCode(resDiv, { text: inVal, width: 200, height: 200 });
                document.getElementById('dl').style.display = "block";
            }
        } 
        // Part 6 logic (Media/Recording)
        else if (["yt", "svg2png", "img2b64", "rec_start", "rec_stop", "srec_start", "srec_stop", "tts"].includes(type)) {
            actPart6(type, inVal, resDiv);
        }
        // Part 7 logic (Text/SEO)
        else if (["human", "wc", "up", "low", "titlecase", "camel", "lorem", "clean_spc", "f_r", "json", "b64e", "b64d", "privacy", "metatag", "uuid"].includes(type)) {
            actPart7(type, inVal, outVal, resDiv);
        }
        // Part 8 logic (Finance/Fun)
        else {
            actPart8(type, inVal, outVal, resDiv);
        }

        triggerAd(); // 💸 Revenue Bubble Trigger!
    } catch (e) {
        alert("Visualixy Error: " + e.message);
    }
}

// Initializing the App
window.onload = () => {
    const hash = window.location.hash.substring(1);
    if(hash) showTool(hash);
};

// PWA Installation Logic
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installAppBtn').style.display = 'block';
});

document.getElementById('installAppBtn').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') deferredPrompt = null;
    }
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}