# Welcome to Ticket Event Backend

## Getting Started

Follow these steps to set up the project locally:

1. **Clone this repository:**

   ```sh
   git clone <repository-link>
   ```

2. **Navigate to the project folder:**

   ```sh
   cd backend
   ```

3. **Install dependencies:**

   ```sh
   yarn install
   ```

4. **Run the development server:**

   ```sh
   yarn start:dev
   ```

5. **Enjoy! 🎉**

## 🧪 Testing the App

### Application runs in the following port `9001`

To test the application, follow these steps:
 - **POST request** `/auth/login`
   - **PARAMS:** `body: email`
 - **GET request** `/tickets`
   - **PARAMS:** `userType, page, query`