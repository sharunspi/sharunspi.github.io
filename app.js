/* Sharun K K - Portfolio JavaScript Logic */

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initPronunciation();
    initIpaWidget();
    initProjectFilter();
    initSolidPlaybook();
    initTerminal();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Check local storage or default to dark
    const savedTheme = localStorage.getItem("portfolio-theme") || "theme-dark";
    body.className = savedTheme;
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener("click", () => {
        if (body.classList.contains("theme-dark")) {
            body.classList.replace("theme-dark", "theme-light");
            localStorage.setItem("portfolio-theme", "theme-light");
            updateThemeIcon("theme-light");
        } else {
            body.classList.replace("theme-light", "theme-dark");
            localStorage.setItem("portfolio-theme", "theme-dark");
            updateThemeIcon("theme-dark");
        }
        
        // Log to terminal if initialized
        logToTerminalSystem("Theme swapped by user action.");
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector("#theme-toggle i");
    if (!icon) return;
    if (theme === "theme-light") {
        icon.className = "fa-solid fa-moon";
    } else {
        icon.className = "fa-solid fa-sun";
    }
}

/* ==========================================================================
   2. Pronunciation Feature (Web Speech API)
   ========================================================================== */
function initPronunciation() {
    const speakBtn = document.getElementById("pronounce-name-btn");
    
    speakBtn.addEventListener("click", () => {
        if ('speechSynthesis' in window) {
            // Cancel any active speech
            window.speechSynthesis.cancel();
            
            // Create utterance for "Sharun K K"
            const utterance = new SpeechSynthesisUtterance("Sharun K K");
            utterance.rate = 0.85; // slightly slower for clarity
            utterance.pitch = 1.0;
            
            // Try to find a nice English voice
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice => 
                voice.lang.includes("en-US") || voice.lang.includes("en-GB") || voice.lang.includes("en-IN")
            );
            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }
            
            window.speechSynthesis.speak(utterance);
            
            // Simple animation bump
            speakBtn.classList.add("speaking");
            setTimeout(() => speakBtn.classList.remove("speaking"), 1000);
        } else {
            alert("Speech synthesis is not supported in this browser.");
        }
    });
}

/* ==========================================================================
   3. IPA Phonetic Converter Widget (Direct Demonstration)
   ========================================================================== */
// Static dictionary of common words for precise transcription
const IPA_DICTIONARY = {
    "hello": "həˈloʊ",
    "world": "wɜrld",
    "sharun": "ʃəˈruːn",
    "open": "ˈoʊpən",
    "source": "sɔrs",
    "code": "koʊd",
    "developer": "dɪˈvɛləpər",
    "software": "ˈsɔftˌwɛr",
    "engineering": "ˌɛnʤəˈnɪrɪŋ",
    "healthcare": "ˈhɛlθˌkɛr",
    "solid": "ˈsɑlɪd",
    "principles": "ˈprɪnsəpəlz",
    "unique": "juˈnik",
    "portfolio": "pɔrtˈfoʊliˌoʊ",
    "github": "ˈɡɪtˌhʌb",
    "python": "ˈpaɪθɑn",
    "javascript": "ˈʤævəˌskrɪpt",
    "django": "ˈʤæŋɡoʊ",
    "react": "riˈækt",
    "website": "ˈwɛbˌsaɪt",
    "architecture": "ˈɑrkəˌtɛkʧər",
    "telehealth": "ˈtɛlɪˌhɛlθ",
    "care": "kɛr",
    "hospital": "ˈhɑspɪtəl",
    "patient": "ˈpeɪʃənt",
    "data": "ˈdeɪtə",
    "system": "ˈsɪstəm",
    "design": "dɪˈzaɪn",
    "build": "bɪld",
    "create": "kriˈeɪt",
    "clean": "klin",
    "fast": "fæst",
    "responsive": "rɪˈspɑnsɪv",
    "love": "lʌv",
    "me": "mi",
    "you": "ju",
    "computer": "kəmˈpjutər",
    "science": "ˈsaɪəns",
    "web": "wɛb",
    "digital": "ˈdɪʤətəl",
    "infrastructure": "ˈɪnfrəˌstrʌkʧər",
    "telemetry": "təˈlɛmɪtri",
    "database": "ˈdeɪtəˌbeɪs",
    "docker": "ˈdɑkər",
    "container": "kənˈteɪnər"
};

