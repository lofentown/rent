import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [step, setStep] = useState('register');
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    // Инициализация Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  const carCategories = [
    { name: 'Седан', icon: '🚗' },
    { name: 'Хэтчбек', icon: '🚙' },
    { name: 'Универсал', icon: '🚐' },
    { name: 'Внедорожник', icon: '🚙' },
    { name: 'Кроссовер', icon: '🚙' },
    { name: 'Минивэн', icon: '🚐' },
    { name: 'Купе', icon: '🚗' },
    { name: 'Кабриолет', icon: '🚙' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('menu');
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify(formData));
    }
  };

  const handleSelectCarClass = (carClass) => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify({ action: 'select_category', category: carClass }));
    }
  };

  return (
    <div className="App">
      <div className="content-overlay">
        {step === 'register' && (
          <div className="register-form">
            <h1>Регистрация в CarRent</h1>
            <form onSubmit={handleSubmit}>
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="form-group">
                  <label htmlFor={key}>
                    {key === 'lastName' ? 'Фамилия' :
                     key === 'firstName' ? 'Имя' :
                     key === 'middleName' ? 'Отчество' :
                     key === 'birthDate' ? 'Дата рождения' :
                     key === 'phone' ? 'Номер телефона' :
                     'Email'}
                  </label>
                  <input
                    type={key === 'birthDate' ? 'date' : key === 'phone' ? 'tel' : key === 'email' ? 'email' : 'text'}
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <button type="submit" className="submit-btn">
                Зарегистрироваться
              </button>
            </form>
          </div>
        )}

        {step === 'menu' && (
          <div className="menu">
            <h1>Меню CarShare</h1>
            <button onClick={() => setStep('rentCar')} className="menu-btn">
              Хочу взять машину в прокат
            </button>
            <button onClick={() => setStep('owner')} className="menu-btn">
              Я владелец автомобиля
            </button>
          </div>
        )}

        {step === 'rentCar' && (
          <div className="car-classes">
            <h1>Выберите класс автомобиля</h1>
            <div className="car-grid">
              {carCategories.map(({ name, icon }) => (
                <button key={name} className="car-class-btn" onClick={() => handleSelectCarClass(name)}>
                  <span className="car-icon">{icon}</span>
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'owner' && (
          <div className="owner-info">
            <h1>Страница для владельцев</h1>
            <p>Информация и услуги для владельцев автомобилей.</p>
            <button onClick={() => setStep('menu')} className="back-btn">
              Назад в меню
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;