/**
 * Visualixy Master Non-Intrusive Monetization Engine
 * Zero Tab Redirects • High Impression Density • Monetag + Adsterra Hybrid
 */

(function () {
    // 1. Inject Clean Processing Modal
    const modalHTML = `
    <div id="vxyCleanModal" class="fixed inset-0 z-[99999] hidden flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 transition-all duration-200">
        <div class="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl text-center relative">
            
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-wider mb-3 border border-blue-200">
                <span class="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                <span id="vxyStatusText">Processing File...</span>
            </div>

            <!-- In-Modal Clean Ad Slot (Monetag / Adsterra Clean Frame) -->
            <div class="w-full bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden mb-3 p-1 flex flex-col items-center justify-center min-h-[250px] relative">
                <span class="text-[9px] uppercase font-bold text-slate-400 block mb-1">Sponsored Advertisement</span>
                <div id="vxyAdSlot" class="w-full flex items-center justify-center overflow-hidden">
                    <iframe src="//www.highperformanceformat.com/watch?key=ff2ed036da6ab41cbe4fbfbeba0d55fe" width="300" height="250" frameborder="0" scrolling="no" class="rounded-xl"></iframe>
                </div>
            </div>

            <!-- 3s Countdown & Progress Bar -->
            <div class="space-y-1">
                <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div id="vxyProgressBar" class="bg-blue-600 h-1.5 w-0 transition-all duration-1000"></div>
                </div>
                <p class="text-[11px] font-bold text-slate-500 pt-1">
                    Direct download starts in <span id="vxyTimer" class="text-blue-600 font-black text-xs">3</span>s
                </p>
            </div>

        </div>
    </div>
    `;

    document.addEventListener("DOMContentLoaded", function () {
        if (!document.getElementById("vxyCleanModal")) {
            document.body.insertAdjacentHTML("beforeend", modalHTML);
        }
    });

    // 2. Safe Trigger Engine (Zero Popups, Zero Redirects)
    window.triggerToolProcessAndDownload = function (buttonElement, processText, downloadCallback) {
        const modal = document.getElementById("vxyCleanModal");
        const timerElem = document.getElementById("vxyTimer");
        const statusElem = document.getElementById("vxyStatusText");
        const progressElem = document.getElementById("vxyProgressBar");

        if (statusElem) statusElem.innerText = processText || "Rendering Output...";
        if (modal) modal.classList.remove("hidden");

        let timeLeft = 3;
        if (timerElem) timerElem.innerText = timeLeft;
        if (progressElem) progressElem.style.width = "0%";

        const interval = setInterval(() => {
            timeLeft--;
            if (timerElem) timerElem.innerText = timeLeft;
            if (progressElem) progressElem.style.width = `${((3 - timeLeft) / 3) * 100}%`;

            if (timeLeft <= 0) {
                clearInterval(interval);
                if (modal) modal.classList.add("hidden");
                
                // Execute direct download on the same screen
                if (typeof downloadCallback === "function") {
                    downloadCallback();
                }
            }
        }, 1000);
    };
})();