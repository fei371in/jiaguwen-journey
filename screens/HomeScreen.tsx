import React from 'react';
import { NavProps, View } from '../types';
import BottomNav from '../components/BottomNav';
import { Icons } from '../components/Icons';

const HomeScreen: React.FC<NavProps> = ({ onChangeView, currentView }) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative">
      {/* Header Background Wave */}
      <div className="absolute top-0 left-0 w-full h-[260px] bg-[#E1F0FA] rounded-b-[40px] z-0"></div>

      <div className="relative z-10 flex-1 overflow-y-auto pb-20 px-5 pt-12">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Daily Challenge</h1>
          <p className="text-sm text-slate-600 font-medium">每日挑战</p>
        </header>

        {/* Stats Card */}
        <section className="bg-white rounded-3xl p-5 mb-5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-16 h-16">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_0RwcztNGXc0B_qQRiiwR7URVmZUyC-ISM1W4v42U6r6kkyaEsUrkYZ1GW8ZPL3uepUGZKoj3iSiFZX845Pa05kZ-tcElwXhMX2H5YYpNyRHPf5ZQcFNlBuDzN_nZZH4TyJfuZxjvtjSZb5lpSVGwa_0UAxIuEf5R7i8gV6iojSoAJ1F4H605uSmVZRKvjpuUycUilie9imlbR1s9H7GFBauk10xv5sPmIH8AlPk-8XbxiG3oXwTvh7CgK7VG7LVsXAZfHXVI5ERb" alt="Fire" className="w-full h-full object-contain" />
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">5</div>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="text-xl font-bold text-slate-800">5-Day Streak!</h2>
              <p className="text-slate-500 text-sm">5天连胜!</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative w-16 h-16 rounded-full flex items-center justify-center" style={{background: 'conic-gradient(#58D68D 75%, #f1f5f9 0)'}}>
                <div className="bg-white w-12 h-12 rounded-full flex flex-col items-center justify-center">
                    <span className="text-sm font-bold">75%</span>
                </div>
             </div>
             <div className="flex-grow">
                 <h3 className="font-bold text-slate-800 text-sm">Today's Progress</h3>
                 <p className="text-xs text-slate-400">Completed</p>
                 <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                    <div className="bg-[#58D68D] h-2 rounded-full w-3/4"></div>
                 </div>
             </div>
             <div className="bg-[#58D68D] text-white rounded-full p-1">
                <Icons.Check size={14} strokeWidth={3} />
             </div>
          </div>
        </section>

        {/* Tasks */}
        <section className="space-y-4 mb-6">
            <div onClick={() => onChangeView(View.TRACING)} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm cursor-pointer active:scale-[0.99] transition-transform">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj5Gwd6TbihgpyRvlKQGNJJxqreVsEsUrcpoSZwTmQrBGWLG0p_BqE132Ao5DuGEUYWAu0XGwkpfiQBqX30k3iz6WHSFatgG11HZ350jjY3Wqr0ZBxJUS0R_epa60b5250rZWcMkKVj24kmEok3phbldlB9U5hMU8rDO6FNkgUhrgTWi79HLlV2NEP30rRmdNjMIwDZYpgWhsvA7_hCIeojvHFWv2MbgaGFpv3NvH8zIaA5Vtrgq8Ynlys-oTShJd2W0WyhZOF_FsX" alt="Brush" className="w-8 h-8 object-contain" />
                </div>
                <div className="flex-grow">
                    <h3 className="font-bold text-sm text-slate-800">Trace 3 new characters</h3>
                    <p className="text-slate-400 text-xs">描红3个新字</p>
                </div>
                <button className="bg-[#D5F5E3] text-green-800 px-4 py-1.5 rounded-full text-xs font-bold">Start</button>
            </div>

            {/* New Feature: Evolution */}
            <div onClick={() => onChangeView(View.EVOLUTION)} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm cursor-pointer active:scale-[0.99] transition-transform">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Icons.Book className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-grow">
                    <h3 className="font-bold text-sm text-slate-800">Character Evolution</h3>
                    <p className="text-slate-400 text-xs">汉字五体演变</p>
                </div>
                <button className="bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full text-xs font-bold">View</button>
            </div>

            {/* New Feature: Decomposition */}
            <div onClick={() => onChangeView(View.DETAIL)} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm cursor-pointer active:scale-[0.99] transition-transform">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Icons.Type className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-grow">
                    <h3 className="font-bold text-sm text-slate-800">Character Decomposition</h3>
                    <p className="text-slate-400 text-xs">字形拆解</p>
                </div>
                <button className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold">Study</button>
            </div>

            <div onClick={() => onChangeView(View.SYLLABUS)} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm cursor-pointer active:scale-[0.99] transition-transform">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6tqfqnLGJDevvJjFup5-aJGw9knlH93FLjeAaf-_XGQmdDmpnK6J6t7UPVUziqNgtllXPHInnxE4VUP-dDhNIuPt9pEgNHUeTW89Dm8ETzojqvuCbEPB62ZHpu3WJE1Bl3CxbNVlWAxGS_H_7Jk25qKzJvmMuo97jbaUMC_pVuGqQ993YMLahN86ARsVPALijfsvLNS_B_3oXgAn9ubbcSUIik7rXTPxx5tVV-BDnak60mfbeXMOBlBCI_eWwV5B6FXytSJKTn4Ai" alt="Brain" className="w-8 h-8 object-contain" />
                </div>
                <div className="flex-grow">
                    <h3 className="font-bold text-sm text-slate-800">Quiz: Recognition</h3>
                    <p className="text-slate-400 text-xs">测验：汉字识别</p>
                </div>
                <button className="bg-[#FDEBD0] text-yellow-800 px-4 py-1.5 rounded-full text-xs font-bold">Start</button>
            </div>

             <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm cursor-pointer active:scale-[0.99] transition-transform">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6Z4-G0EirdhnVEmesIdrzyswIxuh3CMyWyajX-tRAECPIdFEzoEzIgGSf8rlGifcL5RominyRWRlsOhX2QhaK4Ax3qAMe5RMPVSo0XYpa6q1kvjBgp594NA5eM90y_btf7xwLu6ShELamHVc2LD9qQ8CZLIeRLZhKBBrPlARWRTLTE2G0DjbNI54SHDI7EKCpf5g8r1jlMEBnmU7VEnY9uH7d41LoUuVZPg0Fpaf5AxiXwlkUTcbHfeOs_E1LBFXRO9PZpJRD4Xo2" alt="Audio" className="w-8 h-8 object-contain" />
                </div>
                <div className="flex-grow">
                    <h3 className="font-bold text-sm text-slate-800">Listen and Write</h3>
                    <p className="text-slate-400 text-xs">听写练习</p>
                </div>
                <button className="bg-[#D5F5E3] text-green-800 px-4 py-1.5 rounded-full text-xs font-bold">Start</button>
            </div>
        </section>

        {/* Leaderboard */}
        <section className="bg-white rounded-3xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <div>
                     <h3 className="font-bold text-lg text-slate-800">Leaderboard</h3>
                     <p className="text-slate-400 text-xs">排行榜概览</p>
                </div>
                <button className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">View All</button>
            </div>
            <div className="flex justify-around">
                 {[1,2,3].map(i => (
                     <div key={i} className="flex flex-col items-center">
                         <div className="w-10 h-10 rounded-full bg-slate-200 mb-1">
                             <img src={`https://picsum.photos/40/40?random=${i}`} className="w-full h-full rounded-full" alt="User" />
                         </div>
                         <span className="text-xs font-bold">User {i}</span>
                         <span className="text-[10px] text-slate-400">300</span>
                     </div>
                 ))}
            </div>
        </section>
      </div>

      <BottomNav activeView={currentView} onChangeView={onChangeView} />
    </div>
  );
};

export default HomeScreen;