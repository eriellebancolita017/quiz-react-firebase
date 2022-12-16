import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Play from './components/quiz/Play';
import QuizSummary from './components/quiz/QuizSummary';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/play/quiz" exact component={Play} />
      <Route path="/play/quizSummary" exact component={QuizSummary} />
    </Router>
  );
}

export default App;