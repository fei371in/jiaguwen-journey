import React from 'react';
import { NavProps, View } from '../types';
import BottomNav from '../components/BottomNav';
import { Icons } from '../components/Icons';

const SyllabusScreen: React.FC<NavProps> = ({ onChangeView, currentView }) => {
  return (
    <div className="flex-1 flex flex-col bg-[#F0F4F8]">
       <header className="bg-white sticky top-0 z-50 shadow-sm pt-4 pb-2">
            <div className="flex items-center px-4 mb-2">
                <button onClick={() => onChangeView(View.HOME)}><Icons.Back /></button>
                <h1 className="flex-grow text-center font-bold">MOE Vocabulary Sync</h1>
                <div className="w-6"></div>
            </div>
            <div className="bg-[#D2E6FA] py-2 px-4 flex items-center justify-center gap-2 text-sm">
                <Icons.Check className="w-4 h-4 text-blue-600" />
                <span>Synced with MOE 2024 Syllabus</span>
            </div>
       </header>

       <main className="flex-1 overflow-y-auto px-4 py-4 pb-24">
            <h2 className="font-bold mb-3">Primary 4 - Characters to Master</h2>
            
            {[{char:'家', p:'jiā', m:'Family'}, {char:'爱', p:'ài', m:'Love'}, {char:'学', p:'xué', m:'Study'}].map(c => (
                <div key={c.char} className="bg-white rounded-xl border-2 border-[#708EB3] shadow-sm p-4 mb-4">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-start">
                            <span className="text-5xl font-kaiti mr-4">{c.char}</span>
                            <div>
                                <div className="text-xl font-bold">{c.p}</div>
                                <div className="text-gray-600">{c.m}</div>
                            </div>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Icons.Check className="w-3 h-3" /> Sync
                        </span>
                    </div>
                    <button onClick={() => onChangeView(View.TRACING)} className="w-full bg-gray-50 hover:bg-gray-100 py-2 rounded-lg text-sm border font-medium">
                        Learn via Origin (溯源学习)
                    </button>
                </div>
            ))}
       </main>
       <BottomNav activeView={currentView} onChangeView={onChangeView} />
    </div>
  );
};

export default SyllabusScreen;