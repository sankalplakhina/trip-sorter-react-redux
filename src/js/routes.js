import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from 'src/js/components/app';
import Home from 'src/js/components/pages/home';
import Results from 'src/js/components/pages/results';
import NotFound from 'src/js/components/pages/notFound';

export default (store) => {

    return (
        <Route path="/" component={App}>
      		<IndexRoute component={Home} />
            <Route path="home" component={Home}/>
            <Route path="results" component={Results}/>
            <Route path="*" component={NotFound} status={404} />
        </Route>
    );
};
