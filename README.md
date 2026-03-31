# 🌱 Horta Inteligente

Sistema IoT para monitoramento e controle automático de irrigação utilizando **ESP32**, **Spring Boot** e **Dashboard Web**.

---

## 🚀 Sobre o Projeto

A **Horta Inteligente** é uma solução que automatiza o processo de irrigação com base na umidade do solo, permitindo:

* Monitoramento em tempo real 🌡️
* Controle manual e automático da irrigação 💧
* Visualização de dados em dashboard moderno 📊

O sistema integra hardware (ESP) com software (backend + frontend), simulando um produto real de IoT.

---

## 🧠 Arquitetura do Sistema

```bash
ESP32 → Backend (Spring Boot API) → Frontend (Dashboard)
```

* O **ESP32** coleta dados do sensor de umidade
* O **backend** recebe e processa os dados
* O **frontend** exibe as informações e permite controle

---

## 🖥️ Tecnologias Utilizadas

### Frontend

* HTML5
* CSS3 (design moderno, responsivo)
* JavaScript (estado, interação e simulação em tempo real)

### Backend

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA

### Banco de Dados

* H2 (desenvolvimento)
* PostgreSQL (produção - planejado)

### IoT

* ESP32 / ESP8266
* Sensor de umidade do solo
* Relé + bomba d’água

---

## ⚙️ Funcionalidades

### 🌱 Monitoramento

* Umidade do solo em tempo real
* Status do sistema (online/offline)
* Última atualização automática

### 💧 Controle de Irrigação

* Ligar/desligar bomba manualmente
* Modo automático baseado na umidade
* Feedback visual do estado da bomba

### 📊 Dashboard

* Indicador visual (gauge) da umidade
* Histórico de dados (gráfico)
* Alertas inteligentes

### 🌙 Interface

* Dark mode
* Layout responsivo
* UI moderna estilo SaaS

---

## 📁 Estrutura do Projeto

```bash
horta-inteligente
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend
│   └── (Spring Boot API)
│
└── README.md
```

---

## 💡 Objetivo do Projeto

Este projeto foi desenvolvido com foco em:

* Aprendizado de IoT integrado com Web
* Criação de sistemas reais (não apenas acadêmicos)

---

## 👨‍💻 Autor

Wenderson Andrade Batista
linkedin: https://www.linkedin.com/in/wenderson2k2/

---

## ⭐ Destaque

Projeto construído com arquitetura real de mercado, integrando:

* Hardware (ESP)
* Backend (Java)
* Frontend (Dashboard)
