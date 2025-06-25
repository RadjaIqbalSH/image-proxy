import { IMAGE_LIST } from '@/const/image-list'
import Image from 'next/image'
import React from 'react'

const CustomImage = (props) => {

  const handleLoader = (payload) => {
    const BASE_URL = "http://localhost/insecure/bl_6/s_10_10/rt_fill/plain/"
    return `${BASE_URL}${payload.src}`
  }

  const handleOnLoad = (event) => {
    const widthPath = props.width ? `/w_${props.width}` : ""
    const heightPath = props.width ? `/h_${props.height}` : ""
    const qualityPath = props.quality ? `/q_${props.quality}` : ""
    const BASE_URL = `http://localhost/insecure`
    event.target.src = `${BASE_URL}${widthPath}${heightPath}${qualityPath}${props.customfiltering || ""}/plain/${props.src}`
    event.target.srcset = `
    ${BASE_URL}${widthPath}${heightPath}${qualityPath}/dpr_1${props.customfiltering || ""}/plain/${props.src} 1x,
    ${BASE_URL}${widthPath}${heightPath}${qualityPath}/dpr_2${props.customfiltering || ""}/plain/${props.src} 2x,
    ${BASE_URL}${widthPath}${heightPath}${qualityPath}/dpr_3${props.customfiltering || ""}/plain/${props.src} 3x
    `
    return event
  }

  return (
    <Image {...props} onLoad={handleOnLoad} loader={handleLoader} />
  )
}

const imgProxy = () => {
  return (
    <>
      <div className='container'>
        {IMAGE_LIST.map((url, index) => (
          <div className='item' key={index}>
            <CustomImage src={url} alt="image" width={250} height={250} quality={100} customfiltering="/rt_fit" style={{ objectFit: "cover", aspectRatio: "1/1" }} />
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

export default imgProxy