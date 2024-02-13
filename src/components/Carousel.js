import React from 'react'
import { useSelector } from 'react-redux'
import { Image, Space } from 'antd'
import {
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons'

const Carousel = ({ images, id }) => {
  const isActive = (index) => {
    if (index === 0) return 'active'
  }

  const { userSettings } = useSelector((state) => state)

  return (
    <div id={`image${id}`} className='carousel slide haha' data-ride='carousel'>
      <ol className='carousel-indicators' style={{ zIndex: 1 }}>
        {images.map((img, index) => (
          <li
            key={index}
            data-target={`#image${id}`}
            data-slide-to={index}
            className={isActive(index)}
          />
        ))}
      </ol>
      <div className='carousel-inner'>
        {images.map((img, index) => {
          return (
            <div
              key={index}
              className={`carousel-item ${isActive(index)}`}
              style={{ textAlign: 'center' }}
            >
              {img.url.match(/video/i) ? (
                <video
                  controls
                  src={img.url}
                  className='d-block w-100 carousel-el'
                  alt={img.url}
                  style={{
                    filter: userSettings.isDarkTheme ? 'invert(1)' : 'invert(0)',
                  }}
                />
              ) : (
                <Image
                  src={img.url}
                  className='d-block w-100 carousel-el'
                  alt={img.url}
                  height={400}
                  style={{
                    filter: userSettings.isDarkTheme ? 'invert(1)' : 'invert(0)',
                  }}
                  preview={{
                    toolbarRender: (
                      _,
                      {
                        transform: { scale },
                        actions: {
                          onFlipY,
                          onFlipX,
                          onRotateLeft,
                          onRotateRight,
                          onZoomOut,
                          onZoomIn,
                        },
                      }
                    ) => (
                      <Space size={12} className='toolbar-wrapper'>
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined size={48} onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined
                          disabled={scale === 1}
                          onClick={onZoomOut}
                        />
                        <ZoomInOutlined
                          disabled={scale === 50}
                          onClick={onZoomIn}
                        />
                      </Space>
                    ),
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
      {images.length > 1 && (
        <>
          <a
            className='carousel-control-prev'
            href={`#image${id}`}
            role='button'
            data-slide='prev'
            style={{ width: '5%' }}
          >
            <span
              className='carousel-control-prev-icon'
              aria-hidden='true'
            ></span>
            <span className='sr-only'>Previous</span>
          </a>

          <a
            className='carousel-control-next'
            href={`#image${id}`}
            role='button'
            data-slide='next'
            style={{ width: '5%' }}
          >
            <span
              className='carousel-control-next-icon'
              aria-hidden='true'
            ></span>
            <span className='sr-only'>Next</span>
          </a>
        </>
      )}
    </div>
  )
}

export default Carousel
