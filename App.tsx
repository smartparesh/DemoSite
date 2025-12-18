
import React, { useState, useEffect, useCallback } from 'react';
import { ViewState } from './types';
import { INSTITUTE_INFO, COURSE_CATALOG, TESTIMONIALS } from './constants';

const SmartLogo: React.FC<{ 
  size?: 'sm' | 'md' | 'lg', 
  customLogo: string | null, 
  onLogoUpload: (file: File) => void 
}> = ({ size = 'md', customLogo, onLogoUpload }) => {
  const scale = size === 'sm' ? 'scale-75' : size === 'lg' ? 'scale-125' : 'scale-100';
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onLogoUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onLogoUpload(file);
  };

  return (
    <div 
      className={`relative flex flex-col items-center group transition-transform ${scale} cursor-pointer`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        id={`logo-upload-${size}`} 
        onChange={handleFileChange} 
      />
      <label htmlFor={`logo-upload-${size}`} className="cursor-pointer">
        {customLogo ? (
          <div className="w-24 h-24 bg-white rounded-2xl border-4 border-yellow-500 overflow-hidden shadow-lg flex items-center justify-center p-2 group-hover:border-black transition-colors">
            <img src={customLogo} alt="Custom Logo" className="max-w-full max-h-full object-contain" />
          </div>
        ) : (
          <div className="w-16 h-20 bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-600 rounded-b-[2rem] border-4 border-black flex items-center justify-center relative shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-black font-serif text-4xl font-black italic translate-y-[-4px]">S</span>
            <span className="absolute text-[6px] font-black text-black uppercase top-6 right-2 tracking-tighter italic">smart</span>
            <span className="absolute text-[6px] font-black text-black uppercase bottom-8 left-1 tracking-tighter rotate-[-15deg]">education</span>
            <span className="absolute text-[7px] font-black text-white bg-black px-1 py-0.5 bottom-3 leading-none italic">Centre</span>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-colors">
               <i className="fa-solid fa-cloud-arrow-up text-white opacity-0 group-hover:opacity-100 text-xs"></i>
            </div>
          </div>
        )}
      </label>
      
      {!customLogo && (
        <div className="absolute -bottom-2 w-28 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 py-1 px-2 border-2 border-black rounded-sm shadow-md flex items-center justify-center">
          <span className="text-[7px] font-black text-black uppercase whitespace-nowrap tracking-widest">{INSTITUTE_INFO.slogan}</span>
        </div>
      )}
      
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest">
        Drag & Drop Your Logo
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [customLogo, setCustomLogo] = useState<string | null>(() => localStorage.getItem('sec_custom_logo'));

  const navigateTo = (newView: ViewState, courseId: string | null = null) => {
    setView(newView);
    setSelectedCourseId(courseId);
    window.scrollTo(0, 0);
  };

  const handleLogoUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as string;
      setCustomLogo(data);
      localStorage.setItem('sec_custom_logo', data);
    };
    reader.readAsDataURL(file);
  }, []);

  const selectedCourse = COURSE_CATALOG.find(c => c.id === selectedCourseId);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-yellow-500 selection:text-black">
      {/* Navigation */}
      <nav className="bg-black text-white sticky top-0 z-50 border-b-2 border-yellow-500 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 h-24 flex justify-between items-center">
          <div className="flex items-center gap-8 lg:gap-12">
            <SmartLogo size="sm" customLogo={customLogo} onLogoUpload={handleLogoUpload} />
            <div className="cursor-pointer group" onClick={() => navigateTo('home')}>
              <h1 className="text-xl font-black tracking-tighter leading-none text-white whitespace-nowrap">SMART EDUCATION CENTRE</h1>
              <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-[0.25em] mt-1 italic whitespace-nowrap">Under Guidance of {INSTITUTE_INFO.founder}</p>
            </div>
          </div>
          
          <div className="hidden md:flex gap-8 text-xs font-black uppercase tracking-widest">
            <button onClick={() => navigateTo('home')} className={`hover:text-yellow-500 transition-colors ${view === 'home' ? 'text-yellow-500' : ''}`}>Home</button>
            <button onClick={() => navigateTo('courses')} className={`hover:text-yellow-500 transition-colors ${view === 'courses' ? 'text-yellow-500' : ''}`}>Courses</button>
            <button onClick={() => navigateTo('about')} className={`hover:text-yellow-500 transition-colors ${view === 'about' ? 'text-yellow-500' : ''}`}>About</button>
            <button onClick={() => navigateTo('contact')} className={`hover:text-yellow-500 transition-colors ${view === 'contact' ? 'text-yellow-500' : ''}`}>Contact</button>
          </div>

          <div className="flex items-center gap-4">
            <a href={`https://wa.me/${INSTITUTE_INFO.whatsapp}`} target="_blank" className="hidden lg:flex items-center gap-2 bg-yellow-500 text-black px-5 py-3 rounded-full font-black text-[10px] hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20">
              <i className="fa-brands fa-whatsapp text-lg"></i> ENQUIRE NOW
            </a>
            <button className="md:hidden text-2xl text-yellow-500"><i className="fa-solid fa-bars-staggered"></i></button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {view === 'home' && <HomeView onNavigate={navigateTo} logo={customLogo} onUpload={handleLogoUpload} />}
        {view === 'courses' && <CoursesView onNavigate={navigateTo} />}
        {view === 'about' && <AboutView logo={customLogo} onUpload={handleLogoUpload} />}
        {view === 'contact' && <ContactView />}
        {view === 'course-detail' && selectedCourse && (
          <CourseDetailView course={selectedCourse} />
        )}
      </main>

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${INSTITUTE_INFO.whatsapp}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform shadow-green-500/20"
        title="WhatsApp Us"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* Footer */}
      <footer className="bg-black text-white pt-24 pb-12 border-t-8 border-yellow-500">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <SmartLogo size="sm" customLogo={customLogo} onLogoUpload={handleLogoUpload} />
              <h2 className="text-lg font-black italic tracking-tighter uppercase whitespace-nowrap">SMART EDUCATION CENTRE</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Mumbai's premier institute for job-oriented computer training. Established in 2000 by <strong>{INSTITUTE_INFO.founder}</strong>.
            </p>
            <div className="flex gap-4 pt-4">
              <a href={INSTITUTE_INFO.facebook} target="_blank" className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all shadow-lg"><i className="fa-brands fa-facebook-f"></i></a>
              <a href={`mailto:${INSTITUTE_INFO.email}`} className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all shadow-lg"><i className="fa-solid fa-envelope"></i></a>
            </div>
          </div>

          <div>
            <h3 className="text-yellow-500 font-black mb-10 text-xs uppercase tracking-[0.3em] border-l-4 border-yellow-500 pl-4">Job Oriented Courses</h3>
            <ul className="space-y-5 text-sm font-bold text-slate-400">
              {COURSE_CATALOG.slice(0, 4).map(c => (
                <li key={c.id} className="hover:text-yellow-500 cursor-pointer flex items-center gap-3 group" onClick={() => navigateTo('course-detail', c.id)}>
                   <i className="fa-solid fa-caret-right text-yellow-500 group-hover:translate-x-1 transition-transform"></i> {c.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-yellow-500 font-black mb-10 text-xs uppercase tracking-[0.3em] border-l-4 border-yellow-500 pl-4">Our Presence in Mumbai</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {INSTITUTE_INFO.branches.map((b, i) => (
                <div key={i} className="text-sm bg-white/5 p-6 rounded-2xl border border-white/10 group hover:border-yellow-500/50 transition-all">
                  <p className="font-black text-yellow-500 mb-4 uppercase tracking-widest whitespace-nowrap text-xs">{b.name}</p>
                  <p className="text-slate-400 mb-6 h-12 text-xs leading-relaxed">{b.address}</p>
                  <p className="text-white font-black mb-6 flex items-center gap-3"><i className="fa-solid fa-phone-volume text-yellow-500"></i> {b.contacts[0]}</p>
                  <a href={b.mapUrl} target="_blank" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-yellow-500 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded">LOCATE ON MAP <i className="fa-solid fa-location-arrow"></i></a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-500 uppercase tracking-[0.4em] font-black text-center">
          <p>© 2025 Smart Education Centre Mumbai • Excellence in Computer Education</p>
          <p>Founded by {INSTITUTE_INFO.founder}</p>
        </div>
      </footer>
    </div>
  );
};

// --- View Components ---

const HomeView: React.FC<{onNavigate: (v: ViewState, id?: string) => void, logo: string | null, onUpload: (f: File) => void}> = ({onNavigate, logo, onUpload}) => (
  <>
    {/* Hero Section */}
    <section className="bg-black text-white py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
         <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-[160px]"></div>
         <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-600 rounded-full blur-[140px]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white px-6 py-2 font-black text-[10px] uppercase tracking-[0.3em] rounded-full backdrop-blur-md">
            <i className="fa-solid fa-shield-halved text-yellow-500"></i> Trusted Since 2000
          </div>
          <h2 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase">
            LEARN TO <br />
            <span className="text-yellow-500">LEAD.</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-lg leading-relaxed font-medium">
            Join <strong className="whitespace-nowrap text-white">Smart Education Centre</strong>. We turn students into industry-ready professionals with Mumbai's most practical curriculum.
          </p>
          <div className="flex flex-wrap gap-6 pt-6">
            <button 
              onClick={() => onNavigate('courses')}
              className="bg-yellow-500 text-black px-12 py-6 font-black rounded-xl text-xs hover:bg-yellow-400 transition-all flex items-center gap-4 shadow-2xl shadow-yellow-500/30 group uppercase"
            >
              EXPLORE OUR PROGRAMS <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-white/5 border border-white/20 text-white px-12 py-6 font-black rounded-xl text-xs hover:bg-white hover:text-black transition-all backdrop-blur-md uppercase"
            >
              LOCATE BRANCH
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] bg-slate-900 rounded-[3rem] border-8 border-yellow-500 p-2 overflow-hidden shadow-[0_0_80px_rgba(234,179,8,0.2)] rotate-3 hover:rotate-0 transition-all duration-1000 group">
             <img 
               src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000" 
               alt="Indian Students collaborating in Lab" 
               className="w-full h-full object-cover rounded-[2.5rem] opacity-70 group-hover:opacity-100 transition-opacity duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
             <div className="absolute bottom-16 left-12 right-12">
                <p className="text-4xl font-black text-white italic leading-tight uppercase tracking-tighter">BE <span className="text-yellow-500 uppercase">SMART.</span> <br /> JOIN SMART.</p>
             </div>
          </div>
          <div className="absolute -bottom-10 -left-12 bg-black p-10 border-4 border-yellow-500 rounded-[2rem] shadow-2xl z-20">
             <p className="text-yellow-500 text-6xl font-black tracking-tighter">24+</p>
             <p className="text-[10px] text-white font-black uppercase tracking-[0.4em] mt-2">Years of Legacy</p>
          </div>
        </div>
      </div>
    </section>

    {/* Featured Courses */}
    <section className="py-40 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-32">
          <h2 className="text-xs font-black text-yellow-600 uppercase tracking-[0.5em] mb-6">Course Directory</h2>
          <p className="text-6xl font-black text-black tracking-tighter uppercase">CAREER ACCELERATORS</p>
          <div className="w-24 h-3 bg-yellow-500 mx-auto mt-8 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {COURSE_CATALOG.slice(0, 3).map((course) => (
            <div key={course.id} className="group relative bg-slate-50 border-2 border-slate-100 p-12 rounded-[2.5rem] hover:bg-black transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] hover:-translate-y-4 overflow-hidden">
              <div className="absolute top-0 right-0 p-10 text-[10rem] text-slate-200 opacity-20 group-hover:text-yellow-500/20 group-hover:scale-125 transition-all pointer-events-none">
                <i className={`fa-solid ${course.icon}`}></i>
              </div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-yellow-500 rounded-2xl flex items-center justify-center text-3xl text-black mb-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <i className={`fa-solid ${course.icon}`}></i>
                </div>
                <h3 className="text-3xl font-black mb-4 group-hover:text-yellow-500 transition-colors uppercase leading-tight tracking-tighter">{course.name}</h3>
                <p className="text-slate-500 text-sm font-black mb-10 uppercase tracking-[0.2em] group-hover:text-slate-400">{course.duration} MASTERS</p>
                <button 
                  onClick={() => onNavigate('course-detail', course.id)}
                  className="bg-black text-white px-8 py-4 rounded-xl font-black text-[11px] uppercase group-hover:bg-yellow-500 group-hover:text-black transition-all flex items-center gap-3 w-max tracking-widest"
                >
                  FULL SYLLABUS <i className="fa-solid fa-chevron-right text-[8px]"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* About Home Section */}
    <section className="bg-black text-white py-40 border-y-[12px] border-yellow-500 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        <div className="relative order-2 lg:order-1">
           <div className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-500 rounded-full blur-[160px] opacity-10"></div>
           <div className="relative z-10 border-[12px] border-white/5 rounded-[3rem] overflow-hidden group">
             <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800" 
              alt="Programming Lab Environment" 
              className="rounded-[2.5rem] opacity-80 group-hover:scale-110 transition-transform duration-1000" 
             />
           </div>
           <div className="absolute -bottom-12 -right-12 bg-yellow-500 p-12 rounded-[3rem] shadow-[0_30px_60px_rgba(234,179,8,0.3)] z-20 max-w-xs text-black border-4 border-black">
              <i className="fa-solid fa-quote-left text-5xl mb-6 block opacity-30"></i>
              <p className="font-black text-2xl italic leading-tight tracking-tighter">"We don't just teach tools, we build careers."</p>
              <div className="mt-6 flex items-center gap-4">
                 <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-yellow-500"><i className="fa-solid fa-user-tie"></i></div>
                 <div>
                    <p className="font-black text-sm uppercase leading-none">{INSTITUTE_INFO.founder}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-60">Director</p>
                 </div>
              </div>
           </div>
        </div>
        <div className="space-y-12 order-1 lg:order-2">
           <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">WHY CHOOSE <br /><span className="text-yellow-500 whitespace-nowrap uppercase">SMART EDUCATION CENTRE?</span></h2>
           <div className="space-y-10">
              {[
                { title: "Direct Mentor Guidance", desc: `Get personal instruction from ${INSTITUTE_INFO.founder} & our team of industry veterans.` },
                { title: "Practical First Policy", desc: "No more passive learning. Every student works on real-world datasets and business problems." },
                { title: "Advanced IT Labs", desc: "Our Worli and Dadar branches are equipped with high-performance machines for smooth learning." }
              ].map((usp, i) => (
                <div key={i} className="flex gap-8 border-l-[6px] border-yellow-500 pl-8 py-3 group hover:bg-white/5 transition-colors rounded-r-2xl">
                  <div>
                    <h4 className="font-black text-3xl uppercase tracking-tighter text-yellow-500 mb-2 group-hover:translate-x-2 transition-transform">{usp.title}</h4>
                    <p className="text-slate-400 font-medium text-lg leading-relaxed">{usp.desc}</p>
                  </div>
                </div>
              ))}
           </div>
           <button onClick={() => onNavigate('about')} className="bg-white text-black px-12 py-6 font-black uppercase text-xs rounded-xl hover:bg-yellow-500 transition-all shadow-xl tracking-widest">KNOW OUR STORY</button>
        </div>
      </div>
    </section>

    {/* Google Reviews Testimonials */}
    <section className="py-40 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-32">
           <div className="text-center lg:text-left">
              <h2 className="text-xs font-black text-yellow-600 uppercase tracking-[0.5em] mb-6">Verified Student Success</h2>
              <p className="text-6xl font-black text-black tracking-tighter uppercase">VOICES OF EXCELLENCE</p>
           </div>
           <div className="flex items-center gap-6 bg-white px-10 py-6 rounded-3xl border-2 border-slate-200 shadow-xl">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-10" alt="Google" />
              <div className="text-left border-l-2 border-slate-100 pl-6">
                <p className="font-black text-2xl leading-none">4.9/5 STARS</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2">GOOGLE REVIEWS AVERAGE</p>
              </div>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {TESTIMONIALS.map((t, i) => (
             <div key={i} className="bg-white border-2 border-slate-100 p-12 rounded-[3rem] relative shadow-lg hover:shadow-2xl transition-all group">
                <div className="flex gap-1 text-yellow-500 mb-10">
                   {[...Array(5)].map((_, idx) => <i key={idx} className="fa-solid fa-star text-sm"></i>)}
                </div>
                <p className="text-slate-700 font-medium italic mb-12 leading-relaxed text-lg">"{t.text}"</p>
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 bg-black text-yellow-500 rounded-2xl flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
                      {t.name.charAt(0)}
                   </div>
                   <div>
                      <p className="font-black text-black text-base uppercase tracking-tight">{t.name}</p>
                      <p className="text-yellow-600 font-black text-[10px] uppercase tracking-[0.2em] mt-1">{t.course}</p>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  </>
);

const CoursesView: React.FC<{onNavigate: (v: ViewState, id: string) => void}> = ({onNavigate}) => (
  <section className="py-32 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
        <div>
          <h2 className="text-7xl font-black mb-6 uppercase tracking-tighter leading-none uppercase">ALL <span className="text-yellow-500 uppercase">PROGRAMS.</span></h2>
          <p className="text-slate-500 font-black tracking-[0.3em] uppercase text-xs">Quality Education • Practical Training • Mumbai's Best</p>
        </div>
        <div className="bg-yellow-500 h-1 flex-grow hidden md:block mb-6 mx-12 rounded-full opacity-30"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {COURSE_CATALOG.map((course) => (
          <div key={course.id} className="group bg-white border-2 border-slate-100 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col border-b-8 border-b-slate-200 hover:border-b-yellow-500">
            <div className="bg-black py-16 text-center text-yellow-500 text-6xl group-hover:bg-yellow-500 group-hover:text-black transition-colors duration-500">
              <i className={`fa-solid ${course.icon}`}></i>
            </div>
            <div className="p-12 flex-grow flex flex-col">
              <div className="mb-8">
                <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-5 inline-block border border-slate-200">{course.duration} TERM</span>
                <h3 className="text-3xl font-black group-hover:text-yellow-600 transition-colors uppercase leading-[1.1] tracking-tighter">{course.name}</h3>
              </div>
              <div className="mb-12 flex-grow">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 border-b-2 border-slate-50 pb-2">Modules Covered</p>
                 <ul className="space-y-4">
                    {course.syllabus.slice(0, 3).map((mod: any, idx: number) => (
                      <li key={idx} className="text-xs font-bold text-slate-700 flex items-center gap-3 group/item">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                        <span className="group-hover/item:translate-x-1 transition-transform">{mod.title}</span>
                      </li>
                    ))}
                    <li className="text-[10px] font-black text-yellow-600 uppercase tracking-widest pt-2">+ Detailed Practical Training</li>
                 </ul>
              </div>
              <button 
                onClick={() => onNavigate('course-detail', course.id)}
                className="w-full bg-black text-white py-5 font-black rounded-2xl text-xs uppercase hover:bg-yellow-500 hover:text-black transition-all tracking-[0.2em] shadow-xl group"
              >
                VIEW FULL PROGRAM <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutView: React.FC<{logo: string | null, onUpload: (f: File) => void}> = ({logo, onUpload}) => (
  <section className="py-32 px-4 bg-white">
    <div className="max-w-6xl mx-auto">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
          <div className="lg:sticky lg:top-32">
            <span className="text-yellow-600 font-black uppercase tracking-[0.6em] text-xs">Our Journey</span>
            <h2 className="text-7xl font-black mt-6 leading-[0.9] uppercase tracking-tighter uppercase whitespace-nowrap">ESTABLISHED <br /> IN {INSTITUTE_INFO.established}.</h2>
            <div className="mt-12">
               <SmartLogo size="lg" customLogo={logo} onLogoUpload={onUpload} />
            </div>
          </div>
          <div className="space-y-10">
             <div className="bg-slate-50 p-12 rounded-[3rem] border-l-[12px] border-yellow-500 relative">
               <i className="fa-solid fa-quote-left absolute top-8 right-12 text-6xl text-slate-200"></i>
               <p className="text-2xl font-black text-slate-800 leading-tight italic relative z-10 tracking-tighter">
                 "Our mission is simple — to make quality computer education accessible, affordable, and career-focused for every student in Mumbai."
               </p>
             </div>
             <div className="space-y-8 text-slate-600 font-medium leading-relaxed text-lg">
                <p>{INSTITUTE_INFO.history}</p>
                <p>Learn. Upskill. Grow. At <strong className="text-black">Smart Education Centre</strong>, we don’t just teach — we mentor, guide, and inspire. Whether you are a student starting your journey or a professional looking to upgrade your skills, we are here to support your growth every step of the way.</p>
             </div>
             <div className="pt-10 flex items-center gap-6">
                <div className="w-20 h-20 bg-black rounded-full border-4 border-yellow-500 flex items-center justify-center text-3xl text-yellow-500">
                   <i className="fa-solid fa-user-tie"></i>
                </div>
                <div>
                   <p className="font-black text-3xl uppercase tracking-tighter leading-none">{INSTITUTE_INFO.founder}</p>
                   <p className="text-[10px] text-yellow-600 font-black uppercase tracking-[0.4em] mt-2 italic">Founder & Master Instructor</p>
                </div>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="bg-black text-white p-16 rounded-[4rem] relative overflow-hidden group shadow-2xl">
            <div className="absolute -bottom-20 -right-20 text-[20rem] text-white/5 font-black group-hover:scale-110 transition-transform select-none">V</div>
            <h4 className="text-yellow-500 font-black mb-10 uppercase tracking-[0.4em] text-xs">Our Vision</h4>
            <p className="text-2xl font-black text-slate-200 leading-snug relative z-10 italic tracking-tighter">To become a leading skill development institute that transforms learners into confident, capable, and career-ready professionals through quality education and continuous innovation.</p>
          </div>
          <div className="bg-yellow-500 text-black p-16 rounded-[4rem] relative overflow-hidden group shadow-2xl border-4 border-black">
            <div className="absolute -bottom-20 -right-20 text-[20rem] text-black/5 font-black group-hover:scale-110 transition-transform select-none">M</div>
            <h4 className="text-black font-black mb-10 uppercase tracking-[0.4em] text-xs">Our Mission</h4>
            <ul className="space-y-6 text-base font-black relative z-10 uppercase tracking-widest">
               <li className="flex gap-4 items-center"><i className="fa-solid fa-square text-black text-[10px]"></i> Job-Focused Computer Education</li>
               <li className="flex gap-4 items-center"><i className="fa-solid fa-square text-black text-[10px]"></i> Simple & Effective Learning</li>
               <li className="flex gap-4 items-center"><i className="fa-solid fa-square text-black text-[10px]"></i> Continuous Curriculum Upgrades</li>
               <li className="flex gap-4 items-center"><i className="fa-solid fa-square text-black text-[10px]"></i> Unmatched Student Support</li>
            </ul>
          </div>
       </div>

       {/* Founder Profile Section */}
       <div className="pt-32 border-t-4 border-slate-100 text-center">
          <div className="relative inline-block mb-12">
            <div className="w-56 h-56 bg-slate-100 rounded-full border-8 border-yellow-500 flex items-center justify-center overflow-hidden shadow-2xl relative z-10 group">
               <i className="fa-solid fa-user-tie text-[10rem] text-slate-300 translate-y-6 group-hover:scale-110 transition-transform duration-700"></i>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-black text-yellow-500 w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 border-yellow-500 z-20">
               <i className="fa-solid fa-award"></i>
            </div>
          </div>
          <h3 className="text-5xl font-black uppercase tracking-tighter">{INSTITUTE_INFO.founder}</h3>
          <p className="text-yellow-600 font-black uppercase tracking-[0.5em] text-xs mt-4">Head of Smart Education Centre</p>
          <div className="max-w-3xl mx-auto mt-10 text-slate-500 font-medium text-lg leading-relaxed">
             With over 24 years of teaching excellence, Paresh Sir has specialized in simplifying complex computer concepts for thousands of students, ensuring they don't just learn tools, but build lifelong skills.
          </div>
       </div>
    </div>
  </section>
);

const ContactView: React.FC = () => (
  <section className="py-32 px-4 bg-slate-50">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
        <div className="space-y-16">
           <div>
              <span className="text-yellow-600 font-black uppercase tracking-[0.6em] text-xs">Connect Now</span>
              <h2 className="text-7xl font-black uppercase tracking-tighter mt-6 leading-none">VISIT <span className="text-yellow-500 uppercase">US.</span></h2>
           </div>
           
           <div className="grid grid-cols-1 gap-12">
              {INSTITUTE_INFO.branches.map((b, i) => (
                <div key={i} className="bg-white p-12 rounded-[3.5rem] border-2 border-slate-100 shadow-xl group hover:border-yellow-500 transition-all duration-500">
                   <div className="flex justify-between items-start mb-10">
                      <div className="w-20 h-20 bg-black text-yellow-500 rounded-[2rem] flex items-center justify-center text-3xl group-hover:bg-yellow-500 group-hover:text-black transition-all">
                        <i className="fa-solid fa-location-dot"></i>
                      </div>
                      <a href={b.mapUrl} target="_blank" className="bg-slate-50 border-2 border-slate-100 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm">
                         GET DIRECTIONS <i className="fa-solid fa-map-pin ml-2"></i>
                      </a>
                   </div>
                   <h4 className="font-black text-4xl mb-6 uppercase tracking-tighter">{b.name}</h4>
                   <p className="text-slate-500 font-medium mb-10 leading-relaxed text-lg">{b.address}</p>
                   <div className="flex flex-wrap gap-8 pt-10 border-t-2 border-slate-50">
                      {b.contacts.map((c, idx) => (
                        <a key={idx} href={`tel:${c}`} className="text-black font-black font-mono text-xl hover:text-yellow-600 flex items-center gap-3">
                           <i className="fa-solid fa-phone-volume text-yellow-500"></i> {c}
                        </a>
                      ))}
                   </div>
                </div>
              ))}
           </div>
           
           <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex-1 bg-black text-white p-10 rounded-[2.5rem] flex items-center gap-8 shadow-2xl">
                 <div className="text-5xl text-yellow-500"><i className="fa-solid fa-envelope-open-text"></i></div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.4em] mb-2 italic text-nowrap">Email Support</p>
                    <p className="font-black text-lg">{INSTITUTE_INFO.email}</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white p-16 rounded-[4rem] border-4 border-slate-100 shadow-[0_60px_120px_rgba(0,0,0,0.08)] relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black px-12 py-4 rounded-full font-black text-xs uppercase tracking-[0.4em] whitespace-nowrap shadow-2xl border-4 border-black">
            Admission Inquiry
          </div>
          <form className="space-y-10 mt-6">
             <div className="space-y-8">
                <div>
                   <label className="text-xs font-black uppercase tracking-[0.3em] mb-4 block text-slate-400">Your Full Name</label>
                   <input type="text" className="w-full bg-slate-50 border-4 border-slate-100 p-5 rounded-2xl focus:border-yellow-500 outline-none transition-all font-black uppercase text-sm tracking-widest" placeholder="Enter Name" />
                </div>
                <div>
                   <label className="text-xs font-black uppercase tracking-[0.3em] mb-4 block text-slate-400">Primary Contact No.</label>
                   <input type="text" className="w-full bg-slate-50 border-4 border-slate-100 p-5 rounded-2xl focus:border-yellow-500 outline-none transition-all font-black text-sm tracking-widest" placeholder="+91 99999 99999" />
                </div>
                <div>
                   <label className="text-xs font-black uppercase tracking-[0.3em] mb-4 block text-slate-400">Select Program</label>
                   <select className="w-full bg-slate-50 border-4 border-slate-100 p-5 rounded-2xl focus:border-yellow-500 outline-none transition-all font-black appearance-none uppercase text-xs tracking-widest">
                      <option>Choose Course</option>
                      {COURSE_CATALOG.map(c => <option key={c.id}>{c.name}</option>)}
                   </select>
                </div>
                <div>
                   <label className="text-xs font-black uppercase tracking-[0.3em] mb-4 block text-slate-400">Preferred Location</label>
                   <div className="flex gap-6">
                      {INSTITUTE_INFO.branches.map((b, i) => (
                        <label key={i} className="flex-1 cursor-pointer">
                           <input type="radio" name="branch" className="hidden peer" />
                           <div className="text-center p-5 rounded-2xl border-4 border-slate-100 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 font-black text-[10px] uppercase transition-all whitespace-nowrap tracking-widest">
                              {b.name}
                           </div>
                        </label>
                      ))}
                   </div>
                </div>
                <div>
                   <label className="text-xs font-black uppercase tracking-[0.3em] mb-4 block text-slate-400">Additional Message</label>
                   <textarea className="w-full bg-slate-50 border-4 border-slate-100 p-5 rounded-2xl focus:border-yellow-500 outline-none transition-all font-bold h-40 resize-none" placeholder="Any specific requirements?"></textarea>
                </div>
             </div>
             <button className="w-full bg-black text-yellow-500 py-8 font-black rounded-[2rem] hover:bg-yellow-500 hover:text-black transition-all shadow-2xl shadow-black/20 uppercase tracking-[0.4em] text-xs">
               SUBMIT FORM <i className="fa-solid fa-paper-plane ml-3"></i>
             </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const CourseDetailView: React.FC<{course: any}> = ({course}) => (
  <section className="py-32 px-4 bg-white">
    <div className="max-w-6xl mx-auto">
      {/* Course Banner */}
      <div className="mb-24 bg-black text-white p-20 rounded-[4rem] relative overflow-hidden border-b-[12px] border-yellow-500 shadow-2xl">
        <div className="absolute top-0 right-0 p-16 text-white/5 text-[22rem] font-black select-none pointer-events-none translate-x-20 translate-y-[-10rem]">
           <i className={`fa-solid ${course.icon}`}></i>
        </div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-5 mb-12">
             <span className="bg-yellow-500 text-black px-6 py-2 font-black text-[10px] uppercase tracking-[0.4em] rounded-full">Premier Program</span>
             <div className="flex gap-1.5 text-yellow-500 text-sm">
                {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star"></i>)}
                <span className="text-white ml-2 font-black text-xs uppercase tracking-widest">Job Ready</span>
             </div>
          </div>
          <h2 className="text-6xl md:text-8xl font-black mb-10 leading-[0.85] uppercase tracking-tighter max-w-3xl">{course.name}</h2>
          <div className="flex flex-wrap gap-12 text-xs font-black uppercase tracking-[0.4em]">
            <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-xl"><i className="fa-solid fa-calendar-check text-yellow-500 text-xl"></i> <span>Duration: {course.duration}</span></div>
            <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-xl"><i className="fa-solid fa-receipt text-yellow-500 text-xl"></i> <span>Standard Fee: {course.fee}</span></div>
            {course.offer && (
              <div className="bg-white text-black px-6 py-3 rounded-xl flex items-center gap-3 animate-pulse">
                 <i className="fa-solid fa-fire text-yellow-600 text-xl"></i>
                 <span className="tracking-widest">OFFER: {course.offer}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
        <div className="space-y-20">
          {/* Syllabus Section */}
          <div>
            <div className="flex items-center gap-6 mb-12">
               <h3 className="text-4xl font-black uppercase tracking-tighter border-b-[6px] border-yellow-500 pb-2">DETAILED SYLLABUS</h3>
               <div className="flex-grow h-0.5 bg-slate-100"></div>
            </div>
            <div className="space-y-8">
              {course.syllabus.map((mod: any, i: number) => (
                <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border-2 border-slate-100 group hover:border-yellow-500 transition-all shadow-sm">
                   <div className="flex items-center gap-6 mb-8">
                      <span className="w-14 h-14 bg-black text-yellow-500 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 group-hover:rotate-12 transition-transform">{i+1}</span>
                      <h4 className="font-black text-2xl uppercase tracking-tighter leading-tight">{mod.title}</h4>
                   </div>
                   <ul className="space-y-4 ml-20">
                      {mod.points.map((pt: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-4 text-slate-600 font-medium group/pt">
                           <i className="fa-solid fa-circle-check text-yellow-600 mt-1 transition-transform group-hover/pt:scale-125"></i>
                           <span className="text-lg leading-snug">{pt}</span>
                        </li>
                      ))}
                   </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-12 lg:sticky lg:top-32">
          {/* Installment Plan Card */}
          <div className="bg-white p-12 rounded-[3.5rem] border-4 border-yellow-500 shadow-[0_40px_80px_rgba(234,179,8,0.15)] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10">
                <i className="fa-solid fa-wallet text-6xl text-yellow-600"></i>
             </div>
             <h4 className="text-yellow-600 font-black mb-8 uppercase tracking-[0.4em] text-xs">Flexible Payment Plan</h4>
             <div className="space-y-8">
                <div className="flex justify-between items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">At Admission</p>
                      <p className="text-3xl font-black text-black">{course.installments.admission}</p>
                   </div>
                   <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black">
                      <i className="fa-solid fa-check"></i>
                   </div>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Monthly Installment</p>
                      <p className="text-3xl font-black text-black">{course.installments.emi}</p>
                   </div>
                   <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-yellow-500">
                      <i className="fa-solid fa-calendar"></i>
                   </div>
                </div>
             </div>
             <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
               * Zero hidden costs. Material fee included in admission.
             </p>
          </div>

          <div className="bg-black text-white p-14 rounded-[3.5rem] relative overflow-hidden shadow-2xl border-b-[12px] border-yellow-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
            <h4 className="text-yellow-500 font-black mb-10 uppercase tracking-[0.4em] text-xs">WHY MASTER THIS AT SMART?</h4>
            <div className="space-y-10">
               {[
                 { title: "Project Based Learning", desc: "No boring slides. You will build actual reports and software throughout the term." },
                 { title: "1-on-1 Debugging Sessions", desc: `Directly troubleshoot your code and queries with ${INSTITUTE_INFO.founder}.` },
                 { title: "Placement Portfolio", desc: "We help you create a digital portfolio of your class projects to show employers." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-6 items-start group">
                    <div className="text-yellow-500 mt-1 bg-white/5 p-3 rounded-xl group-hover:bg-yellow-500 group-hover:text-black transition-all"><i className="fa-solid fa-check-double text-2xl"></i></div>
                    <div>
                       <p className="font-black text-lg uppercase mb-2 tracking-tight group-hover:text-yellow-500 transition-colors">{item.title}</p>
                       <p className="text-slate-400 text-base font-medium leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-yellow-500 p-1.5 rounded-[2rem] shadow-2xl">
             <button 
                onClick={() => window.open(`https://wa.me/${INSTITUTE_INFO.whatsapp}?text=Hi Paresh Sir, I am interested in the ${course.name} program. Please share more details and batch timings.`, '_blank')} 
                className="w-full bg-black text-yellow-500 py-8 font-black rounded-[1.8rem] text-xl hover:bg-slate-900 transition-all uppercase tracking-tighter flex items-center justify-center gap-4"
              >
               <i className="fa-brands fa-whatsapp text-3xl"></i> BOOK FREE DEMO CLASS
             </button>
          </div>
          
          <div className="text-center p-10 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100">
             <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-4 italic">Direct Admissions Line:</p>
             <p className="text-3xl font-black text-black font-mono tracking-widest">{INSTITUTE_INFO.whatsapp.substring(0,5)}-{INSTITUTE_INFO.whatsapp.substring(5)}</p>
             <div className="mt-6 flex justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accepting New Batch Applications</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default App;
