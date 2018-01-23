---
layout: post
title: "Digital shades"
date: 2018-01-22 09:51:00
tags:
- programming
- automation
- hue
---

So of late I've been on a bit of a home automation binge. I've added a bunch of [Philips Hue bulbs](https://www2.meethue.com) around the house along with some smart switches and light sensors. While you can integrate these in with a first party Philips app, Apples HomeKit, or Google Home and configure some pretty interesting stuff including timers, [IFTTT](https://ifttt.com/) triggers, & voice control - I wanted some very specific behavior for the backlighting strip I installed in my home-office that would require some manual hacking.
![Lights on, Lights off](/assets/images/projects/lights-out.jpg)
Specifically, I wanted the strip light to switch on and off automatically based upon whether my desktop PC was powered on or asleep and since the Philips Hue accessories can be fully controlled via a JSON API, it was pretty simple to whip up a quick c# script to accomplish this. I've included the full source below, but the basic jist is that the script is set to run as a windows Startup item & listens for power events and tells the Hue Bridge to toggle the specified light based on whether the PC is powering off or waking up.

<video src="/assets/images/projects/light-toggle.mp4" style="width:100%" muted autoplay loop></video>

##### Source code
```csharp
using Microsoft.Win32;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LogoffLightsOut
{
    static class Program
    {
        // put in the IP address of your Hue bridge here
        private static readonly string HueBridge = "http://<ip_address_of_hue_bridge";

        // put in the user ID & UID of the light you want to control here
        // You can find these values by following the getting started guide here
        // https://developers.meethue.com/documentation/getting-started
        private static readonly string HueUserId = "hue_user_id";
        private static readonly string HueLightUid = "hue_light_uid";

        private static readonly HttpClient _client = new HttpClient();
        private static string _hueLightIndex;
        private static bool _exiting = false;

        [STAThread]
        static void Main()
        {
            _hueLightIndex = Task.Run(async () => await GetLightIndex()).Result;
            Console.WriteLine($"Found light at index: {_hueLightIndex}");
            Console.WriteLine("enabling light...");
            Task.Run(async () => await SetLightState(true, 4));

            SystemEvents.PowerModeChanged += SystemEvents_PowerModeChanged;
            SystemEvents.SessionEnding += SystemEvents_SessionEnding;

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            while (!_exiting)
            {
                Application.DoEvents();
                Thread.Sleep(1000);
            }
        }

        private static async void SystemEvents_SessionEnding(object sender, SessionEndingEventArgs e)
        {
            await SetLightState(false, 0);
            _exiting = true;
        }

        private static async Task<string> GetLightIndex()
        {
            var getLights = await _client.GetAsync($"{HueBridge}/api/{HueUserId}/lights");
            var response = await getLights.Content.ReadAsStringAsync();
            var parsed = JObject.Parse(response);
            var light = parsed.Properties().FirstOrDefault(p => parsed[p.Name]["uniqueid"].Value<string>() == HueLightUid);
            return light?.Name;
        }

        private static async Task SetLightState(bool on, int retries)
        {
            while (retries >= 0)
            {
                try
                {
                    var body = $"{{ "{{" }}\"on\":{(on ? "true" : "false")}}}";
                    var url = $"{HueBridge}/api/{HueUserId}/lights/{_hueLightIndex}/state";

                    Console.WriteLine($"{url} - {body}");
                    await _client.PutAsync(
                        url,
                        new StringContent(
                            body,
                            System.Text.Encoding.UTF8,
                            "application/json"
                        )
                    );
                    return;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    --retries;
                    await Task.Delay(2000);
                }
            }
        }

        private static async void SystemEvents_PowerModeChanged(object sender, PowerModeChangedEventArgs e)
        {
            Console.WriteLine("power event");
            if (e.Mode == PowerModes.Resume)
            {
                Console.WriteLine("enabling light...");
                await SetLightState(true, 4);
            }
            else if (e.Mode == PowerModes.Suspend)
            {
                Console.WriteLine("disabling light...");
                await SetLightState(false, 0);
            }
        }
    }
}
```
