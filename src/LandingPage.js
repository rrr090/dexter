import React, { useState, useEffect } from 'react';
import './LandingPage.css';

const LandingPage = ({ onStartApp }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [currentDemo, setCurrentDemo] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Автоматическая смена активной функции
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 3000);

    // Демо анимация
    const demoInterval = setInterval(() => {
      setCurrentDemo(prev => (prev + 1) % demoQueries.length);
    }, 4000);
    
    return () => {
      clearInterval(featureInterval);
      clearInterval(demoInterval);
    };
  }, []);

  const features = [
    {
      icon: "💬",
      title: "Естественный язык",
      description: "Задавайте вопросы на русском языке, получайте точные SQL-запросы",
      color: "blue"
    },
    {
      icon: "🗄️",
      title: "Любые базы данных",
      description: "Работает с PostgreSQL, MySQL, Oracle, SQL Server и другими СУБД",
      color: "purple"
    },
    {
      icon: "📊",
      title: "Мгновенная аналитика",
      description: "Получайте insights и визуализации данных за секунды",
      color: "green"
    }
  ];

  const benefits = [
    { icon: "📈", text: "Ускорение аналитики в 10 раз", color: "blue" },
    { icon: "👥", text: "Доступ к данным для всей команды", color: "purple" },
    { icon: "🔒", text: "Безопасность корпоративного уровня", color: "green" },
    { icon: "🧠", text: "ИИ понимает бизнес-контекст", color: "orange" }
  ];

  const demoQueries = [
    {
      question: "Покажи топ 10 клиентов по продажам за последний месяц",
      sql: `SELECT customer_name, SUM(amount) as total_sales
FROM sales s
JOIN customers c ON s.customer_id = c.id
WHERE s.date >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
GROUP BY s.customer_id, customer_name
ORDER BY total_sales DESC
LIMIT 10;`
    },
    {
      question: "Какие товары продаются лучше всего в этом квартале?",
      sql: `SELECT p.name, SUM(s.quantity) as units_sold, 
       SUM(s.amount) as revenue
FROM products p
JOIN sales s ON p.id = s.product_id
WHERE s.date >= DATE_TRUNC('quarter', NOW())
GROUP BY p.id, p.name
ORDER BY units_sold DESC;`
    },
    {
      question: "Сравни продажи по регионам за текущий и прошлый год",
      sql: `SELECT region,
       SUM(CASE WHEN YEAR(date) = YEAR(NOW()) 
           THEN amount ELSE 0 END) as current_year,
       SUM(CASE WHEN YEAR(date) = YEAR(NOW())-1 
           THEN amount ELSE 0 END) as previous_year
FROM sales
WHERE date >= DATE_SUB(NOW(), INTERVAL 2 YEAR)
GROUP BY region;`
    }
  ];

  const stats = [
    { number: "10x", label: "Быстрее аналитики" },
    { number: "50+", label: "Типов БД" },
    { number: "99.9%", label: "Точность запросов" },
    { number: "24/7", label: "Поддержка" }
  ];

  