// Algorithmic rules fallback for words not in our dictionary
function transcribeWordToIpa(word) {
    word = word.toLowerCase().trim().replace(/[^a-z]/g, "");
    if (!word) return "";
    
    // Check dictionary
    if (IPA_DICTIONARY[word]) {
        return IPA_DICTIONARY[word];
    }
    
    // Apply heuristic translation rules to approximate English-to-IPA mapping
    let ipa = word;
    
    // Pre-processing digraphs
    ipa = ipa.replace(/tion/g, "ʃən");
    ipa = ipa.replace(/sion/g, "ʒən");
    ipa = ipa.replace(/ther/g, "ðər");
    ipa = ipa.replace(/the/g, "ði");
    ipa = ipa.replace(/sh/g, "ʃ");
    ipa = ipa.replace(/ch/g, "ʧ");
    ipa = ipa.replace(/th/g, "θ");
    ipa = ipa.replace(/ph/g, "f");
    ipa = ipa.replace(/ng/g, "ŋ");
    ipa = ipa.replace(/gh/g, "f"); // rough approx (rough, laugh)
    ipa = ipa.replace(/qu/g, "kw");
    
    // Vowels clusters
    ipa = ipa.replace(/ee/g, "i");
    ipa = ipa.replace(/oo/g, "u");
    ipa = ipa.replace(/ea/g, "i");
    ipa = ipa.replace(/ai/g, "eɪ");
    ipa = ipa.replace(/ay/g, "eɪ");
    ipa = ipa.replace(/ou/g, "aʊ");
    ipa = ipa.replace(/ow/g, "aʊ");
    ipa = ipa.replace(/oi/g, "ɔɪ");
    ipa = ipa.replace(/oy/g, "ɔɪ");
    ipa = ipa.replace(/oa/g, "oʊ");
    
    // Single vowels approximations based on surrounding consonants
    ipa = ipa.replace(/a/g, "æ");
    ipa = ipa.replace(/e/g, "ɛ");
    ipa = ipa.replace(/i/g, "ɪ");
    ipa = ipa.replace(/o/g, "ɑ");
    ipa = ipa.replace(/u/g, "ʌ");
    
    // Post-consonants corrections
    ipa = ipa.replace(/c/g, "k");
    ipa = ipa.replace(/ck/g, "k");
    ipa = ipa.replace(/x/g, "ks");
    ipa = ipa.replace(/y/g, "j");
    ipa = ipa.replace(/w/g, "w");
    
    // Ending corrections
    if (ipa.endsWith("ɛ")) {
        // Silent e rule
        ipa = ipa.slice(0, -1);
    }
    
    // Soft/hard G rules
    ipa = ipa.replace(/ge/g, "ʤɛ");
    ipa = ipa.replace(/gi/g, "ʤɪ");
    ipa = ipa.replace(/gy/g, "ʤj");
    
    // Deduplication of identical phonetic consonants
    let cleanIpa = "";
    for (let i = 0; i < ipa.length; i++) {
        if (ipa[i] !== ipa[i-1]) {
            cleanIpa += ipa[i];
        }
    }
    
    return cleanIpa;
}

function translateSentenceToIpa(sentence) {
    if (!sentence || !sentence.trim()) return "...";
    
    const words = sentence.split(/[\s,.\-\!\?]+/);
    const transcriptions = words.map(word => {
        if (!word) return "";
        const clean = word.toLowerCase().trim().replace(/[^a-z]/g, "");
        if (!clean) return word; // return original if non-alphabetic
        
        const ipa = transcribeWordToIpa(clean);
        // Add slash notation around the word
        return ipa ? `/${ipa}/` : `/${clean}/`;
    });
    
    return transcriptions.filter(w => w !== "").join(" ");
}

