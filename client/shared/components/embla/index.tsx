import React, { useCallback } from 'react'
import Image from 'next/image'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './arrow-button'
import './embla.css'

type PropType = {
    slides: any[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        AutoScroll({ playOnInit: false })
    ])

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const onButtonAutoplayClick = useCallback(
        (callback: () => void) => {
            const autoScroll = emblaApi?.plugins()?.autoScroll
            if (!autoScroll) return

            const resetOrStop =
                // @ts-ignore
                autoScroll.options.stopOnInteraction === false
                    ? autoScroll.reset
                    : autoScroll.stop

            // @ts-ignore
            resetOrStop()
            callback()
        },
        [emblaApi]
    )

    return (
        <div className="relative w-full embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((item, index) => (
                        <div className="embla__slide relative flex flex-col justify-start items-start gap-2 max-w-[400px] max-h-[500px]" key={index}>
                            <Image
                                width={500}
                                height={500}
                                src={item.image}
                                alt={item.title}
                                className='object-cover object-top w-full h-[400px]'
                            />
                            <div className="flex flex-col items-start justify-start w-full gap-2 px-3 py-2">
                                <h2 className="text-lg md:text-xl">{item.title}</h2>
                                <p className="text-xs text-neutral-400 md:text-sm text-wrap">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute top-0 w-full h-full embla__controls">
                <div className="flex items-center justify-center w-screen h-full">
                    <PrevButton
                        onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
                        disabled={prevBtnDisabled}
                        className='absolute bottom-[60%] left-3 embla__button'
                    />
                    <NextButton
                        onClick={() => onButtonAutoplayClick(onNextButtonClick)}
                        disabled={nextBtnDisabled}
                        className='absolute bottom-[60%] right-3 embla__button'
                    />
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
