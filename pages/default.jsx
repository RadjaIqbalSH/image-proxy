import { BLUR_DATA } from '@/const/bluerdata'
import { IMAGE_LIST } from '@/const/image-list'
import Image from 'next/image'
import React from 'react'

const DefaultIamge = () => {
  return (
    <>
      <div className='container'>
        {IMAGE_LIST.map((url, index) => (
          <div className='item' key={index}>
            <Image src={url} fill alt="image" sizes='250' quality={100} placeholder='blur' blurDataURL={BLUR_DATA} />
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

export default DefaultIamge