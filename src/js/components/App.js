import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import { getLiveMatches } from '../actions/match';

const CACHE_TIME_IN_SECONDS = 120000;

import Match from './Match';

class App extends Component {
  componentDidMount() {
    const { time } = this.props.matchesStore;

    if(Date.now() > time + CACHE_TIME_IN_SECONDS) {
      this.props.dispatch(getLiveMatches());
    } 
  }
  render() {
    const settings = {
      infinite: true,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 3000,
      cssEase: 'linear',
      arrows: false
    };

    const { matches, loading } = this.props.matchesStore;
    if(loading) {
      <h2>Loading...</h2>;
    }
    return (
      <Fragment>
        <div id="container">
          <header>
            <div id="logo">Unibet</div>
          </header>
          <div id="content">
            <article>
              <h1>Live matches</h1>
              <p className="preamble">
                Here is a list of matches that are live right now.
              </p>

              <div id="match">
                <Slider {...settings}>
                  { matches && Object.values(matches).map(match => 
                    <Match key={match.id} match={match}/>
                  )}
                </Slider>
              </div>

              <aside>
                <h2>Live betting</h2>
                <p>Place your bets as the action unfolds. We offer a wide selection of live betting events and you can place both single and combination bets.</p>
                <p>You will be able to see an in-play scoreboard with the current result and match stats, while on selected events you will also be able to watch the action live with Unibet TV on the desktop site.</p>
              </aside>
              <div id="live-matches"></div>
            </article>
          </div>
          <footer>
            <div className="inner">
              <p>&copy; 1997-2015, Unibet. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Fragment>
    );
  }
}

// Connect App to the Redux store so that it has this.props.matchesStore
const mapStateToProps = (state) => {
  return {
    matchesStore: state.matches
  };
};

App.propTypes = {
  matchesStore: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const AppContainer = connect(mapStateToProps, null)(App);

export default AppContainer;