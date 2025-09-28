"use client";
import { useUserStore } from "./store/auth";
import { usePreferencesStore } from "./store/preferences";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import {
  Button,
} from "flowbite-react";
import { Spinner } from "./components/Spinner/Spinner";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import { ChangelogModal } from "#/components/ChangelogModal/ChangelogModal";
import { Bounce, ToastContainer } from "react-toastify";
import { NavBarPc } from "./components/Navbar/NavBarPc";
import { NavBarMobile } from "./components/Navbar/NavBarMobile";
import { SettingsModal } from "./components/SettingsModal/SettingsModal";

const inter = Inter({ subsets: ["latin"] });

export const App = (props) => {
  const preferencesStore = usePreferencesStore();
  const userStore = useUserStore((state) => state);
  const [showChangelog, setShowChangelog] = useState(false);
  const [currentVersion, setCurrentVersion] = useState("");
  const [previousVersions, setPreviousVersions] = useState([]);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    async function _checkVersion() {
      const res = await fetch("/api/version");
      const data = await res.json();

      if (data.version !== preferencesStore.params.version) {
        setShowChangelog(true);
        setCurrentVersion(data.version);
        setPreviousVersions(data.previous);
      }
    }

    if (preferencesStore._hasHydrated) {
      _checkVersion();
      userStore.checkAuth();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferencesStore._hasHydrated]);

  if (showLoadingScreen) {
    return (
      <body className={`${inter.className} overflow-x-hidden dark:bg-[#0d1117] dark:text-white`}>
        <LoadingScreen onComplete={() => setShowLoadingScreen(false)} />
      </body>
    );
  }

  if (!preferencesStore._hasHydrated && !userStore._hasHydrated) {
    return (
      <body
        className={`${inter.className} overflow-x-hidden dark:bg-[#0d1117] dark:text-white h-screen flex justify-center items-center`}
      >
        <Spinner />
      </body>
    );
  }

  if (userStore.state === "loading") {
    return (
      <body
        className={`${inter.className} overflow-x-hidden dark:bg-[#0d1117] dark:text-white h-screen flex justify-center items-center`}
      >
        <Spinner />
      </body>
    );
  }

  return (
    <body
      className={`${inter.className} overflow-x-hidden dark:bg-[#0d1117] dark:text-white`}
    >
      <NavBarPc setIsSettingModalOpen={setIsSettingModalOpen} />
      <main className="container px-2 pt-4 pb-24 mx-auto lg:pb-0">
        {props.children}
      </main>
      <ChangelogModal
        isOpen={showChangelog && preferencesStore.flags.showChangelog}
        setIsOpen={() => {
          setShowChangelog(false);
          preferencesStore.setParams({ version: currentVersion });
        }}
        version={currentVersion}
        previousVersions={previousVersions}
      />
      <ToastContainer
        className={"mx-2 mb-20 sm:mb-0"}
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={true}
        theme="colored"
        transition={Bounce}
      />
      <NavBarMobile setIsSettingModalOpen={setIsSettingModalOpen} />
      <SettingsModal
        isOpen={isSettingModalOpen}
        setIsOpen={setIsSettingModalOpen}
      />
    </body>
  );
};
