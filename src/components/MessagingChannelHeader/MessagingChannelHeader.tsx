import React  from 'react';
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import { TypingIndicator } from '../TypingIndicator/TypingIndicator';
import { HamburgerIcon } from '../../assets';
import { AvatarGroup } from '../';

import type { StreamChatGenerics } from '../../types';

type Props = {
  toggleMobile: () => void;
};

const MessagingChannelHeader = (props: Props) => {
  const { toggleMobile } = props;
  const { client } = useChatContext<StreamChatGenerics>();
  const { channel } = useChannelStateContext<StreamChatGenerics>();

  const members = Object.values(channel.state.members || {})
    .filter((member) => member.user?.id !== client?.user?.id)

  const title = members
    .map(member => member.user?.name)
    .join(',')

  return (
    <div className='messaging__channel-header'>
      <div id='mobile-nav-icon' onClick={() => toggleMobile()}>
        <HamburgerIcon />
      </div>
      <AvatarGroup members={members} />
      <div className='channel-header__name'>{title}</div>
      <div className='messaging__channel-header__right'>
        <TypingIndicator />
      </div>
    </div>
  );
};

export default React.memo(MessagingChannelHeader);
