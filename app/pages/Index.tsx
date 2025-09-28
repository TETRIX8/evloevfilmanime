"use client";
import { ReleaseCourusel } from "#/components/ReleaseCourusel/ReleaseCourusel";
import { Spinner } from "#/components/Spinner/Spinner";
import { useUserStore } from "#/store/auth";
import { useState, useEffect } from "react";
import { FetchFilter } from "#/api/utils";

import { usePreferencesStore } from "#/store/preferences";
import { useRouter } from "next/navigation";
import {
  ListAnnounce,
  ListFilms,
  ListFinished,
  ListLast,
  ListOngoing,
} from "./IndexFilters";

export function IndexPage() {
  const token = useUserStore((state) => state.token);
  const preferenceStore = usePreferencesStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [lastReleasesData, setLastReleasesData] = useState(null);
  const [ongoingReleasesData, setOngoingReleasesData] = useState(null);
  const [finishedReleasesData, setFinishedReleasesData] = useState(null);
  const [announceReleasesData, setAnnounceReleasesData] = useState(null);
  const [filmsReleasesData, setFilmsReleasesData] = useState(null);

  useEffect(() => {
    if (preferenceStore.params.skipToCategory.enabled) {
      router.push(
        `/home/${preferenceStore.params.skipToCategory.homeCategory}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function _loadReleases() {
      setIsLoading(true);
      setLastReleasesData(null);
      setOngoingReleasesData(null);
      setFinishedReleasesData(null);
      setAnnounceReleasesData(null);
      setFilmsReleasesData(null);

      const [lastReleases] = await FetchFilter(ListLast.filter, 0, token);
      const [ongoingReleases] = await FetchFilter(ListOngoing.filter, 0, token);
      const [announceReleases] = await FetchFilter(
        ListAnnounce.filter,
        0,
        token
      );
      const [finishedReleases] = await FetchFilter(
        ListFinished.filter,
        0,
        token
      );
      const [filmsReleases] = await FetchFilter(ListFilms.filter, 0, token);

      setLastReleasesData(lastReleases);
      setOngoingReleasesData(ongoingReleases);
      setFinishedReleasesData(finishedReleases);
      setAnnounceReleasesData(announceReleases);
      setFilmsReleasesData(filmsReleases);
      setIsLoading(false);
    }
    if (!preferenceStore.params.skipToCategory.enabled) {
      _loadReleases();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="space-y-8">
      {lastReleasesData && (
        <div className="fade-in">
          <ReleaseCourusel
            sectionTitle="Последние релизы"
            showAllLink="/home/last"
            content={lastReleasesData.content}
          />
        </div>
      )}
      {finishedReleasesData && (
        <div className="fade-in" style={{ animationDelay: '0.1s' }}>
          <ReleaseCourusel
            sectionTitle="Завершенные релизы"
            showAllLink="/home/finished"
            content={finishedReleasesData.content}
          />
        </div>
      )}
      {ongoingReleasesData && (
        <div className="fade-in" style={{ animationDelay: '0.2s' }}>
          <ReleaseCourusel
            sectionTitle="Выходит"
            showAllLink="/home/ongoing"
            content={ongoingReleasesData.content}
          />
        </div>
      )}
      {announceReleasesData && (
        <div className="fade-in" style={{ animationDelay: '0.3s' }}>
          <ReleaseCourusel
            sectionTitle="Анонсированные релизы"
            showAllLink="/home/announce"
            content={announceReleasesData.content}
          />
        </div>
      )}
      {filmsReleasesData && (
        <div className="fade-in" style={{ animationDelay: '0.4s' }}>
          <ReleaseCourusel
            sectionTitle="Фильмы"
            showAllLink="/home/films"
            content={filmsReleasesData.content}
          />
        </div>
      )}
      {isLoading && (
        <div className="flex items-center justify-center h-32 min-w-full">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
}
