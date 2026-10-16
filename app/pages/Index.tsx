"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FetchFilter } from "#/api/utils";
import { useUserStore } from "#/store/auth";
import { usePreferencesStore } from "#/store/preferences";
import { ReleaseCourusel } from "#/components/ReleaseCourusel/ReleaseCourusel";
import {
  ListLast,
  ListFilms,
  ListFinished,
  ListAnnounce,
  ListOngoing,
} from "./IndexFilters";
const sections = [
  ["Последние релизы", "last", ListLast],
  ["Сейчас выходят", "ongoing", ListOngoing],
  ["Завершённые истории", "finished", ListFinished],
  ["Скоро на экранах", "announce", ListAnnounce],
  ["Вечер большого кино", "films", ListFilms],
] as const;
export function IndexPage() {
  const token = useUserStore((s) => s.token);
  const preferences = usePreferencesStore();
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    if (preferences.params.skipToCategory.enabled) {
      router.replace(`/home/${preferences.params.skipToCategory.homeCategory}`);
      return;
    }
    setLoading(true);
    setFailed(false);
    setRows([]);
    Promise.all(
      sections.map(async ([, , list]) => {
        try {
          const [data, error] = await FetchFilter(list.filter, 0, token);
          return !error && Array.isArray(data?.content) ? data.content : null;
        } catch {
          return null;
        }
      }),
    ).then((data) => {
      if (active) {
        setRows(data);
        setFailed(data.some((d) => d === null));
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [
    token,
    attempt,
    preferences.params.skipToCategory.enabled,
    preferences.params.skipToCategory.homeCategory,
    router,
  ]);
  return (
    <div className="ef-home">
      <section className="ef-hero">
        <Image
          width={1376}
          height={768}
          priority
          sizes="(max-width: 700px) 100vw, 1280px"
          src="/evening-city.jpg"
          alt=""
          className="ef-hero-image"
        />
        <div className="ef-hero-content">
          <span className="ef-eyebrow">
            <span className="ef-live-dot" /> БОЛЬШЕ, ЧЕМ ПРОСТО АНИМЕ
          </span>
          <h1>
            Одна серия.
            <br />
            Тысяча эмоций.
          </h1>
          <p>
            Найди историю, которая останется с тобой.
            <br className="ef-desktop-break" /> Новые миры и любимые герои — в
            одном месте.
          </p>
          <div className="ef-hero-actions">
            <Link href="/search" className="ef-button ef-button-white">
              <span className="iconify mdi--play" /> Найти своё аниме
            </Link>
            <Link href="/discovery" className="ef-hero-secondary">
              Открыть новое <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="ef-hero-footnote">
            <span>СМОТРИ. ЧУВСТВУЙ. ВОЗВРАЩАЙСЯ.</span>
            <span aria-hidden="true">+</span>
          </div>
        </div>
      </section>
      <nav className="ef-category-nav" aria-label="Категории аниме">
        <span className="ef-category-label">Твоё настроение</span>
        {[
          ["Все истории", "/search"],
          ["Онгоинги", "/home/ongoing"],
          ["Полнометражные", "/home/films"],
          ["Завершённые", "/home/finished"],
          ["Скоро", "/home/announce"],
        ].map(([title, href]) => (
          <Link key={href} href={href}>
            {title}
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </nav>
      <div className="ef-catalog-heading">
        <div>
          <span className="ef-eyebrow">ВЫБИРАЙ СВОЮ ИСТОРИЮ</span>
          <h2>Что посмотрим?</h2>
        </div>
        <Link href="/search" className="ef-text-link">
          Весь каталог <span aria-hidden="true">→</span>
        </Link>
      </div>
      {loading && (
        <div
          className="ef-skeleton-grid"
          role="status"
          aria-label="Загрузка каталога"
        >
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i}>
              <div className="ef-skeleton-poster" />
              <div className="ef-skeleton-line" />
              <div className="ef-skeleton-line ef-skeleton-short" />
            </div>
          ))}
        </div>
      )}
      {!loading && failed && (
        <div className="ef-api-error" role="alert">
          <div>
            <strong>Часть каталога пока недоступна</strong>
            <p>
              Не удалось получить ответ от Anixart. Твои данные не потеряны.
            </p>
          </div>
          <button
            className="ef-button ef-button-secondary"
            onClick={() => setAttempt((n) => n + 1)}
          >
            Попробовать снова
          </button>
        </div>
      )}
      {!loading &&
        sections.map(
          ([title, slug], i) =>
            rows[i]?.length > 0 && (
              <ReleaseCourusel
                key={slug}
                sectionTitle={title}
                showAllLink={`/home/${slug}`}
                content={rows[i]}
              />
            ),
        )}
      {!loading && !failed && rows.every((r) => !r?.length) && (
        <div className="ef-api-error">
          <div>
            <strong>Пока здесь тихо</strong>
            <p>В каталоге нет релизов. Попробуй поиск или вернись позже.</p>
          </div>
          <Link href="/search" className="ef-button">
            Открыть поиск
          </Link>
        </div>
      )}
      <section className="ef-library-banner">
        <span
          className="ef-library-symbol iconify mdi--creation"
          aria-hidden="true"
        />
        <div>
          <span className="ef-eyebrow">ВСЁ ЛЮБИМОЕ — РЯДОМ</span>
          <h2>Твоя личная коллекция миров.</h2>
          <p>Сохраняй аниме, веди списки и возвращайся к своим историям.</p>
        </div>
        <Link
          href={token ? "/bookmarks" : "/register"}
          className="ef-button ef-button-secondary"
        >
          {token ? "Мои закладки" : "Как создать аккаунт"}{" "}
          <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
