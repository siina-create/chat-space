$(function(){
  function addUser(user){//該当のユーザがいた時
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>
    `
    ;
    $("#user-search-result").append(html);
  }

  function addNoUser(user){//該当のユーザがいない時
    var html = `
    <div class="chat-group-user clearfix">
     <p class="chat-group-user__name">ユーザーが見つかりません</p>
    </div>`
    ;
    $("#user-search-result").append(html);
  }

  function addDeleteUser(name, id) {//検索欄で選んだユーザをチャットメンバーリストに加える
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }

  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

  $('#user-search-field').on("keyup", function(){
    let input = $("#user-search-field").val();    //フォームの値を取得して変数に代入する
    
    $.ajax({
      type:"GET",    //HTTPメソッド
      url: "/users",       //users_controllerの、indexアクションにリクエストの送信先を設定する
      dataType: 'json',
      data: { keyword: input },   //テキストフィールドに入力された文字を設定する
    })
      .done(function(users) {//検索に成功
        //emptyメソッドで一度検索結果を空にする
        $("#user-search-result").empty();

        //usersが空かどうかで条件分岐
        if (users.length !== 0) {//usersが空では無い＝検索に該当するユーザあり
          users.forEach(function(user) {//該当するユーザを順番に表示
            addUser(user);
          });
        } else if (input.length == 0) {//入力フォームが空の時
          return false;
        } else {//検索に該当するユーザ無し
          addNoUser();
        }
      })
      .fail(function() {//検索に失敗
        alert("通信エラーです。ユーザーが表示できません。");
      });

      
  });
  $(document).on('click', '.chat-group-user__btn--add', function(){
    console.log
    //イベントが起きたところ（削除ボタンが押されたところ）のユーザ名とidを定義
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()//追加ボタンが押されたところの親要素を指定
      .remove();//検索欄から消す

    addDeleteUser(userName, userId);
    addMember(userId);
    });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()//親要素の指定
      .remove();//検索欄から消す

  });
  
});