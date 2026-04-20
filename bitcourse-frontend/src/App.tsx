

// import { Refine } from "@refinedev/core";
// import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
// import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

// import routerProvider, {
//   DocumentTitleHandler,
//   UnsavedChangesNotifier,
// } from "@refinedev/react-router";

// import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
// import "./App.css";

// import { Toaster } from "./components/refine-ui/notification/toaster";
// import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
// import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
// import { dataProvider } from "./providers/data";

// import Dashboard from "@/pages/Dashboard.tsx";
// import SubjectsLists from "@/pages/subjects/lists.tsx";
// import SubjectsCreate from "@/pages/subjects/create.tsx";
// import ClassesList from "@/pages/classes/list.tsx";
// import ClassesCreate from "@/pages/classes/create.tsx";
// import ClassesShow from "@/pages/classes/show.tsx";

// import Login from "@/pages/Login.tsx";
// import Signup from "@/pages/Signup.tsx";

// import { Layout } from "@/components/refine-ui/layout/layout.tsx";
// import { PublicLayout } from "@/components/refine-ui/layout/PublicLayout.tsx";
// import { Home, BookOpen, GraduationCap } from "lucide-react";

// function App() {
//   return (
//     <BrowserRouter>
//       <RefineKbarProvider>
//         <ThemeProvider>
//           <DevtoolsProvider>
//             <Refine
//               dataProvider={dataProvider}
//               notificationProvider={useNotificationProvider()}
//               routerProvider={routerProvider}
//               options={{
//                 syncWithLocation: true,
//                 warnWhenUnsavedChanges: true,
//                 projectId: "itZD6R-pxJutZ-Amc30D",
//               }}
//               resources={[
//                 {
//                   name: "dashboard",
//                   list: "/",
//                   meta: { label: "Home", icon: <Home /> },
//                 },
//                 {
//                   name: "subjects",
//                   list: "/subjects",
//                   create: "/subjects/create",
//                   meta: { label: "Subjects", icon: <BookOpen /> },
//                 },
//                 {
//                   name: "classes",
//                   list: "/classes",
//                   create: "/classes/create",
//                   show: "/classes/show/:id",
//                   meta: { label: "Classes", icon: <GraduationCap /> },
//                 },
//               ]}
//             >
//               <Routes>
//                 {/* Protected pages wrapped in Layout */}
//                 <Route element={<Layout><Outlet /></Layout>}>
//                   <Route path="/" element={<Dashboard />} />
//                   <Route path="subjects">
//                     <Route index element={<SubjectsLists />} />
//                     <Route path="create" element={<SubjectsCreate />} />
//                   </Route>
//                   <Route path="classes">
//                     <Route index element={<ClassesList />} />
//                     <Route path="create" element={<ClassesCreate />} />
//                     <Route path="show/:id" element={<ClassesShow />} />
//                   </Route>
//                 </Route>

//                 {/* Public pages (Login / Signup) wrapped in PublicLayout */}
//                 <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
//                 <Route path="/signup" element={<PublicLayout><Signup /></PublicLayout>} />
//               </Routes>

//               <Toaster />
//               <RefineKbar />
//               <UnsavedChangesNotifier />
//               <DocumentTitleHandler />
//             </Refine>
//             <DevtoolsPanel />
//           </DevtoolsProvider>
//         </ThemeProvider>
//       </RefineKbarProvider>
//     </BrowserRouter>
//   );
// }

// export default App;


// src/App.tsx
import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";

import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";

import Dashboard from "@/pages/Dashboard.tsx";
import SubjectsLists from "@/pages/subjects/lists.tsx";
import SubjectsCreate from "@/pages/subjects/create.tsx";
import ClassesList from "@/pages/classes/list.tsx";
import ClassesCreate from "@/pages/classes/create.tsx";
import ClassesShow from "@/pages/classes/show.tsx";

import Login from "@/pages/Login.tsx";
import Signup from "@/pages/Signup.tsx";

import { Layout } from "@/components/refine-ui/layout/layout.tsx";
import { PublicLayout } from "@/components/refine-ui/layout/PublicLayout.tsx";

import { Home, BookOpen, GraduationCap } from "lucide-react";

// Simple authentication check using localStorage
const isAuthenticated = () => !!localStorage.getItem("user");

// ProtectedRoute wrapper
function ProtectedRoute({ children }: { children: JSX.Element }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

// Redirect if logged in
function PublicRoute({ children }: { children: JSX.Element }) {
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
}

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "itZD6R-pxJutZ-Amc30D",
              }}
              resources={[
                { name: "dashboard", list: "/", meta: { label: "Home", icon: <Home /> } },
                { name: "subjects", list: "/subjects", create: "/subjects/create", meta: { label: "Subjects", icon: <BookOpen /> } },
                { name: "classes", list: "/classes", create: "/classes/create", show: "/classes/show/:id", meta: { label: "Classes", icon: <GraduationCap /> } },
              ]}
            >
              <Routes>
                {/* Public pages */}
                <Route path="/login" element={<PublicRoute><PublicLayout><Login /></PublicLayout></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><PublicLayout><Signup /></PublicLayout></PublicRoute>} />

                {/* Protected pages */}
                <Route
                  element={
                    <ProtectedRoute>
                      <Layout><Outlet /></Layout>
                    </ProtectedRoute>
                  }
                >
                  <Route path="/" element={<Dashboard />} />
                  <Route path="subjects">
                    <Route index element={<SubjectsLists />} />
                    <Route path="create" element={<SubjectsCreate />} />
                  </Route>
                  <Route path="classes">
                    <Route index element={<ClassesList />} />
                    <Route path="create" element={<ClassesCreate />} />
                    <Route path="show/:id" element={<ClassesShow />} />
                  </Route>
                </Route>

                {/* Redirect unknown paths */}
                <Route path="*" element={<Navigate to={isAuthenticated() ? "/" : "/login"} replace />} />
              </Routes>

              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;