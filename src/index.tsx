import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { getImage } from './assets';

const apiKey = process.env.REACT_APP_STREAM_KEY;
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');
const targetOrigin = urlParams.get('target_origin');
const skipNameImageSet = urlParams.get('skip_name_image_set') || false;

const userToConnect: { id: string; name?: string; image?: string } = {
  id: userId!,
  name: skipNameImageSet ? undefined : userId!,
  image: skipNameImageSet ? undefined : getImage(userId!),
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);
root.render(
  <React.StrictMode>
    <App
      apiKey={apiKey!}
      userToConnect={userToConnect}
      targetOrigin={targetOrigin!}
    />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
