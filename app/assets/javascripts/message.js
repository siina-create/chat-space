$(function(){
  function buildPost(post){
    image = (post.image) ? `<img class="message__image" src=${post.image}>`:"";
    
    var html = `<div class="main-chat-all">
                  <div class="main-chat-all__name">
                    ${post.name}
                    <div class="main-chat-all__time">
                      ${post.created_at}
                    </div>
                  </div>
                  <div class="main-chat-all__letter">
                    <p class="lower-message__content"></p>
                      ${post.text}
                  </div>
                    ${image}
                </div>`
    
    return html;
    
  }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    $.ajax({//ajaxで送るデータを指定
      url: url,//404エラーが出たらここの指定が間違っている
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,//データの整形をOFFにする　formdataで取っている場合はこの２つを書くjqueryはデータを自動で整形する機能があるが
      contentType: false//formdataで送る場合は既に整形済みのため
    })
    .done(function(post){
      var html = buildPost(post);
      $('.main-chat').append(html);
      $('.main-chat').animate({ scrollTop: $('.main-chat')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.input-send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
})