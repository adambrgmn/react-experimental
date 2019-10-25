import React from 'react';
import { userResource } from './api';
import { ErrorBoundary } from './components/ErrorBoundary';
import { UserInfo } from './components/UserInfo';
import { UserRepos } from './components/UserRepos';
import { UserFollowers } from './components/UserFollowers';
import { Spinner } from './components/Spinner';
import './app.css';

const INITIAL_USER = process.env.REACT_APP_INITIAL_USER || 'adambrgmn';

function App() {
  const [username, setUsername] = React.useState(INITIAL_USER);
  const [resource, setResource] = React.useState(() => userResource(username));
  const [startTransition, isPending] = React.useTransition({ timeoutMs: 200 });
  const errorRef = React.useRef(null);

  const handleChange = (event) => {
    startTransition(() => {
      setUsername(event.target.value);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(() => {
      errorRef.current.reset();
      setResource(userResource(username));
    });
  };

  return (
    <React.Suspense fallback={<Spinner />}>
      <div className="wrapper">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={username}
            onChange={handleChange}
            className="input"
          />
          <button type="submit" disabled={isPending} className="button">
            Search user
          </button>
        </form>

        <ErrorBoundary ref={errorRef} fallback={<p>Could not find user</p>}>
          <div className="user">
            <React.Suspense fallback={<Spinner />}>
              <React.SuspenseList revealOrder="forwards" tail="collapsed">
                <UserInfo resource={resource} />

                <React.Suspense fallback={<Spinner />}>
                  <UserRepos resource={resource} />
                </React.Suspense>

                <React.Suspense fallback={<Spinner />}>
                  <UserFollowers resource={resource} />
                </React.Suspense>
              </React.SuspenseList>
            </React.Suspense>
          </div>
        </ErrorBoundary>
      </div>
    </React.Suspense>
  );
}

export default App;
