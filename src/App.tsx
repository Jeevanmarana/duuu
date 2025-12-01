import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ModeProvider, useMode } from './contexts/ModeContext';
import { Auth } from './components/Auth';
import { Landing } from './components/Landing';
import { CreateProfile } from './components/CreateProfile';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Profiles } from './components/Profiles';
import { Notes } from './components/Notes';
import { Study } from './components/Study';
import { Chat } from './components/Chat';
import { Confessions } from './components/Confessions';

function AppContent() {
  const { user, profile, loading } = useAuth();
  const { mode } = useMode();
  const [currentTab, setCurrentTab] = useState('home');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (showAuth) {
      return <Auth initialMode={authMode} />;
    }
    return (
      <Landing
        onLoginClick={() => {
          setAuthMode('login');
          setShowAuth(true);
        }}
        onSignupClick={() => {
          setAuthMode('signup');
          setShowAuth(true);
        }}
      />
    );
  }

  if (!profile) {
    return <CreateProfile />;
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home onTabChange={setCurrentTab} />;
      case 'profiles':
        return <Profiles />;
      case 'study':
        return <Study />;
      case 'notes':
        return <Notes />;
      case 'chat':
        return <Chat />;
      case 'confessions':
        return <Confessions />;
      default:
        return <Home onTabChange={setCurrentTab} />;
    }
  };

  return (
    <Layout currentTab={currentTab} onTabChange={setCurrentTab}>
      {renderContent()}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <ModeProvider>
        <AppContent />
      </ModeProvider>
    </AuthProvider>
  );
}

export default App;
