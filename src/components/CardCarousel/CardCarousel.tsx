import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import styles from "./CardCarousel.module.scss";

type CardProps = {
  title: string;
  skills: string[];
  icon: React.ReactNode;
};

type Props = {
  cards?: CardProps[];
};

const CardCarousel = ({ cards = [] }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const plugin = React.useRef(
    Autoplay({ delay: 10000, stopOnInteraction: true })
  );

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
      plugins={[plugin.current]}
      setApi={setApi}
      className={`relative h-full sm:max-w-none ${styles.carousel}`}
    >
      <div className={styles.leftBlur} />
      <div className={styles.rightBlur} />
      <CarouselContent
        className={`flex items-center gap-4 ${styles.carouselContent}`}
      >
        {cards.map((c, index) => (
          <CarouselItem
            key={index}
            className="basis-8/12 sm:basis-1/2 lg:basis-/12 xl:basis-4/12"
            onClick={() => setSelected(index)}
          >
            <Card
              className={`flex flex-col w-full overflow-hidden shrink-0 transition-height duration-700 delay-300 select-none min-w-25 ${
                selected === index ? styles.cardActive : styles.cardInactive
              }`}
              style={{ padding: "0.5rem 0 1rem 0" }}
            >
              <CardContent className="w-full h-full">
                <div className="flex flex-col w-full h-full justify-end">
                  <div
                    id={`card-header-${index}`}
                    className="flex justify-center place-items-center items-center"
                    style={{ paddingBottom: "0.5rem" }}
                  >
                    <div
                      className="text-xl font-light"
                      style={{ paddingRight: "0.5rem" }}
                    >
                      {c.icon}
                    </div>
                    <h3 className="text-2xl font-bold not-italic">{c.title}</h3>
                  </div>
                  {selected === index && (
                    <div className="w-full">
                      <div className="m-0 p-0 flex-row flex-wrap flex">
                        {c.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="m-0 p-0 w-full max-w-[50%] box-border italic"
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
