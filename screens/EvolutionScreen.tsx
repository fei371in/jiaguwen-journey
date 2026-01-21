import React from 'react';
import { NavProps, View } from '../types';
import { Icons } from '../components/Icons';

const EvolutionScreen: React.FC<NavProps> = ({ onChangeView }) => {
  const evolutionSteps = [
    { name: '甲骨文', sub: 'Oracle', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqWL5zgdY9UM43ytZRuyW1fGQodi4NfQbMKuk1S_PROfaI_fhsiXP8DZarq9cmZuQVQ5945di-X6QCvv7P6CUpcfyv_z-K8HwV1UavikoYNSilLKK43-cCBgPnmOaLzAvKEcPEGPcVAU0o3prtg3Oebhof0FNDmhkDo1nO5SZD_5HXhebKsmfQ3eCf31v6AOqcB2YJnMeoVDPsc2wvXklcbFAELvor3JlcoJiZIFWs851KkSR-HnTxC9QtE2TSmNGraTpygb85I44f' },
    { name: '金文', sub: 'Bronze', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKkClsQoCRsDBxQITW9pxoMArKsy5MSp0tOT3YX2qPXgPIIAZs49XOAFC2J9K5G46HduGt22hjekoPb9VkeMHsngoYjn04_eWlnl-BDQEj4E7d3jdXI4Ll9qXZFhpOY752sBZJf0gnTOeu-5FV9enYvgPzLArdGLRMW_zTCMXkHHSrf-IO_36L4dkQQP3htTciVB4B4Uv5Do3Fd_548QShtm_g2I5wLLlCMlLYrePgukqMKhNhYujKwLL4CaPH1-qMbeELewcO_5zA' },
    { name: '小篆', sub: 'Small Seal', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVqR-TSRStTsgYAuRRI3ZxAd1wTp2hwyqcNUqdjb-GScH6GnqJVle2B5DHxQn-2VNhx3_x-Pg4jjdje22n5RSYLtHOYm9CCtsjjwg_tiCwhMZZwy5XvJZsB1N4F-caiz-yF074sJswdCiu4PeSia7tFkuluVRmtEffQGdvzkuXpLIwAQaZFFSBh-rxDrBjY9cDx0aQ0q08jIxNvPhFLpKyJmUV-uCVneMlah1YSG8RHaKyJQLO8UO9foouOUlJPrt64Hhvx9DKF-D-' },
    { name: '楷书', sub: 'Regular', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAktsc_GnB1N1lTwplDD51cUhHRpwp7Hesrd69k-rJq5qXJ9ByTXGfGwS4E9Efu97pgMfNGKouWGUTsx-cpm3Q0k3T-OLnEz3pfBBzeH8iSu2gVWk9aK9RUpMB16uvztY5yp6PV61-KGXWKVT78tTJEV_ybXYzAClg6WnJ0jNV0MROYulu0IHEvtlyQZC3Ni1NuJ69CRanVWcItYW0phbcIoxmeX09KyXhEJpQD-qnXFUF6FlRiHh_GkOWsoH-32Et3q_A6Ndj4WBlI' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F7F3E8]">
      <header className="sticky top-0 z-50 bg-[#F7F3E8]/95 backdrop-blur px-4 py-3 flex items-center justify-between border-b border-stone-200">
         <button onClick={() => onChangeView(View.DETAIL)} className="flex items-center text-lg"><Icons.Back className="mr-1"/> Back</button>
         <h1 className="font-bold">Evolution Gallery: Bird</h1>
         <div className="flex gap-4">
            <Icons.Star />
            <Icons.Share />
         </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* Timeline */}
        <section className="overflow-x-auto pt-6 pb-2 px-4 no-scrollbar">
           <div className="relative min-w-max">
               {/* Line */}
               <div className="absolute top-[120px] left-0 w-full h-[3px] bg-[#D6CDB8] z-0"></div>
               
               <div className="flex space-x-4">
                   {evolutionSteps.map((step, i) => (
                       <article key={i} className="flex flex-col items-center shrink-0 w-[140px] relative z-10">
                           <div className="w-full bg-[#E8DCCA] rounded-lg border border-stone-300 p-2 h-[240px] flex items-center justify-center mb-2 shadow-sm">
                               <img src={step.img} alt={step.name} className="w-full h-full object-cover rounded" />
                           </div>
                           <div className="text-center">
                               <h3 className="font-bold text-sm text-stone-800">{step.name}</h3>
                               <p className="text-xs text-stone-500">{step.sub}</p>
                           </div>
                       </article>
                   ))}
               </div>
           </div>
        </section>

        <section className="px-5 py-6 space-y-4">
            <h2 className="text-xl font-bold font-sans">Character Evolution & Origin</h2>
            <p className="text-[15px] text-stone-800 leading-relaxed text-justify">
                鸟的甲骨文从侧面画出鸟儿尖尖的嘴巴、有长尾巴的身躯，以及可以抓住树干的脚爪。金文更为具象化，除可见尖喙和脚爪外，还描绘出翅膀和羽毛。
            </p>
            <p className="text-[15px] text-stone-800 leading-relaxed text-justify">
                The Oracle Bone form pictographically depicts a bird's beak, long tail, and claws for perching. The Bronze form is more abstract, emphasizing the claws, wings, and feathers.
            </p>
        </section>
      </main>
    </div>
  );
};

export default EvolutionScreen;