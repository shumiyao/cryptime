// doc https://www.contentlayer.dev/docs/getting-started
// https://dev.to/seankerwin/nextjs-and-contentlayer-static-markdown-blog-guide-2n8k

// https://github.com/officialrajdeepsingh/contentLayerNetlifycms/tree/main/posts

import { defineDocumentType, makeSource, defineNestedType } from "contentlayer/source-files";


import _ from "lodash";

const SiteConfig = defineDocumentType(() => ({
    name: 'SiteConfig',
    isSingleton: true,
    filePathPattern: `meta/site-config.json`,
    contentType: 'data',
    fields: {
        baseUrl: {
            type: 'string',
        },
        siteTitle: {
            type: 'string',
        },
        siteDescription: {
            type: 'string',
        },
        siteImage: {
            type: 'string',
        },
        siteKeywords: {
            type: 'list', of: { type: 'string' },
        },
        facebookAccount: {
            type: 'string',
        },
        instagramAccount: {
            type: 'string',
        },
        twitterAccount: {
            type: 'string',
        },
    }
}))

const Slide = defineNestedType(() => ({
    name: 'Slide',
    fields: {
        slideType: {
            type: 'string',
        },
        image: {
            type: 'string',
        },
        heading: {
            type: 'markdown',
        },
        headingColor: {
            type: 'string',
        },
        lead: {
            type: 'markdown',
        },
        leadColor: {
            type: 'string',
        },
        ctaButtonLabel: {
            type: 'string',
        },
        ctaLabelColor: {
            type: 'string',
        },
        ctaButtonUrl: {
            type: 'string',
        },
        ctaButtonColor: {
            type: 'string',
        },
        readMoreLabel: {
            type: 'string',
        },
        readMoreUrl: {
            type: 'string',
        },
        learnMoreUrl: {
            type: 'string',
        }
    },

}))

const HeroHomepageBannerSlideConfig = defineDocumentType(() => ({
    name: 'HeroHomepageBannerSlideConfig',
    isSingleton: true,
    filePathPattern: `content/homepage-hero-banner-slides-config.md`,
    contentType: 'markdown',
    fields: {
        slideContainerHeight: {
            type: 'string',
            default: 'default'
        },
        autoPlaySpeed: {
            type: 'string',
            default: "3"
        },
        showNavigation: {
            type: 'boolean',
            default: true
        },
        showPagination: {
            type: 'boolean',
            default: true
        },
        loopSlides: {
            type: 'boolean',
            default: true
        },
        slides: {
            type: 'list', of: Slide,
        },
    },
    computedFields: {
        autoPlaySpeedMs: {
            type: "number",
            resolve: (doc) => doc.autoPlaySpeed ? Number(doc.autoPlaySpeed) * 1000 : 3000,
        },
    }
}))

const HeroHomepageBannerSlides = defineDocumentType(() => ({
    name: 'HeroHomepageBannerSlides',
    filePathPattern: `content/homepage-hero-banner-slides/*.md`,
    // contentType: 'data',
    fields: {
        en: { type: 'nested', of: Slide, },
        pt: { type: 'nested', of: Slide, },
        ja: { type: 'nested', of: Slide, },
    },
    computedFields: {
        pt: {
            type: "nested",
            resolve: (doc) => _.defaults(doc.pt, doc.en),
        },
        ja: {
            type: "nested",
            resolve: (doc) => _.defaults(doc.ja, doc.en),
        },
    }
}))




export default makeSource({
    contentDirPath: 'data',
    documentTypes: [SiteConfig, HeroHomepageBannerSlideConfig, HeroHomepageBannerSlides],
})