// Daftar warna untuk catatan
const noteColors = ["#BE3144", "#4B4376", "#FF6500", "#677D6A"];

// Data catatan awal
const initialNotes = [
  {
    id: "notes-jT-jjsyz61J8XKiI",
    title: "Welcome to Notes, Dimas!",
    body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
    createdAt: "2022-07-28T10:03:12.594Z",
    archived: false,
  },
  {
    id: "notes-aB-cdefg12345",
    title: "Meeting Agenda",
    body: "Discuss project updates and assign tasks for the upcoming week.",
    createdAt: "2022-08-05T15:30:00.000Z",
    archived: false,
  },
  {
    id: "notes-XyZ-789012345",
    title: "Shopping List",
    body: "Milk, eggs, bread, fruits, and vegetables.",
    createdAt: "2022-08-10T08:45:23.120Z",
    archived: false,
  },
  {
    id: "notes-1a-2b3c4d5e6f",
    title: "Personal Goals",
    body: "Read two books per month, exercise three times a week, learn a new language.",
    createdAt: "2022-08-15T18:12:55.789Z",
    archived: false,
  },
  {
    id: "notes-LMN-456789",
    title: "Recipe: Spaghetti Bolognese",
    body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...",
    createdAt: "2022-08-20T12:30:40.200Z",
    archived: false,
  },
  {
    id: "notes-QwErTyUiOp",
    title: "Workout Routine",
    body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.",
    createdAt: "2022-08-25T09:15:17.890Z",
    archived: false,
  },
  {
    id: "notes-abcdef-987654",
    title: "Book Recommendations",
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: "2022-09-01T14:20:05.321Z",
    archived: false,
  },
  {
    id: "notes-zyxwv-54321",
    title: "Daily Reflections",
    body: "Write down three positive things that happened today and one thing to improve tomorrow.",
    createdAt: "2022-09-07T20:40:30.150Z",
    archived: false,
  },
  {
    id: "notes-poiuyt-987654",
    title: "Travel Bucket List",
    body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA",
    createdAt: "2022-09-15T11:55:44.678Z",
    archived: false,
  },
  {
    id: "notes-asdfgh-123456",
    title: "Coding Projects",
    body: "1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project",
    createdAt: "2022-09-20T17:10:12.987Z",
    archived: false,
  },
  {
    id: "notes-5678-abcd-efgh",
    title: "Project Deadline",
    body: "Complete project tasks by the deadline on October 1st.",
    createdAt: "2022-09-28T14:00:00.000Z",
    archived: false,
  },
  {
    id: "notes-9876-wxyz-1234",
    title: "Health Checkup",
    body: "Schedule a routine health checkup with the doctor.",
    createdAt: "2022-10-05T09:30:45.600Z",
    archived: false,
  },
  {
    id: "notes-qwerty-8765-4321",
    title: "Financial Goals",
    body: "1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.",
    createdAt: "2022-10-12T12:15:30.890Z",
    archived: false,
  },
  {
    id: "notes-98765-54321-12345",
    title: "Holiday Plans",
    body: "Research and plan for the upcoming holiday destination.",
    createdAt: "2022-10-20T16:45:00.000Z",
    archived: false,
  },
  {
    id: "notes-1234-abcd-5678",
    title: "Language Learning",
    body: "Practice Spanish vocabulary for 30 minutes every day.",
    createdAt: "2022-10-28T08:00:20.120Z",
    archived: false,
  },
];

