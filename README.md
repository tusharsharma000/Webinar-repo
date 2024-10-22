# Webinar Management App with Zustand and Material-UI

This is a simple **React** application for managing webinars. It uses:
- **Zustand** for state management
- **localStorage** to persist data across page reloads
- **Material-UI** for styling the components

## **Features**
- Add webinars
- Delete webinars
- Persist webinars using `localStorage`
- Display a list of webinars

---

## **Getting Started**

### **Prerequisites**
Make sure you have the following installed:
- **Node.js** (>= 14.x)
- **npm** or **yarn**

### **Installation**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd webinar-management

2 Install the Dependencies
  ```bash
  npm install
  # or
  yarn install

3. Start the development server:
  ```bash
  npm start
  # or
  yarn start
```
The app will be available at http://localhost:3000.


### **Prerequisites**

 ``` bash
webinar-management/
├── src/
│   ├── components/
│   │   ├── AddWebinar.jsx    # Form to add new webinars
│   │   ├── WebinarList.jsx   # Component to display list of webinars
│   ├── store/
│   │   └── useStore.js       # Zustand store with localStorage persistence
│   ├── App.js                # Main app component
│   ├── index.js              # React entry point
├── public/
├── package.json
├── README.md                 # Project documentation

```

### **How to use**

1. Add a Webinar
Use the input field in the AddWebinar component to enter a webinar name and click the Add Webinar button.

2. View Webinars
All added webinars are listed in the WebinarList component. They are fetched from the local storage upon reload.

3. Delete a Webinar
Click the Delete button next to any webinar to remove it from the list and update localStorage.



### **Technologies Used**

> React: JavaScript library for building user interfaces
> Zustand: Lightweight state management library
> Material-UI: Component library for styling
> localStorage: For persisting webinar data


### **Contributing**
Fork the repository
Create a new branch (git checkout -b feature-branch)
Commit your changes (git commit -m "Add feature")
Push to the branch (git push origin feature-branch)
Open a pull request


### **Contact**
If you have any questions or suggestions, feel free to reach out at:
Your Name - tushar.sharma251112@gmail.com



---



