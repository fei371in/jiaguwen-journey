import React, { useState, useRef, useEffect } from 'react';
import { NavProps, View } from '../types';
import BottomNav from '../components/BottomNav';
import { Icons } from '../components/Icons';
import apiClient from '../api/client';

const LibraryScreen: React.FC<NavProps> = ({ onChangeView, currentView }) => {
    const [uploads, setUploads] = useState<Array<{ url: string, name: string }>>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchUploads();
    }, []);

    const fetchUploads = async () => {
        try {
            const response = await apiClient.get('/uploads/');
            // Map backend response to UI format
            // backend returns { file_url, file_name, ... }
            setUploads(response.data.map((u: any) => ({
                url: u.file_url,
                name: u.file_name || 'Upload'
            })));
        } catch (err) {
            console.error("Failed to fetch uploads", err);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const result = e.target?.result as string;
                if (result) {
                    // Optimistic update
                    const newUpload = {
                        url: result,
                        name: file.name.split('.')[0].slice(0, 8)
                    };
                    setUploads(prev => [newUpload, ...prev]);

                    // Persist to backend
                    try {
                        await apiClient.post('/uploads/', {
                            file_url: result, // Sending base64 as url for MVP
                            file_name: newUpload.name,
                            description: 'Uploaded via App'
                        });
                    } catch (err) {
                        console.error("Failed to upload", err);
                        // Revert or show error
                    }
                }
            };
            reader.readAsDataURL(file);
        }
        // Reset the input value so the same file can be selected again if needed
        if (event.target) {
            event.target.value = '';
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-gray-50">
            <header className="bg-white sticky top-0 z-50 shadow-sm pt-6 pb-4 px-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-9"></div> {/* Spacer for optical centering */}
                    <h1 className="text-xl font-bold text-center text-slate-800">Script Library (字库)</h1>
                    <button
                        onClick={handleUploadClick}
                        className="w-9 h-9 flex items-center justify-center text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors active:scale-95 border border-blue-100"
                        title="Upload Picture"
                    >
                        <Icons.Upload size={18} />
                    </button>
                </div>

                <div className="relative">
                    <Icons.Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                    <input type="text" placeholder="Search characters" className="w-full bg-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </header>

            <main className="flex-1 overflow-y-auto p-4 pb-24">
                {uploads.length > 0 && (
                    <section className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Icons.User className="w-5 h-5 text-gray-700" />
                            <h2 className="font-bold text-gray-800">My Uploads (我的上传)</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {uploads.map((item, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-sm p-2 flex flex-col items-center aspect-square justify-between relative group overflow-hidden border border-blue-100">
                                    <div className="flex-1 w-full flex items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                                        <img src={item.url} alt="Upload" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[10px] text-gray-500 mt-2 font-medium truncate w-full text-center">{item.name}</span>
                                    <div className="absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Icons.Check size={10} className="text-green-600" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Icons.Globe className="w-5 h-5 text-gray-700" />
                        <h2 className="font-bold text-gray-800">Astronomy (天文)</h2>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {[{ char: '日', en: 'Sun' }, { char: '月', en: 'Moon' }, { char: '云', en: 'Cloud' }].map(c => (
                            <div key={c.en} className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center aspect-square justify-center hover:shadow-md transition-shadow">
                                <span className="font-serif text-4xl mb-1 text-jiaguwen-brown">{c.char}</span>
                                <span className="text-xs text-gray-500">{c.en}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Icons.Cloud className="w-5 h-5 text-gray-700" />
                        <h2 className="font-bold text-gray-800">Geography (地理)</h2>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {[{ char: '山', en: 'Mtn' }, { char: '水', en: 'Water' }, { char: '土', en: 'Earth' }, { char: '石', en: 'Stone' }].map(c => (
                            <div key={c.en} className="bg-white rounded-xl shadow-sm p-2 py-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                                <span className="font-serif text-2xl mb-1 text-jiaguwen-brown">{c.char}</span>
                                <span className="text-[10px] text-gray-500">{c.en}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <BottomNav activeView={currentView} onChangeView={onChangeView} />
        </div>
    );
};

export default LibraryScreen;