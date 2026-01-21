import React from 'react';
import { NavProps, View } from '../types';
import { Icons } from '../components/Icons';

const FontMapScreen: React.FC<NavProps> = ({ onChangeView }) => {
  const mappings = [
    { modern: '日', oracle: '⊙', pinyin: 'rì', meaning: 'Sun' },
    { modern: '月', oracle: 'D', pinyin: 'yuè', meaning: 'Moon' },
    { modern: '山', oracle: 'M', pinyin: 'shān', meaning: 'Mountain' },
    { modern: '水', oracle: '≈', pinyin: 'shuǐ', meaning: 'Water' },
    { modern: '人', oracle: 'λ', pinyin: 'rén', meaning: 'Person' },
    { modern: '木', oracle: 'Ψ', pinyin: 'mù', meaning: 'Tree' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100 pt-4 pb-4 px-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <button onClick={() => onChangeView(View.PROFILE)} className="text-blue-600 flex items-center">
                <Icons.Back className="w-5 h-5 mr-1"/> Back
            </button>
            <h1 className="text-lg font-bold text-gray-800">Font Mapping (字体映射)</h1>
            <div className="w-10"></div>
        </div>
        
        <div className="relative">
            <Icons.Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input 
                type="text" 
                placeholder="Search character..." 
                className="w-full bg-gray-100 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" 
            />
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            {['All', 'Nature', 'Animals', 'People', 'Actions'].map((cat, i) => (
                <button key={i} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${i === 0 ? 'bg-jiaguwen-brown text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
                    {cat}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
            {mappings.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-jiaguwen-tan to-jiaguwen-brown opacity-50"></div>
                    <div className="flex items-center justify-center gap-4 w-full mb-3">
                         <div className="flex flex-col items-center">
                             <span className="text-3xl font-sans font-bold text-gray-800">{item.modern}</span>
                             <span className="text-[10px] text-gray-400">Modern</span>
                         </div>
                         <Icons.Back className="rotate-180 text-gray-300 w-4 h-4" />
                         <div className="flex flex-col items-center">
                             <span className="text-3xl font-serif text-jiaguwen-brown">{item.oracle}</span>
                             <span className="text-[10px] text-gray-400">Oracle</span>
                         </div>
                    </div>
                    <div className="w-full h-px bg-gray-100 mb-2"></div>
                    <div className="flex justify-between w-full text-xs">
                        <span className="text-gray-500 font-medium">{item.pinyin}</span>
                        <span className="text-gray-500">{item.meaning}</span>
                    </div>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default FontMapScreen;