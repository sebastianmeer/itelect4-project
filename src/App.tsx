import { useEffect, type JSX } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Layout } from "./layouts/Layout.js";
import { ProtectedRoute } from "./components/ProtectedRoute.js";
import { LoginPage } from "./pages/LoginPage.js";
import { ExplorePage } from "./pages/ExplorePage.js";
import { PromptDetailPage } from "./pages/PromptDetailPage.js";
import { DiscoverPage } from "./pages/DiscoverPage.js";
import { ConnectionsPage } from "./pages/ConnectionsPage.js";
import { ProfilePage } from "./pages/ProfilePage.js";
import { NotFoundPage } from "./pages/NotFoundPage.js";
import { useToggle } from "./hooks/useToggle.js";

function App(): JSX.Element {
  const [isDarkMode, toggleDarkMode] = useToggle(false);

  useEffect((): void => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}>
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/prompts/:promptId" element={<PromptDetailPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/connections" element={<ConnectionsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/explore" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
