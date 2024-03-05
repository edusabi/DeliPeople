var socket = io("https://delipeoplee.discloud.app");

function renderMessage(message){
    $(".messages").append('<div class="message"><strong>'+ message.author +'</strong>: '+ message.message +'</div>')
}

socket.on("previousMessage", function(messages){
    for(message of messages){
        renderMessage(message)
    }
})

socket.on("receivedMessage", function(message){
    renderMessage(message)
})


$("#chat").submit(function(event){
    event.preventDefault()

    var author = $("input[name=username]").val()
    var message = $("input[name=message]").val()

    var id = $("input[name=message-chat-user-id]").val()
    
    if(author.length && message.length){
        var messageObj = {
            author,
            message,
        };

        $(`#message-room-${id}`).val("");
        
        renderMessage(messageObj)

        atualizarScroll(id);
        
        
        socket.emit("sendMessage", messageObj)
    }
})

function atualizarScroll(id) {
    var $messagesBox = $(`#messageBox-${id}`);
    $messagesBox.scrollTop($messagesBox[0].scrollHeight - $messagesBox.height());
};