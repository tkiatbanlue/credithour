const activities = [
    { category: "READING, LECTURE, STUDY TIME", name: "Light reading (tradebooks, etc.)", minutes: 4, quantifier: "per page", placeholderKey: "number-of-pages" },
    { category: "READING, LECTURE, STUDY TIME", name: "Textbook Reading", minutes: 6, quantifier: "per page", placeholderKey: "number-of-pages" },
    { category: "READING, LECTURE, STUDY TIME", name: "Heavy reading (scholarly articles)", minutes: 12, quantifier: "per page", placeholderKey: "number-of-pages" },
    { category: "READING, LECTURE, STUDY TIME", name: "Devotionals", minutes: 10, quantifier: "per article", placeholderKey: "number-of-devotionals" },
    { category: "READING, LECTURE, STUDY TIME", name: "Review of Faculty Feedback", minutes: 15, quantifier: "per assignment", placeholderKey: "number-of-assignments" },
    { category: "ONLINE DISCUSSIONS AND COLLABORATION", name: "Initial Discussion Forum Post", minutes: 60, quantifier: "per initial post", placeholderKey: "number-of-posts" },
    { category: "ONLINE DISCUSSIONS AND COLLABORATION", name: "Discussion Forum Response", minutes: 60, quantifier: "per peer response", placeholderKey: "number-of-responses" },
    { category: "ONLINE DISCUSSIONS AND COLLABORATION", name: "Blog", minutes: 60, quantifier: "per blog entry", placeholderKey: "number-of-entries" },
    { category: "ONLINE DISCUSSIONS AND COLLABORATION", name: "Group Discussion", minutes: 60, quantifier: "per discussion", placeholderKey: "number-of-discussions" },
    { category: "ONLINE DISCUSSIONS AND COLLABORATION", name: "Group Collaboration", minutes: 120, quantifier: "per week of collaboration", placeholderKey: "number-of-collaborations" },
    { category: "ONLINE DISCUSSIONS AND COLLABORATION", name: "Peer Review of Papers/Presentation", minutes: 30, quantifier: "per item", placeholderKey: "number-of-reviews" },
    { category: "ASSESSMENTS", name: "Quizzes - Closed Book", minutes: 0.5, quantifier: "per question", placeholderKey: "number-of-questions" },
    { category: "ASSESSMENTS", name: "Quizzes - Open Book", minutes: 3, quantifier: "per question", placeholderKey: "number-of-questions" },
    { category: "ASSESSMENTS", name: "Quizzes - Essay Response", minutes: 15, quantifier: "per question", placeholderKey: "number-of-questions" },
    { category: "ASSESSMENTS", name: "Porfolio", minutes: 30, quantifier: "per item", placeholderKey: "number-of-artifacts" },
    { category: "ASSESSMENTS", name: "Presentation (no narration)", minutes: 15, quantifier: "per slide", placeholderKey: "number-of-slides" },
    { category: "ASSESSMENTS", name: "Multimedia Presentation (narrated)", minutes: 45, quantifier: "per slide", placeholderKey: "number-of-slides" },
    { category: "ASSESSMENTS", name: "Research Paper", minutes: 180, quantifier: "per page", placeholderKey: "number-of-pages" },
    { category: "ASSESSMENTS", name: "Case Study Analysis/Synthesis Essay", minutes: 45, quantifier: "per page", placeholderKey: "number-of-pages" },
    { category: "ASSESSMENTS", name: "Reflective Paper, Journal", minutes: 30, quantifier: "per page", placeholderKey: "number-of-pages" },
    { category: "ASSESSMENTS", name: "Math Problem, Statistical Analysis", minutes: 20, quantifier: "per problem", placeholderKey: "number-of-problems" },
    { category: "ASSESSMENTS", name: "Science Experiment Analysis", minutes: 60, quantifier: "per page", placeholderKey: "number-of-pages" },
    { category: "SEAT TIME REQUIREMENTS", name: "Face-to-Face Classtime", minutes: 1, quantifier: "minutes", placeholderKey: "enter-minutes" },
    { category: "SEAT TIME REQUIREMENTS", name: "Online Classroom and Syllabus Review (60 minutes)", minutes: 60, quantifier: "per course", placeholderKey: "number-of-courses" },
    { category: "SEAT TIME REQUIREMENTS", name: "Completion of End-of-Course Survey (30 minutes)", minutes: 30, quantifier: "per course", placeholderKey: "number-of-courses" },
];

