# Credenstore - Zero-Knowledge Encrypted Storage
Note: This project is live at https://credenstore.web.app

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/f3f8c814-44f4-4098-b3bf-09788f3ada9c" />

```mermaid
flowchart TD
    A[Sender opens Credenstore] --> B[Enter note or upload file]
    B --> C[Enter password and optional expiry]
    C --> D[Encrypt locally in browser using TripleSec]
    D --> E[Store encrypted payload in Firestore]
    E --> F[Generate unique share link]

    F --> G[Receiver opens share link]
    G --> H[Enter password]
    H --> I{Is record expired?}
    I -- Yes --> J[Show expired message]
    I -- No --> K[Download encrypted payload]
    K --> L[Decrypt locally in browser using TripleSec]
    L --> M{Password correct?}
    M -- Yes, text --> N[Display decrypted text]
    M -- Yes, file --> O[Download decrypted file]
    M -- No --> P[Show invalid password error]

    E --> Q[Firestore TTL auto-deletes expired records]
```

This project is built using Vue, Vuetify (Material Design framework for Vue) and Vue-router to create the application UI and some routing logic.

This project also uses Triplesec for encrypting and decrypting the content and uses Cloud Firestore to store the encrypted content on cloud. There is a direct connection between UI and Cloud Firestore and no middleware servers are involved to store or manipulate any kind of data. All the encryption and decryption happens on client's end and it is the responsibility of client to remember the retrieval link and decryption password. This project also uses file saver for downloading the content in form of file.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and hot-reloads for development and open on browser
```
npm run start
```

### Compiles and minifies for production
```
npm run build
```
