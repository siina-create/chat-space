require 'rails_helper'
describe MessagesController do
  #ログインするためのメソッド作成
  def login(user)
    @request.env["devise.mapping"] = Devise.mappings[:user]
    sign_in user
  end
  #  letを利用してテスト中使用するインスタンスを定義
  let(:group) { create(:group) }
  let(:user) { create(:user) }
  let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }


  describe "#index" do
    
    # ログインしている時
    context 'log in' do
      
      #ログイン状態にする
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it "assigns @message" do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it "assigns @group" do
        expect(assigns(:group)).to eq group
      end
    
      it "renders index" do
        expect(response).to render_template :index
      end

      context 'messege can save' do
        #この中にメッセージの保存に成功した場合のテストを記述
        #subjectでcreateアクションをリクエストするように定義
        subject {
          post :create,
          params: params
        }
        it 'count up message' do
          #messageの投稿によってメッセージ総数が１増えたことを確認
          expect{subject}.to change(Message, :count).by(1)
        end

        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))

        end
      end

      context'messege can not save' do
        # この中にメッセージの保存に失敗した場合のテストを記述
        
        # imageとbodyをnilにして保存に失敗するinvalid_paramsを定義
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil) } }
        # subjectでcreateアクションをリクエストするように定義
        subject {
          post :create,
          params: invalid_params
        }
        
        it 'does not count up' do
          #メッセージ保存されてない時メッセージの総数は変わらない
          
          # expect .not_toで〜でないこと
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index' do
          #メッセージ保存されてない時indexへリダイレクトされる
          subject
          expect(response).to render_template :index
        end
      
        
        
      end

    end

    
    
    
    #ログアウトしている時
    context 'log out' do
      # この中にログインしていない場合のテストを記述
      before do
        get :create, params: params
      end
      
      it "ユーザ作成画面へリダイレクトされる" do
        get :index, params: { group_id: group.id }
        expect(response).to redirect_to(new_user_session_path)
      end

      it 'redirects to new_user_session_path' do
        #ログインしていない時投稿するとユーザ作成画面へリダイレクトされる
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end

    end
  end
end