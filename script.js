window.onload = function () {
    /* Define global variables */
    const consentBox = document.getElementById("consentBox");
    const acceptBtn = document.getElementById("consentButton");

    /* Save Cookie consent on button click */
    acceptBtn.onclick = () => {
        let cookieName = "";

        let cookiecheck_ana = document.getElementById('cookiecheck-ana'); // Analytics checkbox
        if (cookiecheck_ana.checked) {
            cookieName += "Ana";
        }
        let cookiecheck_pub = document.getElementById('cookiecheck-pub'); // Publicity/Ads/Marketing checkbox
        if (cookiecheck_pub.checked) {
            cookieName += "Pub";
        }

        document.cookie = "primBanner=" + cookieName + "; max-age=" + 60 * 60 * 24 * 365; //cookie will expire after one year (365 days)
        if (document.cookie) {
            document.body.style.overflow = "auto"; // make the body scrollable
            consentBox.classList.add("hide"); // hide the cookie consent box
            addConsentScripts(); // add scripts based on given consent
        } else {
            alert("The cookie cannot be set! Please unblock this site from your browser's cookie settings.");
        }
    };

    /* Show/Hide Cookie consent box */
    let checkCookie = document.cookie.indexOf("primBanner=");
    if (checkCookie == -1) { // if cookie does not exist
        consentBox.classList.remove("hide"); // show the cookie consent box
        document.body.style.overflow = "hidden"; // freeze the body so it can not be scrollable
    } else {
        consentBox.classList.add("hide"); // hide the cookie consent box
        document.body.style.overflow = "auto"; // make the body scrollable
    }

    /* Add scripts (ads, analytics) based on given consent */
    function addConsentScripts() {
        let enableBoth = document.cookie.indexOf("primBanner=AnaPub");
        let enableAnalytics = document.cookie.indexOf("primBanner=Ana");
        let enablePublicity = document.cookie.indexOf("primBanner=Pub");

        // Google Analytics, HubSpot, etc.
        if (enableBoth !== -1 || enableAnalytics !== -1) {
            var analyticsScript = document.createElement("script");
            // add your analytics script (Google Analytics, HubSpot, etc.) below, between the backtics (replace the console.log line)
            analyticsScript.text = `
        console.log('Analytics is activated!')
        `;
            document.body.append(analyticsScript);
        }

        // Facebook Pixel, Google AdSense, etc.
        if (enableBoth !== -1 || enablePublicity !== -1) {
            var publicityScrips = document.createElement("script");
            // add your publicity/ads/marketing script (AdSense, Meta Pixel, etc.) below, between the backtics (replace the console.log line)
            publicityScrips.text = `
        console.log('Publicity is activated!')
        `;
            document.body.append(publicityScrips);
        }
    }
    addConsentScripts();
}