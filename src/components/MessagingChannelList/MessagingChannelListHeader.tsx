import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import streamLogo from '../../assets/stream.png';

import type { StreamChatGenerics } from '../../types';


const MessagingChannelListHeader = () => {
  const { client } = useChatContext<StreamChatGenerics>();

  const user = client.user as any;
  const userDisplayName = `${user.name} (${user.type})`
  return (
    <div className="messaging__channel-list">
      <div className="messaging__channel-list__header">
        <Avatar image={user.image || streamLogo} name={userDisplayName} size={40} />
        <div className="messaging__channel-list__header__name">{userDisplayName}</div>
      </div>
    </div>
  );
};

export default React.memo(MessagingChannelListHeader);
