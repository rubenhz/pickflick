import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "./context";
import Account from "./pages/Account";
import Application from "./pages/Application";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Plans from "./pages/Plans";

function App() {

  const { user } = useContext(Context)

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='login/*' element={user ? <Dashboard /> : <Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/application' element={<Application />} />
      <Route path='/plans' element={<Plans />} />
      <Route path='/account' element={<Account />} />
    </Routes>
  )
}

export default App;
