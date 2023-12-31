$(function () {
  var socket = io();
  var $input = $('#input');
  var $messages = $('#messages');
  var $form = $('#chat-form');

  function getUsername() {
    let username = '';

    while (username === '' || username === null) {
      username = prompt('Please enter your username:');
    }

    return username;
  }

  const username = getUsername();

  function sendMessage(message) {
    console.log('Sending message:', message);
    socket.emit('chat message', { username, message });
  }

  function applyEmojis(message) {
    const emojis = [
      { keyword: 'hey', emoji: '👋' },
      { keyword: 'lol', emoji: '😂' },
      { keyword: 'react', emoji: '⚛️' },
      { keyword: 'like', emoji: '🤍' },
      { keyword: 'congratulations', emoji: '🎉' },
    ];

    emojis.forEach(({ keyword, emoji }) => {
      const pattern = `\\b${keyword}\\b`; // Use word boundary to match whole words
      const regex = new RegExp(pattern, 'gi');
      message = message.replace(regex, emoji);
    });

    return message;
  }

  $form.submit(function(e) {
    e.preventDefault(); // Prevent the form from submitting
    const message = $input.val().trim(); // Trim whitespace from the message
    const finalMessage = applyEmojis(message);

    sendMessage(finalMessage);
    $input.val('');
  });

  socket.on('chat message', function(msg) {
    console.log('Received message:', msg);
    const { username, message } = msg;
    $messages.append($('<li>').text(`${username}: ${message}`));
    // Scroll to the bottom of the chat window
    $messages.scrollTop($messages[0].scrollHeight);
  });
});
