# Water Sort Puzzle Game

A **Water Sort Puzzle** game implemented in **TypeScript** using **Vite**. This project demonstrates the popular color-sorting game mechanics, where the player moves liquid between containers to sort them by color.

## There is no frontend to this project

## Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Haronkar/sorting-game.git
   cd sorting-game
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to:
   ```
   http://localhost:5173/
   ```

---

## Game Rules

1. Each container holds up to 4 layers of colors (can be changed 'constainerSize' in code).
2. You can only transfer color into a container if:
   - The container has space.
   - The top layer of the destination container matches the color being transfered.
3. The goal is to sort the colors so that each container contains only one color.

---

## Project Structure

```
.
├── src                 # Source code
│   ├── modules         # Utility
│       ├── utils.ts    # game utility
│   ├── style.css       # Main CSS file
│   └── main.ts         # Main app entry point
├── index.html          # HTML template
└── package.json        # Dependencies and scripts
```

---

## Technologies Used

- **TypeScript**: For type-safe development.
- **Vite**: A fast build tool and development server.
- **HTML/CSS**: For the UI design.

---

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software as per the license terms.
