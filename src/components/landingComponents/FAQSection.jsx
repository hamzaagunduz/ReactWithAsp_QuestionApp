import { useState } from 'react';
import styles from './FAQSection.module.css';

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "Dobi'yi nasıl kullanmaya başlayabilirim?",
            answer: "Dobi'yi kullanmaya başlamak için web sitemizdeki 'Ücretsiz Başla' butonuna tıklayarak kayıt olabilirsiniz. Kayıt işleminin ardından kullanıcı panelinize erişebilir ve hemen öğrenmeye başlayabilirsiniz."
        },
        {
            question: "Dobi'nin diğer platformlardan farkı nedir?",
            answer: "Dobi, yapay zeka destekli kişiselleştirilmiş öğrenme deneyimi sunar. Öğrenme stilinize ve eksiklerinize göre özel çalışma programı oluşturur, anlık geri bildirim verir ve gelişiminizi sürekli takip eder."
        },
        {
            question: "Dobi'ye hangi cihazlardan erişebilirim?",
            answer: "Dobi'ye bilgisayar, tablet ve akıllı telefonlardan erişebilirsiniz. Tüm modern tarayıcılarda ve iOS/Android işletim sistemlerinde sorunsuz çalışır."
        },
        {
            question: "Ücret ödemem gerekiyor mu ?",
            answer: "Hayır, ücretsiz kayıt olup hemen çalışmaya başlayabilirsin."
        },
        // {
        //     question: "Ödeme yöntemleri nelerdir?",
        //     answer: "Kredi kartı, banka kartı ve online ödeme sistemleri ile ödeme yapabilirsiniz. Tüm ödeme işlemleri güvenli SSL şifrelemesi ile korunmaktadır."
        // }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection} id="faq">
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2>Sıkça Sorulan Sorular</h2>
                    <p>Dobi hakkında merak ettikleriniz</p>
                </div>

                <div className={styles.faqContainer}>
                    {faqs.map((faq, index) => (
                        <div
                            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
                            key={index}
                        >
                            <div
                                className={styles.faqQuestion}
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={activeIndex === index}
                            >
                                <span>{faq.question}</span>
                                <div className={styles.faqIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d={activeIndex === index ?
                                                "M19 13H5v-2h14v2z" :
                                                "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                                            }
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className={styles.faqAnswer}>
                                <div className={styles.answerContent}>
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.ctaContainer}>
                    <p>Hala sorularınız mı var? <a href="mailto:beldyazilim@gmail.com">Bize ulaşın</a></p>
                    <p>beldyazilim@gmail.com</p>
                </div>

            </div>
        </section>
    );
};

export default FAQSection;