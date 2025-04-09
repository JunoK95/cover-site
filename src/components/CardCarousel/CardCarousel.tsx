import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import styles from "./CardCarousel.module.scss";
import { colors } from "@/constants/colors";

type CardProps = {
  title: string;
  skills: string[];
};

type Props = {
  cards?: CardProps[];
};

const CardCarousel = ({ cards = [] }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setSelected(api.selectedScrollSnap());
      console.log(`Embla just triggered ${api.selectedScrollSnap() + 1}!`);
    });
  }, [api]);

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      setApi={setApi}
      className={`relative w-full h-full max-w-[400px] sm:max-w-none ${styles.carousel}`}
    >
      <div className={styles.leftBlur} />
      <div className={styles.rightBlur} />
      <CarouselContent
        className={`flex items-center gap-4 ${styles.carouselContent}`}
      >
        {cards.map((c, index) => (
          <CarouselItem
            key={index}
            className="basis-8/12 sm:basis-1/2 lg:basis-5/12 xl:basis-4/12"
          >
            <Card
              className={`flex flex-col overflow-hidden h-40 transition-height duration-500 delay-200 ${
                selected === index ? `h-60 bg-[${colors.purple}]` : ""
              }`}
            >
              <CardHeader style={{ paddingTop: "1rem" }}>
                <CardTitle>{c.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="columns-2">
                  {c.skills.map((skill, index) => (
                    <li key={index} className="text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CardCarousel;
