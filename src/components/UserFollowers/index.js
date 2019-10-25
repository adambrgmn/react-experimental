import React from 'react';
import { Polaroid } from '../Polaroid';
import './style.css';

export const UserFollowers = ({ resource }) => {
  const followers = resource.followers.read();

  return (
    <div className="followers">
      <h4>Followers</h4>
      <ul className="followers-list">
        <React.SuspenseList revealOrder="forwards">
          {followers.map((follower) => (
            <React.Suspense
              key={follower.id}
              fallback={<p>Loading data for {follower.login}</p>}
            >
              <Follower follower={follower} />
            </React.Suspense>
          ))}
        </React.SuspenseList>
      </ul>
    </div>
  );
};

function Follower({ follower }) {
  return (
    <li className="follower">
      <Polaroid src={follower.avatar_url} title={follower.login} alt="" />
    </li>
  );
}
