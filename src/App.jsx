import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import ShowCreators from "./pages/ShowCreators";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ViewCreator from "./pages/ViewCreator";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creators" element={<ShowCreators />} />
        <Route path="/new" element={<AddCreator />} />
        <Route path="/edit/:id" element={<EditCreator />} />
        <Route path="/creator/:id" element={<ViewCreator />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}