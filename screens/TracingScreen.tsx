import React from 'react';
import { NavProps, View } from '../types';
import { Icons } from '../components/Icons';

import { uploadComparison } from '../api/client';

const TracingScreen: React.FC<NavProps> = ({ onChangeView }) => {
    const [comparing, setComparing] = React.useState(false);
    const [result, setResult] = React.useState<{ similarity: number } | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setComparing(true);
            try {
                // Use the original public URL for the reference image so the backend can download it
                const originalUrl = "https://photos.google.com/share/AF1QipPOYBjCCCQtlyaoJQ828-DQtFnXfbEwGNa5HkN7nL-JMrcD6f2JOyfVRI1IPu095g/photo/AF1QipPScwqcxO5keL35tj08A9TI3i43XpWTrnrNp5HD?key=Z1dKZWp0MFl5bDVHN3VLNW9VNl9QanJyaFU2M2JB";

                const res = await uploadComparison(e.target.files[0], originalUrl);
                setResult(res);
            } catch (err) {
                console.error(err);
                alert("Comparison failed");
            } finally {
                setComparing(false);
            }
        }
    };
    return (
        <div className="flex-1 flex flex-col bg-[#F2F2F7] relative">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#F2F2F7]/95 backdrop-blur border-b border-gray-200 px-4 h-14 flex items-center justify-between">
                <button onClick={() => onChangeView(View.HOME)} className="p-2 -ml-2 rounded-full active:bg-gray-200">
                    <Icons.Back className="text-blue-500" />
                </button>
                <h1 className="font-semibold text-base">临摹甲骨文 (Character Tracing)</h1>
                <button onClick={() => onChangeView(View.DETAIL)} className="p-2 -mr-2 rounded-full active:bg-gray-200">
                    <Icons.Settings className="text-blue-500" />
                </button>
            </header>

            <main className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
                {/* Reference Card */}
                <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 flex items-center justify-center mb-4">
                        <img src="https://photos.google.com/share/AF1QipPOYBjCCCQtlyaoJQ828-DQtFnXfbEwGNa5HkN7nL-JMrcD6f2JOyfVRI1IPu095g/photo/AF1QipPScwqcxO5keL35tj08A9TI3i43XpWTrnrNp5HD?key=Z1dKZWp0MFl5bDVHN3VLNW9VNl9QanJyaFU2M2JB" alt="Oracle Bird" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">鸟 niǎo</h2>
                    <p className="text-lg font-medium text-gray-500">Bird</p>
                    <p className="text-xs text-gray-400 mt-2">Trace the ancient character to learn its form.</p>
                </section>

                {/* Tracing Workspace */}
                <section className="bg-white rounded-2xl shadow-sm flex flex-col p-4">
                    <nav className="flex justify-between items-center mb-4 px-2">
                        {['Undo', 'Clear', 'Template'].map((tool, idx) => (
                            <button key={tool} className="flex flex-col items-center gap-1 group">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-active:bg-gray-100">
                                    {idx === 0 && <Icons.Undo size={18} className="text-gray-500" />}
                                    {idx === 1 && <Icons.Trash size={18} className="text-gray-500" />}
                                    {idx === 2 && <Icons.Eye size={18} className="text-gray-500" />}
                                </div>
                                <span className="text-[10px] font-medium text-gray-400">{tool}</span>
                            </button>
                        ))}
                        <button className="flex flex-col items-center gap-1 group" onClick={handleCameraClick}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${comparing ? 'bg-yellow-100' : 'bg-blue-50 group-active:bg-blue-100'}`}>
                                {comparing ? <Icons.Settings className="animate-spin text-yellow-600" size={18} /> : <Icons.Camera size={18} className="text-blue-500" />}
                            </div>
                            <span className="text-[10px] font-bold text-blue-500">{comparing ? '...' : 'Compare'}</span>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                            capture="environment"
                        />
                    </nav>

                    {/* Canvas Grid */}
                    <div className="w-full aspect-square relative bg-white border-2 border-[#E5E5EA] rounded-lg overflow-hidden">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 border-b border-dashed border-red-200 opacity-50 top-1/2"></div>
                        <div className="absolute inset-0 border-r border-dashed border-red-200 opacity-50 left-1/2"></div>
                        <div className="absolute inset-0">
                            <svg width="100%" height="100%">
                                <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(254, 202, 202, 0.3)" strokeDasharray="4" />
                                <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(254, 202, 202, 0.3)" strokeDasharray="4" />
                            </svg>
                        </div>

                        {/* Tracing Template */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                            <span className="font-kaiti text-[200px]">鸟</span>
                        </div>

                        {/* Oracle Bone Char Overlay (The goal) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 mix-blend-multiply">
                            <img src="https://photos.google.com/share/AF1QipPOYBjCCCQtlyaoJQ828-DQtFnXfbEwGNa5HkN7nL-JMrcD6f2JOyfVRI1IPu095g/photo/AF1QipPScwqcxO5keL35tj08A9TI3i43XpWTrnrNp5HD?key=Z1dKZWp0MFl5bDVHN3VLNW9VNl9QanJyaFU2M2JB" alt="Trace" className="w-3/4 h-3/4 object-contain" />
                        </div>
                    </div>
                </section>


                {/* Result Overlay */}
                {result && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setResult(null)}>
                        <div className="bg-white rounded-2xl p-6 w-full max-w-xs text-center" onClick={e => e.stopPropagation()}>
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600">{Math.round(result.similarity)}%</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Similarity Score</h3>
                            <p className="text-gray-500 mb-6">
                                {result.similarity > 80 ? "Excellent work! Your tracing is very accurate." :
                                    result.similarity > 50 ? "Good effort! Keep practicing handling the curves." : "Keep trying! Focus on the stroke order."}
                            </p>
                            <button onClick={() => setResult(null)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold active:bg-blue-700">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div >
    );
};

export default TracingScreen;