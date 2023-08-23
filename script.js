$(function () {
  var socket = io();
  var $input = $('#input');
  var $messages = $('#messages');
  var $form = $('#chat-form');

  $form.submit(function() {
    const message = $input.val();
    console.log('Sending message:', message);
    socket.emit('chat message', message);
    $input.val('');
    return false;
  });

  socket.on('chat message', function(msg) {
    console.log('Received message:', msg);
    $messages.append($('<li>').text(msg));
    // Scroll to the bottom of the chat window
    $messages.scrollTop($messages[0].scrollHeight);
  });
});
