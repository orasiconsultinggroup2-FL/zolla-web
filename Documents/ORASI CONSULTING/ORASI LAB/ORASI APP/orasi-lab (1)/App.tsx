import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Editor from './pages/Editor';
import Repurpose from './pages/Repurpose';
import BrandVoice from './pages/BrandVoice';
import Frameworks from './pages/Frameworks';
import Analytics from './pages/Analytics';
import ImageStudio from './pages/ImageStudio';
import ContentGenerator from './pages/ContentGenerator';
import UserManual from './pages/UserManual';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex h-screen bg-background-dark text-white font-display overflow-hidden">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<ContentGenerator />} />
            <Route path="/frameworks" element={<Frameworks />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/repurpose" element={<Repurpose />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/brand-voice" element={<BrandVoice />} />
            <Route path="/image-studio" element={<ImageStudio />} />
            <Route path="/manual" element={<UserManual />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <ChatBot />
      </div>
    </HashRouter>
  );
};

export default App;