;

  return (
    <div className="landing-container">
      {/* Анимированный фон */}
      <div className="animated-background">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Заголовок */}
      <header className={`landing-header ${isVisible ? 'fade-in' : ''}`}>
        <nav className="nav-container">
          <div className="logo">
            <span className="logo-icon">🤖</span>
            <span className="logo-text">dexter</span>
          </div>
          <div className="nav-links">
            <a href="#features">Возможности</a>
            <a href="#demo">Демо</a>
            <a href="#benefits">Преимущества</a>
            <a href="#pricing">API</a>
            <button className="nav-cta" onClick={onStartApp}>
              Попробовать
            </button>
          </div>
        </nav>
      </header>

      {/* Hero секция */}
      <section className={`hero-section ${isVisible ? 'slide-up' : ''}`}>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">⚡</span>
            <span>Powered by shai.pro</span>
          </div>
          
          <h1 className="hero-title">
            <span className="gradient-text">dexter</span>
          </h1>
          
          <p className="hero-subtitle">
            Агент по корпоративной БД
          </p>
          
          <p className="hero-description">
            Преобразуйте естественный язык в SQL-запросы с помощью передового ИИ. 
            Получайте insights из корпоративных данных мгновенно.
          </p>
          
          <div className="hero-actions">
            <button className="cta-primary" onClick={onStartApp}>
              <a href="https://hackathon.shai.pro/workflow/U9auCx5fkRjaB4Z1">🚀 Начать работу</a>
              <span className="button-arrow">→</span>
            </button>
            <button className="cta-secondary">
              <span>📖 API Документация</span>
            </button>
          </div>

          {/* Статистика */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Интерактивное демо */}
      <section id="demo" className="demo-section">
        <div className="section-content">
          <div className="section-header">
            <h2>🎯 Попробуйте прямо сейчас</h2>
            <p>Посмотрите, как dexter преобразует естественный язык в SQL</p>
          </div>
          
          <div className="demo-container">
            <div className="demo-input">
              <div className="demo-header">
                <span className="demo-icon">💬</span>
                <span>Ваш запрос:</span>
              </div>
              <div className="demo-query">
                {demoQueries[currentDemo].question}
              </div>
            </div>
            
            <div className="demo-arrow">
              <div className="arrow-line"></div>
              <div className="arrow-head">→</div>
              <div className="processing-text">dexter обрабатывает...</div>
            </div>
            
            <div className="demo-output">
              <div className="demo-header">
                <span className="demo-icon">🗄️</span>
                <span>SQL запрос:</span>
              </div>
              <pre className="demo-sql">
                <code>{demoQueries[currentDemo].sql}</code>
              </pre>
            </div>
          </div>

          <div className="demo-controls">
            {demoQueries.map((_, index) => (
              <button
                key={index}
                className={`demo-dot ${index === currentDemo ? 'active' : ''}`}
                onClick={() => setCurrentDemo(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Функции */}
      <section id="features" className="features-section">
        <div className="section-content">
          <div className="section-header">
            <h2>⚡ Мощные возможности</h2>
            <p>Все что нужно для работы с корпоративными данными</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card ${activeFeature === index ? 'active' : ''} ${feature.color}`}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section id="benefits" className="benefits-section">
        <div className="section-content">
          <div className="benefits-container">
            <div className="benefits-header">
              <h2>🎯 Почему выбирают dexter</h2>
              <p>Преимущества для вашего бизнеса</p>
            </div>
            
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className={`benefit-item ${benefit.color}`}>
                  <div className="benefit-icon">{benefit.icon}</div>
                  <p className="benefit-text">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* API интеграция */}
      <section id="pricing" className="api-section">
        <div className="section-content">
          <div className="api-grid">
            <div className="api-info">
              <h2>🔌 Интеграция через API</h2>
              <p className="api-description">
                dexter работает на платформе shai.pro и легко интегрируется в ваши 
                существующие системы через REST API.
              </p>
              
              <div className="api-features">
                <div className="api-feature">
                  <span className="feature-check">✅</span>
                  <span>Простая REST API интеграция</span>
                </div>
                <div className="api-feature">
                  <span className="feature-check">✅</span>
                  <span>Аутентификация через API ключи</span>
                </div>
                <div className="api-feature">
                  <span className="feature-check">✅</span>
                  <span>Поддержка вебхуков</span>
                </div>
                <div className="api-feature">
                  <span className="feature-check">✅</span>
                  <span>Подробная документация</span>
                </div>
              </div>
              
              <button className="api-cta" onClick={onStartApp}>
                🔑 Получить API ключ
              </button>
            </div>
            
            <div className="api-code">
              <div className="code-window">
                <div className="code-header">
                  <div className="code-dots">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                  </div>
                  <div className="code-title">POST /api/v1/query</div>
                </div>
                <div className="code-content">
                  <pre>{`{
  "query": "Покажи продажи по регионам",
  "database": "sales_db",
  "format": "json"
}

// Response
{
  "sql": "SELECT region, SUM(amount) 
          FROM sales 
          GROUP BY region",
  "results": [
    {"region": "Астана", "sum": 1250000},
    {"region": "Петропавловск", "sum": 980000}
  ],
  "execution_time": "0.3s"
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>🚀 Готовы начать?</h2>
          <p>Присоединяйтесь к тысячам компаний, которые уже используют dexter</p>
          <div className="cta-buttons">
            <button className="cta-primary large" onClick={onStartApp}>
              <a href="https://hackathon.shai.pro/workflow/U9auCx5fkRjaB4Z1">Попробовать бесплатно</a>
              <span className="button-arrow">→</span>
            </button>
            <button className="cta-outline">
              <span>📞 Связаться с нами</span>
            </button>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">🤖</span>
                <span className="logo-text">dexter</span>
              </div>
              <p>Интеллектуальная аналитика корпоративных данных</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4>Продукт</h4>
                <a href="#features">Возможности</a>
                <a href="#demo">Демо</a>
                <a href="#pricing">Цены</a>
                <a href="#">Интеграции</a>
              </div>
              <div className="footer-column">
                <h4>Ресурсы</h4>
                <a href="#">Документация</a>
                <a href="#">API Reference</a>
                <a href="#">Руководства</a>
                <a href="#">Поддержка</a>
              </div>
              <div className="footer-column">
                <h4>Компания</h4>
                <a href="#">О нас</a>
                <a href="#">Блог</a>
                <a href="#">Карьера</a>
                <a href="#">Контакты</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 dexter. Powered by shai.pro</p>
            <div className="footer-social">
              <a href="#">🔗 LinkedIn</a>
              <a href="#">🐦 Twitter</a>
              <a href="#">📧 Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;