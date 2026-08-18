/**
 * Visualixy Master High-Yield Ad Engine (2026 Engine)
 * Auto 5-Min Trigger + Smart Download Sequencing
 */

(function initMasterAds() {
    // 1. Adsterra Social Bar Engine
    const adsterraScript = document.createElement('script');
    adsterraScript.src = 'https://pl30718422.effectivecpmnetwork.com/67/51/f3/6751f3240d244f4f2df902162d5031d9.js';
    adsterraScript.async = true;
    document.head.appendChild(adsterraScript);

    // 2. Monetag Vignette Engine
    const vignetteScript = document.createElement('script');
    vignetteScript.dataset.zone = '11600394';
    vignetteScript.src = 'https://n6wxm.com/vignette.min.js';
    vignetteScript.async = true;
    document.head.appendChild(vignetteScript);

    // 3. Monetag In-Page Push
    const pushScript = document.createElement('script');
    pushScript.dataset.zone = '11600405';
    pushScript.src = 'https://nap5k.com/tag.min.js';
    pushScript.async = true;
    document.head.appendChild(pushScript);

    // 4. Auto 5-Minute Recurring Video Interstitial
    setInterval(() => {
        try {
            if (window.show_8888888) window.show_8888888();
        } catch (e) {}
    }, 300000); // 5 minutes = 300,000ms
})();

/**
 * Global Sequential Ad + File Processing Trigger
 */
window.triggerToolProcessAndDownload = function(btnElement, statusText, processCallback) {
    if (!btnElement) {
        if (typeof processCallback === 'function') processCallback();
        return;
    }

    const originalText = btnElement.innerHTML;
    btnElement.disabled = true;
    
    // Step 1: Processing Status with Visual Timer
    let countdown = 3;
    btnElement.innerHTML = `<span class="inline-flex items-center gap-2"><span>⚡</span> <span>${statusText || 'Securing Output'} (${countdown}s)...</span></span>`;

    const timer = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            btnElement.innerHTML = `<span class="inline-flex items-center gap-2"><span>⚡</span> <span>${statusText || 'Securing Output'} (${countdown}s)...</span></span>`;
        } else {
            clearInterval(timer);
            btnElement.innerHTML = originalText;
            btnElement.disabled = false;
            
            // Execute actual file output logic
            if (typeof processCallback === 'function') {
                processCallback();
            }
        }
    }, 1000);
};