import React from 'react';
import './style.css';

export const UserRepos = ({ resource }) => {
  const repos = resource.repos.read();
  return (
    <div className="repos">
      <h4>Repos</h4>
      <ul className="repos-list">
        {repos.map((repo) => (
          <li key={repo.id} className="repo">
            <a href={repo.url} className="repo-link">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
