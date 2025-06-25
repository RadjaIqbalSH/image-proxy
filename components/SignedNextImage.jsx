import { signImgproxyPath } from "@/helpers/signImgproxyPath";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function SignedNextImage({
  src,
  alt,
  width,
  height,
  blurSize = 20,
  ...props
}) {
  const [signedUrlX1, setSignedUrlX1] = useState(null);
  const [signedUrlX2, setSignedUrlX2] = useState(null);
  const [signedUrlX3, setSignedUrlX3] = useState(null);
  const [blurUrl, setBlurUrl] = useState(null);
  const containerRef = useRef(null);


  useEffect(() => {
    if (!containerRef.current && src) return;
    (async () => {
      const blurPath = `/bl_6/s_10_10/rt_fill/plain/${src}`;
      const url = await signImgproxyPath(blurPath)
      setBlurUrl(`http://localhost${url}`);
    })();
  }, []);

  useEffect(() => {
    (async () => {

      const imagePathX1 = `/rs_fill_${width}_${height}/dpr_1/plain/${src}`;
      const imagePathX2 = `/rs_fill_${width}_${height}/dpr_2/plain/${src}`;
      const imagePathX3 = `/rs_fill_${width}_${height}/dpr_3/plain/${src}`;

      const [x1, x2, x3] = await Promise.all([
        signImgproxyPath(imagePathX1),
        signImgproxyPath(imagePathX2),
        signImgproxyPath(imagePathX3),
      ]);

      setSignedUrlX1(`http://localhost${x1}`);
      setSignedUrlX2(`http://localhost${x2}`);
      setSignedUrlX3(`http://localhost${x3}`);
    })();

  }, [blurUrl, src, width, height]);

  if (!blurUrl) {
    return <div ref={containerRef} style={{ width: `${width}px`, height: `${height}px` }} />;
  }

  return (
    <Image
      src={src}
      loader={() => blurUrl}
      alt={alt}
      width={width}
      height={height}
      onLoad={(e) => {
        e.target.srcset = `
        ${signedUrlX1} 1x,
        ${signedUrlX2} 2x,
        ${signedUrlX3} 3x
        `
        e.target.src = signedUrlX1
      }}
      {...props}
    />
  );
}
