const app = Vue.createApp({
  data() {
    return {
      title: "Event Management System",

      // Search & table filters
      searchId: "",
      searchName: "",
      searchDuration: "",
      selectedCategory: "All",

      // Pagination
      currentPage: 1,
      itemsPerPage: 5,

      // Events data
      events: [
        { eventid: "EVT10001", eventname: "Tech Innovations Conference", category: "Technology", durationhour: 8 },
        { eventid: "EVT10002", eventname: "Startup Pitch Day", category: "Business", durationhour: 6 },
        { eventid: "EVT10003", eventname: "AI & Machine Learning Summit", category: "Technology", durationhour: 10 },
        { eventid: "EVT10004", eventname: "Cybersecurity Workshop", category: "Technology", durationhour: 4 },
        { eventid: "EVT10005", eventname: "Digital Marketing Bootcamp", category: "Marketing", durationhour: 6 },
        { eventid: "EVT10006", eventname: "Blockchain and Cryptocurrency", category: "Finance", durationhour: 5 },
        { eventid: "EVT10007", eventname: "Entrepreneurship Forum", category: "Business", durationhour: 7 },
        { eventid: "EVT10008", eventname: "Data Science Hackathon", category: "Technology", durationhour: 12 },
        { eventid: "EVT10009", eventname: "Leadership and Management Summit", category: "Business", durationhour: 9 },
        { eventid: "EVT10010", eventname: "E-commerce Strategies", category: "Marketing", durationhour: 6 },
        { eventid: "EVT10011", eventname: "AI for Business", category: "Business", durationhour: 8 },
        { eventid: "EVT10012", eventname: "IoT & Smart Devices Expo", category: "Technology", durationhour: 7 },
        { eventid: "EVT10013", eventname: "Brand Strategy and Growth", category: "Marketing", durationhour: 5 },
        { eventid: "EVT10014", eventname: "Investment and Wealth Management", category: "Finance", durationhour: 6 },
        { eventid: "EVT10015", eventname: "Financial Technology (FinTech) Summit", category: "Finance", durationhour: 8 },
        { eventid: "EVT10016", eventname: "AI Ethics and Regulations", category: "Technology", durationhour: 4 },
        { eventid: "EVT10017", eventname: "Business Analytics Workshop", category: "Business", durationhour: 6 },
        { eventid: "EVT10018", eventname: "SEO and Content Marketing", category: "Marketing", durationhour: 7 },
        { eventid: "EVT10019", eventname: "Cryptocurrency Investment Strategies", category: "Finance", durationhour: 9 },
        { eventid: "EVT10020", eventname: "Social Media Marketing Trends", category: "Marketing", durationhour: 5 }
      ],

      
      // Registration form data
      registration: {
        username: "",
        password: "",
        confirmPassword: "",
        category: "Business",
        eventid: ""
      },

      // UI messages
      errorMessage: "",
      summaryMessage: ""
    };
  },
      // Computed properties for filtering, pagination, and validation
      computed: {
        filteredEvents() { 
          return this.events.filter(event => {
            const matchesId =
              this.searchId === "" ||
              event.eventid.toLowerCase().includes(this.searchId.toLowerCase());

            const matchesName =
              this.searchName === "" ||
              event.eventname.toLowerCase().includes(this.searchName.toLowerCase());

            const matchesDuration =
              this.searchDuration === "" ||
              event.durationhour.toString().includes(this.searchDuration);

            const matchesCategory =
              this.selectedCategory === "All" ||
              event.category === this.selectedCategory;

            return (
              matchesId &&
              matchesName &&
              matchesDuration &&
              matchesCategory
            );
          });
        },

        paginatedEvents() { 
          const start = (this.currentPage - 1) * this.itemsPerPage;
          const end = start + this.itemsPerPage;
          return this.filteredEvents.slice(start, end);
        },

        totalPages() {
          return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
        },

        registrationEvents() {
          return this.events.filter(
            event => event.category === this.registration.category
          );
        },

        selectedEventName() {
          const event = this.events.find(
            e => e.eventid === this.registration.eventid
          );
          return event ? event.eventname : "";
        },

        passwordTooShort() {
          return (
            this.registration.password.length > 0 &&
            this.registration.password.length < 8
          );
        },

        passwordsDoNotMatch() {
          return (
            this.registration.confirmPassword !== "" &&
            this.registration.password !== this.registration.confirmPassword
          );
        }
      },


    // Methods for badge classes, form submission, and watchers
    methods: {
    categoryBadgeClass(category) { // Assign badge classes based on category
      switch (category) {
        case "Technology":
          return "bg-primary";
        case "Business":
          return "bg-danger";
        case "Marketing":
          return "bg-warning text-dark";
        case "Finance":
          return "bg-secondary";
        default:
          return "bg-secondary";
      }
    },

    // Watchers to reset pagination on filter change
    watch: {
    searchId() {
      this.currentPage = 1;
    },
    searchName() {
      this.currentPage = 1;
    },
    searchDuration() {
      this.currentPage = 1;
    },
    selectedCategory() {
      this.currentPage = 1;
    }
   },

   // Form submission handler
    submitForm() {
      this.errorMessage = "";
      this.summaryMessage = "";

      if (this.passwordTooShort) {
        this.errorMessage = "Password must be at least 8 characters.";
        return;
      }

      if (this.registration.password !== this.registration.confirmPassword) {
        this.errorMessage = "Passwords do not match.";
        return;
      }

      this.summaryMessage =
        "Thank you, " +
        this.registration.username +
        ". You have successfully registered for the " +
        this.registration.category +
        " category. Selected event: " +
        this.selectedEventName +
        ".";
    }

  },

  

}

);

app.mount("#app");
