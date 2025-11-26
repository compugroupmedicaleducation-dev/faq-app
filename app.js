// ===================================================================
//  FAQ APP – laad FAQ-data dynamisch uit data.json
// ===================================================================

let FAQ = []; // Wordt gevuld vanuit data.json

document.addEventListener("DOMContentLoaded", () => {
    loadFAQ();
});

// ---------------------------------------------------------------
// 1. Laad data.json
// ---------------------------------------------------------------
function loadFAQ() {
    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Kan data.json niet laden");
            }
            return response.json();
        })
        .then(data => {
            FAQ = data;
            initFAQ();
        })
        .catch(error => {
            console.error("Fout bij laden JSON:", error);
            document.querySelector("#faq-container").innerHTML =
                "<p style='color:red;'>Kon de FAQ-data niet laden.</p>";
        });
}

// ---------------------------------------------------------------
// 2. Initialiseer FAQ functionaliteit
// ---------------------------------------------------------------
function initFAQ() {
    const searchInput = document.getElementById("searchInput");
    const faqList = document.getElementById("faqList");

    renderFAQ(FAQ);

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = FAQ.filter(item =>
            item.vraag.toLowerCase().includes(query) ||
            item.antwoord.toLowerCase().includes(query) ||
            item.keywords.some(kw => kw.toLowerCase().includes(query))
        );

        renderFAQ(filtered);
    });
}

// ---------------------------------------------------------------
// 3. FAQ weergave
// ---------------------------------------------------------------
function renderFAQ(list) {
    const faqList = document.getElementById("faqList");
    faqList.innerHTML = "";

    if (list.length === 0) {
        faqList.innerHTML = "<p>Geen resultaten gevonden.</p>";
        return;
    }

    list.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("faq-item");

        div.innerHTML = `
            <button class="faq-question">${item.vraag}</button>
            <div class="faq-answer">
                <p>${item.antwoord}</p>
            </div>
        `;

        faqList.appendChild(div);
    });

    bindFAQToggle();
}

// ---------------------------------------------------------------
// 4. Open/dicht klappen van vragen
// ---------------------------------------------------------------
function bindFAQToggle() {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(btn => {
        btn.addEventListener("click", () => {
            const answer = btn.nextElementSibling;
            answer.classList.toggle("open");
        });
    });
}
