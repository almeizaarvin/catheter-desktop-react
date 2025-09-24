import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ScenarioSelect from "./pages/ScenarioSelect";
import ToolsSelect from "./pages/ToolsSelect";
import ToolsTypeSelect from "./pages/ToolsTypeSelect";
import ScenarioCreate from "./pages/ScenarioCreate";
import ScenarioCreate2 from "./pages/ScenarioCreate2";
import ScenarioCreate3 from "./pages/ScenarioCreate3";
import ScenarioCreate4 from "./pages/ScenarioCreate4";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scenario-select" element={<ScenarioSelect />} />
        <Route path="/tools-select" element={<ToolsSelect />} />
        <Route path="/toolstype-select" element={<ToolsTypeSelect />} />
        <Route path="/scenario-create" element={<ScenarioCreate />} />
        <Route path="/scenario-create-2" element={<ScenarioCreate2 />} />
        <Route path="/scenario-create-3" element={<ScenarioCreate3 />} />
        <Route path="/scenario-create-4" element={<ScenarioCreate4 />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
