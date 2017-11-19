/// <reference path="../typings/knockout/knockout.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/signalr/signalr.d.ts" />

/**
 * Chat機能を提供するViewModelです
 */
class ChatViewModel {

    /**
    * ViewModelのバインドを開始します。
    */
    public static StartBinding(elementName: string): void {
        var _vm = new ChatViewModel();
        ko.applyBindings(_vm, $(elementName)[0]);
    }

    /**
     * メッセージ一覧を格納します。
     */
    public ChatMessages: KnockoutObservableArray<string> = ko.observableArray([]);
    /**
     * ユーザのインプットメッセージです。
     */
    public InputMessage: KnockoutObservable<string> = ko.observable("");
    /**
     * SingalRの接続状況のメッセージです。
     */
    public SingalRConnectStateMsg: KnockoutObservable<string> = ko.observable("SingalR未接続");

    // SignalR Hub
    public _Hub: HubProxy = null;
    //public _Hub: HubProxy = null;

    constructor() {
        this._Hub = $.connection.hub.createHubProxy('ChatHub');

        // チャットメッセージ配信を購読
        this._Hub.on('SubscribeChatAdd', (msg) => {
            this.ChatMessages.push(msg);
            this.InputMessage("");
        });

        // 接続待機
        $.connection.hub.start().done(() => {
            this.SingalRConnectStateMsg("SingalR接続済み");
        });
    }

    /**
     * メッセージの投稿を実行します。
     */
    public PostMessage(): void {
        var self = this;
        $.ajax({
            type: "POST",
            url: "/api/v1/chat",
            contentType: "application/json",
            data: JSON.stringify(self.InputMessage()),
            success: function () { }
        });
    }
}