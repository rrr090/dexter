// src/App.jsx

import { useEffect } from 'react';
import './App.css';

function App() {
  // Use useEffect to handle side effects like DOM manipulation
  useEffect(() => {
    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-element');
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
      // Navbar scroll effect
      const navbar = document.getElementById('navbar');
      if (scrolled > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.section-title, .process-card, .feature-card, .about-text, .mission-box').forEach((element) => {
      observer.observe(element);
    });

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const convertToSQL = () => {
    const input = document.getElementById('queryInput').value.trim();
    if (!input) {
      alert('Пожалуйста, введите запрос.');
      return;
    }
    let sql = '';
    if (input.includes('клиент')) {
      sql = 'SELECT * FROM customers ORDER BY sales DESC LIMIT 10;';
    } else if (input.includes('сумма')) {
      sql = 'SELECT category, AVG(order_amount) FROM orders GROUP BY category;';
    } else {
      sql = 'SELECT * FROM table WHERE condition; // На основе: "' + input + '"';
    }
    document.getElementById('sqlOutput').innerText = sql;
  };
  
  return (
    <>
      <nav id="navbar">
        <div className="nav-container">
          <div className="logo">Dexter</div>
          <div className="nav-links">
            <a href="#hero">Главная</a>
            <a href="#how-it-works">Как это работает</a>
            <a href="#features">Возможности</a>
            <a href="#about">О нас</a>
          </div>
        </div>
      </nav>

      <div id="hero" className="hero">
        <div className="hero-bg"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="hero-content">
          <div className="hero-grid">
            <div className="hero-text-content">
              <h1>Превращаем вопросы в SQL-запросы</h1>
              <p className="hero-description">Dexter — интеллектуальный AI-агент, который понимает ваши бизнес-вопросы на естественном языке и мгновенно преобразует их в оптимизированные SQL-запросы для любых корпоративных баз данных.</p>
              <div className="hero-buttons">
                <a href="https://hackathon.shai.pro/workflow/U9auCx5fkRjaB4Z1" target="_blank" rel="noopener noreferrer">
                  <button className="primary-btn">Попробовать сейчас</button>
                </a>
                <a href="https://www.canva.com/design/DAGzMPmId20/AYfuv0tnRh0VQ0tXZTHsNQ/view?utm_content=DAGzMPmId20&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5eaa025a84" target="_blank" rel="noopener noreferrer">
                  <button className="secondary-btn">Узнать больше</button>
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="terminal-demo">
                <div className="terminal-header">
                  <div className="terminal-dot red"></div>
                  <div className="terminal-dot yellow"></div>
                  <div className="terminal-dot green"></div>
                </div>
                <div className="terminal-content">
                  <p>Dexter ready...</p>
                  <input
                    type="text"
                    className="query-input"
                    id="queryInput"
                    placeholder="Например: 'Покажи мне топ-10 клиентов за последний месяц'"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') convertToSQL();
                    }}
                  />
                  <a href="https://hackathon.shai.pro/workflow/U9auCx5fkRjaB4Z1" target="_blank" rel="noopener noreferrer">
                    <button className="primary-btn">Преобразовать в SQL</button>
                  </a>
                  <pre id="sqlOutput" className="sql-output">{'SELECT * FROM customers WHERE purchase_amount > 1000;'}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="how-it-works" className="section">
        <h2 className="section-title">Как это работает</h2>
        <div className="process-grid">
          <div className="process-card">
            <div className="process-number">1</div>
            <div className="process-title">Введите запрос</div>
            <p className="process-description">Задайте вопрос о ваших данных на естественном языке, как если бы общались с аналитиком</p>
          </div>
          <div className="process-card">
            <div className="process-number">2</div>
            <div className="process-title">AI анализ</div>
            <p className="process-description">Dexter понимает контекст, структуру базы данных и бизнес-логику вашего запроса</p>
          </div>
          <div className="process-card">
            <div className="process-number">3</div>
            <div className="process-title">SQL генерация</div>
            <p className="process-description">Создание оптимизированного SQL-запроса с учетом специфики вашей СУБД</p>
          </div>
          <div className="process-card">
            <div className="process-number">4</div>
            <div className="process-title">Получение данных</div>
            <p className="process-description">Мгновенное выполнение запроса и представление результатов в удобном формате</p>
          </div>
        </div>
      </div>

      <div id="features" className="section">
        <h2 className="section-title">Ключевые возможности</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <div className="feature-title">Молниеносная скорость</div>
            <p className="feature-text">Генерация SQL-запросов за доли секунды с автоматической оптимизацией производительности</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <div className="feature-title">Высокая точность</div>
            <p className="feature-text">99.9% точность преобразования благодаря обучению на миллионах корпоративных запросов</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔗</div>
            <div className="feature-title">Универсальность</div>
            <p className="feature-text">Поддержка всех популярных СУБД: PostgreSQL, MySQL, Oracle, SQL Server, MongoDB</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <div className="feature-title">Безопасность</div>
            <p className="feature-text">Корпоративный уровень защиты данных с шифрованием и контролем доступа</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <div className="feature-title">Визуализация</div>
            <p className="feature-text">Автоматическое создание графиков и дашбордов на основе полученных данных</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <div className="feature-title">Интеграция</div>
            <p className="feature-text">Легкая интеграция с BI-системами, CRM и ERP через API или плагины</p>
          </div>
        </div>
      </div>

      <div id="about" className="section">
        <h2 className="section-title">О Dexter</h2>
        <div className="about-content">
          <p className="about-text">Dexter — это революционное решение на стыке искусственного интеллекта и бизнес-аналитики. Мы создали инструмент, который делает данные доступными для каждого сотрудника компании, независимо от технических навыков.</p>
          <p className="about-text">Наша технология основана на последних достижениях в области обработки естественного языка и машинного обучения. Dexter понимает контекст вашего бизнеса и автоматически адаптируется под структуру ваших данных.</p>
          <div className="mission-box">
            <h3 className="mission-title">Наша миссия</h3>
            <p>Демократизировать доступ к корпоративным данным, позволяя каждому сотруднику принимать решения на основе точной и актуальной информации, без необходимости изучения SQL или других технических инструментов.</p>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <div className="footer-column">
            <div className="footer-logo">Dexter</div>
            <p className="footer-description">Интеллектуальный AI-агент для работы с корпоративными базами данных. Превращаем вопросы в инсайты.</p>
            <div className="social-links">
              <a href="#" className="social-link">📧</a>
              <a href="#" className="social-link">💼</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📱</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Dexter. Все права защищены.
        </div>
      </footer>
    </>
  );
}

export default App; 