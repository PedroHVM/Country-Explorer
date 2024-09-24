# Country Explorer

![country exp img](https://github.com/user-attachments/assets/8008ce44-039e-42c3-ad70-b13572ba9882)


### Steps to Run the Project

#### 1. Clone the GitHub Repository

First, open your terminal or command prompt and run the following command to clone the project from GitHub to your local environment:
```
git clone https://github.com/PedroHVM/Country-Explorer.git
```

#### 2. Navigate to the Project Directory

After cloning the repository, move into the project directory with this command:
```
cd country-explorer
```
#### 3. Install Dependencies

This project uses **Vite** as a bundler, along with libraries like **React** and **Tailwind CSS**. To install all necessary dependencies, run:
```
npm install 
```

This will install all the packages listed in the `package.json` file.

#### 4. Environment Setup (Optional)

If the project requires environment variables, create a `.env` file in the project root (if it doesn’t already exist) and add your variables as needed. Make sure you have the correct API keys for **RestCountries** or any other services used.

#### 5. Run the Project Locally

Once all dependencies are installed, you can start the Vite development server with the command:
```
npm run dev 
```

The terminal will display the local address where the app is running, something like:
```
VITE v3.x.x  ready in x.xs
➜  Local:   http://localhost:3000/
```

Open the provided address in your browser, typically `http://localhost:3000`.

#### 6. Test the Application

Once the server is running, the **Country Explorer** app will be available in your browser. Here are a few features you can test:

-   **Country List**: View the list of countries fetched from the RestCountries API.
-   **Filters and Sorting**: Use filters and sorting options to refine the list of countries.
-   **Country Details**: Click on a country to see detailed information.
-   **Theme Toggle**: Switch between light and dark modes using the theme toggle button in the header.
