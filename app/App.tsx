"use client";
import { useUserStore } from "./store/auth";
import { usePreferencesStore } from "./store/preferences";
import { useCallback, useEffect, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import { ChangelogModal } from "#/components/ChangelogModal/ChangelogModal";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavBarPc } from "./components/Navbar/NavBarPc";
import { NavBarMobile } from "./components/Navbar/NavBarMobile";
import { SettingsModal } from "./components/SettingsModal/SettingsModal";
import Link from "next/link";
export const App = ({ children }) => {
  const preferences = usePreferencesStore();
  const user = useUserStore();
  const [showChangelog, setShowChangelog] = useState(false);
  const [version, setVersion] = useState("");
  const [previousVersions, setPreviousVersions] = useState([]);
  const [settings, setSettings] = useState(false);
  const [splash, setSplash] = useState(true);
  const finishSplash = useCallback(() => setSplash(false), []);
  useEffect(() => {
    if (!preferences._hasHydrated) return;
    user.checkAuth();
    let cancelled = false;
    fetch("/api/version", { signal: AbortSignal.timeout(10000) })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setVersion(data.version);
        setPreviousVersions(data.previous || []);
        // First launch is for discovering the catalogue, not dismissing a changelog.
        if (
          !preferences.params.isFirstLaunch &&
          data.version !== preferences.params.version
        )
          setShowChangelog(true);
        if (preferences.params.isFirstLaunch)
          preferences.setParams({
            isFirstLaunch: false,
            version: data.version,
          });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferences._hasHydrated]);
  const ready = preferences._hasHydrated && user._hasHydrated;
  return (
    <body className="ef-body">
      <a href="#main-content" className="ef-skip">
        К содержимому
      </a>
      {ready && (
        <>
          <NavBarPc setIsSettingModalOpen={setSettings} />
          <main id="main-content" className="ef-main">
            {children}
          </main>
          <footer className="ef-footer">
            <span>
              evloevfilm <span aria-hidden="true">/</span> Твой мир аниме
            </span>
            <span>
              Неофициальный клиент Anixart ·{" "}
              <Link href="/about">О проекте</Link>
            </span>
          </footer>
          <NavBarMobile setIsSettingModalOpen={setSettings} />
          <SettingsModal isOpen={settings} setIsOpen={setSettings} />
          <ChangelogModal
            isOpen={!splash && showChangelog && preferences.flags.showChangelog}
            setIsOpen={() => {
              setShowChangelog(false);
              preferences.setParams({ version });
            }}
            version={version}
            previousVersions={previousVersions}
          />
        </>
      )}
      {splash && <LoadingScreen ready={ready} onComplete={finishSplash} />}
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        theme="colored"
        transition={Bounce}
      />
    </body>
  );
};
