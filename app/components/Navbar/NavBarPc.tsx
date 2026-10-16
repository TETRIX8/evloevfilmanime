"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownItem,
  DropdownDivider,
  useThemeMode,
} from "flowbite-react";
import { useUserStore } from "#/store/auth";
import { Brand } from "../Brand/Brand";
const library = [
  ["Закладки", "/bookmarks"],
  ["Избранное", "/favorites"],
  ["Коллекции", "/collections"],
  ["История", "/history"],
];
export const NavBarPc = ({ setIsSettingModalOpen }) => {
  const user = useUserStore();
  const path = usePathname();
  const router = useRouter();
  const { computedMode, setMode } = useThemeMode();
  return (
    <header className="ef-header">
      <div className="ef-header-inner">
        <Brand />
        <nav className="ef-desktop-nav" aria-label="Основная навигация">
          {[
            ["Главная", "/"],
            ["Открыть новое", "/discovery"],
            ["Каталог", "/search"],
          ].map(([title, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {title}
            </Link>
          ))}
        </nav>
        <div className="ef-header-actions">
          <Link
            href="/search"
            className="ef-icon-button"
            aria-label="Поиск аниме"
          >
            <span className="iconify mdi--magnify" />
          </Link>
          <button
            type="button"
            className="ef-icon-button"
            onClick={() => setMode(computedMode === "dark" ? "light" : "dark")}
            aria-label={
              computedMode === "dark"
                ? "Включить светлую тему"
                : "Включить тёмную тему"
            }
          >
            <span
              className={`iconify ${computedMode === "dark" ? "mdi--white-balance-sunny" : "mdi--moon-waning-crescent"}`}
            />
          </button>
          {user.isAuth ? (
            <Dropdown
              inline
              arrowIcon={false}
              label={
                <span className="ef-account-label">
                  <span className="iconify mdi--account-circle" />
                  {user.user.login}
                </span>
              }
            >
              <DropdownItem
                onClick={() => router.push(`/profile/${user.user.id}`)}
              >
                Мой профиль
              </DropdownItem>
              {library.map(([title, href]) => (
                <DropdownItem key={href} onClick={() => router.push(href)}>
                  {title}
                </DropdownItem>
              ))}
              <DropdownDivider />
              <DropdownItem onClick={() => setIsSettingModalOpen(true)}>
                Настройки
              </DropdownItem>
              <DropdownItem onClick={() => user.logout()}>Выйти</DropdownItem>
            </Dropdown>
          ) : (
            <>
              <Link href="/login" className="ef-login-link">
                Войти
              </Link>
              <Link
                href="/register"
                className="ef-button ef-button-small ef-register-link"
              >
                Создать аккаунт <span aria-hidden="true">↗</span>
              </Link>
              <button
                type="button"
                className="ef-icon-button ef-guest-settings"
                onClick={() => setIsSettingModalOpen(true)}
                aria-label="Настройки"
              >
                <span className="iconify mdi--cog-outline" />
              </button>
            </>
          )}
        </div>
      </div>
      {user.isAuth && (
        <nav className="ef-library-nav" aria-label="Моя библиотека">
          {library.map(([title, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={path.startsWith(href) ? "page" : undefined}
            >
              {title}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
