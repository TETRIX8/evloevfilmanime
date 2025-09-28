"use client";
import { ReleaseLink } from "../ReleaseLink/ReleaseLinkUpdate";
import Link from "next/link";

import { Swiper, SwiperSlide } from 'swiper/react';
import Styles from "./ReleaseCourusel.module.css";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export const ReleaseCourusel = (props: {
  sectionTitle: string;
  showAllLink?: string;
  content: any;
}) => {
  return (
    <section className={`${Styles.section} fade-in`}>
      <div className="flex justify-between px-4 py-2 border-b-2 border-black dark:border-white dark-transition">
        <h1 className="font-bold text-md sm:text-xl md:text-lg xl:text-xl text-fade-in">
          {props.sectionTitle}
        </h1>
        {props.showAllLink && (
          <Link href={props.showAllLink}>
            <div className="flex items-center nav-link group">
              <p className="hidden text-xl font-bold sm:block group-hover:text-blue-500 dark-transition">Показать все</p>
              <span className="w-6 h-6 iconify mdi--arrow-right icon-rotate group-hover:text-blue-500 dark-transition"></span>
            </div>
          </Link>
        )}
      </div>
      <div className="my-4">
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={'auto'}
          direction={'horizontal'}
          rewind={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }}
          allowTouchMove={true}
          className={Styles.swiper}
        >
          {props.content.map((release, index) => {
            return (
              <SwiperSlide
                key={release.id}
                className="h-full max-w-72 aspect-[12/16]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-hover">
                  <ReleaseLink {...release} />
                </div>
              </SwiperSlide>
            );
          })}
          <div
            className={`swiper-button-prev ${Styles["swiper-button"]} after:iconify after:material-symbols--chevron-left aspect-square bg-black bg-opacity-25 backdrop-blur rounded-full after:bg-white hover:bg-opacity-40 transition-all duration-300`}
            style={
              { "--swiper-navigation-size": "64px" } as React.CSSProperties
            }
        ></div>
        <div
            className={`swiper-button-next ${Styles["swiper-button"]} after:iconify after:material-symbols--chevron-right aspect-square bg-black bg-opacity-25 backdrop-blur rounded-full after:bg-white hover:bg-opacity-40 transition-all duration-300`}
            style={
              { "--swiper-navigation-size": "64px" } as React.CSSProperties
            }
        ></div>
      </Swiper>
    </div>
  </section>
);
};
