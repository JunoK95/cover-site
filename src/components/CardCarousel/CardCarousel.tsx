import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.scrollTo(selected);
  }, [selected, api]);

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
            onClick={() => setSelected(index)}
          >
            <Card
              className={`flex flex-col w-full overflow-hidden shrink-0 transition-height duration-500 delay-200 select-none min-w-25 ${
                selected === index ? styles.cardActive : styles.cardInactive
              }`}
              style={{ padding: "0.5rem 0" }}
            >
              <CardContent className="w-full h-full">
                <div className="flex flex-col w-full h-full">
                  <div
                    id={`card-header-${index}`}
                    className="flex justify-center place-items-center items-center"
                    style={{ paddingBottom: "0.5rem" }}
                  >
                    <h3 className="text-2xl font-bold">{c.title}</h3>
                  </div>
                  {selected === index && (
                    <div className="w-full">
                      <div className="m-0 p-0 flex-row flex-wrap flex">
                        {c.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="m-0 p-0 w-full max-w-[50%] box-border"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CardCarousel;
