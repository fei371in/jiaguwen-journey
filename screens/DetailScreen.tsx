import React from 'react';
import { NavProps, View } from '../types';
import { Icons } from '../components/Icons';

const DetailScreen: React.FC<NavProps> = ({ onChangeView }) => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      <header className="sticky top-0 bg-white z-50 border-b border-gray-100 px-4 h-14 flex items-center justify-between">
         <button onClick={() => onChangeView(View.TRACING)} className="p-2 -ml-2"><Icons.Back /></button>
         <h1 className="text-sm font-medium">Character Decomposition Details</h1>
         <div className="flex gap-4">
             <Icons.Star className="w-5 h-5" />
             <Icons.Share className="w-5 h-5" />
         </div>
      </header>

      <main className="flex-1 p-6 flex flex-col items-center overflow-y-auto pb-24">
         <h2 className="text-3xl font-normal text-gray-500 mb-8"><span className="text-black font-medium">鸟</span> niǎo</h2>
         
         {/* Diagram */}
         <div className="relative w-full max-w-xs aspect-square bg-white border border-gray-100 rounded-2xl mb-8 flex items-center justify-center">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrx3or_xI2I87BX9r0ifni-B40HwbF5f2Jj9C7_O_6M_AQkzI7lXZTzFNeFla4Omc2YOdv10SoABcPIBfRUQcyulf4XpqfRBZjlHjXtszmFrGzqm8V11d8VftkbjQ8G7D6jd_f2pxsW3sNDlq97kSjyN72KgfUhHWhSU1B4CTbymBD-igup068BcvUm5EtiFPd3Djvp3NC8ovaH_UWHX23cIW94pnsyYegmDm_1drBW3eNKhGI_9UBTu58rRvcPmvSYHA4fSpSKNTB" alt="Bird Oracle" className="w-2/3 h-2/3 object-contain" style={{transform: 'scaleX(-1)'}} />
             
             {/* Annotations (Simplified positioning for responsive) */}
             <div className="absolute top-10 left-0 text-right">
                <div className="text-sm font-bold">Eye</div>
                <div className="text-xs text-gray-400">(眼睛)</div>
                <div className="w-10 h-px bg-red-400 absolute top-3 -right-12"></div>
             </div>
             
             <div className="absolute top-24 -left-4 text-right">
                <div className="text-sm font-bold">Beak</div>
                <div className="text-xs text-gray-400">(鸟喙)</div>
                <div className="w-16 h-px bg-red-400 absolute top-3 -right-20"></div>
             </div>

             <div className="absolute top-20 -right-4 text-left">
                <div className="text-sm font-bold">Body</div>
                <div className="text-xs text-gray-400">(身躯)</div>
                <div className="w-12 h-px bg-red-400 absolute top-3 -left-14"></div>
             </div>

             <div className="absolute bottom-10 -right-4 text-left">
                <div className="text-sm font-bold">Claws</div>
                <div className="text-xs text-gray-400">(爪子)</div>
                <div className="w-16 h-px bg-red-400 absolute top-3 -left-18"></div>
             </div>
         </div>

         <div className="text-center text-gray-400 text-sm mb-6">Oracle Bone Script (甲骨文)</div>

         <article className="bg-gray-50 rounded-2xl p-6 relative text-sm leading-relaxed text-gray-800">
            <span className="absolute top-2 left-4 text-4xl text-gray-200 font-serif">“</span>
            <p className="mb-4">The Oracle Bone script for "Bird" is a pictorial representation, clearly showing the beak, eyes, long body, and claws grasping a branch.</p>
            <p className="text-gray-500">(鸟的甲骨文从侧面画出鸟儿尖尖的嘴巴、有长尾巴的身躯，以及可以抓住树干的脚爪。)</p>
            <span className="absolute bottom-[-10px] right-4 text-4xl text-gray-200 font-serif">”</span>
         </article>
      </main>

      <div className="fixed bottom-8 right-6">
        <button onClick={() => onChangeView(View.EVOLUTION)} className="bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
            <Icons.Book className="w-4 h-4" />
            <span className="font-medium">Evolution</span>
        </button>
      </div>
    </div>
  );
};

export default DetailScreen;