document.addEventListener('DOMContentLoaded', () => {
    const activitiesSection = document.getElementById('activities-section');
    const form = document.getElementById('credit-hour-form');
    const creditsInput = document.getElementById('credits');
    const studyWeeksInput = document.getElementById('study-weeks');
    const langToggleButton = document.getElementById('lang-toggle');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    let currentLang = 'th';

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }

    // Dark mode toggle functionality
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.textContent = '🌙';
        }
    });

    const categories = {};

    activities.forEach((activity, index) => {
        if (!categories[activity.category]) {
            categories[activity.category] = [];
        }
        categories[activity.category].push(activity);
    });

    for (const category in categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('activity-category');

        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category;
        categoryTitle.dataset.translationKey = category;
        categoryDiv.appendChild(categoryTitle);

        categories[category].forEach(activity => {
            const activityDiv = document.createElement('div');
            activityDiv.classList.add('activity');

            const label = document.createElement('label');
            label.textContent = activity.name;
            label.dataset.translationKey = activity.name;
            activityDiv.appendChild(label);

            const input = document.createElement('input');
            input.type = 'number';
            input.min = 0;
            input.dataset.minutes = activity.minutes;
            input.dataset.name = activity.name;
            input.placeholder = translations[currentLang][activity.placeholderKey];
            activityDiv.appendChild(input);

            const quantifierKey = activity.quantifier.replace(/ /g, '-');
            const quantifierLabel = document.createElement('label');
            quantifierLabel.textContent = `(${translations[currentLang][quantifierKey]})`;
            quantifierLabel.dataset.translationKey = quantifierKey;
            activityDiv.appendChild(quantifierLabel);

            categoryDiv.appendChild(activityDiv);
        });

        activitiesSection.appendChild(categoryDiv);
    }

    form.addEventListener('input', calculateTotals);
    creditsInput.addEventListener('input', calculateTotals);
    studyWeeksInput.addEventListener('input', calculateTotals);

    function calculateTotals() {
        let totalMinutes = 0;
        const inputs = activitiesSection.querySelectorAll('input[type="number"]');
        const studyWeeks = studyWeeksInput.value || 0;
        const faceToFaceClasstimeInput = document.querySelector('input[data-name="Face-to-Face Classtime"]');
        const faceToFaceClasstimeMinutes = (faceToFaceClasstimeInput.value || 0) * studyWeeks;

        inputs.forEach(input => {
            if (input.value && input.dataset.name !== "Face-to-Face Classtime") {
                let minutes = input.dataset.minutes;
                totalMinutes += input.value * minutes;
            }
        });

        totalMinutes += faceToFaceClasstimeMinutes;

        const totalHours = totalMinutes / 60;
        const credits = document.getElementById('credits').value || 0;
        const hoursPerCredit = credits > 0 ? totalHours / credits : 0;

        document.getElementById('total-minutes').textContent = totalMinutes.toFixed(2);
        document.getElementById('total-hours').textContent = totalHours.toFixed(2);
        document.getElementById('hours-per-credit').textContent = hoursPerCredit.toFixed(2);
    }

    document.getElementById('reset-btn').addEventListener('click', () => {
        form.reset();
        calculateTotals();
    });

    document.getElementById('pdf-btn').addEventListener('click', () => {
        // Basic implementation for PDF export
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const courseName = document.getElementById('course-name').value || 'Course';
        const courseCode = document.getElementById('course-code').value || 'Code';
        
        // Create a filename using course code and name
        const fileName = `${courseCode}_${courseName.replace(/[^a-zA-Z0-9\u0E00-\u0E7F]/g, '_')}_Credit_Hour_Report.pdf`;

        // Set up document properties
        doc.setFont("Sarabun-Regular");
        doc.setFontSize(12);

        // Set title based on current language
        const reportTitle = currentLang === 'th' ? 'รายงานการคำนวณชั่วโมงหน่วยกิต' : 'Credit Hour Calculation Report';
        doc.setFontSize(16);
        // Use Sarabun font for both languages
        doc.setFont("Sarabun-Regular");
        doc.text(reportTitle, 20, 20);
        doc.setFontSize(12);
        doc.setFont("Sarabun-Regular");

        // Course information
        const courseNameLabel = currentLang === 'th' ? 'ชื่อวิชา:' : 'Course Name:';
        const courseCodeLabel = currentLang === 'th' ? 'รหัสวิชา:' : 'Course Code:';
        const creditsLabel = currentLang === 'th' ? 'หน่วยกิต:' : 'Credits:';
        const studyWeeksLabel = currentLang === 'th' ? 'จำนวนสัปดาห์ที่เรียน:' : 'Number of Study Weeks:';

        doc.text(`${courseNameLabel} ${courseName}`, 20, 30);
        doc.text(`${courseCodeLabel} ${courseCode}`, 20, 40);
        doc.text(`${creditsLabel} ${document.getElementById('credits').value}`, 20, 50);
        doc.text(`${studyWeeksLabel} ${document.getElementById('study-weeks').value}`, 20, 60);

        let y = 80;
        const activitiesLabel = currentLang === 'th' ? 'กิจกรรม' : 'Activities';
        doc.setFontSize(14);
        doc.setFont("Sarabun-Regular");
        doc.text(activitiesLabel, 20, y);
        doc.setFontSize(12);
        doc.setFont("Sarabun-Regular");
        y += 10;

        const inputs = activitiesSection.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            if (input.value && input.value > 0) {
                const activityName = input.parentElement.querySelector('label').textContent;
                
                // Handle text wrapping for long activity names
                const text = `${activityName}: ${input.value}`;
                const splitText = doc.splitTextToSize(text, 170); // 170mm width for wrapping
                
                // Check if we need a new page
                if (y + (splitText.length * 10) > 280) {
                    doc.addPage();
                    y = 20;
                    // Set font for new page
                    doc.setFont("Sarabun-Regular");
                }
                
                // Add each line of wrapped text
                splitText.forEach((line, index) => {
                    doc.setFont("Sarabun-Regular");
                    doc.text(line, 20, y + (index * 10));
                });
                
                // Update y position based on number of lines
                y += splitText.length * 10 + 2;
            }
        });

        // Ensure we have enough space for summary
        if (y > 240) {
            doc.addPage();
            y = 20;
            // Set font for new page
            doc.setFont("Sarabun-Regular");
        }

        y += 10;
        const totalMinutesLabel = currentLang === 'th' ? 'นาทีรวม:' : 'TOTAL MINUTES:';
        const totalHoursLabel = currentLang === 'th' ? 'ชั่วโมงรวม:' : 'TOTAL HOURS:';
        const hoursPerCreditLabel = currentLang === 'th' ? 'ชั่วโมงต่อหน่วยกิต:' : 'HOURS PER CREDIT:';

        doc.setFontSize(14);
        doc.setFont("Sarabun-Regular");
        doc.text(`${totalMinutesLabel} ${document.getElementById('total-minutes').textContent}`, 20, y);
        y += 10;
        doc.setFont("Sarabun-Regular");
        doc.text(`${totalHoursLabel} ${document.getElementById('total-hours').textContent}`, 20, y);
        y += 10;
        doc.setFont("Sarabun-Regular");
        doc.text(`${hoursPerCreditLabel} ${document.getElementById('hours-per-credit').textContent}`, 20, y);
        doc.setFontSize(12);

        doc.save(fileName);
    });

    function setLanguage(lang) {
        document.querySelectorAll('[data-translation-key]').forEach(element => {
            const key = element.dataset.translationKey;
            element.textContent = translations[lang][key];
        });

        document.querySelector('h1').textContent = translations[lang]['credit-hour-calculator'];
        document.querySelector('h2').textContent = translations[lang]['course-information'];
        document.querySelector('label[for="course-name"]').textContent = translations[lang]['course-name'];
        document.querySelector('label[for="course-code"]').textContent = translations[lang]['course-code'];
        document.querySelector('label[for="credits"]').textContent = translations[lang]['credits'];
        document.querySelector('label[for="study-weeks"]').textContent = translations[lang]['number-of-study-weeks'];
        document.getElementById('activities-section').querySelector('h2').textContent = translations[lang]['activities'];
        document.getElementById('reset-btn').textContent = translations[lang]['reset-form'];
        document.getElementById('pdf-btn').textContent = translations[lang]['export-to-pdf'];
        document.getElementById('summary-section').querySelector('h2').textContent = translations[lang]['summary'];
        langToggleButton.textContent = lang === 'en' ? translations.en['switch-to-thai'] : translations.th['switch-to-english'];

        document.querySelectorAll('.activity').forEach(activityDiv => {
            const input = activityDiv.querySelector('input');
            const quantifierLabel = activityDiv.querySelectorAll('label')[1];
            const activityName = input.dataset.name;
            const activity = activities.find(a => a.name === activityName);
            const quantifierKey = activity.quantifier.replace(/ /g, '-');

            input.placeholder = translations[lang][activity.placeholderKey];
            quantifierLabel.textContent = `(${translations[lang][quantifierKey]})`;
        });
    }

    langToggleButton.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'th' : 'en';
        setLanguage(currentLang);
    });

    // Set initial language
    setLanguage(currentLang);
    
    // Set dark mode toggle icon based on current mode
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☀️';
    } else {
        darkModeToggle.textContent = '🌙';
    }
});
