using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure;
using Azure.Communication;
using Azure.Communication.Administration;
using Azure.Communication.Administration.Models;

namespace ThoughtStuff.AzureCommsServices
{
    public static class getUSerToken
    {
       

        

        [FunctionName("getUserToken")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
           string code = req.Query["entryCode"];
            string correctCode = Environment.GetEnvironmentVariable("EntryCode");
            if (correctCode != null && code.ToLower() == correctCode.ToLower())
            {

             CommunicationIdentityClient _client = new CommunicationIdentityClient(Environment.GetEnvironmentVariable("ACS_Connection_String"));

                Response<CommunicationUser> userResponse = await _client.CreateUserAsync();
                CommunicationUser user = userResponse.Value;
                Response<CommunicationUserToken> tokenResponse =
                    await _client.IssueTokenAsync(user, scopes: new[] { CommunicationTokenScope.VoIP });
                string token = tokenResponse.Value.Token;
                DateTimeOffset expiresOn = tokenResponse.Value.ExpiresOn;
                return new OkObjectResult(tokenResponse);
            }
            else
            {
                Random rnd = new Random();
                System.Threading.Thread.Sleep(rnd.Next(500,5000));
                return new UnauthorizedResult();
            }
            
            
        }
    }
}
