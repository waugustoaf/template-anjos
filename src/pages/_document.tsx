import { utils } from '@/utils';
import createEmotionServer from '@emotion/server/create-instance';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Children } from 'react';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link rel='shortcut icon' href='/images/favicon.svg' />
          <link rel='icon' href='/images/favicon.svg' />
          <link rel='apple-touch-icon-precomposed' href='/images/favicon.svg' />
          <link rel='apple-touch-icon' href='/images/favicon.svg' />
          <link rel='manifest' href='/manifest.json' />
          <meta name='google' content='notranslate' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='green' />
          <meta name='apple-mobile-web-app-title' content='FreeCodeCamp' />
          <link
            rel='apple-touch-icon'
            href='/images/favicon.png'
            sizes='72x72'
          />
          <link
            rel='apple-touch-icon'
            href='/images/favicon.png'
            sizes='96x96'
          />
          <link
            rel='apple-touch-icon'
            href='/images/favicon.png'
            sizes='128x128'
          />
          <link
            rel='apple-touch-icon'
            href='/images/favicon.png'
            sizes='144x144'
          />
          <link
            rel='apple-touch-icon'
            href='/images/favicon.png'
            sizes='152x152'
          />
          <link
            rel='apple-touch-icon'
            href='/images/favicon.png'
            sizes='192x192'
          />
          <link
            rel='apple-touch-icon'
            href='/images/favicon.png'
            sizes='384x384'
          />
          <link
            rel='apple-touch-icon'
            href='/images/favicon.png'
            sizes='512x512'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap'
          />
        </Head>
        <body className='notranslate'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = utils.cache.emotion.createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <App
            {...props} // @ts-ignore
            emotionCache={cache}
          />
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => {
    return (
      <style
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
      />
    );
  });

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};

export default CustomDocument;
