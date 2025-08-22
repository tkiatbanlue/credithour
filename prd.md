## Product Requirements Document: The "Credit Hour Calculator" Web App

| **Attribute**   | **Details**                                             |
| --------------- | ------------------------------------------------------- |
| **Product**     | Credit Hour Calculator                                  |
| **Version**     | **1.6 (Feature Enhancement)**                           |
| **Status**     | **Active**                                              |
| **Author**      | Product Management                                      |
| **Last Updated**| 2025-08-22                                          |

### **Revision History**
| Version | Date       | Author | Notes                                         |
| :------ | :--------- | :----- | :-------------------------------------------- |
| 1.0     | 2025-08-22 | PM     | Initial draft based on focused objectives.  |
| 1.1     | 2025-08-22 | PM     | Added Appendix A with complete activity data. |
| 1.2     | 2025-08-22 | PM     | Updated Appendix A with corrections based on implementation. |
| 1.3     | 2025-08-22 | PM     | Updated with additional features and implementation details. |
| 1.4     | 2025-08-22 | PM     | Updated Appendix A to match implementation; Added improved PDF generation and Thai font support. |
| 1.5     | 2025-08-22 | PM     | Fixed PDF output for Thai characters; Enhanced PDF filename with course code and name. |
| 1.6     | 2025-08-22 | PM     | Made Thai the default language; Ensured English PDFs use the same font as Thai. |

### 1. Overview & Vision

**(This section remains unchanged)**

*   **1.1. The Problem:** Educators need a simple, reliable way to calculate student workload. The current spreadsheet method is clunky, error-prone, and not universally accessible.
*   **1.2. The Solution:** A single-page web application that provides an interactive form for calculating `Total Hours` and `Hours per Credit` instantly and accurately.
*   **1.3. The Vision:** To be the frictionless, go-to tool for any educator needing to perform a credit hour calculation.

### 2. Objectives & Success Metrics

**(Updated to include new features)**

| Objective ID | Objective Statement                               | Key Metric(s)                                                                    |
| :----------- | :------------------------------------------------ | :------------------------------------------------------------------------------- |
| OBJ-1        | **Provide Universal Access**                      | 100% functionality on modern browsers; Responsive design for desktop and mobile. |
| OBJ-2        | **Deliver Instant & Accurate Calculations**       | Totals update in real-time (<100ms); Calculations are 100% accurate per **Appendix A**. |
| OBJ-3        | **Enable Easy Reporting**                         | One-click generation of a clean, printable PDF report.                           |
| OBJ-4        | **Support Internationalization**                  | Full support for English and Thai languages with easy switching.                 |

### 3. User Persona & Stories

**(Updated to include internationalization)**

*   *As a Professor,* I want to open a webpage, fill in my course activities from a complete list, and immediately see the `Total Hours`.
*   *As a Professor,* I want the `Hours per Credit` to be calculated for me automatically.
*   *As a Professor,* I want to download or print a simple report of my entries and the final calculation.
*   *As a Professor,* I want to use the application in my preferred language (English or Thai).

### 4. Scope & Features (MVP)

**(Updated to include internationalization)**

| Feature Epic                        | In Scope for MVP                                                                                                                                                                                            | Out of Scope for MVP                                                                                                                               |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **E1: Interactive Calculator Form** | <ul><li>A single-page web form.</li><li>Clear input fields for course metadata.</li><li>**The form must be dynamically generated from the complete master data list in Appendix A.**</li><li>Support for English and Thai languages.</li></ul> | <ul><li>Adding or editing activity types in the UI.</li><li>Saving form data to a server.</li></ul>                                             |
| **E2: Real-time Totals Display**    | <ul><li>A summary section that is always visible.</li><li>Displays `TOTAL MINUTES`, `TOTAL HOURS`, and `HOURS PER CREDIT`.</li><li>Values update instantly.</li><li>Color-coded feedback on the `TOTAL HOURS`.</li></ul> | <ul><li>Historical tracking of calculations.</li></ul>                                                                                             |
| **E3: Reporting & Utilities**       | <ul><li>"Reset Form" and "Export to PDF" buttons.</li><li>Language toggle button for switching between English and Thai.</li></ul>                                                                                                                                                 | <ul><li>**AI-powered analysis and suggestions.**</li><li>**User accounts.**</li><li>**Database integration.**</li><li>Directly emailing the report.</li></ul> |

