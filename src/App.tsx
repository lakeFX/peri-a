import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/auth/AuthContext';
import MsalProvider from './lib/auth/MsalProvider';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Patients from './pages/Patients';
import PatientDetails from './pages/PatientDetails';
import Cases from './pages/Cases';
import CaseDetails from './pages/CaseDetails';
import Forms from './pages/Forms';
import Reports from './pages/Reports';
import Contacts from './pages/Contacts';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import Admin from './pages/Admin';
import LoginForm from './components/auth/LoginForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <>
      <MsalProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="patients" element={<Patients />} />
                <Route path="patients/:id/details" element={<PatientDetails />} />
                <Route path="cases" element={<Cases />} />
                <Route path="cases/:id/details" element={<CaseDetails />} />
                <Route path="forms" element={<Forms />} />
                <Route path="reports" element={<Reports />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="billing" element={<Billing />} />
                <Route path="settings" element={<Settings />} />
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute roles={['admin']}>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </MsalProvider>
    </>
  );
}

export default App;