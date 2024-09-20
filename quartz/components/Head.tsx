import { i18n } from "../i18n"
import { FullSlug, joinSegments, pathToRoot } from "../util/path"
import { JSResourceToScriptElement } from "../util/resources"
import { googleFontHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const Head: QuartzComponent = ({ cfg, fileData, externalResources }: QuartzComponentProps) => {
    const title = fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
    const description =
      fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description
    const { css, js } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)

    const iconPath = joinSegments(baseDir, "static/icon.png")
    const ogImagePath = `https://${cfg.baseUrl}/static/og-image.png`

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href={googleFontHref(cfg.theme)} />
          </>
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {cfg.baseUrl && <meta property="og:image" content={ogImagePath} />}
        <meta property="og:width" content="1200" />
        <meta property="og:height" content="675" />
        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />
        <style type="text/css" id="highlightr-styles">
          .hltr-pink,
          mark.hltr-pink,
          .markdown-preview-view mark.hltr-pink{
          background: #FFB8EBA6;
          }

          .hltr-red,
          mark.hltr-red,
          .markdown-preview-view mark.hltr-red{
          background: #FF5582A6;
          }

          .hltr-orange,
          mark.hltr-orange,
          .markdown-preview-view mark.hltr-orange{
          background: #FFB86CA6;
          }

          .hltr-yellow,
          mark.hltr-yellow,
          .markdown-preview-view mark.hltr-yellow{
          background: #FFF3A3A6;
          }

          .hltr-green,
          mark.hltr-green,
          .markdown-preview-view mark.hltr-green{
          background: #BBFABBA6;
          }

          .hltr-cyan,
          mark.hltr-cyan,
          .markdown-preview-view mark.hltr-cyan{
          background: #ABF7F7A6;
          }

          .hltr-blue,
          mark.hltr-blue,
          .markdown-preview-view mark.hltr-blue{
          background: #ADCCFFA6;
          }

          .hltr-purple,
          mark.hltr-purple,
          .markdown-preview-view mark.hltr-purple{
          background: #D2B3FFA6;
          }

          .hltr-grey,
          mark.hltr-grey,
          .markdown-preview-view mark.hltr-grey{
          background: #CACFD9A6;
          }
          </style>
        {css.map((href) => (
          <link key={href} href={href} rel="stylesheet" type="text/css" spa-preserve />
        ))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
