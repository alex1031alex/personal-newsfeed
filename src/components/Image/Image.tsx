/* Компонент служит для плавной загрузки картинок */
import React, { ImgHTMLAttributes, FC, useState } from "react";
import classNames from "classnames";
import "./Image.css";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  isSkeleton?: boolean;
}

export const Image: FC<ImageProps> = ({ className, src = "", alt, isSkeleton = false, onLoad, ...restProps }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={classNames(
        "image",
        {
          "image--loaded": loaded,
          "skeleton-gradient": isSkeleton || (src.length > 0 && !loaded),
        },
        className
      )}
    >
      {src.length > 0 && (
        <img
          {...restProps}
          className="image__element"
          onLoad={(evt) => {
            setLoaded(true);
            onLoad && onLoad(evt);
          }}
          src={src}
          alt={alt}
        />
      )}
    </div>
  );
};
