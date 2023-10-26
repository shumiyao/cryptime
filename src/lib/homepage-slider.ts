import { Slider, Slide } from './schema'
import { heroHomepageBannerSlideConfig, allHeroHomepageBannerSlides } from 'contentlayer/generated';

const {
    slideContainerHeight,
    autoPlaySpeedMs,
    showNavigation,
    showPagination,
    loopSlides } = heroHomepageBannerSlideConfig
const homepageSlider: Slider = {
    slideContainerHeight,
    autoPlaySpeedMs,
    showNavigation,
    showPagination,
    loopSlides,
    slides: allHeroHomepageBannerSlides && allHeroHomepageBannerSlides.length > 0 ? allHeroHomepageBannerSlides : []
}
export default homepageSlider