﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace SignalrTest
{
    [HubName("ChatHub")]
    public class ChatHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }


    }
}