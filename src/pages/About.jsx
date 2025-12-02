import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white min-h-screen py-20 flex items-center justify-center">
      
      {/* Arkaplan Süslemesi (Opsiyonel Işıltı) */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        {/* --- CAM EFEKTLİ KART (GLASSMORPHISM) --- */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden">
          
          {/* Başlık Kısmı */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-6 drop-shadow-sm">
              Hakkımda
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 font-light max-w-2xl mx-auto leading-relaxed">
              Modern web geliştirme yolculuğum, tutku ve sürekli öğrenme üzerine kurulu.
            </p>
          </header>

          {/* İçerik */}
          <section id="about-content" className="space-y-10 text-slate-300">
              
              {/* Giriş Paragrafı */}
              <div className="text-lg leading-loose text-slate-200">
                  Merhaba, ben <strong className="text-white font-bold">Ömer Özkan Özdil</strong>. 
                  Modern web uygulamaları geliştirmeye tutkuyla bağlı, çözüm odaklı bir <span className="text-blue-400 font-semibold">Full Stack Geliştiriciyim</span>.
                  Yazılım yolculuğum, bir fikri sıfırdan alıp, kullanıcı dostu ve ölçeklenebilir bir ürüne dönüştürme heyecanıyla başladı.
              </div>

              {/* İki Kolonlu Yapı (Tablet ve üstü için) */}
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* SOL KOLON: TEKNİK ODAK */}
                <div className="bg-black/20 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-2xl">🛠️</span> Teknik Odağım
                  </h2>
                  <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                          <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>
                          <span>
                            <strong className="text-blue-200 block text-sm mb-1">Frontend Gücü</strong>
                            Kullanıcı deneyimini (UX) ön planda tutarak, <strong>React.js</strong> ve <strong>Tailwind CSS</strong> ile modern arayüzler.
                          </span>
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-400 shrink-0"></span>
                          <span>
                            <strong className="text-purple-200 block text-sm mb-1">Backend Mimarisi</strong>
                             <strong>Node.js</strong> ve <strong>Express</strong> ile güvenli API'ler, <strong>MongoDB</strong> ile verimli veri yönetimi.
                          </span>
                      </li>
                  </ul>
                </div>

                {/* SAĞ KOLON: ÇALIŞMA FELSEFESİ */}
                <div className="bg-black/20 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-2xl">💡</span> Felsefem
                  </h2>
                  <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                          <span className="text-green-400">✓</span>
                          <span>
                            <strong className="text-white">Temiz Kod:</strong> Sürdürülebilir ve okunaklı yapı.
                          </span>
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="text-green-400">✓</span>
                          <span>
                            <strong className="text-white">Problem Çözme:</strong> İhtiyaca yönelik zarif çözümler.
                          </span>
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="text-green-400">✓</span>
                          <span>
                            <strong className="text-white">Sürekli Öğrenme:</strong> Yeni teknolojilere adaptasyon.
                          </span>
                      </li>
                  </ul>
                </div>
              </div>

              {/* Alt Mesaj */}
              <div className="pt-8 border-t border-white/10 text-center">
                  <p className="text-lg text-slate-300 italic">
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