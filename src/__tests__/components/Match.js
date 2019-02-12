import React from 'react';
import Match from '../../js/components/Match';

import renderer from 'react-test-renderer';

describe('Match', () => {

  const props = {
    match: {
      awayName: 'Chelsea',
      homeName: 'ManU',
      sport: 'Football',
      start: '',
      awayScore: '',
      homeScore: ''
    }
  };

  it('renders correctly', () => {
    const tree = renderer.create(
      <Match
        {...props}
      />
    ).toJSON();

    expect(tree.children.length).toBe(4);
  });
});