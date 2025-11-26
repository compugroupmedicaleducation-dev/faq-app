// ===================================================================
//  FAQ APP – leest data.json en koppelt aan jouw HTML UI
// ===================================================================

let FAQ = [];

// Start zodra pagina geladen is
document.addEventListener("DOMContentLoaded", () => {
    loadFAQ();
});

// ---------------------------------------------------------------
// 1. JSON laden
// ---------------------------------------------------------------
function loadFAQ() {
    fetch("https://compugroupmedicaleducation-dev.github.io/faq-app/data.json")
        .then(res => {
            if (!res.ok) throw new Error("Kan data.json niet laden");
            return res.json();
        })
        .then(data => {
            FAQ = data;
            document.getElementById("faqCount").textContent = FAQ.length;
            initSearch();
        })
        .catch(err => {
            console.error(err);
            alert("Kon de FAQ-data niet laden.");
        });
}

// ---------------------------------------------------------------
// 2. Zoek functionaliteit
// ---------------------------------------------------------------
function initSearch() {
    const input = document.getElementById("q");
    const chips = document.getElementById("chips");

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();
        chips.innerHTML = "";

        if (query.length === 0) {
            hideAnswer();
            return;
        }

        const matches = FAQ.filter(item =>
            item.vraag.toLowerCase().includes(query) ||
            item.antwoord.toLowerCase().includes(query) ||
            item.keywords.some(k => k.toLowerCase().includes(query))
        ).slice(0, 8); // max 8 suggesties

        matches.forEach(item => {
            const chip = document.createElement("button");
            chip.className = "chip";
            chip.textContent = item.vraag;
            chip.onclick = () => showAnswer(item);
            chips.appendChild(chip);
        });

        if (matches.length === 0) hideAnswer();
    });
}

// ---------------------------------------------------------------
// 3. Toon antwoord
// ---------------------------------------------------------------
function showAnswer(item) {
    document.getElementById("answer").style.display = "block";
    document.getElementById("answerTitle").textContent = item.vraag;
    document.getElementById("answerText").innerHTML = item.antwoord;
}

// ---------------------------------------------------------------
// 4. Verberg antwoord
// ---------------------------------------------------------------
function hideAnswer() {
    document.getElementById("answer").style.display = "none";
}
