# 🗳️ PCIU E-Voting System

A **secure LAN-based electronic voting system** designed for **Port City International University (PCIU)**.  
It enables a **Commissioner** to organize and manage elections while allowing **Students** to securely cast votes.  
The system is fully offline, deployed over a **Local Area Network (LAN)**, ensuring **transparency, reliability, and data security**.

---

## 🚀 Tech Stack & Badges

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Dotenv](https://img.shields.io/badge/Dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)

---

## 📑 Table of Contents

1. [System Roles](#-system-roles)  
2. [Key Features](#-key-features)  
3. [System Architecture](#-system-architecture)  
4. [Workflow](#-workflow)  
5. [Security](#-security)  
6. [Deployment Instructions](#-deployment-instructions)  
7. [Future Improvements](#-future-improvements)  
8. [Contributors](#-contributors)  
9. [Footer](#-footer)  

---

## 👥 System Roles

### 🧑‍⚖️ Commissioner
- Log in securely with credentials.  
- Add/manage **candidates** and **voters**.  
- Start/stop elections.  
- Monitor real-time voting status.  
- Export election results.  

### 🎓 Student
- Log in with **Student ID**.  
- View candidate list.  
- Cast a **single secure vote**.  

---

## ✨ Key Features
- Commissioner-only election management.  
- Add candidates and register voters.  
- Start/stop elections with **real-time monitoring**.  
- Enforce **one vote per student**.  
- **Student ID authentication** with encrypted vote storage.  
- Fully **offline LAN-based** system (no external threats).  
- Exportable results after election completion.  

---

## 🏛 System Architecture
<br>
<img src="PCIU-Evoting Flowchart.png"/>
<br>

- **PC1**: Runs Node.js/Express backend + MongoDB. Hosts Commissioner Control Panel.  
- **PC2**: React-based frontend for Students. Connects to PC1 backend APIs over LAN.  

---

## 🔄 Workflow

1. Commissioner logs in and configures election (**candidates + voters**).  
2. Commissioner **starts election**.  
3. Students log in with **Student ID** → system verifies eligibility.  
4. Eligible students **cast their vote**.  
5. Commissioner **stops election** and exports results.  

---

## 🔐 Security
- **JWT authentication** for Commissioner.  
- **One-vote-per-student** enforcement.  
- Encrypted voter and vote data in **MongoDB**.  
- **LAN-only deployment** prevents external cyber attacks.  

---

## ⚙️ Deployment Instructions

### 🔹 Backend Setup
```bash
# Clone repository
git clone <repo-url>
cd backend

# Install dependencies
npm install

# Start MongoDB
mongod

# Run server
npm start
```

### 🔹 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 🔹 LAN Configuration
1. Connect **PC1 (server)** and **PC2 (client)** in the same LAN.  
2. Assign **static IPs** to both PCs.  
3. Update frontend `.env` file to point API base URL → `http://<PC1_IP>:<PORT>`.  

---

## 🔮 Future Improvements
- ☁️ Cloud-based deployment for scalability.  
- ⛓ Blockchain integration for **tamper-proof voting**.  
- 🧑‍💻 Biometric authentication (fingerprint/face recognition).  
- 📊 Real-time analytics dashboard for results.  

---

## 👨‍💻 Contributors
<p align="left">
  <img src="My-Professional-Image.png" alt="Suprio Das" width="120" height="120" style="border-radius:50%" />
</p>

**Developer:** Suprio Das  
- 🎓 Batch: CSE 28-A-Day  
- 🆔 ID: CSE 02807546
- 🌐 IT Secretary at PCIU Computer Club
- 🏛 Department of Computer Science & Engineering  
- 🌐 Port City International University  

---

## ❤️ Footer

**Made with ❤️ by: <a href="https://www.linkedin.com/in/supriodas03/" target="_blank">Suprio Das</a>**
