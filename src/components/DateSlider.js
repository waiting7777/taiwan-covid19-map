import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { eachDayOfInterval, format } from 'date-fns';
import classNames from 'classnames';

const days = eachDayOfInterval({
    start: new Date("2022-01-01"),
    end: new Date()
})

const DateSlider = ({ onChange }) => {
    return (
        <Swiper
            centeredSlides={true}
            initialSlide={days.length}
            slidesPerView={30}
            onSlideChange={swiper => onChange(days[swiper.activeIndex])}
            onClick={swiper => swiper.slideTo(swiper.clickedIndex)}
        >
            {days.map(day => <SwiperSlide
                key={day}
                className="flex whitespace-nowrap items-center justify-center px-2 py-1 cursor-pointer border border-gray-500 hover:bg-white hover:text-gray-500"
            >
                {({ isActive }) => (<div
                    className={classNames({
                        'text-red-500': isActive
                    })}
                >
                    {format(day, 'M-dd')}
                </div>
                )}
            </SwiperSlide>
            )}
        </Swiper>
    )
}

export default DateSlider