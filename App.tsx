import React, { useState } from 'react';
import { View } from './types';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import TracingScreen from './screens/TracingScreen';
import DetailScreen from './screens/DetailScreen';
import EvolutionScreen from './screens/EvolutionScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReportScreen from './screens/ReportScreen';
import LibraryScreen from './screens/LibraryScreen';
import SyllabusScreen from './screens/SyllabusScreen';
import FontMapScreen from './screens/FontMapScreen';
import FontManageScreen from './screens/FontManageScreen';
import { Icons } from './components/Icons';

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);

  const renderScreen = () => {
    switch (currentView) {
      case View.LOGIN:
        return <LoginScreen onLogin={() => setCurrentView(View.HOME)} />;
      case View.HOME:
        return <HomeScreen onChangeView={setCurrentView} currentView={currentView} />;
      case View.TRACING:
        return <TracingScreen onChangeView={setCurrentView} currentView={currentView} />;
      case View.DETAIL:
        return <DetailScreen onChangeView={setCurrentView} currentView={currentView} />;
      case View.EVOLUTION:
        return <EvolutionScreen onChangeView={setCurrentView} currentView={currentView} />;
      case View.PROFILE:
        return <ProfileScreen onChangeView={setCurrentView} currentView={currentView} />;
      case View.REPORT:
        return <ReportScreen onChangeView={setCurrentView} currentView={currentView} />;
      case View.LIBRARY:
        return <LibraryScreen onChangeView={setCurrentView} currentView={currentView} />;
      case View.SYLLABUS:
        return <SyllabusScreen onChangeView={setCurrentView} currentView={currentView} />;
      case View.FONT_MAP:
        return <FontMapScreen onChangeView={setCurrentView} currentView={currentView} />;
      case View.FONT_MANAGE:
        return <FontManageScreen onChangeView={setCurrentView} currentView={currentView} />;
      default:
        return <HomeScreen onChangeView={setCurrentView} currentView={currentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans text-slate-900">
      <div className="w-full max-w-[430px] h-[100dvh] bg-white relative shadow-2xl overflow-hidden flex flex-col">
        {renderScreen()}
      </div>
    </div>
  );
}