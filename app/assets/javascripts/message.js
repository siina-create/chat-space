$(function(){
  //buildMessageHTMLの共通部分をリファクタリング
  $("#name-time").load("message_name-time.html.haml");
  $("#content").load("message_content.html.haml");
  $("#image").load("message_image.html.haml")


  var buildMessageHTML = function(message) {
      //リファクタリング３項演算子
      image = (message.image) ? `<img class="lower-message__image" src=${message.image}>`:"";
      var html = `<div class="main-chat-all" data-message-id=  ${message.id} >
                    <div class="main-chat-all__name">
                      ${message.user_name}
                      <div class="main-chat-all__time">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="main-chat-all__letter">
                    <p class="lower-message__content"></p>
                      ${message.content}
                    </div>
                      ${image}
                  </div>`
                  return html;
  };


  var reloadMessages = function() {//カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.main-chat-all:last').data('message-id')//ブラウザの最新メッセージのmessag-id取得
    
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url:"api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: "GET",
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })

    .done(function(messages) {
      //if文配列messageが空の時以外に動くlength
      if(messages.length !== 0){
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $(messages).each(function(index, message){
        insertHTML = buildMessageHTML(message)//メッセージが入ったHTMLを取得
        $('.main-chat').append(insertHTML)//メッセージを追加
      })
      $('.main-chat').animate({ scrollTop: $('.main-chat')[0].scrollHeight});
      }
    })
  };


  function buildPost(post){//jbuilderのjsonをpostにした記述をする
    image = (post.image) ? `<img class="lower-message__image" src=${post.image}>`:""; 
    var html = `<div class="main-chat-all" data-message-id=  ${post.id}>
                  <div class="main-chat-all__name">
                    ${post.user_name}
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
      $('.input-send-btn').prop('disabled', false);
    });
  })
  //メッセージ画面でのみ７秒ごとに自動更新
  //now_windowは現在の画面のurl
  now_window = location.herf
  //現在の画面のurlにmessagesが含まれているかチェック
  if(document.URL.match("/messages")){
  setInterval(reloadMessages, 7000);//7秒毎にチェック
  }
})