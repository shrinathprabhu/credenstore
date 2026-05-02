# Credenstore - Zero-Knowledge Encrypted Storage

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/f3f8c814-44f4-4098-b3bf-09788f3ada9c" />



Note: This project is live at https://credenstore.web.app

### How it works

1. The sender opens Credenstore and enters a secret, note, or uploads a file.
2. The sender provides a password and optional expiry duration.
3. The browser encrypts the content locally using the TripleSec algorithm.
4. Only the encrypted payload and metadata are stored in Firebase Firestore.
5. Credenstore generates a unique share link that points to the encrypted record.
6. The receiver opens the link and enters the password.
7. The browser downloads the encrypted payload from Firestore.
8. If the password is correct, the browser decrypts the content locally.
9. The receiver can then view the text or download the original file.
10. If the record has expired, Firebase prevents access and Firestore TTL removes it automatically.

### Security model

- No backend server is used.
- The client talks directly to Firebase Firestore.
- Encryption happens before data leaves the browser.
- Decryption happens only in the receiver’s browser.
- Passwords are never stored, transmitted, or included in share links.
- Firestore stores only encrypted data and non-sensitive metadata.
- Expired records are blocked from access and automatically deleted using Firestore TTL.

### Important note

Credenstore cannot recover lost passwords because the password is required to decrypt the encrypted content. Once the password is lost, the original secret or file cannot be recovered.


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