function initIpaWidget() {
    const ipaInput = document.getElementById("ipa-input");
    const ipaOutput = document.getElementById("ipa-output");
    const ipaClearBtn = document.getElementById("ipa-clear-btn");
    
    ipaInput.addEventListener("input", () => {
        const val = ipaInput.value;
        if (val.length > 0) {
            ipaClearBtn.style.display = "block";
            const trans = translateSentenceToIpa(val);
            ipaOutput.textContent = trans;
        } else {
            ipaClearBtn.style.display = "none";
            ipaOutput.textContent = "/həˈloʊ wɜrld/";
        }
    });

    ipaClearBtn.addEventListener("click", () => {
        ipaInput.value = "";
        ipaClearBtn.style.display = "none";
        ipaOutput.textContent = "/həˈloʊ wɜrld/";
        ipaInput.focus();
    });

    // Run Widget buttons in project cards can populate and scroll to it
    const demoTriggers = document.querySelectorAll(".demo-trigger");
    demoTriggers.forEach(btn => {
        btn.addEventListener("click", () => {
            const widget = document.getElementById("hero");
            widget.scrollIntoView({ behavior: "smooth" });
            ipaInput.value = "english to ipa conversion";
            ipaClearBtn.style.display = "block";
            ipaOutput.textContent = translateSentenceToIpa(ipaInput.value);
            ipaInput.focus();
        });
    });
}

