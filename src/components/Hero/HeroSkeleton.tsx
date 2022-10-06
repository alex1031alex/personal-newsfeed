import React, { FC } from "react";
import "./Hero.css";
import classNames from "classnames";
import { Title } from "../Title/Title";
import { Image } from "../Image/Image";
import { SkeletonText } from "@components/SkeletonText/SkeletonText";

interface HeroSkeletonProps {
  hasImage?: boolean;
  title?: string;
  hasText?: boolean;
  className?: string;
}
export const HeroSkeleton: FC<HeroSkeletonProps> = ({ hasImage, title, hasText, className }) => {
  return (
    <section className={classNames("hero", { "hero--no-image": !hasImage }, className)}>
      <div className="hero__in">
        {hasImage && <Image className="hero__image" isSkeleton={true} />}
        <div className="hero__container container">
          <div className="hero__content" style={{ width: title ? undefined : "100%" }}>
            <Title Component="h1" className="hero__title">
              {title || <SkeletonText dark />}
            </Title>
            {hasText && (
              <div className="hero__text">
                <SkeletonText rowsCount={2} dark />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
