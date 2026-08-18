/**
 * Visualixy Clean Ad Processing Engine
 * Zero Popup Redirects • Clean In-Modal Banner • Fast User Experience
 */

(function () {
    const modalHTML = `
    <div id="vxyCleanModal" class="fixed inset-0 z-[99999] hidden flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 transition-all duration-200">
        <div class="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl text-center relative animate-scale-up">
            
            <!-- Header Tag -->
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-wider mb-3 border border-blue-200">
                <span class="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                <span id="vxyStatusText">Processing File...</span>
            </div>

            <!-- In-Modal Clean Adsterra Banner (300x250) -->
            <div class="w-full bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden mb-3 p-1 flex flex-col items-center justify-center min-h-[250px]">
                <span class="text-[9px] uppercase font-bold text-slate-400 block mb-1">Sponsored</span>
                <div class="overflow-hidden flex items-center justify-center w-full">
                    <iframe src="//www.highperformanceformat.com/watch?key=ff2ed036da6ab41cbe4fbfbeba0d55fe" width="300" height="250" frameborder="0" scrolling="no" class="rounded-xl"></iframe>
                </div>
            </div>

            <!-- Countdown Bar -->
            <div class="space-y-1">
                <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div id="vxyProgressBar" class="bg-blue-600 h-1.5 w-0 transition-all duration-1000"></div>
                </div>
                <p class="text-[11px] font-bold text-slate-500 pt-1">
                    Your file will download in <span id="vxyTimer" class="text-blue-600 font-black text-xs">3</span>s
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
                
                if (typeof downloadCallback === "function") {
                    downloadCallback();
                }
            }
        }, 1000);
    };
})();