/* ==========================================================================
   4. Projects Filter Logic
   ========================================================================== */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active from all
            filterButtons.forEach(b => b.classList.remove("active"));
            // Set active to clicked
            btn.classList.add("active");

            const filterVal = btn.getAttribute("data-filter");
            
            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                
                if (filterVal === "all" || category === filterVal) {
                    card.style.display = "flex";
                    // Trigger reflow for fade animation
                    card.style.animation = 'none';
                    card.offsetHeight; /* trigger reflow */
                    card.style.animation = null;
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

/* ==========================================================================
   5. SOLID Playbook Playground
   ========================================================================== */
const SOLID_DATA = {
    srp: {
        title: "Single Responsibility Principle (SRP)",
        def: "A class should have one, and only one, reason to change. This means it should perform only one job or contain a single focus of logic.",
        bad: `# Single Responsibility Principle violation
class UserReport:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        
    def generate_report(self):
        # Generates report data
        return f"User Report: {self.name} ({self.email})"
        
    def save_to_database(self):
        # Database logic (Violation: mixing representation & DB persistence!)
        print(f"Connecting to database... Saving user {self.name}")
        
    def print_raw_format(self):
        # Output printing logic (Violation: mixing output rendering!)
        print(f"=== REPORT ===\\nName: {self.name}\\nEmail: {self.email}\\n==============")`,
        good: `# Single Responsibility Principle applied

# 1. Holds only data and simple representations
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

# 2. Responsible ONLY for database transactions
class UserDB:
    def save(self, user):
        print(f"Connecting to database... Saving user {user.name}")

# 3. Responsible ONLY for rendering reports
class UserReportRenderer:
    def get_raw_report(self, user):
        return f"User Report: {user.name} ({user.email})"
        
    def print_formatted(self, user):
        print(f"=== REPORT ===\\nName: {user.name}\\nEmail: {user.email}\\n==============")`,
        rationale: "The original class handles three separate concepts: holding user data, persisting to the database, and printing the report. If the database schema changes, or the print layout format changes, this class must be modified. In the refactored version, we extract the printing and database behaviors into their own dedicated classes, making the system modular and testable in isolation."
    },
    ocp: {
        title: "Open/Closed Principle (OCP)",
        def: "Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.",
        bad: `# Open/Closed Principle violation
class DiscountCalculator:
    def calculate_discount(self, customer_type, amount):
        # Violation: adding a new customer type requires modifying this function!
        if customer_type == "regular":
            return amount * 0.05
        elif customer_type == "vip":
            return amount * 0.10
        elif customer_type == "elderly":
            return amount * 0.15
        return 0`,
        good: `# Open/Closed Principle applied
from abc import ABC, abstractmethod

# Abstract Strategy for discounts
class DiscountStrategy(ABC):
    @abstractmethod
    def get_discount(self, amount):
        pass

# Extensions do not modify original code
class RegularDiscount(DiscountStrategy):
    def get_discount(self, amount):
        return amount * 0.05

class VIPDiscount(DiscountStrategy):
    def get_discount(self, amount):
        return amount * 0.10

class ElderlyDiscount(DiscountStrategy):
    def get_discount(self, amount):
        return amount * 0.15

# Core logic closed to modification, open to new strategies
class DiscountCalculator:
    def calculate_discount(self, strategy: DiscountStrategy, amount):
        return strategy.get_discount(amount)`,
        rationale: "In the violating code, adding a new customer type forces us to modify the existing `DiscountCalculator` class. This risks introducing bugs into existing paths. By defining an abstract base class `DiscountStrategy` and implementing new rules as concrete classes, we can support infinite customer tiers without editing any core business logic."
    },
    lsp: {
        title: "Liskov Substitution Principle (LSP)",
        def: "Subtypes must be substitutable for their base types. A subclass should override the parent class methods in a way that doesn't break functionality from a client's point of view.",
        bad: `# Liskov Substitution Principle violation
class Bird:
    def fly(self):
        return "Flying high!"

class Eagle(Bird):
    pass

class Penguin(Bird):
    def fly(self):
        # Violation: Penguins cannot fly! 
        # Raising an exception breaks client expectations of the parent 'Bird'
        raise NotImplementedError("Penguins can't fly!")

def make_bird_fly(bird: Bird):
    return bird.fly() # Crashes if passed a Penguin!`,
        good: `# Liskov Substitution Principle applied

class Bird:
    def eat(self):
        return "Eating seeds."

# Segregate behaviors instead of assuming all birds can fly
class FlyingBird(Bird):
    def fly(self):
        return "Flying high!"

class Eagle(FlyingBird):
    pass

class Penguin(Bird):
    def swim(self):
        return "Swimming in cold water."

def make_bird_fly(bird: FlyingBird):
    return bird.fly() # Safe type enforcement!`,
        rationale: "The parent class `Bird` assumed all birds fly, which is biologically incorrect and logically breaks client components executing polymorphism (e.g. passing a `Penguin` to `make_bird_fly` crashes). Refactoring splits behaviors, ensuring that sub-types strictly satisfy the assertions and methods of their base class definitions."
    },
    isp: {
        title: "Interface Segregation Principle (ISP)",
        def: "Clients should not be forced to depend upon interfaces that they do not use. It is better to have many small, specific interfaces than one large, general one.",
        bad: `# Interface Segregation Principle violation
from abc import ABC, abstractmethod

class SmartDevice(ABC):
    @abstractmethod
    def print_document(self):
        pass
    @abstractmethod
    def fax_document(self):
        pass
    @abstractmethod
    def scan_document(self):
        pass

class OldInkjetPrinter(SmartDevice):
    def print_document(self):
        print("Printing...")
        
    def fax_document(self):
        # Violation: old printer cannot fax!
        raise NotImplementedError("Fax not supported.")
        
    def scan_document(self):
        # Violation: old printer cannot scan!
        raise NotImplementedError("Scanner not supported.")`,
        good: `# Interface Segregation Principle applied
from abc import ABC, abstractmethod

# Split into granular interfaces
class Printer(ABC):
    @abstractmethod
    def print_document(self):
        pass

class FaxMachine(ABC):
    @abstractmethod
    def fax_document(self):
        pass

class Scanner(ABC):
    @abstractmethod
    def scan_document(self):
        pass

# Old inkjet only implements printer
class OldInkjetPrinter(Printer):
    def print_document(self):
        print("Printing document...")

# All-in-one printer implements multiple interfaces
class ModernOfficeHub(Printer, FaxMachine, Scanner):
    def print_document(self):
        print("High speed printing...")
    def fax_document(self):
        print("Faxing...")
    def scan_document(self):
        print("Scanning to cloud...")`,
        rationale: "The `SmartDevice` interface was too fat, forcing simple devices to implement methods they don't support and raise error exceptions. By splitting the interface into smaller, single-responsibility units like `Printer`, `Scanner`, and `FaxMachine`, classes are only forced to code and depend on the exact interfaces they actually use."
    },
    dip: {
        title: "Dependency Inversion Principle (DIP)",
        def: "High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.",
        bad: `# Dependency Inversion Principle violation
class MySQLDatabase:
    def insert_record(self, data):
        print(f"Inserting {data} into MySQL DB")

class UserService:
    def __init__(self):
        # Violation: high-level UserService directly depends on low-level MySQLDatabase
        self.db = MySQLDatabase()
        
    def create_user(self, name):
        self.db.insert_record(name)`,
        good: `# Dependency Inversion Principle applied
from abc import ABC, abstractmethod

# 1. Abstraction layer
class DatabaseConnection(ABC):
    @abstractmethod
    def insert_record(self, data):
        pass

# 2. Low-level implementations depend on abstraction
class MySQLDatabase(DatabaseConnection):
    def insert_record(self, data):
         print(f"Inserting {data} into MySQL Database")

class DynamoDB(DatabaseConnection):
    def insert_record(self, data):
         print(f"Inserting {data} into DynamoDB Cloud storage")

# 3. High-level module depends on abstraction (Injected via constructor)
class UserService:
    def __init__(self, db: DatabaseConnection):
        self.db = db
        
    def create_user(self, name):
        self.db.insert_record(name)`,
        rationale: "The violating code hard-codes a connection to a specific SQL database, making it impossible to switch databases or mock connection layers during testing. By introducing the `DatabaseConnection` interface and injecting it, `UserService` is decoupled from the actual implementation details."
    }
};

let currentSolidPattern = "srp";
let currentCodeMode = "bad"; // "bad" or "good"

function initSolidPlaybook() {
    const tabButtons = document.querySelectorAll(".solid-tab-btn");
    const codeToggleBad = document.getElementById("code-toggle-bad");
    const codeToggleGood = document.getElementById("code-toggle-good");
    
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            currentSolidPattern = btn.getAttribute("data-pattern");
            updateSolidPlaybookDisplay();
        });
    });

    codeToggleBad.addEventListener("click", () => {
        codeToggleBad.classList.add("active");
        codeToggleGood.classList.remove("active");
        currentCodeMode = "bad";
        updateSolidPlaybookDisplay();
    });

    codeToggleGood.addEventListener("click", () => {
        codeToggleGood.classList.add("active");
        codeToggleBad.classList.remove("active");
        currentCodeMode = "good";
        updateSolidPlaybookDisplay();
    });
    
    // Initial display sync
    updateSolidPlaybookDisplay();
}

