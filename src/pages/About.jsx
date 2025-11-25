import React from 'react';

const About = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Başlık */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 border-b-2 border-blue-500 inline-block pb-1">
            Hakkımda
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            Modern web geliştirme yolculuğum, tutku ve sürekli öğrenme üzerine kurulu.
          </p>
        </header>

        {/* Hakkımda İçeriği */}
        <section id="about-content" className="text-left space-y-8">
            <p className="text-lg text-gray-700">
                Merhaba, ben **Ömer Özkan Özdil**. Modern web uygulamaları geliştirmeye tutkuyla bağlı, çözüm odaklı bir **Full Stack Geliştiriciyim**.
                Yazılım yolculuğum, bir fikri sıfırdan alıp, kullanıcı dostu ve ölçeklenebilir bir ürüne dönüştürme heyecanıyla başladı.
            </p>

            {/* TEKNİK ODAK */}
            <h2 className="text-2xl font-bold text-gray-900 pt-4 border-t border-gray-100">
                🛠️ Teknik Odağım ve Uzmanlık Alanlarım
            </h2>
            
            <ul className="list-disc pl-5 space-y-3 text-gray-700">
                <li>
                    <strong>Frontend Gücü:</strong> Kullanıcı deneyimini (UX) ön planda tutarak, **React.js** ve modern arayüz kütüphaneleri (özellikle **Tailwind CSS**) ile hızlı, erişilebilir ve mobil uyumlu arayüzler geliştiriyorum.
                </li>
                <li>
                    <strong>Backend Mimarisi:</strong> Sunucu tarafında **Node.js** ve **Express** kullanarak sağlam, güvenli ve yüksek performanslı **RESTful API**'ler inşa ediyorum. Veri yönetimi için **MongoDB** ve gerektiğinde ilişkisel veritabanlarını (örneğin PostgreSQL) tercih ediyorum.
                </li>
            </ul>

            {/* ÇALIŞMA FELSEFESİ */}
            <h2 className="text-2xl font-bold text-gray-900 pt-4 border-t border-gray-100">
                💡 Çalışma Felsefem
            </h2>
            
            <ul className="list-disc pl-5 space-y-3 text-gray-700">
                <li>
                    <strong>Temiz Kod:</strong> Sürdürülebilirliği ve ekip çalışmasını kolaylaştıran, okunaklı ve iyi yorumlanmış kod yazmak.
                </li>
                <li>
                    <strong>Problem Çözme:</strong> Bir soruna sadece teknik bir cevap vermek yerine, iş ihtiyaçlarını derinlemesine anlayarak en zarif ve verimli çözümü sunmak.
                </li>
                <li>
                    <strong>Sürekli Öğrenme:</strong> Yazılım dünyasının dinamik doğasına ayak uydurmak için yeni araçları ve paradigmaları (örneğin TypeScript, Next.js, vb.) sürekli öğrenme çabası içinde olmak.
                </li>
            </ul>

            <p className="text-lg text-gray-700 pt-4 border-t border-gray-100">
                Portfolyomda, fikir aşamasından canlıya geçişe kadar yürüttüğüm projeleri inceleyerek çalışma prensiplerim ve yeteneklerim hakkında daha detaylı bilgi edinebilirsiniz.
                Yeni teknolojilerle tanışmaya ve projelerinize değer katmaya hazırım!
            </p>
        </section>

      </div>
    </div>
  )
}

export default About;