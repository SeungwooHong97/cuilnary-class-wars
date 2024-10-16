"use client";

import EmblaCarousel from "./carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const images = ["/images/main_1.png", "/images/main_2.png"];

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDES = images;

const MainImage = () => {
  return <EmblaCarousel slides={SLIDES} options={OPTIONS} />;
};

export default MainImage;
