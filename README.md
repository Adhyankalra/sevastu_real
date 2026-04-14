# 🏥 Smart Hospital Queue Management System

> Redefining patient flow in government hospitals with real-time, intelligent queue management.

---

## 🚀 Overview

Government hospitals in India face severe inefficiencies such as long queues, overcrowding, and lack of real-time information. Patients often wait for hours without visibility into their turn.

This project introduces a **digitally orchestrated queue system** that allows patients to join queues remotely, track their status live, and move efficiently through hospital departments.

---

## 🎯 Problem Statement

- Patients arrive as early as **4 AM** for tokens  
- No real-time queue visibility  
- Overcrowding and delays  
- Poor experience for elderly and critical patients  
- No integration between consultation and pharmacy  

---

## 💡 Solution

A **web-based real-time queue management system** that:

- Enables **remote & QR-based queue joining**
- Provides **live queue status and wait-time estimation**
- Implements **smart queue logic (priority + no-show handling)**
- Supports **QR-based check-in**
- Integrates **dispensary (pharmacy) workflow**

---

## ✨ Key Features

- 📲 Remote Queue Joining  
- ⏱️ Real-Time Queue Tracking  
- 🧠 Smart Queue Engine  
  - Priority handling  
  - No-show skipping  
- 📍 Department-based queueing (OPD, etc.)  
- 💊 Dispensary queue integration  
- ⚡ Scalable backend architecture  

---

---

## 🏗️ Tech Stack

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB (Atlas)

**Architecture**
- REST APIs  
- MVC Pattern  
- Service Layer (Queue Engine)

---

## ⚙️ API Endpoints

### Queue Management

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | /api/queue/join | Join queue |
| GET    | /api/queue/status/:userId | Get queue status |
| POST   | /api/queue/checkin | Check-in user |

---