// Komponen Welcome Screen
class WelcomeScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot
      .getElementById("getStartedButton")
      .addEventListener("click", () => {
        document
          .querySelector("note-form")
          .scrollIntoView({ behavior: "smooth" });
      });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .welcome-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          text-align: center;
          background-color: white;
          width: 100%;
        }
        
        .welcome-title {
          font-size: 3em;
          font-weight: bold;
          text-align: right;
          margin-bottom: 20px;
        }
        
        .button {
          padding: 12px 24px;
          font-size: 15px;
          font-weight: bold;
          color: white;
          background-color: #4d55cc;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          text-transform: uppercase;
          transition: 0.3s;
        }
        
        .button:hover {
          background-color: #373db8;
        }
      </style>
      <div class="welcome-container">
        <h1 class="welcome-title">
          NOTES <br />
          APP.
        </h1>
        <button id="getStartedButton" class="button">Get Started</button>
      </div>
    `;
  }
}

// Komponen Note Form
class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  connectedCallback() {
    this.render();
    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", this.handleSubmit);
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector("form")
      .removeEventListener("submit", this.handleSubmit);
  }

  handleSubmit(event) {
    event.preventDefault();

    const titleInput = this.shadowRoot.getElementById("noteTitle");
    const bodyInput = this.shadowRoot.getElementById("noteBody");

    const newNote = {
      id: `notes-${Date.now()}`,
      title: titleInput.value,
      body: bodyInput.value,
      createdAt: new Date().toISOString(),
    };

    const notesContainer = document.querySelector("notes-container");
    notesContainer.addNote(newNote);

    // Reset formulir
    titleInput.value = "";
    bodyInput.value = "";
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
      
        .form-container {
          width: 100%;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        input,
        textarea {
          font-family: "Poppins", sans-serif;
          width: 100%;
          padding: 12px;
          margin: 8px 0;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1em;
          box-sizing: border-box;
        }
        
        textarea {
          min-height: 100px;
          resize: vertical;
        }
        
        .button {
          padding: 12px 24px;
          font-size: 15px;
          font-weight: bold;
          color: white;
          background-color: #4d55cc;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          text-transform: uppercase;
          transition: 0.3s;
        }
        
        .button:hover {
          background-color: #373db8;
        }
      </style>
      <form class="form-container">
        <h2>Add Note.</h2>
        <input type="text" id="noteTitle" placeholder="title *" required />
        <textarea id="noteBody" placeholder="desc *" required></textarea>
        <button type="submit" class="button">Submit</button>
      </form>
    `;
  }
}

// Komponen Notes Container
class NotesContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notes = [...initialNotes];
  }

  connectedCallback() {
    this.render();
    this.renderNotes();
  }

  addNote(newNote) {
    this.notes.push(newNote);
    this.renderNotes();
  }

  renderNotes() {
    const container = this.shadowRoot.getElementById("notesContainer");
    container.innerHTML = "";

    this.notes.forEach((note) => {
      const noteElement = document.createElement("note-item");
      noteElement.setAttribute("title", note.title);
      noteElement.setAttribute("body", note.body);
      noteElement.setAttribute("date", note.createdAt);
      container.appendChild(noteElement);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        #notesContainer {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
      </style>
      <div id="notesContainer"></div>
    `;
  }
}

// Komponen Web untuk Item Catatan
class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["title", "body", "date"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const randomColor =
      noteColors[Math.floor(Math.random() * noteColors.length)];

    this.shadowRoot.innerHTML = `
      <style>
        .note {
          display: block;
          border: 1px solid #ddd;
          border-left: 8px solid ${randomColor};
          padding: 15px;
          background: white;
          margin-bottom: 10px;
        }
        .note-content {
          flex-grow: 1;
        }
        .note-title {
          font-weight: bold;
          margin-bottom: 10px;
          color: #333;
        }
        .note-body {
          margin-bottom: 10px;
          color: #666;
        }
        .note-date {
          color: #999;
          font-size: 0.8em;
        }
      </style>
      <div class="note">
        <div class="note-content">
          <div class="note-title">${this.getAttribute("title")}</div>
          <p class="note-body">${this.getAttribute("body")}</p>
          <small class="note-date">${this.formatDate(
            this.getAttribute("date")
          )}</small>
        </div>
      </div>
    `;
  }

  formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  }
}

// Daftarkan komponen kustom
customElements.define("welcome-screen", WelcomeScreen);
customElements.define("note-form", NoteForm);
customElements.define("notes-container", NotesContainer);
customElements.define("note-item", NoteItem);
