# React Router Setup

## Overview

This application uses React Router v6 for client-side routing with protected routes and role-based access control.

## Routes

### Public Routes

- `/` - Home page (landing page)
- `/login` - Login page
- `/signup` - Signup page

### Protected Routes (Requires Authentication)

- `/profile` - User Profile page (accessible to all authenticated users)

### Admin Routes (Requires Admin Role)

- `/admin` - Admin Dashboard (only accessible to users with admin role)

## Route Protection

### ProtectedRoute Component

Located at: `src/components/auth/ProtectedRoute.tsx`

This component wraps routes that require authentication. If a user is not authenticated, they are redirected to the login page.

**Usage:**

```tsx
<Route
  path="profile"
  element={
    <ProtectedRoute>
      <UserProfile />
    </ProtectedRoute>
  }
/>
```

### AdminRoute Component

Located at: `src/components/auth/AdminRoute.tsx`

This component wraps routes that require admin privileges. It checks:

1. If the user is authenticated (redirects to `/login` if not)
2. If the user has admin role (redirects to `/` if not)

**Usage:**

```tsx
<Route
  path="admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
```

## Layout

### Navbar Component

Located at: `src/components/layout/Navbar.tsx`

The navigation bar is displayed on all pages and shows different links based on authentication status:

**Unauthenticated Users:**

- Login
- Sign Up

**Authenticated Users:**

- Profile
- Admin (visible to all, but protected by AdminRoute)
- Logout

### Layout Component

Located at: `src/components/layout/Layout.tsx`

Wraps all routes with the Navbar and uses React Router's `<Outlet />` to render child routes.

## Authentication Store

Located at: `src/store/authStore.ts`

Manages authentication state including:

- Access token storage
- User data with role information
- Helper functions:
  - `setAccessToken(token: string)` - Store access token
  - `getAccessToken()` - Retrieve access token
  - `clearAccessToken()` - Clear token and user data
  - `setUserData(user: User)` - Store user information
  - `getUserData()` - Retrieve user data
  - `isAdmin()` - Check if current user is admin

### User Interface

```typescript
interface User {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "admin";
}
```

## Page Components

All page components have full-screen minimum height (`min-h-screen`) and use Tailwind CSS for styling:

1. **Home** - `src/components/page/home/Home.tsx`
2. **Login** - `src/components/page/login/Login.tsx`
3. **Signup** - `src/components/page/signup/Signup.tsx`
4. **User Profile** - `src/components/page/profile/UserProfile.tsx`
5. **Admin Dashboard** - `src/components/page/admin/AdminDashboard.tsx`

## Integration with Backend

To fully integrate with your backend authentication:

1. **On Login Success:**

   ```typescript
   import { setAccessToken, setUserData } from "@/store/authStore";

   // After successful login
   setAccessToken(response.accessToken);
   setUserData({
     id: response.user.id,
     email: response.user.email,
     fullName: response.user.fullName,
     role: response.user.role,
   });
   ```

2. **On Logout:**

   ```typescript
   import { clearAccessToken } from "@/store/authStore";

   clearAccessToken();
   navigate("/login");
   ```

3. **Token Refresh:**
   Update your `AuthBootstrap` component or create a new auth initialization hook to fetch user data and set it in the store after token refresh.

## Technologies Used

- **React Router DOM** v6 - Client-side routing
- **React Query** - Server state management
- **Tailwind CSS** v4 - Styling
