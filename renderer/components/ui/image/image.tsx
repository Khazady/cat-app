import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import Loader from "../loader/loader";
import styles from "./image.module.css";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
interface ImageRef { setLoaded(value: boolean): void }

export const Image= forwardRef<ImageRef, ImageProps>(({src, alt, ...props}, ref) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  useImperativeHandle(ref, () => {
    return {
      setLoaded(value: boolean) {
        setLoaded(value)
      },
    };
  }, []);

  return (
    <div>
      {!loaded && (
        <Loader/>
      )}
      <img
        className={styles.image}
        src={src}
        alt={alt ?? 'image'}
        {...props}
        style={loaded ? {} : {display: 'none'}}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
});
