import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import styles from "./CardCarousel.module.scss";

const CardCarousel: React.FC = () => {
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
      className="w-full h-full max-w-sm"
    >
      <CarouselContent
        className={`flex items-center gap-4 ${styles.carouselContent}`}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-2/3">
            <Card
              className={`flex flex-col overflow-hidden h-60 transition-height duration-500 delay-200 ${
                selected === index ? "h-80 bg-amber-200" : ""
              }`}
            >
              <CardHeader style={{ paddingTop: "1rem" }}>
                <CardTitle>Development</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="columns-2">
                  <li>Skill 1</li>
                  <li>Skill 2</li>
                  <li>Skill 3</li>
                  <li>Skill 4</li>
                  <li>Skill 5</li>
                  <li>Skill 1</li>
                  <li>Skill 1</li>
                  <li>Skill 1</li>
                  <li>Skill 1</li>
                  <li>Skill 1</li>
                  <li>Skill 1</li>
                  <li>Skill 1</li>
                  <li>Skill 1</li>
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
