import { useEffect, useState } from "react";
import { registerUser } from "./api";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Инициализация Telegram WebApp SDK
    const tg = window.Telegram?.WebApp;
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const { id: telegram_id, language_code } = tg.initDataUnsafe.user;
      registerUser(telegram_id, language_code).then(data => {
        setUser(data.user);
      });
    } else {
      // Для локальной разработки — заглушка
      registerUser(123456789, "ru").then(data => setUser(data.user));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker Mini App</h1>
      {user ? (
        <div className="text-green-600">
          <p>Добро пожаловать, пользователь Telegram #{user.telegram_id}</p>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}

export default App;
