using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SignalrTest
{
    /// <summary>
    /// Web API コントローラー
    /// </summary>
    public class ChatV1Controller : ApiController
    {

        [Route("api/v1/chat")]
        public void Post([FromBody]string value)
        {
            var chatHub = new ChatHubHandlerller();
            chatHub.NotifyChatAdd(value);
        }


        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        //// POST api/<controller>
        //public void Post([FromBody]string value)
        //{
        //}

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}