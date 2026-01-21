import React from 'react';
import { NavProps, View } from '../types';
import { Icons } from '../components/Icons';

const FontManageScreen: React.FC<NavProps> = ({ onChangeView }) => {
  const fontPacks = [
    { name: 'Oracle Bone Script', cn: '甲骨文', size: '12 MB', installed: true, version: 'v1.2.0' },
    { name: 'Bronze Script', cn: '金文', size: '15 MB', installed: true, version: 'v1.0.5' },
    { name: 'Small Seal Script', cn: '小篆', size: '18 MB', installed: false, version: 'v2.0.0' },
    { name: 'Clerical Script', cn: '隶书', size: '22 MB', installed: false, version: 'v1.1.0' },
    { name: 'Regular Script (Trad)', cn: '繁体楷书', size: '25 MB', installed: false, version: 'v3.5.0' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F2F2F7]">
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200 px-4 h-14 flex items-center justify-between">
            <button onClick={() => onChangeView(View.PROFILE)} className="p-2 -ml-2 rounded-full active:bg-gray-100">
                <Icons.Back className="text-blue-500" />
            </button>
            <h1 className="font-semibold text-base">Font Management (字体管理)</h1>
            <button className="p-2 -mr-2 rounded-full active:bg-gray-100 text-blue-500 font-medium text-sm">
                Edit
            </button>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 flex gap-3">
             <div className="bg-blue-100 p-2 rounded-full h-fit text-blue-600">
                 <Icons.Cloud className="w-5 h-5" />
             </div>
             <div>
                 <h3 className="text-sm font-bold text-blue-900">Cloud Sync Active</h3>
                 <p className="text-xs text-blue-700">Your font preferences are synced across devices.</p>
             </div>
        </div>

        <h2 className="text-xs font-bold text-gray-500 uppercase mb-2 pl-2">Installed Fonts</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            {fontPacks.filter(f => f.installed).map((font, i) => (
                <div key={i} className="flex items-center p-4 border-b border-gray-100 last:border-0">
                    <div className="w-10 h-10 bg-jiaguwen-cream rounded-lg flex items-center justify-center mr-3 text-jiaguwen-brown font-serif font-bold text-lg border border-jiaguwen-tan/20">
                        {font.cn[0]}
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-medium text-gray-900">{font.name}</h3>
                        <p className="text-xs text-gray-500">{font.cn} • {font.version}</p>
                    </div>
                    <div className="flex items-center text-green-600 gap-1 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
                        <Icons.Check className="w-3 h-3" />
                        Installed
                    </div>
                </div>
            ))}
        </div>

        <h2 className="text-xs font-bold text-gray-500 uppercase mb-2 pl-2">Available for Download</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {fontPacks.filter(f => !f.installed).map((font, i) => (
                <div key={i} className="flex items-center p-4 border-b border-gray-100 last:border-0">
                     <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3 text-gray-400 font-serif font-bold text-lg">
                        {font.cn[0]}
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-medium text-gray-900">{font.name}</h3>
                        <p className="text-xs text-gray-500">{font.cn} • {font.size}</p>
                    </div>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-blue-600 hover:bg-blue-50 active:scale-95 transition-all">
                        <Icons.Cloud className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default FontManageScreen;