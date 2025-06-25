import SignedNextImage from '@/components/SignedNextImage'
import { IMAGE_LIST } from '@/const/image-list'
import React from 'react'


const ImgProxySign = () => {
  return (
    <>
      <div className='container'>
        {IMAGE_LIST.map((url, index) => (
          <div className='item' key={index}>
            <SignedNextImage
              src={url}
              alt="Contoh Gambar"
              width={400}
              height={300}
            />
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .container {
            width: 1090px;
            margin: 24px auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
          }
          .item {
            position: relative;
            width: 250px;
            height: auto;
            aspect-ratio: 1 / 1;
          }
        `}
      </style>
    </>
  )
}

export default ImgProxySign