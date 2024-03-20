#r "nuget: Newtonsoft.Json"

open Newtonsoft.Json;
open System.Net.Http;
open System.Text;


var o = new Ldm()
{
    MyName = "myHero"
};


var json = JsonConvert.SerializeObject(o,
    new JsonSerializerSettings
    {
        // ContractResolver = CustomJsonNetDataContractResolver.Instance,
        //NullValueHandling = NullValueHandling.Ignore,
        //MissingMemberHandling = MissingMemberHandling.Ignore,
        //Formatting = Formatting.Indented,
    });

var o = new Ldm()
{
    MyName = "myHero"
};