import Link from "next/link";
export const metadata = {
  title: "Создать аккаунт",
  description: "Как создать аккаунт Anixart для Evloev Film",
};
export default function Register() {
  return (
    <section className="ef-auth">
      <div className="ef-auth-art">
        <div className="ef-auth-art-copy">
          <span className="ef-eyebrow">НАЧНИ СВОЮ ИСТОРИЮ</span>
          <h1>
            Твой билет
            <br />в мир аниме.
          </h1>
          <p>
            Один аккаунт — любимые релизы,
            <br />
            твоя библиотека и история просмотров.
          </p>
          <span className="ef-art-caption">
            Всё начинается с первой истории.
          </span>
        </div>
      </div>
      <div className="ef-auth-panel">
        <div className="ef-auth-heading">
          <span className="ef-eyebrow">ДАВАЙ ЗНАКОМИТЬСЯ</span>
          <h2>Создать аккаунт</h2>
          <p>Evloev Film использует аккаунты Anixart</p>
        </div>
        <div className="ef-auth-tabs">
          <Link href="/login">Вход</Link>
          <span aria-current="page">Создать аккаунт</span>
        </div>
        <div className="ef-notice">
          Регистрация прямо на этом сайте пока не подключена. Создай аккаунт в
          официальном приложении Anixart, а затем войди здесь.
        </div>
        <ol className="ef-register-steps">
          <li>
            <span>01</span>
            <div>
              <strong>Открой официальный Anixart</strong>
              <p>Перейди на сайт и установи приложение.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>Пройди регистрацию в приложении</strong>
              <p>Следуй инструкциям Anixart.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>Возвращайся в Evloev Film</strong>
              <p>Используй созданные логин и пароль.</p>
            </div>
          </li>
        </ol>
        <a
          href="https://anixart-app.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="ef-button ef-button-wide"
        >
          Открыть сайт Anixart <span aria-hidden="true">↗</span>
        </a>
        <Link
          href="/login"
          className="ef-button ef-button-secondary ef-button-wide"
        >
          Уже есть аккаунт — войти
        </Link>
        <Link href="/" className="ef-back-link">
          ← Смотреть без аккаунта
        </Link>
      </div>
    </section>
  );
}
