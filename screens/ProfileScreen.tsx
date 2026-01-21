import React from 'react';
import { NavProps, View } from '../types';
import BottomNav from '../components/BottomNav';
import { Icons } from '../components/Icons';

const ProfileScreen: React.FC<NavProps> = ({ onChangeView, currentView }) => {
  return (
    <div className="flex-1 flex flex-col bg-[#FDF6E3] relative">
      <header className="bg-[#102A43] text-white pt-12 pb-12 px-6 rounded-b-[2.5rem] shadow-lg relative z-10">
        <div className="text-center">
            <h1 className="text-lg font-semibold">User Profile</h1>
            <p className="text-sm opacity-80">用户资料</p>
        </div>
      </header>

      <main className="flex-1 px-5 -mt-8 z-20 overflow-y-auto pb-24">
        <section className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-full border-4 border-[#A07855] overflow-hidden shadow-lg">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX0il9sEON3W76E1Znc31REs-mO6Yg2gsP-wzbGrtJrFI-4QLjhmQ5kBCVQRpppy49OgsL4enANqUZ_TSORsvNPtIN_mvebTXBWmZMWbOAsDqYkjWctZvSuGg4RWv-PMkkz4cMCvnz6xJ5vSJoYWWzOkcxljIDGrQyQ8awHtFVcW1o_BU7Kg8QwcXHvr15ndNlf_q0qCuHRUUHm9c-T6UNYJwZRi_H3TBKwl6FLrvzGPqi12L-H8GY39PABKFACWNXum0PCnL3h7ed" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-[#102A43]">Alex Tan</h3>
                <p className="text-xs text-gray-500 font-medium mt-1">Scholar Level: Bronze Inscription</p>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#D4A373] to-[#8D6E63] w-3/5"></div>
                </div>
            </div>
        </section>

        <section className="mb-6">
            <h3 className="text-[#102A43] font-bold mb-3 pl-1">Font Configuration</h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center p-4 border-b border-gray-100 active:bg-gray-50 cursor-pointer" onClick={() => onChangeView(View.FONT_MAP)}>
                    <div className="w-8 h-8 mr-4 text-[#A07855] flex items-center justify-center">
                        <Icons.Map size={20} />
                    </div>
                    <div className="flex-grow">
                        <p className="text-base font-medium text-gray-800">Font Mapping</p>
                        <p className="text-xs text-gray-500">字体映射</p>
                    </div>
                    <Icons.Back className="rotate-180 text-gray-300 w-4 h-4" />
                </div>
                <div className="flex items-center p-4 active:bg-gray-50 cursor-pointer" onClick={() => onChangeView(View.FONT_MANAGE)}>
                    <div className="w-8 h-8 mr-4 text-[#A07855] flex items-center justify-center">
                        <Icons.Type size={20} />
                    </div>
                    <div className="flex-grow">
                        <p className="text-base font-medium text-gray-800">Font Management</p>
                        <p className="text-xs text-gray-500">字体管理</p>
                    </div>
                    <Icons.Back className="rotate-180 text-gray-300 w-4 h-4" />
                </div>
            </div>
        </section>

        <section className="mb-8">
            <h3 className="text-[#102A43] font-bold mb-3 pl-1">Account Management</h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {[
                    { icon: Icons.Book, label: 'My Learning Plan', sub: '我的学习计划', view: View.REPORT },
                    { icon: Icons.Ghost, label: 'Daily Reminders', sub: '每日提醒', view: null },
                    { icon: Icons.Globe, label: 'Language Settings', sub: '语言设置', view: null },
                    { icon: Icons.Settings, label: 'Privacy Settings', sub: '隐私设置', view: null }
                ].map((item, i) => (
                    <div key={i} className="flex items-center p-4 border-b border-gray-100 active:bg-gray-50 cursor-pointer" onClick={() => item.view ? onChangeView(item.view) : null}>
                        <div className="w-8 h-8 mr-4 text-[#A07855] flex items-center justify-center">
                            <item.icon size={20} />
                        </div>
                        <div className="flex-grow">
                            <p className="text-base font-medium text-gray-800">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.sub}</p>
                        </div>
                        <Icons.Back className="rotate-180 text-gray-300 w-4 h-4" />
                    </div>
                ))}
            </div>
        </section>

        <button onClick={() => onChangeView(View.LOGIN)} className="w-full bg-[#C0392B] text-white font-bold py-4 rounded-full shadow-md">
            Logout
        </button>
      </main>

      <BottomNav activeView={currentView} onChangeView={onChangeView} />
    </div>
  );
};

export default ProfileScreen;