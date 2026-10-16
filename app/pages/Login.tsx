"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "#/store/auth";
import { setJWT, removeJWT, tryCatchAPI } from "#/api/utils";
import { ENDPOINTS } from "#/api/config";
export function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [visible, setVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const user = useUserStore();
  const router = useRouter();
  const params = useSearchParams();
  const target = params.get("redirect") || "/";
  const redirect =
    target.startsWith("/") && !target.startsWith("//") && !target.includes("\\")
      ? target
      : "/";
  useEffect(() => {
    if (user.isAuth) router.replace(redirect);
  }, [user.isAuth, redirect, router]);
  async function submit(e) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");
    try {
      // Preserve the upstream protocol; encode credentials so +, &, # and ? remain valid.
      const query = new URLSearchParams({ login: login.trim(), password });
      const { data, error: failure } = await tryCatchAPI(
        fetch(`${ENDPOINTS.user.auth}?${query}`, {
          method: "POST",
          headers: {
            Sign: "9aa5c7af74e8cd70c86f7f9587bde23d",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          signal: AbortSignal.timeout(15000),
        }),
      );
      if (failure || !data?.profileToken?.token || !data?.profile) {
        setError(
          failure?.code === 2
            ? "Пользователь не найден. Проверь логин или создай аккаунт в Anixart."
            : failure?.code === 3
              ? "Логин или пароль не подошли. Попробуй ещё раз."
              : "Не удалось войти. Проверь соединение и попробуй снова.",
        );
        return;
      }
      if (remember) setJWT(data.profile.id, data.profileToken.token);
      else removeJWT();
      user.login(data.profile, data.profileToken.token);
      router.replace(redirect);
    } catch {
      setError(
        "Не удалось сохранить сессию. Проверь, разрешено ли сайту использовать хранилище браузера.",
      );
    } finally {
      setSending(false);
    }
  }
  return (
    <section className="ef-auth">
      <div className="ef-auth-art">
        <div className="ef-auth-art-copy">
          <span className="ef-eyebrow">ТВОЯ СЛЕДУЮЩАЯ ИСТОРИЯ</span>
          <h1>
            Рад снова
            <br />
            тебя видеть.
          </h1>
          <p>
            Любимые миры, сохранённые серии
            <br />и истории, к которым хочется вернуться.
          </p>
          <span className="ef-art-caption">
            Маленькая пауза. Большое приключение.
          </span>
        </div>
      </div>
      <div className="ef-auth-panel">
        <div className="ef-auth-heading">
          <span className="ef-eyebrow">С ВОЗВРАЩЕНИЕМ</span>
          <h2>Войти в свой мир</h2>
          <p>Используй свой аккаунт Anixart</p>
        </div>
        <div className="ef-auth-tabs">
          <span aria-current="page">Вход</span>
          <Link href="/register">Создать аккаунт</Link>
        </div>
        <form onSubmit={submit} className="ef-form" aria-busy={sending}>
          <label htmlFor="login">
            Логин или электронная почта
            <input
              id="login"
              name="username"
              autoComplete="username"
              placeholder="Твой логин или email"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              disabled={sending}
            />
          </label>
          <label htmlFor="password">
            Пароль
            <span className="ef-password-field">
              <input
                id="password"
                name="password"
                autoComplete="current-password"
                type={visible ? "text" : "password"}
                placeholder="Введи пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={sending}
              />
              <button
                type="button"
                aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
                aria-pressed={visible}
                onClick={() => setVisible(!visible)}
              >
                <span
                  className={`iconify ${visible ? "mdi--eye-off-outline" : "mdi--eye-outline"}`}
                />
              </button>
            </span>
          </label>
          <label className="ef-checkbox">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={sending}
            />
            Запомнить меня
          </label>
          {error && (
            <div role="alert" className="ef-notice ef-notice-error">
              {error}
            </div>
          )}
          <button
            className="ef-button ef-button-wide"
            type="submit"
            disabled={sending}
          >
            {sending ? (
              <>
                <span className="ef-mini-spinner" /> Входим…
              </>
            ) : (
              <>
                Войти <span aria-hidden="true">→</span>
              </>
            )}
          </button>
        </form>
        <p className="ef-auth-note">
          <span className="iconify mdi--shield-check-outline" /> Неофициальный
          клиент. Вход обрабатывается API Anixart.
        </p>
        <Link className="ef-back-link" href="/">
          ← Пока просто посмотрю каталог
        </Link>
      </div>
    </section>
  );
}
