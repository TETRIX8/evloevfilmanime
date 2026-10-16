"use client";
import { useRef } from "react";
import Link from "next/link";
import { ReleaseLink } from "../ReleaseLink/ReleaseLinkUpdate";
export const ReleaseCourusel = ({
  sectionTitle,
  showAllLink,
  content,
}: {
  sectionTitle: string;
  showAllLink?: string;
  content: any;
}) => {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) =>
    track.current?.scrollBy({
      left: direction * track.current.clientWidth * 0.8,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  return (
    <section className="ef-release-section" aria-label={sectionTitle}>
      <div className="ef-section-heading">
        <h2>{sectionTitle}</h2>
        <div>
          {showAllLink && (
            <Link href={showAllLink} className="ef-text-link">
              Все <span aria-hidden="true">↗</span>
            </Link>
          )}
          <div className="ef-carousel-controls">
            <button
              className="ef-icon-button"
              onClick={() => move(-1)}
              aria-label={`Прокрутить назад: ${sectionTitle}`}
            >
              ←
            </button>
            <button
              className="ef-icon-button"
              onClick={() => move(1)}
              aria-label={`Прокрутить вперёд: ${sectionTitle}`}
            >
              →
            </button>
          </div>
        </div>
      </div>
      <div
        className="ef-release-track"
        ref={track}
        tabIndex={0}
        aria-label={`Релизы: ${sectionTitle}`}
      >
        {(content || []).map((release) => (
          <div className="ef-release-slide" key={release.id}>
            <ReleaseLink
              {...release}
              chipsSettings={{
                enabled: true,
                categoryHidden: true,
                statusHidden: true,
                ...release.chipsSettings,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
