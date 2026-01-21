import React from 'react';
import { NavProps, View } from '../types';
import { Icons } from '../components/Icons';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const ReportScreen: React.FC<NavProps> = ({ onChangeView }) => {
  const radarData = [
    { subject: '字形', A: 120, fullMark: 150 },
    { subject: '字音', A: 98, fullMark: 150 },
    { subject: '字义', A: 86, fullMark: 150 },
    { subject: '溯源', A: 99, fullMark: 150 },
    { subject: '应用', A: 85, fullMark: 150 },
  ];

  const barData = [
      { name: 'My Progress', val: 85, fill: '#4285F4' },
      { name: 'Avg', val: 70, fill: '#F5A623' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F0]">
        <header className="sticky top-0 z-50 bg-[#FAF8F0]/95 pt-4 pb-3 px-4 flex items-center justify-between">
            <button onClick={() => onChangeView(View.PROFILE)} className="text-blue-500 flex items-center gap-1"><Icons.Back /> Back</button>
            <h1 className="font-bold">多维学习报告</h1>
            <div className="w-10"></div>
        </header>

        <main className="px-4 py-4 space-y-4 pb-12 overflow-y-auto">
            <section className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjp31is-WDYSi00ZKxwksrMdeXM6BKwBFP6iqZGs0szcRwtvAfFZDeS9pErDtyO9WWj6qsspbT3N52qyYteU2MWQMb0_OjWxkMq668wAx5aQaRfsgTzoT23Xw_e293qnqFbfX2-6EYDdr7Bt_GaaRYa-dY1lVk5BkBLu89A-9pAfXi-mtLvv9wkHW3Fj6hBLCkkVlsjU899hMm6GZkafgarP0XtCPLOr0E0dN-zBBx7Gicg1tVfBpNvKKrtjUJD9kDXseqOt1sMtgI" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div>
                         <p className="font-medium">累计学习天数: <span className="font-bold">120</span></p>
                    </div>
                </div>
                <span className="text-sm font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded">高级</span>
            </section>

            <section className="bg-white rounded-2xl p-5 shadow-sm">
                <h2 className="text-xl font-bold mb-4">学习进度</h2>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#666' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} />
                        <Radar name="Mike" dataKey="A" stroke="#5AC8FA" fill="#5AC8FA" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            <section className="bg-white rounded-2xl p-5 shadow-sm">
                <h2 className="text-xl font-bold mb-4">弱项分析</h2>
                <div className="space-y-3">
                    <div className="flex items-center">
                         <span className="text-2xl font-serif font-bold mr-3">难</span>
                         <div><span className="font-medium">(nán) - Difficult</span></div>
                    </div>
                    <div className="flex items-center">
                         <span className="text-2xl font-serif font-bold mr-3">赢</span>
                         <div><span className="font-medium">(yíng) - Win</span></div>
                    </div>
                </div>
            </section>

            <section className="bg-white rounded-2xl p-5 shadow-sm">
                 <h2 className="text-xl font-bold mb-4">同龄对比</h2>
                 <div className="space-y-4">
                     {barData.map((d, i) => (
                         <div key={i} className="flex items-center">
                             <div className="w-20 text-xs font-medium text-gray-500">{d.name}</div>
                             <div className="flex-1 h-4 bg-gray-100 rounded-full mx-2 overflow-hidden">
                                 <div className="h-full rounded-full" style={{width: `${d.val}%`, backgroundColor: d.fill}}></div>
                             </div>
                             <div className="w-8 text-right text-xs font-bold">{d.val}%</div>
                         </div>
                     ))}
                 </div>
            </section>
        </main>
    </div>
  );
};

export default ReportScreen;