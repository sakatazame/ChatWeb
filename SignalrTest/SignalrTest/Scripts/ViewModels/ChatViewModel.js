/// <reference path="../typings/knockout/knockout.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/signalr/signalr.d.ts" />
/**
 * Chat機能を提供するViewModelです
 */
var ChatViewModel = (function () {
    //public _Hub: HubProxy = null;
    function ChatViewModel() {
        var _this = this;
        /**
         * メッセージ一覧を格納します。
         */
        this.ChatMessages = ko.observableArray([]);
        /**
         * ユーザのインプットメッセージです。
         */
        this.InputMessage = ko.observable("");
        /**
         * SingalRの接続状況のメッセージです。
         */
        this.SingalRConnectStateMsg = ko.observable("SingalR未接続");
        // SignalR Hub
        this._Hub = null;
        this._Hub = $.connection.hub.createHubProxy('ChatHub');
        // チャットメッセージ配信を購読
        this._Hub.on('SubscribeChatAdd', function (msg) {
            _this.ChatMessages.push(msg);
            _this.InputMessage("");
        });
        // 接続待機
        $.connection.hub.start().done(function () {
            _this.SingalRConnectStateMsg("SingalR接続済み");
        });
    }
    /**
    * ViewModelのバインドを開始します。
    */
    ChatViewModel.StartBinding = function (elementName) {
        var _vm = new ChatViewModel();
        ko.applyBindings(_vm, $(elementName)[0]);
    };
    /**
     * メッセージの投稿を実行します。
     */
    ChatViewModel.prototype.PostMessage = function () {
        var self = this;
        $.ajax({
            type: "POST",
            url: "/api/v1/chat",
            contentType: "application/json",
            data: JSON.stringify(self.InputMessage()),
            success: function () { }
        });
    };
    return ChatViewModel;
}());
//# sourceMappingURL=ChatViewModel.js.map