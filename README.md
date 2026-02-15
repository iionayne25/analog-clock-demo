# 🕒 Analog Clock with Dynamic Lighting

A practice project built with **HTML, CSS, and TypeScript**  
to explore DOM manipulation, time synchronization, and 2D lighting simulation.

---

## 📌 Project Overview

This project implements a responsive analog clock with:

- Real-time synchronized clock hands
- Dynamic shadow simulation based on fixed light source
- Digital time display for accuracy reference
- ResizeObserver for responsive layout

The main goal of this assignment is to strengthen understanding of:

- DOM manipulation
- CSS transforms & positioning
- Angle normalization
- Trigonometry (sin / cos)
- Time synchronization without drift
- Clean code structuring

---

## 🎯 Features

- 🕰 Real-time analog clock
- 💡 Dynamic shadow based on directional light (Lambert-like model)
- ⏱ Accurate second-hand synchronization (no interval drift)
- 📱 Fully responsive
- 🔍 Digital clock for time validation

---

## 🧠 Technical Concepts Practiced

### 1. Angle Normalization
```ts
((angle + 360 + 180) % 360) - 180
