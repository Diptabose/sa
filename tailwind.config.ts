import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

      textColor:{
        'content-default':'rgb(var(--content-default) / <alpha-value>)',
        'content-placeholder':'rgb(var(--content-placeholder) / <alpha-value>)',
        'content-brand':'rgb(var(--content-brand) / <alpha-value>)',
        'content-white':'rgb(var(--content-white) / <alpha-value>)',
        'content-error':'rgb(var(--content-error) / <alpha-value>)',
        'content-email-card-placeholder':'rgb(var(--content-email-card-placeholder) / <alpha-value>)',
        'content-email-card-placeholder-selected':'rgb(var(--content-email-card-placeholder-selected) / <alpha-value>)',
      },

      backgroundColor: {
        'container-default':'rgb(var(--container-default) / <alpha-value>)',
        'container-brand':'rgb(var(--container-brand) / <alpha-value>)',
        'container-brand-lite':'rgb(var(--container-brand-lite)/ <alpha-value>)',
        'container-disabled':'rgb(var(--container-disabled)/ <alpha-value>)',
        'surface-3':'rgb(var(--surface-3) / <alpha-value>)',
        'surface-on':'rgb(var(--surface-on) / <alpha-value>)',
        'primitives-accordion-blue':'rgb(var(--primitives-accordion-blue) / <alpha-value>)',
        'primitives-accordion-blue-80':'rgb(var(--primitives-accordion-blue-80) / <alpha-value>)'
      },

      borderColor:{
        'brand':'rgb(var(--border-brand) / <alpha-value>)',
        'default':'rgb(var(--border-default) / <alpha-value>)',
      },
      borderRadius:{
         "cards":'var(--border-cards)',
         "button":'var(--birder-button)',
      },
      gap:{
        'small':'var(--spacing-small)',
        'medium':'var(--spacing-medium)',
      },

    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],

}
export default config
