import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="container">
          <Header />
          {/* <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} /> */}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
