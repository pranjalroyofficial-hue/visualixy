/**
 * Visualixy Master High-CPM Video & Direct Ad Engine
 * Handles Video Interstitial Modal, Adsterra Direct Link & Instant Download Delivery
 */

(function () {
    // 1. Inject Video Modal HTML & Styles on Load
    const modalHTML = `
    <div id="vxyVideoModal" class="fixed inset-0 z-[99999] hidden flex items-center justify-center bg-slate-900/85 backdrop-blur-md p-4 transition-all duration-300">
        <div class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative animate-bounce-short">
            
            <!-- Badge -->
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-wider mb-4 border border-blue-200">
                <span class="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                <span>Processing Document</span>
            </div>

            <!-- Video / Animation Container -->
            <div class="w-full bg-slate-950 rounded-2xl overflow-hidden shadow-inner mb-4 relative aspect-video flex flex-col items-center justify-center text-white p-4">
                <div class="text-4xl mb-2 animate-pulse">🎬</div>
                <p id="vxyAdTitle" class="text-xs font-bold text-slate-300">Sponsored Video Stream Loading...</p>
                
                <!-- Progress Line -->
                <div class="absolute bottom-0 left-0 h-1.5 bg-blue-500 w-full transition-all duration-1000" id="vxyProgressBar"></div>
            </div>

            <!-- Status & Countdown -->
            <h3 class="text-base font-black text-slate-900 mb-1" id="vxyStatusText">Rendering HD Output...</h3>
            <p class="text-xs text-slate-500 mb-5">Your secure file will download automatically in <b id="vxyTimer" class="text-blue-600 font-black text-sm">3</b>s</p>

            <!-- Adsterra Video Offer Direct Trigger -->
            <button id="vxyDirectAdBtn" class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2">
                <span>⚡ Fast Server Download (HD)</span>
            </button>
            
            <p class="text-[10px] text-slate-400 mt-3">100% Client-Side Privacy Guaranteed by Visualixy</p>
        </div>
    </div>
    `;

    document.addEventListener("DOMContentLoaded", function () {
        if (!document.getElementById("vxyVideoModal")) {
            document.body.insertAdjacentHTML("beforeend", modalHTML);
        }
    });

    // 2. Global Execution Function for Tools
    window.triggerToolProcessAndDownload = function (buttonElement, processText, downloadCallback) {
        const modal = document.getElementById("vxyVideoModal");
        const timerElem = document.getElementById("vxyTimer");
        const statusElem = document.getElementById("vxyStatusText");
        const progressElem = document.getElementById("vxyProgressBar");
        const directBtn = document.getElementById("vxyDirectAdBtn");

        if (statusElem) statusElem.innerText = processText || "Optimizing Document...";

        // Open Video Modal Overlay
        if (modal) modal.classList.remove("hidden");

        // Direct Link Ad URL (Adsterra Direct Link Key)
        const adDirectLink = "https://www.highperformanceformat.com/0cf435f486e59418568243ee21ba9dea";

        // Click on popup offer opens ad tab
        if (directBtn) {
            directBtn.onclick = function () {
                window.open(adDirectLink, "_blank");
            };
        }

        // Automatic popunder trigger in background
        try {
            const adWindow = window.open(adDirectLink, "_blank");
            if (adWindow) {
                adWindow.blur();
                window.focus();
            }
        } catch (e) {
            console.log("Direct link auto-trigger bypassed");
        }

        // 3-Second Countdown & Progress Bar
        let timeLeft = 3;
        if (timerElem) timerElem.innerText = timeLeft;
        if (progressElem) progressElem.style.width = "0%";

        const interval = setInterval(() => {
            timeLeft--;
            if (timerElem) timerElem.innerText = timeLeft;
            if (progressElem) progressElem.style.width = `${((3 - timeLeft) / 3) * 100}%`;

            if (timeLeft <= 0) {
                clearInterval(interval);
                
                // Hide modal
                if (modal) modal.classList.add("hidden");

                // Execute File Download
                if (typeof downloadCallback === "function") {
                    downloadCallback();
                }
            }
        }, 1000);
    };
})();