import React from 'react';
import { Polaroid } from '../Polaroid';
import './style.css';

export const UserInfo = ({ resource }) => {
  const user = resource.user.read();
  return (
    <div className="user-info">
      <div className="user-image">
        <Polaroid src={user.avatar_url} title={user.name} />
      </div>
      <div className="user-extra">
        <p className="user-mail">{user.email}</p>
        <p className="user-location">{user.location}</p>
      </div>
    </div>
  );
};
