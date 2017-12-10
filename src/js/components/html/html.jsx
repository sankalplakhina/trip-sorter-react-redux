import React from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
class Html extends React.Component {
    render() {
        const { assets, component, store } = this.props;
        const content = component ? ReactDOM.renderToString(component) : '';
        const head = Helmet.rewind();

        return (
            <html lang="en">
                <head>
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {
                        Object.keys(assets.styles).map((style, key) =>
                            <link href={assets.styles[style]}
                                  key={key}
                                  media="screen, projection"
                                  rel="stylesheet"
                                  type="text/css"
                                  charSet="UTF-8" />
                        )
                    }
                </head>
                <body>
                    <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
                    <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
                            charSet="UTF-8" />
                    {
                        Object.keys(assets.javascript).map((key, index) =>
                            <script src={assets.javascript[key]} key={index} charSet="UTF-8" />
                        )
                    }
                </body>
            </html>
        );
    }
}

Html.propTypes = {
  assets: React.PropTypes.object,
  component: React.PropTypes.node,
  store: React.PropTypes.object,
};

export default Html;