function updateSolidPlaybookDisplay() {
    const data = SOLID_DATA[currentSolidPattern];
    if (!data) return;
    
    document.getElementById("pattern-name").textContent = data.title;
    document.getElementById("pattern-definition").textContent = data.def;
    document.getElementById("pattern-rationale").textContent = data.rationale;
    
    const codeBlock = document.getElementById("code-block");
    if (currentCodeMode === "bad") {
        codeBlock.textContent = data.bad;
    } else {
        codeBlock.textContent = data.good;
    }
}

/* ==========================================================================
   6. Dropdown Drawer Terminal Shell Emulator
   ========================================================================== */
let terminalOpen = false;

function initTerminal() {
    const termTrigger = document.getElementById("nav-term-btn");
    const termDrawer = document.getElementById("terminal-drawer");
    const termCloseDot = document.getElementById("term-close-dot");
    const termInput = document.getElementById("terminal-input");
    const termBody = document.getElementById("terminal-body");
    const termOutput = document.getElementById("terminal-output-container");
    const inquiryForm = document.getElementById("inquiry-form");

    // Toggle terminal drawer open/close
    function toggleTerminal() {
        terminalOpen = !terminalOpen;
        if (terminalOpen) {
            termDrawer.classList.add("open");
            termInput.focus();
            logToTerminalSystem("Interactive terminal initialized. Ready.");
        } else {
            termDrawer.classList.remove("open");
        }
    }

    termTrigger.addEventListener("click", (e) => {
        e.preventDefault();
        toggleTerminal();
    });
    
    termCloseDot.addEventListener("click", toggleTerminal);

    // Escape key toggle
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            toggleTerminal();
        }
    });

    // Handle command submission
    termInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const cmdText = termInput.value.trim();
            termInput.value = "";
            
            if (cmdText) {
                processCommand(cmdText);
            }
        }
    });
    
    // Clicking anywhere in the body focuses terminal input
    termBody.addEventListener("click", () => {
        termInput.focus();
    });

    function printLine(text, className = "") {
        const line = document.createElement("div");
        line.className = `terminal-line ${className}`;
        line.innerHTML = text;
        termOutput.appendChild(line);
        // Scroll terminal to bottom
        termBody.scrollTop = termBody.scrollHeight;
    }

    function processCommand(rawCmd) {
        // Output the command entered by the user
        printLine(`sharunspi@io:~$ ${rawCmd}`, "user-cmd");

        const parts = rawCmd.split(" ");
        const command = parts[0].toLowerCase();
        const arg = parts.slice(1).join(" ");

        switch (command) {
            case "help":
                printLine("Available commands:", "system-msg");
                printLine("  <span class='cmd-highlight'>about</span>       - Short dossier describing engineering focus");
                printLine("  <span class='cmd-highlight'>projects</span>    - Lists active public repositories");
                printLine("  <span class='cmd-highlight'>contact</span>     - Displays contact coordinates");
                printLine("  <span class='cmd-highlight'>solid</span>       - Brief reminder summary of SOLID guidelines");
                printLine("  <span class='cmd-highlight'>ipa [text]</span>   - Run phonetic engine on the input text parameter");
                printLine("  <span class='cmd-highlight'>theme</span>       - Toggles dark vs light layout");
                printLine("  <span class='cmd-highlight'>clear</span>       - Clears all terminal history");
                printLine("  <span class='cmd-highlight'>secret</span>      - Execute custom payload");
                break;
            case "about":
                printLine("<strong>SHARUN K K / sharunspi</strong>", "system-msg");
                printLine("Systems engineer specializing in deterministic algorithms, language processing (compiler rules, lexical lookups), and open-source infrastructure scaling. Active contributor to Open Healthcare Network public telemetrics.", "system-msg");
                break;
            case "projects":
                printLine("PUBLIC DIRECTORY:", "system-msg");
                printLine("1. <span class='cmd-highlight'>English_to_IPA</span> (Python) - English translation pipeline converting orthography to speech transcriptions.");
                printLine("2. <span class='cmd-highlight'>Care (OHC Network)</span> (Django/Postgres) - Digital health care capacity tracking deployed across state hospitals.");
                printLine("3. <span class='cmd-highlight'>SOLID Playbook</span> (Client JS) - Interactive pattern engine analyzing decoupling strategies.");
                break;
            case "contact":
                printLine("CONTACT ROUTING:", "system-msg");
                printLine("  GitHub:   <a href='https://github.com/sharunspi' target='_blank'>github.com/sharunspi</a>");
                printLine("  Email:    <a href='mailto:sharunspi@gmail.com'>sharunspi@gmail.com</a>");
                printLine("  LinkedIn: <a href='https://linkedin.com' target='_blank'>linkedin.com/in/sharunspi</a>");
                break;
            case "solid":
                printLine("SOLID DESIGN ARCHITECTURE CHEAT SHEET:", "system-msg");
                printLine("  <strong>S</strong>RP: Single Responsibility - One class has one logic theme.");
                printLine("  <strong>O</strong>CP: Open/Closed - Closed to revision, open to inheritance/strategies.");
                printLine("  <strong>L</strong>SP: Liskov Substitution - Subclasses must fully honor base type assertions.");
                printLine("  <strong>I</strong>SP: Interface Segregation - Fat interfaces split into granular adapters.");
                printLine("  <strong>D</strong>IP: Dependency Inversion - Depend on abstractions, inject details.");
                break;
            case "ipa":
                if (!arg) {
                    printLine("Syntax Error: <span class='cmd-highlight'>ipa [English text to translate]</span>", "system-msg");
                } else {
                    const res = translateSentenceToIpa(arg);
                    printLine(`Phonetic Transcription: <span class='cmd-highlight'>${res}</span>`, "system-msg");
                }
                break;
            case "theme":
                document.getElementById("theme-toggle").click();
                break;
            case "clear":
                termOutput.innerHTML = "";
                break;
            case "secret":
                printLine("Triggering Payload: ASCII Glyphs...", "system-msg");
                printLine("<pre style='color: var(--accent-color); font-size: 0.7rem; line-height: 1.1;'>\n" +
                          "   _____ _    _          _____  _    _ _   _ \n" +
                          "  / ____| |  | |   /\\   |  __ \\| |  | | \\ | |\n" +
                          " | (___ | |__| |  /  \\  | |__) | |  | |  \\| |\n" +
                          "  \\___ \\|  __  | / /\\ \\ |  _  /| |  | | . ` |\n" +
                          "  ____) | |  | |/ ____ \\| | \\ \\| |__| | |\\  |\n" +
                          " |_____/|_|  |_/_/    \\_\\_|  \\_\\\\____/|_| \\_|\n" +
                          "                                             \n" +
                          "</pre>");
                printLine("Keep checking constraints. Keep decoupling code. Keep making healthcare open.", "system-msg");
                break;
            default:
                printLine(`Command not found: <span class='cmd-highlight'>${command}</span>. Type <span class='cmd-highlight'>help</span> for commands.`, "system-msg");
        }
    }

    // Capture contact submission to log in terminal!
    inquiryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("client-name").value;
        const email = document.getElementById("client-email").value;
        const msg = document.getElementById("client-message").value;
        
        // Find active chip value
        const activeChip = document.querySelector(".type-chips .chip.active");
        const type = activeChip ? activeChip.getAttribute("data-value") : "unknown";

        const toast = document.getElementById("form-success-msg");
        
        // Show mock submit toast
        toast.style.display = "flex";
        
        // Log transaction to terminal
        printLine(`[INCOMING INQUIRY] Route signed: from=${name} email=${email} type=${type}`, "system-msg");
        printLine(`[DISPATCH] payload="${msg.substring(0, 40)}..."`, "system-msg");
        printLine(`[DISPATCH STATUS] Prepared for standard mail transport client. Mock transmitted.`, "system-msg");
        
        // Auto-show terminal to let user see logs
        if (!terminalOpen) {
            setTimeout(() => {
                toggleTerminal();
            }, 1000);
        }

        // Clear form
        inquiryForm.reset();
        setTimeout(() => {
            toast.style.display = "none";
        }, 5000);
    });

    // Toggle contact type chips
    const chips = document.querySelectorAll(".type-chips .chip");
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            chips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
        });
    });
}

function logToTerminalSystem(msg) {
    const termOutput = document.getElementById("terminal-output-container");
    const termBody = document.getElementById("terminal-body");
    if (termOutput && termBody) {
        const line = document.createElement("div");
        line.className = "terminal-line system-msg";
        line.innerHTML = `[SYS] ${msg}`;
        termOutput.appendChild(line);
        termBody.scrollTop = termBody.scrollHeight;
    }
}
