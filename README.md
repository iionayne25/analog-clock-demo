# 🕒 Analog Clock with Dynamic Lighting

A responsive analog clock built using **HTML, CSS, and JavaScript**, featuring real-time synchronization and dynamic shadow simulation based on a fixed directional light source.

This project was created as a learning assignment to practice DOM manipulation, mathematical modeling in UI, and clean code structuring.

---

## 📌 Project Overview

This application renders a fully functional analog clock with:

- Real-time synchronized clock hands
- Cosine-based dynamic shadow simulation
- Digital clock reference display
- Responsive layout using ResizeObserver
- Drift-free time synchronization

The project focuses on mathematical accuracy, performance awareness, and clean separation of concerns in UI logic.

---

## 🎯 Features

- 🕰 Real-time analog clock
- 💡 Dynamic shadow based on directional light (2D Lambert-like model)
- ⏱ Drift-free second-hand synchronization
- 🔍 Digital time display for verification
- 📱 Fully responsive
- 🧠 Clean and modular JavaScript structure

---

## 🧠 Technical Concepts Practiced

### 1️⃣ Angle Normalization

To correctly calculate relative angles between the clock hand and light source:

```js
((angle + FULL_ROTATION + HALF_ROTATION) % FULL_ROTATION) - HALF_ROTATION
```
This ensures the result remains within:
```js
[-180°, +180°]
```
### 2️⃣  **2D Light Simulation**
Shadow intensity is calculated using cosine falloff:
```js
intensity = (1 - cos(theta)) / 2
```
This simulates how light behaves based on the angular difference between the light direction and object orientation.

Inspired by the Lambertian reflectance model in computer graphics.

### 3️⃣  **Driff-Free Time Synchronization**
Instead of using:
```js
setInterval(update, 1000)
```
which accumulates delay over time,

the clock synchronizes with the real second boundary:
```js
const delay = 1000 - now.getMilliseconds();
setTimeout(tick, delay);
```

### 4️⃣ **Performance Optimization**

- Cached DOM references to avoid repeated querySelector calls
- Separated rendering logic from update logic
- Avoided unnecessary recalculations
- Used mathematical vector approach for shadow direction

## 🚀 How to Run
### Option 1 — Open Directly

Simply open:
```js
index.html
```
in your browser.

### Option 2 — Run Local Server (Recommended)
```js
npx serve .
```
or use VSCode Live Server extension.

## 📸 **Preview**
<img width="3317" height="1871" alt="image" src="https://github.com/user-attachments/assets/80cea441-9823-4ed4-9b87-386ab52c4479" />

## 📚 **Learning Objectives**

This project was built to improve understanding of:
- DOM manipulation without frameworks
- Mathematical modeling in UI animation
- Angle wrapping and normalization
- Basic lighting simulation
- Time synchronization strategies
- Clean and maintainable JavaScript architecture

## 📈 **Performance Considerations**
- Avoided setInterval drift
- Used cached DOM references
- Reduced layout thrashing
- Minimized unnecessary computations

## 🔮 **Future Improvements**

- Smooth sweep second hand using requestAnimationFrame
- Configurable light direction
- Theming support
- Convert into reusable class-based component
- Add unit testing for math utilities
- Improve accessibility

## 💡 **What I Learned**

- How small timing inaccuracies accumulate over time
- How trigonometry applies to real UI rendering
- Why angle normalization is essential in rotational systems
- How lighting models from 3D graphics can be adapted into 2D UI
- How to structure code for readability and maintainability

##👤 **Author**

Pavinee Suthamjaem
Frontend Development Practice Project
2026


