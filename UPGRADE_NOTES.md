# Upgrade Notes - Node 20 & Dependencies Update

## Summary
Upgraded from Node 14 to Node 20 LTS and updated all major dependencies to their latest versions.

## Major Version Changes

### Node & Runtime
- Node: 14.21.3 → 20.18.1 LTS
- npm: 6.x → 10.x (comes with Node 20)

### React Ecosystem
- React: 16.12.0 → 18.2.0
- React-DOM: 16.12.0 → 18.2.0
- react-scripts: 3.3.1 → 5.0.1
- TypeScript: 3.7.5 → 5.3.3

### UI Libraries
- Material-UI v4 → MUI v5
  - `@material-ui/core` → `@mui/material`
  - `@material-ui/icons` → `@mui/icons-material`
  - `@material-ui/pickers` → `@mui/x-date-pickers`

### Firebase
- Firebase: 7.8.1 → 10.7.1 (modular API)

### Other Dependencies
- Redux: 4.0.5 → 5.0.0
- react-redux: 7.1.3 → 9.0.4
- date-fns: 2.9.0 → 2.30.0
- lodash: 4.17.15 → 4.17.21

## Code Changes Applied

### 1. React 18 Root API (src/index.tsx)
**Before:**
```tsx
ReactDOM.render(<App />, document.getElementById("root"));
```

**After:**
```tsx
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
```

### 2. Firebase Modular API (src/database.ts)
**Before:**
```typescript
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp(config);
export const db = firebase.firestore();
```

**After:**
```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### 3. Firebase Auth Usage
**Before:**
```typescript
firebase.auth().signInWithEmailAndPassword(email, password)
firebase.auth().onAuthStateChanged(callback)
firebase.auth().currentUser?.updatePassword(password)
```

**After:**
```typescript
import { signInWithEmailAndPassword, onAuthStateChanged, updatePassword } from "firebase/auth";
import { auth } from "../database";

signInWithEmailAndPassword(auth, email, password)
onAuthStateChanged(auth, callback)
updatePassword(auth.currentUser, password)
```

### 4. Firebase Firestore Usage
**Before:**
```typescript
db.collection("events").add(data)
db.collection("events").doc(id).delete()
db.collection("events").where("year", "==", year).onSnapshot(callback)
```

**After:**
```typescript
import { collection, addDoc, doc, deleteDoc, query, where, onSnapshot } from "firebase/firestore";

addDoc(collection(db, "events"), data)
deleteDoc(doc(db, "events", id))
const q = query(collection(db, "events"), where("year", "==", year));
onSnapshot(q, callback)
```

### 5. Material-UI → MUI Imports
**Before:**
```typescript
import { Button } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
```

**After:**
```typescript
import { Button } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
```

### 6. Date Picker Component
**Before:**
```tsx
<MuiPickersUtilsProvider utils={DateFnsUtils}>
  <KeyboardDatePicker
    autoOk
    variant="inline"
    format="MM/dd/yyyy"
    label="Start date"
    onChange={handleChange}
    value={date}
  />
</MuiPickersUtilsProvider>
```

**After:**
```tsx
<LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    format="MM/dd/yyyy"
    label="Start date"
    onChange={handleChange}
    value={date}
    slotProps={{ textField: { margin: "normal" } }}
  />
</LocalizationProvider>
```

## Next Steps

1. Switch to Node 20:
   ```bash
   nvm use
   ```

2. Install pnpm (if not already installed):
   ```bash
   npm install -g pnpm
   ```

3. Clean old dependencies:
   ```bash
   rm -rf node_modules package-lock.json yarn.lock
   ```

4. Install new dependencies:
   ```bash
   pnpm install
   ```

5. Test the application:
   ```bash
   pnpm start
   ```

6. Run tests (if any):
   ```bash
   pnpm test
   ```

## Potential Issues to Watch For

1. **Redux v5** - Check for any deprecated Redux patterns
2. **MUI v5** - Some styling APIs changed (makeStyles → styled components)
3. **Firebase Timestamp** - Date handling might need adjustment
4. **React 18 StrictMode** - May cause double-renders in development

## Files Modified

- `.nvmrc`
- `package.json`
- `src/index.tsx`
- `src/database.ts`
- `src/App.tsx`
- `src/components/Nav/index.tsx`
- `src/components/LogIn/index.tsx`
- `src/components/LogIn/ForgotPassword.tsx`
- `src/components/Register/index.tsx`
- `src/components/Profile/index.tsx`
- `src/components/Calendar/index.tsx`
- `src/components/Calendar/Calendar.tsx`
- `src/components/Calendar/Booking.tsx`
- `src/components/Calendar/EditEvent.tsx`
- `src/hooks/useCurrentUserDetection.ts`
- `src/hooks/useReservations.ts`
- `src/hooks/useUsers.ts`
