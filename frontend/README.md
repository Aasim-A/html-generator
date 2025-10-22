# HTML Generator

A web application built with Next.js that allows users to create and manage a set of tabs, add content to them, and then generate a single, self-contained HTML file. This file can be easily copied or downloaded and is specifically designed to be integrated into the **LATROBE Moodle** learning platform.

-----

### Features

  - **Tab Management**: Easily create, rename, and delete tabs.
  - **Content Editor**: A dedicated area to add and edit content for each tab.
  - **HTML Generation**: Convert your tabbed content into a single HTML file with embedded CSS and JavaScript.
  - **Copy and Download**: Conveniently copy the generated HTML to your clipboard or download it as an `.html` file.
  - **Live Preview**: See a live preview of the generated HTML directly within the application.
  - **Persistent Data**: Your tabs and content are saved in your browser's local storage, so you don't lose your work when you refresh the page.
  - **Theme Toggle**: Switch between light and dark themes.

-----

### Technologies Used

  - **Next.js**: A React framework for building web applications.
  - **React**: A JavaScript library for building user interfaces.
  - **Tailwind CSS**: A utility-first CSS framework for styling components.
  - **`react-syntax-highlighter`**: For syntax highlighting the generated HTML code.

-----

### Getting Started

To get a local copy of this project up and running, follow these simple steps.

#### Prerequisites

  - Node.js (v18 or later)
  - npm

#### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Aasim-A/html-generator.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd html-generator
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

The application will be accessible at `http://localhost:3000`.

-----

### Usage

1.  **Create and Manage Tabs**: Use the "Add" button to create a new tab. Double-click on a tab's title to rename it. Click the "x" icon to delete a tab.
2.  **Edit Content**: Select a tab and enter your content in the text area on the right.
3.  **Generate HTML**: Click the **Generate HTML** button to see a preview of your content.
4.  **Export**: Use the **Copy** button to copy the code to your clipboard or the **Download HTML** button to save the file.
