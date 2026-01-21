import React from 'react';
import { View } from '../types';
import { Icons } from './Icons';

interface Props {
  activeView: View;
  onChangeView: (view: View) => void;
}

const BottomNav: React.FC<Props> = ({ activeView, onChangeView }) => {
  const getItemClass = (view: View) => 
    `flex flex-col items-center gap-1 w-16 ${activeView === view ? 'text-blue-600' : 'text-gray-400'}`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 pb-6 z-50 flex justify-around items-end">
      <button onClick={() => onChangeView(View.HOME)} className={getItemClass(View.HOME)}>
        <Icons.Home size={24} strokeWidth={activeView === View.HOME ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Home</span>
      </button>
      
      <button onClick={() => onChangeView(View.LIBRARY)} className={getItemClass(View.LIBRARY)}>
        <Icons.Book size={24} strokeWidth={activeView === View.LIBRARY ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Library</span>
      </button>

      <button onClick={() => onChangeView(View.SYLLABUS)} className={getItemClass(View.SYLLABUS)}>
         <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center -mt-6 shadow-lg shadow-blue-200">
             <Icons.Star className="text-white" />
         </div>
         <span className="text-[10px] font-medium mt-1">Challenge</span>
      </button>

      <button onClick={() => onChangeView(View.PROFILE)} className={getItemClass(View.PROFILE)}>
        <Icons.User size={24} strokeWidth={activeView === View.PROFILE ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Profile</span>
      </button>
    </nav>
  );
};

export default BottomNav;