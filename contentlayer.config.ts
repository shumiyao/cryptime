// doc https://www.contentlayer.dev/docs/getting-started
// https://dev.to/seankerwin/nextjs-and-contentlayer-static-markdown-blog-guide-2n8k

// https://github.com/officialrajdeepsingh/contentLayerNetlifycms/tree/main/posts

import { defineDocumentType, makeSource, defineNestedType } from "contentlayer/source-files";

import slugify from 'slugify';

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

const LpDigitalMarketingHeroBannerSlideConfig = defineDocumentType(() => ({
    name: 'LpDigitalMarketingHeroBannerSlideConfig',
    isSingleton: true,
    filePathPattern: `content/lp-digital-marketing-hero-banner-slides-config.md`,
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

const LpDigitalMarketingHeroBannerSlides = defineDocumentType(() => ({
    name: 'LpDigitalMarketingHeroBannerSlides',
    filePathPattern: `content/lp-digital-marketing-hero-banner-slides/*.md`,
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

const AdditionalPhotos = defineNestedType(() => ({
    name: 'AdditionalPhotos',
    fields: {
        title: { type: 'string' },
        image: { type: 'string' },
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: (doc) => doc.slug ? doc.slug : doc._raw.sourceFileName.replace(/\.md/, "").toLowerCase(),
        },
    }
}))
const Member = defineNestedType(() => ({
    name: 'Member',
    fields: {
        name: {
            type: 'string',
            required: false,
        },
        slug: {
            type: 'string',
            required: false,
        },
        image: {
            type: 'string',
            required: false,
        },
        body: {
            type: 'markdown',
            required: false,
        },
        summary: {
            type: 'string',
            required: false,
        },
        additionalPhotos: {
            type: 'list', of: AdditionalPhotos,
            required: false,
            default: []
        },
        memberId: {
            type: 'string',
            required: false,
        },
    },
}))
const Members = defineDocumentType(() => ({
    name: 'Members',
    filePathPattern: `content/member/*.md`,
    // contentType: 'data',
    fields: {
        en: { type: 'nested', of: Member, },
        pt: { type: 'nested', of: Member, },
        ja: { type: 'nested', of: Member, },
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
        slug: {
            type: "string",
            resolve: (doc) => doc.en.slug ? doc.en.slug : slugify(doc.en.name, { lower: true })
            ,
        },
    }
}))
const NewsPost = defineNestedType(() => ({
    name: 'NewsPost',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        slug: {
            type: 'string',
            required: false,
        },
        image: {
            type: 'string',
            required: false,
        },
        category: {
            type: 'string',
            required: false,
        },
        published_date: {
            type: 'string',
            required: false,
        },
        summary: {
            type: 'string',
            required: false,
        },
        content: {
            type: 'markdown',
            required: false,
        },
        articleId: {
            type: 'string',
            required: true,
        },
        draft: {
            type: 'string',
            required: false,
        },
        path: {
            type: 'string',
            required: false,
        },
    },
}))
const News = defineDocumentType(() => ({
    name: 'News',
    filePathPattern: `content/news/*.md`,
    // contentType: 'data',
    fields: {
        en: { type: 'nested', of: NewsPost, },
        pt: { type: 'nested', of: NewsPost, },
        ja: { type: 'nested', of: NewsPost, },
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
        slug: {
            type: "string",
            resolve: (doc) => doc.en.slug ? doc.en.slug : slugify(doc.en.title, { lower: true })
            ,
        },
    }
}))

const ServiceContent = defineNestedType(() => ({
    name: 'ServiceContent',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        slug: {
            type: 'string',
            required: false,
        },
        image: {
            type: 'string',
            required: false,
        },
        category: {
            type: 'string',
            required: false,
        },
        published_date: {
            type: 'string',
            required: false,
        },
        summary: {
            type: 'string',
            required: false,
        },
        body: {
            type: 'markdown',
            required: false,
        },
        serviceId: {
            type: 'string',
            required: false,
        },
        draft: {
            type: 'string',
            required: false,
        },
        path: {
            type: 'string',
            required: false,
        },
    },
}))
const Services = defineDocumentType(() => ({
    name: 'Services',
    filePathPattern: `content/service/*.md`,
    // contentType: 'data',
    fields: {
        en: { type: 'nested', of: ServiceContent, },
        pt: { type: 'nested', of: ServiceContent, },
        ja: { type: 'nested', of: ServiceContent, },
    },
    computedFields: {
        pt: {
            type: "nested",
            resolve: (doc) => _.defaults(doc.pt, doc.en),
        },
        ja: {
            type: "nested",
            resolve: (doc) => _.defaults(doc.ja, doc.en)
        },
        slug: {
            type: "string",
            resolve: (doc) => doc.en.slug ? doc.en.slug : slugify(doc.en.title, { lower: true })
            ,
        },
    }
}))


export default makeSource({
    contentDirPath: 'data',
    documentTypes: [SiteConfig, News, HeroHomepageBannerSlideConfig, LpDigitalMarketingHeroBannerSlideConfig, Members, Services, HeroHomepageBannerSlides, LpDigitalMarketingHeroBannerSlides],
})