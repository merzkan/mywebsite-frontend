import React from 'react';

const About = () => {
  return (
    // Zemin Rengi: Home.jsx ile aynı (slate-900)
    <div className="bg-slate-900 text-slate-300 min-h-screen py-20 flex items-center justify-center relative overflow-hidden selection:bg-sky-500 selection:text-white">
      
      {/* Arkaplan Süslemesi (Daha soft Sky ve Indigo tonları) */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-sky-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        {/* --- CAM EFEKTLİ KART --- 
            Beyaz/Transparent yerine Slate-800 ve Slate border kullanıldı.
        */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden ring-1 ring-white/5">
          
          {/* Başlık Kısmı */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 mb-6 drop-shadow-sm">
              Hakkımda
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
              Modern web geliştirme yolculuğum, tutku ve sürekli öğrenme üzerine kurulu.
            </p>
          </header>

          {/* İçerik */}
          <section id="about-content" className="space-y-10 text-slate-300">
              
              {/* Giriş Paragrafı */}
              <div className="text-lg leading-loose text-slate-300">
                  Merhaba, ben <strong className="text-slate-50 font-bold">Ömer Özkan Özdil</strong>. 
                  Modern web uygulamaları geliştirmeye tutkuyla bağlı, çözüm odaklı bir <span className="text-sky-400 font-semibold">Full Stack Geliştiriciyim</span>.
                  Yazılım yolculuğum, bir fikri sıfırdan alıp, kullanıcı dostu ve ölçeklenebilir bir ürüne dönüştürme heyecanıyla başladı.
              </div>

              {/* İki Kolonlu Yapı */}
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* SOL KOLON: TEKNİK ODAK 
                    bg-black/20 yerine bg-slate-900/50 (daha uyumlu koyuluk)
                */}
                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 hover:border-sky-500/30 transition-colors group">
                  <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">🛠️</span> Teknik Odağım
                  </h2>
                  <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                          <span className="mt-1.5 w-2 h-2 rounded-full bg-sky-400 shrink-0 shadow-[0_0_10px_rgba(56,189,248,0.5)]"></span>
                          <span>
                            <strong className="text-sky-200 block text-sm mb-1">Frontend Gücü</strong>
                            Kullanıcı deneyimini (UX) ön planda tutarak, <strong className="text-slate-200">React.js</strong> ve <strong className="text-slate-200">Tailwind CSS</strong> ile modern arayüzler.
                          </span>
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_10px_rgba(129,140,248,0.5)]"></span>
                          <span>
                            <strong className="text-indigo-200 block text-sm mb-1">Backend Mimarisi</strong>
                             <strong className="text-slate-200">Node.js</strong> ve <strong className="text-slate-200">Express</strong> ile güvenli API'ler, <strong className="text-slate-200">MongoDB</strong> ile verimli veri yönetimi.
                          </span>
                      </li>
                  </ul>
                </div>

                {/* SAĞ KOLON: ÇALIŞMA FELSEFESİ */}
                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 hover:border-sky-500/30 transition-colors group">
                  <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">💡</span> Felsefem
                  </h2>
                  <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                          {/* Yeşil tik yerine Sky rengi tik kullanıldı bütünlük için */}
                          <span className="text-sky-400 font-bold">✓</span>
                          <span>
                            <strong className="text-slate-200">Temiz Kod:</strong> Sürdürülebilir ve okunaklı yapı.
                          </span>
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="text-sky-400 font-bold">✓</span>
                          <span>
                            <strong className="text-slate-200">Problem Çözme:</strong> İhtiyaca yönelik zarif çözümler.
                          </span>
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="text-sky-400 font-bold">✓</span>
                          <span>
                            <strong className="text-slate-200">Sürekli Öğrenme:</strong> Yeni teknolojilere adaptasyon.
                          </span>
                      </li>
                  </ul>
                </div>
              </div>

              {/* Alt Mesaj */}
              <div className="pt-8 border-t border-slate-700/50 text-center">
                  <p className="text-lg text-slate-400 italic font-light">
                      "Portfolyomda, fikir aşamasından canlıya geçişe kadar yürüttüğüm projeleri inceleyebilirsiniz. Yeni teknolojilerle tanışmaya ve projelerinize değer katmaya hazırım!"
                  </p>
              </div>

          </section>

        </div>
      </div>
    </div>
  )
}

export default About;