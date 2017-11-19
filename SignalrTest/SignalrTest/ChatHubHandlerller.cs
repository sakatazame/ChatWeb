using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SignalrTest
{
    /// <summary>
    /// Hubのラッパークラス
    /// </summary>
    /// <remarks>Hubを使ってチャットに新規メッセージが追加された事をクライアントに送信します。</remarks>
    public class ChatHubHandlerller
    {
        /// <summary>
        /// クライアントに新規投稿メッセージを通知します。
        /// </summary>
        /// <param name="msg">新規投稿メッセージ</param>
        public void NotifyChatAdd(string msg)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            context.Clients.All.SubscribeChatAdd(msg.Replace("\n", "<br />")); // とりあえず、改行だけ置換
        }
    }
}