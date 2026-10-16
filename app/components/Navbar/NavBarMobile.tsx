"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "#/store/auth";
export const NavBarMobile = (_props: { setIsSettingModalOpen: any }) => {
  const path = usePathname();
  const user = useUserStore();
  const items = [
    ["Главная", "/", "mdi--home-outline"],
    ["Обзор", "/discovery", "mdi--compass-outline"],
    ["Каталог", "/search", "mdi--magnify"],
    user.isAuth
      ? ["Закладки", "/bookmarks", "mdi--bookmark-outline"]
      : ["Аккаунт", "/login", "mdi--account-outline"],
  ];
  if (path === "/login" || path === "/register") return null;
  return (
    <nav className="ef-mobile-nav" aria-label="Мобильная навигация">
      {items.map(([title, href, icon]) => (
        <Link
          key={href}
          href={href}
          aria-current={
            (href === "/" ? path === href : path.startsWith(href))
              ? "page"
              : undefined
          }
        >
          <span className={`iconify ${icon}`} />
          <span>{title}</span>
        </Link>
      ))}
    </nav>
  );
};
