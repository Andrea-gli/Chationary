import React from 'react';
import Messages from './Messages';
import InfoBar from './InfoBar';
import InputBox from './InputBox';
import useSocket from './useSocket';
import API from './VocabAPI';

const Chat = ({ match }) => {
  const { name, room } = match.params;
  // console.log(match.params);
  const [messages, typeMsg, sendNewMessage, setTypingMsg] = useSocket(
    name,
    room
  );

  //console.log(setTypingMsg);
  // const [newMessage, setNewMessage] = useState('');

  return (
    <div className='chatOuterContainer'>
      <div>
        <API />
      </div>
      <div className='chatInnerContainer'>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} typeMsg={typeMsg} />
        <InputBox sendNewMessage={sendNewMessage} setTypingMsg={setTypingMsg} />
      </div>
    </div>
  );
};
export default Chat;
