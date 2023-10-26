import type { Config } from "@staticcms/core";

// interface UuidField {
//   name: string;
//   widget: 'uuid';
//   label: string;
// }

// interface DataExchangeField {
//   name: string;
//   widget: 'data-exchange';
//   label: string;
// }

const config: Config = {
  backend: { name: "git-gateway", branch: "main" },
  // backend: {
  //   name: "proxy",
  //   branch: "main",
  //   proxy_url: "http://localhost:8081/api/v1"
  // },
  media_folder: "public/images",
  public_folder: "/images",
  i18n: {
    /**
     * Required and can be one of multiple_folders, multiple_files or single_file
     * multiple_folders - persists files in `<folder>/<locale>/<slug>.<extension>`
     * multiple_files - persists files in `<folder>/<slug>.<locale>.<extension>`
     * single_file - persists a single file in `<folder>/<slug>.<extension>`
     */
    structure: 'single_file',

    // Required - a list of locales to show in the editor UI
    locales: ['en', 'pt', 'ja'],

    /**
     * Optional, defaults to the first item in locales.
     * The locale to be used for fields validation and as a baseline for the entry.
     */
    defaultLocale: 'en'
  },
  collections: [
    {
      name: "config",
      label: "Configurações do site",
      delete: false,
      icon: "screwdriver-wrench",
      editor: { preview: false },
      i18n: false,
      files: [
        {
          name: "lp-digital-marketing-hero-banner-slides-config",
          label: "Configurações do Hero Banner da página para digital marketing LP",
          file: "data/content/lp-digital-marketing-hero-banner-slides-config.md",
          editor: { preview: false },
          i18n: false,
          fields: [
            {
              name: 'slideContainerHeight',
              label: 'Slider Height',
              widget: 'select',
              default: '1',
              multiple: false,
              required: true,
              options: [{
                label: 'Short',
                value: "short"
              },
              {
                label: 'Full',
                value: "full"
              }],
            },
            { label: "Auto Play Speed", name: "autoPlaySpeed", widget: "number", default: 3, hint: "Speed in second. Setting to 0 disables auto rotation." },
            { label: "Show Navagation", name: "showNavigation", widget: "boolean", default: true },
            { label: "Show Pagination", name: "showPagination", widget: "boolean", default: true },
            { label: "Loop Slides", name: "loopSlides", widget: "boolean", default: true },
          ],
        },
        {
          name: "homepage-hero-banner-slide-config",
          label: "Configurações do Hero Banner da página inicial",
          file: "data/content/homepage-hero-banner-slides-config.md",
          editor: { preview: false },
          i18n: false,
          fields: [
            {
              name: 'slideContainerHeight',
              label: 'Slider Height',
              widget: 'select',
              default: '1',
              multiple: false,
              required: true,
              options: [{
                label: 'Short',
                value: "short"
              },
              {
                label: 'Full',
                value: "full"
              }],
            },
            { label: "Auto Play Speed", name: "autoPlaySpeed", widget: "number", default: 3, hint: "Speed in second. Setting to 0 disables auto rotation." },
            { label: "Show Navagation", name: "showNavigation", widget: "boolean", default: true },
            { label: "Show Pagination", name: "showPagination", widget: "boolean", default: true },
            { label: "Loop Slides", name: "loopSlides", widget: "boolean", default: true },
          ],
        },
        {
          name: "general-site-config",
          label: "Configurações gerais do site",
          file: "data/meta/site-config.json",
          description: "General site settings",
          i18n: false,
          fields: [
            { label: "URL", name: "baseUrl", widget: "string", hint: "Do not enter the trailing slash of the URL" },
            { label: "Site title", name: "siteTitle", widget: "string" },
            { label: "Site description", name: "siteDescription", widget: "string" },
            { label: "Site Image", name: "siteImage", widget: "image", hint: "Image de site", multiple: false },
            { label: "Facebook account", name: "facebookAccount", widget: "string" },
            { label: "Instagram account", name: "instagramAccount", widget: "string" },
            { label: "Twitter account", name: "twitterAccount", hint: "Do not forget @", widget: "string" },
            {
              label: "Site keywords",
              name: "siteKeywords",
              widget: "list",
              collapsed: false,
              summary: "{{fields.keyword.keyword}}",
              fields: [{ label: "Keyword", name: "keyword", widget: "string" }],
            },
          ],
        },
      ],
    },
    {
      name: "homepage-hero-banner-slides",
      label: "Slides de Hero Banner da página inicial",
      folder: "data/content/homepage-hero-banner-slides",
      icon: "store",
      create: true,
      identifier_field: "homeSlideId",
      summary: "{{name}}",
      editor: { preview: false },
      i18n: true,
      fields: [
        { label: "Nome", name: "name", widget: "string" },
        { label: "Image", name: "image", widget: "image", hint: "Image de slide", multiple: false },
        {
          name: 'slideType',
          label: 'Tipo de slide',
          widget: 'select',
          default: 'HeadingLeadCentered',
          multiple: false,
          required: true,
          options: [
            {
              label: 'Heading and Lead in the Center With CTA',
              value: "HeadingLeadCenteredWithCTA"
            },
            {
              label: 'Hero with CTA',
              value: "Hero"
            },
            {
              label: 'Heading and Lead in the Center',
              value: "HeadingLeadCentered"
            },
            {
              label: 'Image Only',
              value: "ImageOnly"
            },
          ],
        },
        { label: "Heading", name: "heading", widget: "markdown", default: "", condition: { field: 'slideType', pattern: '^((?!ImageOnly).)*$' }, i18n: true },
        { label: "Color of Heading", name: "headingColor", widget: "color", condition: { field: 'slideType', pattern: '^((?!ImageOnly).)*$' }, required: false },
        { label: "Lead", name: "lead", widget: "markdown", condition: { field: 'slideType', pattern: '^((?!ImageOnly).)*$' }, required: false, i18n: true },
        { label: "Cor de Lead", name: "leadColor", widget: "color", condition: { field: 'slideType', pattern: '^((?!ImageOnly).)*$' }, required: false },
        { label: "CTA Button Label", name: "ctaButtonLabel", widget: "string", condition: { field: 'slideType', pattern: 'HeadingLeadCenteredWithCTA|Hero' }, required: false, i18n: true },
        { label: "CTA Button Label Color", name: "ctaLabelColor", widget: "color", condition: { field: 'slideType', pattern: 'HeadingLeadCenteredWithCTA|Hero' }, required: false },
        { label: "CTA Button URL", name: "ctaButtonUrl", widget: "string", condition: { field: 'slideType', pattern: 'HeadingLeadCenteredWithCTA|Hero' }, required: false, i18n: true },
        { label: "CTA Button Color", name: "ctaButtonColor", widget: "color", condition: { field: 'slideType', pattern: 'HeadingLeadCenteredWithCTA|Hero' }, required: false },
        { label: "Read More Label", name: "readMoreLabel", widget: "color", condition: { field: 'slideType', pattern: 'HeadingLeadCenteredWithCTA|Hero' }, required: false, i18n: true },
        { label: "Read More URL", name: "readMoreUrl", widget: "color", condition: { field: 'slideType', pattern: 'HeadingLeadCenteredWithCTA|Hero' }, required: false, i18n: true },
        { label: "Learn More URL", name: "learnMoreUrl", widget: "color", condition: { field: 'slideType', pattern: 'HeadingLeadCenteredWithCTA|Hero' }, required: false, i18n: true },
        { label: "Home Slide ID", name: "homeSlideId", widget: "uuid" },
      ],
    },
    {
      name: "lp-digital-marketing-hero-banner-slides",
      label: "Slides de Hero Banner da página para digital marketing LP",
      folder: "data/content/lp-digital-marketing-hero-banner-slides",
      icon: "store",
      create: true,
      identifier_field: "heroSlideId",
      summary: "{{name}}",
      editor: { preview: false },
      i18n: true,
      fields: [
        { label: "Nome", name: "name", widget: "string" },
        { label: "Image", name: "image", widget: "image", hint: "Image de slide", multiple: false },
        {
          name: 'slideType',
          label: 'Tipo de slide',
          widget: 'select',
          default: 'HeadingLeadCentered',
          multiple: false,
          required: true,
          options: [
            {
              label: 'Heading and Lead in the Center With CTA',
              value: "HeadingLeadCenteredWithCTA"
            },
            {
              label: 'Hero with CTA',
              value: "Hero"
            },
            {
              label: 'Heading and Lead in the Center',
              value: "HeadingLeadCentered"
            },
            {
              label: 'Image Only',
              value: "ImageOnly"
            },
          ],
        },
        { label: "Heading", name: "heading", widget: "markdown", default: "", condition: { field: 'slideType', pattern: '^((?!ImageOnly).)*$' }, i18n: true },
        { label: "Color of Heading", name: "headingColor", widget: "color", condition: { field: 'slideType', pattern: '^((?!ImageOnly).)*$' }, required: false },
        { label: "Lead", name: "lead", widget: "markdown", condition: { field: 'slideType', pattern: '^((?!ImageOnly).)*$' }, required: false, i18n: true },
        { label: "Cor de Lead", name: "leadColor", widget: "color", condition: { field: 'slideType', pattern: '^((?!ImageOnly).)*$' }, required: false },
        { label: "CTA Button Label", name: "ctaButtonLabel", widget: "string", condition: { field: 'slideType', pattern: 'HeadingLeadCenteredWithCTA|Hero' }, required: false, i18n: true },
        { label: "CTA Button Label Color", name: "ctaLabelColor", widget: "color", condition: { field: 'slideType', pattern: 'HeadingLeadCenteredWithCTA|Hero' }, required: false },
        { label: "CTA Button URL", name: "ctaButtonUrl", widget: "string", condition: { field: 'slideType', pattern: 'HeadingLeadCenteredWithCTA|Hero' }, required: false, i18n: true },
        { label: "CTA Button Color", name: "ctaButtonColor", widget: "color", condition: { field: 'slideType', pattern: 'HeadingLeadCenteredWithCTA|Hero' }, required: false },
        { label: "Read More Label", name: "readMoreLabel", widget: "color", condition: { field: 'slideType', pattern: 'HeadingLeadCenteredWithCTA|Hero' }, required: false, i18n: true },
        { label: "Read More URL", name: "readMoreUrl", widget: "color", condition: { field: 'slideType', pattern: 'HeadingLeadCenteredWithCTA|Hero' }, required: false, i18n: true },
        { label: "Learn More URL", name: "learnMoreUrl", widget: "color", condition: { field: 'slideType', pattern: 'HeadingLeadCenteredWithCTA|Hero' }, required: false, i18n: true },
        { label: "Home Slide ID", name: "heroSlideId", widget: "uuid" },
      ],
    },
    {
      name: "members",
      label: "Members",
      folder: "data/content/member",
      icon: "store",
      create: true,
      identifier_field: "memberId",
      summary: "{{name}}",
      description: "Member Profile",
      editor: { preview: false },
      i18n: true,
      fields: [
        { label: "Nome", name: "name", widget: "string" },
        {
          label: "Profile Image",
          name: "image",
          widget: "image",
          required: false,
          choose_url: true,
          multiple: false,
          media_library: {
            max_file_size: 1000000
          }
        },
        {
          label: "Additional Photos",
          name: "additionalPhotos",
          widget: "list",
          collapsed: true,
          add_to_top: true,
          required: false,
          min: 0,
          fields: [
            { label: "Title", name: "title", widget: "string" },
            {
              label: "Foto",
              name: "image",
              widget: "image",
              default: "",
              required: false,
              multiple: false,
              choose_url: true,
              media_library: {
                max_file_size: 1000000
              }
            }],
        },
        { label: "URL caminho", name: "slug", widget: "string", required: false },
        { label: "Summary", name: "summary", widget: "string", required: false, i18n: true },
        { label: "Profile", name: "body", widget: "markdown", required: false, i18n: true },
        { label: "Member Data ID", name: "memberId", widget: "uuid" },
      ],
    },
    {
      name: "news",
      label: "News",
      folder: "data/contentgit pul/",
      identifier_field: "articleId",
      summary: "{{title}}",
      icon: "store",
      create: true,
      description: "News posts",
      i18n: true,
      fields: [
        { label: "Nome", name: "title", widget: "string", i18n: true, },
        {
          label: "Cover Image",
          name: "image",
          widget: "image",
          default: "",
          required: false,
          choose_url: true,
          multiple: false,
          media_library: {
            max_file_size: 1000000
          }
        },
        { label: "URL caminho", name: "slug", widget: "string", required: false, i18n: true },
        {
          label: "Categoria",
          name: "category",
          widget: "string",
          default: "",
          required: false,
          i18n: true,
        },
        { label: "Summary de Informações adicionais", name: "summary", widget: "string", required: false, i18n: true, },
        { label: "Content", name: "body", widget: "markdown", required: false, i18n: true },
        {
          label: "Publish Date",
          name: "published_date",
          widget: "datetime",
          format: "yyyy-MM-dd",
          date_format: "yyyy-MM-dd",
          time_format: false,
          required: false
        },
        { label: "Article Data ID", name: "articleId", widget: "uuid" },
      ],
    },
    {
      name: "services",
      label: "Service Demonstrations",
      folder: "data/content/service/",
      identifier_field: "serviceId",
      icon: "store",
      summary: "{{title}}",
      create: true,
      editor: { preview: false },
      description: "Service posts",
      i18n: true,
      fields: [
        { label: "Nome", name: "title", widget: "string", i18n: true },
        {
          label: "Cover Image",
          name: "image",
          widget: "image",
          default: "",
          required: false,
          choose_url: true,
          multiple: false,
          media_library: {
            max_file_size: 1000000
          }
        },
        { label: "URL caminho", name: "slug", widget: "string", i18n: true, required: false },
        {
          label: "Categoria",
          name: "category",
          widget: "string",
          default: "Digital Marketing",
          required: true
        },
        { label: "Summary de Informações adicionais", name: "summary", widget: "string", required: false, i18n: true },
        { label: "Content", name: "body", widget: "markdown", required: false, i18n: true },
        {
          label: "Publish Date",
          name: "published_date",
          widget: "datetime",
          format: "yyyy-MM-dd",
          date_format: "yyyy-MM-dd",
          time_format: false,
          required: false
        },
        { label: "Service Data ID", name: "serviceId", widget: "uuid" },
      ],
    },
  ],
};

export default config;