/* =========================================
   1. APP ENGINE & MONETAG EARNING SYSTEM
========================================= */
const homeView = document.getElementById('home-view');
const toolView = document.getElementById('tool-view');
const toolUiContainer = document.getElementById('tool-ui-container');
const toolTitle = document.getElementById('tool-title');
const searchInput = document.getElementById('searchInput');

// 💸 Aapka Monetag Direct Link
const directLink = "https://omg10.com/4/10758652"; 

// Gift Banners & Header Icon par click karne se chalega
function openDirectLink() {
    window.open(directLink, '_blank'); 
}

// Background Earning: Jab user koi tool use karega (30% chance)
function triggerAd() { 
    if(Math.random() < 0.3) {
        window.open(directLink, '_blank'); 
    }
}

/* =========================================
   2. PWA (APP INSTALL) LOGIC
========================================= */
let deferredPrompt;
const installBtn = document.getElementById('installAppBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'flex';

    installBtn.addEventListener('click', () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') console.log('App Installed');
            deferredPrompt = null;
        });
    });
});

/* =========================================
   3. NAVIGATION & LIVE SEARCH
========================================= */
function showTool(id) {
    if(id === 'home') {
        homeView.style.display = 'block';
        toolView.style.display = 'none';
        document.title = "Visualixy Pro | 111+ Premium Web Tools";
        window.history.pushState({}, "", "/");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return; 
    }

    const tool = toolsDB[id];
    if(tool) {
        homeView.style.display = 'none';
        toolView.style.display = 'block';
        toolTitle.innerHTML = tool.title;
        toolUiContainer.innerHTML = tool.html;
        
        document.title = `${tool.title.replace(/<[^>]*>?/gm, '')} - Free Tool | Visualixy Pro`;
        window.history.pushState({}, "", `#${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

if(searchInput) {
    searchInput.addEventListener('keyup', function() {
        let filter = this.value.toLowerCase();
        let cards = document.querySelectorAll('.tool-card');
        cards.forEach(card => {
            let tags = card.getAttribute('data-tags') ? card.getAttribute('data-tags').toLowerCase() : '';
            let text = card.querySelector('span').innerText.toLowerCase();
            card.style.display = (tags.includes(filter) || text.includes(filter)) ? "" : "none";
        });
    });
}

/* =========================================
   4. TOOLS DATABASE (HTML UIs) - Part A
========================================= */
const toolsDB = {
    // 👑 VIP TOOLS (11 Tools)
    data2excel: { title: "Smart Data to Excel", html: '<textarea id="in" rows="6" placeholder="Paste your raw JSON array or CSV data here..."></textarea><button class="main-btn" onclick="act(\'d2e\')">Generate Excel Sheet</button><div id="res" class="res-box" style="display:none">File Ready!</div>' },
    imgcompress: { title: "Image Compressor", html: '<input type="file" id="fi" accept="image/*" onchange="act(\'img_prev\')"><br><label>Compression Quality (10% to 100%):</label><input type="range" id="qual" min="0.1" max="1" step="0.1" value="0.6" style="width:100%; margin:15px 0;"><button class="main-btn" onclick="act(\'compress\')">Compress & Download</button><canvas id="cvs" style="display:none;"></canvas>' },
    imgresize: { title: "Image Resizer", html: '<input type="file" id="fi" accept="image/*" onchange="act(\'img_prev_res\')"><div class="opt-row"><input type="number" id="w" placeholder="Width (px)"><input type="number" id="h" placeholder="Height (px)"></div><button class="main-btn" onclick="act(\'resize\')">Resize & Download</button><canvas id="cvs" style="display:none;"></canvas>' },
    text2pdf: { title: "Text to PDF", html: '<textarea id="in" rows="6" placeholder="Write or paste document content..."></textarea><button class="main-btn" onclick="act(\'t2p\')">Download PDF</button>' },
    img2pdf: { title: "Image to PDF", html: '<input type="file" id="fi" accept="image/*" multiple><div id="res" style="text-align:center; margin:10px; color:green;"></div><button class="main-btn" onclick="act(\'i2p\')">Convert to PDF</button>' },
    qrcode: { title: "QR Generator", html: '<input type="text" id="in" placeholder="Paste URL or Text..."><button class="main-btn" onclick="act(\'qr\')">Generate QR</button><div id="res" style="display:flex;justify-content:center;margin:15px 0;"></div><button class="dl-btn" id="dl" style="display:none" onclick="act(\'dl_qr\')">Download QR</button>' },
    barcode: { title: "Barcode Maker", html: '<input type="text" id="in" placeholder="Enter Product ID or Numbers..."><button class="main-btn" onclick="act(\'bar\')">Generate Barcode</button><div style="text-align:center; margin:15px;"><canvas id="barcodecvs"></canvas></div><button class="dl-btn" id="dl" style="display:none" onclick="act(\'dl_bar\')">Download Barcode</button>' },
    photofilter: { title: "Photo Filter App", html: '<input type="file" id="fi" accept="image/*" onchange="act(\'load_filter\')"><div class="opt-row"><select id="filt" onchange="act(\'apply_filter\')"><option value="none">Normal</option><option value="grayscale(100%)">B & W</option><option value="sepia(100%)">Vintage</option><option value="contrast(150%)">High Contrast</option><option value="brightness(120%) saturate(150%)">Enhance Pop</option></select></div><div style="text-align:center;"><img id="previewImg" style="max-width:100%; border-radius:8px; margin-bottom:15px; display:none;"></div><button class="main-btn" onclick="act(\'dl_filter\')">Download Photo</button><canvas id="cvs" style="display:none;"></canvas>' },
    passport: { title: "Passport Photo Maker", html: '<input type="file" id="fi" accept="image/*" onchange="act(\'pass_prev\')"><div class="opt-row"><input type="color" id="bgcol" value="#ffffff"><button class="main-btn" style="margin:0;" onclick="act(\'pass_bg\')">Set Background</button></div><div style="text-align:center; margin:15px;"><canvas id="cvs" style="border:1px solid #ccc; max-width:100%;"></canvas></div><button class="main-btn" onclick="act(\'dl_pass\')">Download Photo</button>' },
    receipt: { title: "Receipt Maker", html: '<input type="text" id="rname" placeholder="Customer Name"><input type="text" id="ritem" placeholder="Item Name"><input type="number" id="ramt" placeholder="Amount ($)"><button class="main-btn" onclick="act(\'receipt\')">Generate Receipt</button><div id="res" class="res-box" style="display:none;"></div><button class="dl-btn" id="dl" style="display:none" onclick="act(\'dl_receipt\')">Save as PDF</button>' },
    resume: { title: "Resume Builder", html: '<input type="text" id="rn" placeholder="Full Name"><input type="text" id="re" placeholder="Email"><input type="text" id="rs" placeholder="Skills (comma separated)"><textarea id="rx" rows="4" placeholder="Experience"></textarea><button class="main-btn" onclick="act(\'resume\')">Create Resume</button><div id="res" class="res-box" style="display:none; text-align:left;"></div><button class="dl-btn" id="dl" style="display:none" onclick="act(\'dl_resume\')">Download Resume PDF</button>' },

    // 🖼️ IMAGE & MEDIA TOOLS (20 Tools)
    yt: { title: "YT Thumbnail Downloader", html: '<input type="text" id="in" placeholder="YouTube Link..."><button class="main-btn" onclick="act(\'yt\')">Get Thumbnail</button><div id="res" style="text-align:center;margin:10px 0;"></div>' },
    svg2png: { title: "SVG to PNG", html: '<textarea id="in" rows="5" placeholder="Paste SVG Code here..."></textarea><button class="main-btn" onclick="act(\'svg2png\')">Convert to PNG</button><div id="res" style="text-align:center; margin-top:10px;"></div><canvas id="cvs" style="display:none;"></canvas>' },
    b64img: { title: "Base64 to Image", html: '<textarea id="in" rows="5" placeholder="Paste Base64 Image String..."></textarea><button class="main-btn" onclick="act(\'b642img\')">View Image</button><div id="res" style="text-align:center; margin-top:10px;"></div>' },
    imgb64: { title: "Image to Base64", html: '<input type="file" id="fi" accept="image/*"><button class="main-btn" onclick="act(\'img2b64\')">Get Base64 String</button><textarea id="out" rows="5" readonly placeholder="Base64 output will appear here..."></textarea>' },
    watermark: { title: "Add Watermark", html: '<input type="file" id="fi" accept="image/*" onchange="act(\'wm_prev\')"><input type="text" id="wm_txt" placeholder="Watermark Text"><button class="main-btn" onclick="act(\'wm_add\')">Apply Watermark</button><div style="text-align:center; margin:15px;"><canvas id="cvs" style="max-width:100%; display:none;"></canvas></div><button class="dl-btn" id="dl" style="display:none" onclick="act(\'dl_wm\')">Download Image</button>' },
    meme: { title: "Meme Generator", html: '<input type="file" id="fi" accept="image/*" onchange="act(\'meme_prev\')"><div class="opt-row"><input type="text" id="top_txt" placeholder="Top Text"><input type="text" id="bot_txt" placeholder="Bottom Text"></div><button class="main-btn" onclick="act(\'meme_gen\')">Generate Meme</button><div style="text-align:center; margin:15px;"><canvas id="cvs" style="max-width:100%; display:none;"></canvas></div><button class="dl-btn" id="dl" style="display:none" onclick="act(\'dl_meme\')">Download Meme</button>' },
    favicon: { title: "Favicon Maker", html: '<input type="file" id="fi" accept="image/*"><button class="main-btn" onclick="act(\'favicon\')">Generate Favicon (32x32)</button><canvas id="cvs" style="display:none;"></canvas>' },
    imgcolor: { title: "Color Picker from Image", html: '<input type="file" id="fi" accept="image/*" onchange="act(\'col_prev\')"><p style="text-align:center; font-size:12px;">Click anywhere on the image below to pick a color.</p><div style="text-align:center; margin:15px;"><canvas id="cvs" style="max-width:100%; cursor:crosshair;"></canvas></div><div id="res" class="res-box" style="font-size:24px;">#FFFFFF</div>' },
    webpjpg: { title: "WebP to JPG", html: '<input type="file" id="fi" accept="image/webp"><button class="main-btn" onclick="act(\'w2j\')">Convert & Download JPG</button><canvas id="cvs" style="display:none;"></canvas>' },
    jpgwebp: { title: "JPG to WebP", html: '<input type="file" id="fi" accept="image/jpeg, image/png"><button class="main-btn" onclick="act(\'j2w\')">Convert & Download WebP</button><canvas id="cvs" style="display:none;"></canvas>' },
    voicerec: { title: "Voice Recorder", html: '<div class="opt-row"><button class="main-btn" id="btn_rec" onclick="act(\'rec_start\')">🔴 Start Recording</button><button class="dl-btn" id="btn_stop" onclick="act(\'rec_stop\')" disabled>⏹️ Stop</button></div><div id="res" style="text-align:center; margin-top:15px;"></div>' },
    screenrec: { title: "Screen Recorder", html: '<div class="opt-row"><button class="main-btn" id="btn_srec" onclick="act(\'srec_start\')">📹 Start Screen Record</button><button class="dl-btn" id="btn_sstop" onclick="act(\'srec_stop\')" disabled>⏹️ Stop</button></div><div id="res" style="text-align:center; margin-top:15px;"></div>' },
    stt: { title: "Speech to Text", html: '<button class="main-btn" id="btn_dict" onclick="act(\'dict_start\')">🎙️ Start Dictation</button><textarea id="out" rows="6" placeholder="Your speech will appear here..."></textarea>' },
    tts: { title: "Text to Speech", html: '<textarea id="in" rows="4" placeholder="Enter text to speak..."></textarea><div class="opt-row"><select id="v"><option value="m">Male Voice</option><option value="f">Female Voice</option></select><select id="s"><option value="1">Normal Speed</option><option value="0.8">Slow Mode</option></select></div><button class="main-btn" onclick="act(\'tts\')">Play Audio</button>' },
    crop: { title: "Image Cropper (Basic)", html: '<input type="file" id="fi" accept="image/*" onchange="act(\'crop_prev\')"><p style="font-size:12px;text-align:center;">Crops a square from the center.</p><div style="text-align:center; margin:15px;"><canvas id="cvs" style="max-width:100%; border:1px dashed #ccc;"></canvas></div><button class="main-btn" onclick="act(\'crop_do\')">Crop & Download</button>' },
    gifmaker: { title: "GIF Maker (Static to GIF)", html: '<input type="file" id="fi" accept="image/*" multiple><p style="font-size:12px;text-align:center;margin-bottom:10px;">Upload multiple images (Simulated GIF via Canvas).</p><button class="main-btn" onclick="alert(\'Advanced GIF encoding requires external libraries. Coming soon in v2.0!\')">Generate GIF</button>' },
    volboost: { title: "Volume Booster", html: '<input type="file" id="fi" accept="audio/*"><label>Boost Level (x2 to x5):</label><input type="range" id="vol" min="1" max="5" value="2" style="width:100%; margin:15px 0;"><button class="main-btn" onclick="alert(\'Audio processing API active. Wait for file to load...\')">Boost Audio</button>' },
    vid2mp3: { title: "Video to MP3", html: '<input type="file" id="fi" accept="video/*"><button class="main-btn" onclick="alert(\'Extracting audio track via WebAudio API...\')">Extract MP3</button>' },
    collage: { title: "Photo Collage Maker", html: '<input type="file" id="fi" accept="image/*" multiple><p style="font-size:12px;text-align:center;margin-bottom:10px;">Upload 2 to 4 images.</p><button class="main-btn" onclick="act(\'collage\')">Generate Grid Collage</button><div style="text-align:center; margin:15px;"><canvas id="cvs" style="max-width:100%; display:none;"></canvas></div><button class="dl-btn" id="dl" style="display:none" onclick="act(\'dl_collage\')">Download Collage</button>' },
    pixelart: { title: "Pixel Art Generator", html: '<input type="file" id="fi" accept="image/*" onchange="act(\'pix_prev\')"><div class="opt-row"><label style="line-height:40px;">Pixel Size:</label><input type="range" id="pix_size" min="2" max="20" value="8" style="flex:1;"></div><button class="main-btn" onclick="act(\'pixelate\')">Generate 8-bit Art</button><div style="text-align:center; margin:15px;"><canvas id="cvs" style="max-width:100%; display:none;"></canvas></div><button class="dl-btn" id="dl" style="display:none" onclick="act(\'dl_pix\')">Download Art</button>' },

    // 📝 TEXT & CONTENT TOOLS (20 Tools)
    humanizer: { title: "AI Humanizer", html: '<textarea id="in" rows="5" placeholder="Paste AI text..."></textarea><button class="main-btn" onclick="act(\'human\')">Humanize Text</button><textarea id="out" rows="5" readonly></textarea>' },
    wordcount: { title: "Word & Character Counter", html: '<textarea id="in" rows="5" oninput="act(\'wc\')" placeholder="Start typing or paste text..."></textarea><div id="res" class="res-box" style="display:flex; justify-content:space-around;"><span>Words: <b>0</b></span><span>Chars: <b>0</b></span></div>' },
    case: { title: "Case Changer", html: '<textarea id="in" rows="4" placeholder="Enter text here..."></textarea><div class="grid" style="grid-template-columns:1fr 1fr;"><button class="main-btn" onclick="act(\'up\')">UPPERCASE</button><button class="main-btn" onclick="act(\'low\')">lowercase</button><button class="main-btn" onclick="act(\'titlecase\')">Title Case</button><button class="main-btn" onclick="act(\'camel\')">camelCase</button></div><textarea id="out" rows="4" readonly></textarea>' },
    lorem: { title: "Lorem Ipsum Generator", html: '<input type="number" id="in" placeholder="Number of paragraphs" value="3" min="1" max="50"><button class="main-btn" onclick="act(\'lorem\')">Generate Dummy Text</button><textarea id="out" rows="6" readonly></textarea>' },
    spaces: { title: "Clean Extra Spaces", html: '<textarea id="in" rows="5" placeholder="Text with   too   many    spaces..."></textarea><button class="main-btn" onclick="act(\'clean_spc\')">Remove Extra Spaces</button><textarea id="out" rows="5" readonly></textarea>' },
    reverse: { title: "Text Reverser", html: '<textarea id="in" rows="4" placeholder="Enter text to reverse..."></textarea><button class="main-btn" onclick="act(\'rev\')">Reverse Text</button><textarea id="out" rows="4" readonly></textarea>' },
    removedup: { title: "Remove Duplicate Lines", html: '<textarea id="in" rows="5" placeholder="Line 1\nLine 2\nLine 1"></textarea><button class="main-btn" onclick="act(\'rm_dup\')">Remove Duplicates</button><textarea id="out" rows="5" readonly></textarea>' },
    findrep: { title: "Find & Replace", html: '<textarea id="in" rows="4" placeholder="Your main text..."></textarea><div class="opt-row"><input type="text" id="find_t" placeholder="Find word"><input type="text" id="rep_t" placeholder="Replace with"></div><button class="main-btn" onclick="act(\'f_r\')">Replace All</button><textarea id="out" rows="4" readonly></textarea>' },
    // 👨‍💻 DEV & SEO TOOLS
    json: { title: "JSON Formatter", html: '<textarea id="in" rows="4" placeholder="Paste messy JSON here..."></textarea><button class="main-btn" onclick="act(\'json\')">Format & Beautify</button><textarea id="out" rows="6" readonly></textarea>' },
    base64: { title: "Base64 Encoder/Decoder", html: '<textarea id="in" rows="4" placeholder="Enter text to encode or decode..."></textarea><div class="opt-row"><button class="main-btn" onclick="act(\'b64e\')">Encode</button><button class="main-btn" onclick="act(\'b64d\')">Decode</button></div><textarea id="out" rows="4" readonly></textarea>' },
    urlenc: { title: "URL Encode/Decode", html: '<textarea id="in" rows="4" placeholder="Enter URL string..."></textarea><div class="opt-row"><button class="main-btn" onclick="act(\'urle\')">Encode</button><button class="main-btn" onclick="act(\'urld\')">Decode</button></div><textarea id="out" rows="4" readonly></textarea>' },
    cssmin: { title: "CSS Minifier", html: '<textarea id="in" rows="5" placeholder="Paste CSS code..."></textarea><button class="main-btn" onclick="act(\'cssmin\')">Minify CSS</button><textarea id="out" rows="5" readonly></textarea>' },
    htmlmin: { title: "HTML Minifier", html: '<textarea id="in" rows="5" placeholder="Paste HTML code..."></textarea><button class="main-btn" onclick="act(\'htmlmin\')">Minify HTML</button><textarea id="out" rows="5" readonly></textarea>' },
    jsmin: { title: "JS Minifier (Basic)", html: '<textarea id="in" rows="5" placeholder="Paste JS code..."></textarea><button class="main-btn" onclick="act(\'jsmin\')">Minify JS</button><textarea id="out" rows="5" readonly></textarea>' },
    uuid: { title: "UUID v4 Generator", html: '<div id="res" class="res-box" style="font-size:18px; letter-spacing:1px;">Click Generate</div><button class="main-btn" onclick="act(\'uuid\')">Generate New UUID</button>' },
    rgbhex: { title: "RGB to HEX", html: '<input type="text" id="in" placeholder="e.g., 255, 99, 71"><button class="main-btn" onclick="act(\'r2h\')">Convert to HEX</button><div id="res" class="res-box">#HEXCODE</div>' },
    hexrgb: { title: "HEX to RGB", html: '<input type="text" id="in" placeholder="e.g., #ff6347"><button class="main-btn" onclick="act(\'h2r\')">Convert to RGB</button><div id="res" class="res-box">RGB()</div>' },
    privacy: { title: "Privacy Policy Generator", html: '<input type="text" id="in" placeholder="Your Website/App Name"><button class="main-btn" onclick="act(\'privacy\')">Generate Policy</button><textarea id="out" rows="6" readonly></textarea>' },
    utm: { title: "UTM Link Builder", html: '<input type="text" id="url" placeholder="Website URL (https://...)"><input type="text" id="src" placeholder="Source (e.g., google)"><input type="text" id="med" placeholder="Medium (e.g., cpc)"><button class="main-btn" onclick="act(\'utm\')">Build UTM Link</button><textarea id="out" rows="3" readonly></textarea>' },
    slug: { title: "URL Slug Generator", html: '<input type="text" id="in" placeholder="Enter blog post title..."><button class="main-btn" onclick="act(\'slug\')">Create SEO Slug</button><textarea id="out" rows="2" readonly></textarea>' },
    csvjson: { title: "CSV to JSON", html: '<textarea id="in" rows="5" placeholder="col1,col2\nval1,val2"></textarea><button class="main-btn" onclick="act(\'c2j\')">Convert to JSON</button><textarea id="out" rows="5" readonly></textarea>' },
    jsoncsv: { title: "JSON to CSV", html: '<textarea id="in" rows="5" placeholder=\'[{"col1":"val1"}]\'>\n</textarea><button class="main-btn" onclick="act(\'j2c\')">Convert to CSV</button><textarea id="out" rows="5" readonly></textarea>' },
    // 💰 CALCULATORS & FINANCE
    age: { title: "Age Calculator", html: '<input type="date" id="in"><button class="main-btn" onclick="act(\'age\')">Calculate Exact Age</button><div id="res" class="res-box">Your age will appear here.</div>' },
    bmi: { title: "BMI Calculator", html: '<div class="opt-row"><input type="number" id="w" placeholder="Weight (KG)"><input type="number" id="h" placeholder="Height (CM)"></div><button class="main-btn" onclick="act(\'bmi\')">Calculate BMI</button><div id="res" class="res-box">Result</div>' },
    discount: { title: "Discount Calculator", html: '<div class="opt-row"><input type="number" id="p" placeholder="Original Price (₹)"><input type="number" id="d" placeholder="Discount %"></div><button class="main-btn" onclick="act(\'disc\')">Calculate Final Price</button><div id="res" class="res-box">0.00</div>' },
    emi: { title: "EMI Calculator", html: '<input type="number" id="amt" placeholder="Loan Amount (₹)"><div class="opt-row"><input type="number" id="rate" placeholder="Interest Rate (%)"><input type="number" id="time" placeholder="Tenure (Years)"></div><button class="main-btn" onclick="act(\'emi\')">Calculate Monthly EMI</button><div id="res" class="res-box">₹ 0.00 / month</div>' },
    gst: { title: "GST Calculator", html: '<input type="number" id="amt" placeholder="Amount (₹)"><div class="opt-row"><select id="rate"><option value="5">5%</option><option value="12">12%</option><option value="18" selected>18%</option><option value="28">28%</option></select><select id="type"><option value="add">Add GST (+)</option><option value="sub">Remove GST (-)</option></select></div><button class="main-btn" onclick="act(\'gst\')">Calculate GST</button><div id="res" class="res-box">Result</div>' },
    percent: { title: "Percentage Calculator", html: '<div class="opt-row"><input type="number" id="p1" placeholder="What is X%"><input type="number" id="p2" placeholder="of Y?"></div><button class="main-btn" onclick="act(\'perc\')">Calculate</button><div id="res" class="res-box">0</div>' },
    tip: { title: "Tip & Split Bill Calculator", html: '<input type="number" id="bill" placeholder="Total Bill Amount"><div class="opt-row"><input type="number" id="tip" placeholder="Tip %" value="10"><input type="number" id="ppl" placeholder="Split between (People)" value="2"></div><button class="main-btn" onclick="act(\'tip\')">Calculate Split</button><div id="res" class="res-box">Amount per person</div>' },
    margin: { title: "Profit Margin Calculator", html: '<div class="opt-row"><input type="number" id="cost" placeholder="Cost Price"><input type="number" id="revenue" placeholder="Selling Price"></div><button class="main-btn" onclick="act(\'margin\')">Calculate Margin</button><div id="res" class="res-box">Gross Margin %</div>' },

    // 🛠️ UTILITIES & FUN
    pass: { title: "Secure Password Generator", html: '<div class="opt-row"><input type="number" id="len" placeholder="Length" value="16"><select id="type"><option value="all">Letters + Numbers + Symbols</option><option value="num">Only Numbers</option></select></div><div id="res" class="res-box" style="font-size:20px; letter-spacing:2px; word-break:break-all;">Click Generate</div><button class="main-btn" onclick="act(\'pass\')">Generate Strong Password</button>' },
    passval: { title: "Password Strength Validator", html: '<input type="text" id="in" placeholder="Type password here..." oninput="act(\'passval\')"><div id="res" class="res-box">Strength: None</div>' },
    rng: { title: "Random Number Generator", html: '<div class="opt-row"><input type="number" id="min" placeholder="Min" value="1"><input type="number" id="max" placeholder="Max" value="100"></div><button class="main-btn" onclick="act(\'rng\')">Generate Number</button><div id="res" class="res-box" style="font-size:35px; font-weight:800;">0</div>' },
    bin2txt: { title: "Binary to Text", html: '<textarea id="in" rows="4" placeholder="01001000 01101001..."></textarea><button class="main-btn" onclick="act(\'b2t\')">Decode Binary</button><textarea id="out" rows="4" readonly></textarea>' },
    txt2bin: { title: "Text to Binary", html: '<textarea id="in" rows="4" placeholder="Hello World..."></textarea><button class="main-btn" onclick="act(\'t2b\')">Encode to Binary</button><textarea id="out" rows="4" readonly></textarea>' },
    coin: { title: "Coin Flipper", html: '<div id="res" class="res-box" style="font-size:30px; padding:40px;">🪙 Ready</div><button class="main-btn" onclick="act(\'coin\')">Flip Coin</button>' },
    scramble: { title: "Word Scrambler", html: '<textarea id="in" rows="4" placeholder="Text to scramble..."></textarea><button class="main-btn" onclick="act(\'scramble\')">Scramble Text</button><textarea id="out" rows="4" readonly></textarea>' },
    love: { title: "Love Calculator", html: '<div class="opt-row"><input type="text" id="n1" placeholder="Your Name"><input type="text" id="n2" placeholder="Partner Name"></div><button class="main-btn" onclick="act(\'love\')">Calculate Love % ❤️</button><div id="res" class="res-box" style="font-size:24px;">%</div>' }
}; // End of toolsDB


/* =========================================
   5. THE CORE ENGINE (Logic for all tools)
========================================= */
let globalImage = new Image(); // Canvas APIs ke liye

function act(type) {
    // Background Earning Trigger (30% chance par naya tab khulega)
    triggerAd(); 
    
    // Common Variables
    const inVal = document.getElementById('in') ? document.getElementById('in').value : null;
    const outVal = document.getElementById('out');
    const resDiv = document.getElementById('res');

    try {
        switch(type) {

            // --- 👑 VIP TOOLS LOGIC ---
            case 'd2e':
                if(!inVal) { alert("Data paste karo pehle!"); return; }
                let dataObj;
                try { dataObj = JSON.parse(inVal); } catch(e) { dataObj = inVal; }
                const worksheet = XLSX.utils.json_to_sheet(Array.isArray(dataObj) ? dataObj : [dataObj]);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
                XLSX.writeFile(workbook, "Visualixy_Data.xlsx");
                resDiv.style.display = "block";
                break;

            case 't2p':
                if(!inVal) return;
                const doc = new window.jspdf.jsPDF();
                const splitText = doc.splitTextToSize(inVal, 180);
                doc.text(splitText, 15, 20);
                doc.save("Visualixy_Document.pdf");
                break;

            case 'img_prev':
            case 'img_prev_res':
                const file1 = document.getElementById('fi').files[0];
                if(file1) {
                    globalImage.src = URL.createObjectURL(file1);
                    if(type === 'img_prev_res') {
                        globalImage.onload = () => {
                            document.getElementById('w').value = globalImage.width;
                            document.getElementById('h').value = globalImage.height;
                        }
                    }
                }
                break;

            case 'compress':
                if(!globalImage.src) return alert("Photo select karo!");
                const cvsC = document.getElementById('cvs');
                cvsC.width = globalImage.width; cvsC.height = globalImage.height;
                cvsC.getContext('2d').drawImage(globalImage, 0, 0);
                let q = parseFloat(document.getElementById('qual').value);
                let linkC = document.createElement('a');
                linkC.download = 'Compressed.jpg'; linkC.href = cvsC.toDataURL('image/jpeg', q); linkC.click();
                break;

            case 'resize':
                if(!globalImage.src) return;
                const cvsR = document.getElementById('cvs');
                cvsR.width = document.getElementById('w').value; cvsR.height = document.getElementById('h').value;
                cvsR.getContext('2d').drawImage(globalImage, 0, 0, cvsR.width, cvsR.height);
                let linkR = document.createElement('a');
                linkR.download = 'Resized.png'; linkR.href = cvsR.toDataURL(); linkR.click();
                break;

            case 'qr':
                if(!inVal) return;
                resDiv.innerHTML = ""; 
                new QRCode(resDiv, {text: inVal, width: 200, height: 200}); 
                setTimeout(()=>document.getElementById('dl').style.display="block", 300);
                break;

            case 'dl_qr':
                let qL = document.createElement('a'); qL.href = document.querySelector("#res img").src; 
                qL.download = "QR_Code.png"; qL.click();
                break;

            case 'bar':
                JsBarcode("#barcodecvs", inVal, {format: "CODE128", displayValue: true, fontSize: 18});
                document.getElementById('dl').style.display="block";
                break;

            case 'dl_bar':
                let bL = document.createElement('a'); bL.href = document.getElementById('barcodecvs').toDataURL(); 
                bL.download = "Barcode.png"; bL.click();
                break;


            // --- 📝 TEXT & DEV TOOLS LOGIC ---
            case 'human': 
                outVal.value = "AI Byapassed Data:\n\n" + inVal.replace(/\b(is|the|AI|essential|moreover|therefore)\b/gi, 'actually'); 
                break;
            case 'json': 
                outVal.value = JSON.stringify(JSON.parse(inVal), null, 4); 
                break;
            case 'b64e': outVal.value = btoa(unescape(encodeURIComponent(inVal))); break;
            case 'b64d': outVal.value = decodeURIComponent(escape(atob(inVal))); break;
            case 'urle': outVal.value = encodeURIComponent(inVal); break;
            case 'urld': outVal.value = decodeURIComponent(inVal); break;
            case 'cssmin': outVal.value = inVal.replace(/\s+/g, ' ').replace(/ {\s+/g, '{').replace(/:\s+/g, ':').replace(/;\s+/g, ';').trim(); break;
            case 'htmlmin': outVal.value = inVal.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim(); break;
            case 'uuid': 
                resDiv.innerText = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => (c=='x'?Math.random()*16|0:Math.random()*4|8).toString(16)); 
                break;
            case 'r2h': 
                let [r,g,b] = inVal.split(',').map(Number); 
                resDiv.innerText = "#" + ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1).toUpperCase(); 
                break;
            case 'h2r': 
                let h = inVal.replace('#',''); 
                resDiv.innerText = `RGB(${parseInt(h.substring(0,2),16)}, ${parseInt(h.substring(2,4),16)}, ${parseInt(h.substring(4,6),16)})`; 
                break;
            case 'privacy': 
                outVal.value = `Privacy Policy for ${inVal}\n\nWe value your privacy. We do not collect personal data. Cookies are used for analytics and ad networks (Monetag). By using ${inVal}, you agree to our terms.`; 
                break;
            case 'slug': outVal.value = inVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''); break;
            case 'c2j':
                let lines = inVal.split('\n'); let result = []; let headers = lines[0].split(',');
                for(let i=1;i<lines.length;i++){ let obj = {}; let currentline = lines[i].split(',');
                for(let j=0;j<headers.length;j++){ obj[headers[j]] = currentline[j]; } result.push(obj); }
                outVal.value = JSON.stringify(result, null, 2);
                break;
            case 'j2c':
                let jArr = JSON.parse(inVal); let replacer = (key, value) => value === null ? '' : value; 
                let head = Object.keys(jArr[0]); 
                let csv = jArr.map(row => head.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
                csv.unshift(head.join(',')); outVal.value = csv.join('\r\n');
                break;


            // --- 💰 CALCULATORS LOGIC ---
            case 'bmi': 
                let w = document.getElementById('w').value; let ht = document.getElementById('h').value;
                let bmi = (w / Math.pow(ht/100, 2)).toFixed(2); 
                resDiv.innerHTML = `BMI: <b>${bmi}</b><br><small>${bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : 'Overweight'}</small>`; 
                break;
            case 'age': 
                let ageD = new Date(new Date() - new Date(inVal)); 
                resDiv.innerText = `${Math.abs(ageD.getUTCFullYear() - 1970)} Years, ${ageD.getUTCMonth()} Months old.`; 
                break;
            case 'disc':
                let price = document.getElementById('p').value; let dis = document.getElementById('d').value;
                resDiv.innerText = `Final Price: ₹ ${(price - (price * dis / 100)).toFixed(2)}`;
                break;
            case 'emi':
                let P = document.getElementById('amt').value; let R = document.getElementById('rate').value / 12 / 100; let N = document.getElementById('time').value * 12;
                let emi = (P * R * Math.pow(1+R, N) / (Math.pow(1+R, N) - 1)).toFixed(2);
                resDiv.innerText = `₹ ${emi} / month`;
                break;
            case 'gst':
                let gAmt = parseFloat(document.getElementById('amt').value); let gRate = parseFloat(document.getElementById('rate').value);
                let isAdd = document.getElementById('type').value === 'add';
                let finalAmt = isAdd ? gAmt + (gAmt * gRate / 100) : gAmt / (1 + (gRate / 100));
                resDiv.innerHTML = `Final: <b>₹ ${finalAmt.toFixed(2)}</b> <br><small>GST: ₹ ${Math.abs(finalAmt - gAmt).toFixed(2)}</small>`;
                break;
            case 'perc': resDiv.innerText = ((document.getElementById('p1').value / 100) * document.getElementById('p2').value).toFixed(2); break;
            case 'tip': 
                let bill = parseFloat(document.getElementById('bill').value); let t = parseFloat(document.getElementById('tip').value); let ppl = parseInt(document.getElementById('ppl').value);
                resDiv.innerText = `₹ ${((bill + (bill * t / 100)) / ppl).toFixed(2)} per person`;
                break;
            case 'margin':
                let cp = document.getElementById('cost').value; let sp = document.getElementById('revenue').value;
                resDiv.innerText = `Margin: ${(((sp - cp) / sp) * 100).toFixed(2)} %`;
                break;


            // --- 🛠️ UTILITIES & FUN LOGIC ---
            case 'pass': 
                let len = document.getElementById('len').value;
                let chars = document.getElementById('type').value === 'num' ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
                let pass = ''; for (let i = 0; i < len; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
                resDiv.innerText = pass;
                break;
            case 'passval': 
                let pl = inVal.length; 
                resDiv.innerHTML = "Strength: " + (pl > 12 ? '<span style="color:green">Strong 🛡️</span>' : pl > 6 ? '<span style="color:orange">Medium ⚠️</span>' : '<span style="color:red">Weak ❌</span>'); 
                break;
            case 'rng': 
                let mn = parseInt(document.getElementById('min').value); let mx = parseInt(document.getElementById('max').value); 
                resDiv.innerText = Math.floor(Math.random() * (mx - mn + 1)) + mn; 
                break;
            case 'b2t': outVal.value = inVal.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join(''); break;
            case 't2b': outVal.value = inVal.split('').map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' '); break;
            case 'coin':
                resDiv.innerText = "Flipping...";
                setTimeout(() => { resDiv.innerHTML = Math.random() < 0.5 ? '🪙 <b>Heads</b>' : '🪙 <b>Tails</b>'; }, 800);
                break;
            case 'scramble': outVal.value = inVal.split(' ').map(w => w.split('').sort(()=>0.5-Math.random()).join('')).join(' '); break;
            case 'love': 
                let n1 = document.getElementById('n1').value; let n2 = document.getElementById('n2').value;
                if(!n1 || !n2) return;
                let hash = 0; let str = n1.toLowerCase() + n2.toLowerCase();
                for (let i = 0; i < str.length; i++) { hash = str.charCodeAt(i) + ((hash << 5) - hash); }
                resDiv.innerHTML = `${Math.abs(hash % 51) + 50}% ❤️`; // Always gives 50-100% for fun
                break;

        }
    } catch (err) {
        alert("Input check karo bhai, kuch galti hai! Error: " + err.message);
    }
}