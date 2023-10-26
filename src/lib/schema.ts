import type { Markdown } from 'contentlayer/core'

export type Member = {
    memberId: string;
    name: string;
    slug?: string;
    summary?: string;
    body: Markdown;
    image: string;
    additionalPhotos?: AdditionalPhotos[];
};

export type AdditionalPhotos = {
    title?: string;
    image?: string;
};


export type NestedSlide = {
    slideType?: string;
    image?: string;
    heading?: Markdown;
    headingColor?: string;
    lead?: Markdown;
    leadColor?: string;
    ctaButtonLabel?: string;
    ctaButtonUrl?: string;
    ctaButtonLabelColor?: string;
    ctaButtonColor?: string;
    readMoreLabel?: string;
    readMoreUrl?: string;
    learnMoreUrl?: string;
}

export type Slide = {
    en?: NestedSlide,
    pt?: NestedSlide,
    ja?: NestedSlide,
}

export type Slider = {
    slides?: Slide[];
    slideContainerHeight?: string;
    autoPlaySpeedMs?: number;
    showNavigation?: boolean;
    showPagination?: boolean;
    loopSlides?: boolean;
}

export type Category = {
    name: string;
    slug: string;
    count: number;
};

export type SubCategory = {
    name: string;
    slug: string;
    parentName?: string;
    parentSlug?: string;
    count: number;
};

export type Categories = {
    root: Category[];
    sub: SubCategory[];
}

export type NavbarLinkBase = {
    name: string;
    href?: string;
    target?: string;
    current?: boolean;
}