### 5. Technical Architecture & Implementation Notes

#### **5.1. Frontend**
*   **Technology**: Vanilla HTML, CSS, and JavaScript are sufficient.
*   **Data Structure**: **The application's core data MUST be an array of objects derived directly from the master list in Appendix A.** This data will be used to dynamically generate the form on page load.
    ```javascript
    // Example structure in script.js
    const activities = [
      { category: "READING...", name: "Light reading...", minutes: 4, quantifier: "per page" },
      // ... all other activities from Appendix A
    ];
    ```
*   **Internationalization**: The application supports English and Thai languages through a translation system. All UI text elements should use translation keys.
*   **PDF Generation**: The application uses jsPDF library for generating PDF reports.

#### **5.2. Backend**
*   **No backend server is required.** The application will be a static website.

---

### Appendix A: Core Activity Data

This table is the single source of truth for all activities, categories, and time calculations. The web application **must** implement every item listed here.

| Category                                  | Activity Name                               | Minutes | Quantifier                  |
| :---------------------------------------- | :------------------------------------------ | :------ | :-------------------------- |
| **READING, LECTURE, STUDY TIME**          | Light reading (tradebooks, etc.)            | 4       | per page                    |
|                                           | Textbook Reading                            | 6       | per page                    |
|                                           | Heavy reading (scholarly articles)          | 12      | per page                    |
|                                           | Devotionals                                 | 10      | per article                 |
|                                           | Review of Faculty Feedback                  | 15      | per assignment              |
| **ONLINE DISCUSSIONS AND COLLABORATION**  | Initial Discussion Forum Post               | 60      | per initial post            |
|                                           | Discussion Forum Response                   | 60      | per peer response           |
|                                           | Blog                                        | 60      | per blog entry              |
|                                           | Group Discussion                            | 60      | per discussion              |
|                                           | Group Collaboration                         | 120     | per week of collaboration   |
|                                           | Peer Review of Papers/Presentation          | 30      | per item                    |
| **ASSESSMENTS**                           | Quizzes - Closed Book                       | 0.5     | per question                |
|                                           | Quizzes - Open Book                         | 3       | per question                |
|                                           | Quizzes - Essay Response                    | 15      | per question                |
|                                           | Porfolio                                    | 30      | per item                    |
|                                           | Presentation (no narration)                 | 15      | per slide                   |
|                                           | Multimedia Presentation (narrated)          | 45      | per slide                   |
|                                           | Research Paper                              | 180     | per page                    |
|                                           | Case Study Analysis/Synthesis Essay         | 45      | per page                    |
|                                           | Reflective Paper, Journal                   | 30      | per page                    |
|                                           | Math Problem, Statistical Analysis          | 20      | per problem                 |
|                                           | Science Experiment Analysis                 | 60      | per page                    |
| **SEAT TIME REQUIREMENTS**                | Face-to-Face Classtime                      | 1       | minutes                     |
|                                           | Online Classroom and Syllabus Review (60 minutes) | 60      | per course                  |
|                                           | Completion of End-of-Course Survey (30 minutes) | 30      | per course                  |

***Note 1:*** *The original spreadsheet value for "Quizzes - Essay Response" was blank. A reasonable default of 15 minutes has been assigned for the purpose of this application. This should be confirmed if possible.*
***Note 2:*** *The "Face-to-Face Classtime" activity is handled differently in the implementation. Instead of having a fixed time per week, it is implemented as a direct input for minutes, which is then multiplied by the number of study weeks.*
***Note 3:*** *Several quantifiers have been updated for better clarity in the implementation: "per devotional" is now "per article", "per artifact" is now "per item", and "per peer review" is now "per item".*
***Note 4:*** *The application includes full internationalization support for English and Thai languages.*
***Note 5:*** *The application now includes improved PDF generation with custom filenames and Thai font support.**
