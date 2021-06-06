---
layout: post
title: "Forays into 3D printing"
date: 2021-06-06 04:20:00
tags:
- 3dprinting
---

- Creality firmware doesn't save settings to EEPROM, uses SD card & don't document this anywhere, so you'll need to keep one in or flash a new custom firmware.

Octoprint
=========
I used this guide here, but I opted to use a different case for the PI so I could side mount it and not have to run the camera cable underneath the printer.
- https://howchoo.com/g/ntg5yzg1odk/using-octoprint-with-the-creality-ender-3-3d-printer
- Raspberry PI case https://www.thingiverse.com/thing:3967425
- need to tape over 5v USB pin as sending power to the printer does weird stuff
- make sure micro USB cable has data sync support, not just 5v/gnd
- Creality firmware sends doubled temperatures - need a octopi plugin to fix it https://community.octoprint.org/t/octoprint-doesnt-show-a-temperature-graph-for-my-creality-printer-with-stock-firmware/23901#double

Fire-safety
===========
- Add a fan shroud so that filament doesn't get into the mainboard fan https://www.thingiverse.com/thing:2935204
- Upgrade the PSU if you want - here's a guide to switch to a quieter and more reliable MeanWell PSU - https://howchoo.com/ender3/ender-3-meanwell-psu-upgrade
- Update the firmware to ensure you've got thermal runaway protection
- Get a smart plug to provide a direct power cutoff in case the printer PSU or mainboard has a failure.
  - I used a hue switch like this https://www.amazon.com/dp/B07XD578LD?psc=1&ref=ppx_yo2_dt_b_product_details
- Install octoprint 'Temperature Failsafe' plugin
  - Use a shell command in the plugin settings to the smart plug to disable the power if the temperature goes over what you expect
  ```curl -X PUT -d '{"on":false}' http://192.168.0.4/api/<hue-api-user-id>/lights/<switch-id>/state```


Improve printing
================
- Auto bed leveller https://www.amazon.com/dp/B08MD45N9H?psc=1&ref=ppx_yo2_dt_b_product_details.
- you'll have to update the firmware for this, but it makes it much simpler on each print
- 4.2.2 boards don't need 27pin adapter - just wire directly
- Get a glass bed for better adhesion https://www.amazon.com/dp/B07RD6D2ZQ?psc=1&ref=ppx_yo2_dt_b_product_details. I use it upside down as the non-coated side sticks better in my experience
- Move the spindle to the side for a better filament path. I used this bracket https://www.thingiverse.com/thing:4849506.
- Better springs for a longer lasting level https://www.amazon.com/uxcell-Heated-Springs-Printer-Compression/dp/B07XCVSJHS

Cura G-Code settings
====================

Start g-code
```
; Ender 3 Custom Start G-code
M140 S{material_bed_temperature_layer_0} ; Set Heat Bed temperature
M190 S{material_bed_temperature_layer_0} ; Wait for Heat Bed temperature
M104 S160; start warming extruder to 160
G28 ; Home all axes
G29 ; Auto bed-level (BL-Touch)
G92 E0 ; Reset Extruder
M104 S{material_print_temperature_layer_0} ; Set Extruder temperature
G1 X0.1 Y20 Z0.3 F5000.0 ; Move to start position
M109 S{material_print_temperature_layer_0} ; Wait for Extruder temperature
; G1 Z2.0 F3000 ; Move Z Axis up little to prevent scratching of Heat Bed
G1 X0.1 Y200.0 Z0.3 F1500.0 E15 ; Draw the first line
G1 X0.4 Y200.0 Z0.3 F5000.0 ; Move to side a little
G1 X0.4 Y20 Z0.3 F1500.0 E30 ; Draw the second line
G92 E0 ; Reset Extruder
G1 Z2.0 F3000 ; Move Z Axis up little to prevent scratching of Heat Bed
; End of custom start GCode
```

End g-code
```
G91 ;Relative positioning
G1 E-2 F2700 ;Retract a bit
G1 E-2 Z0.2 F2400 ;Retract and raise Z
G1 X5 Y5 F3000 ;Wipe out
G1 Z10 ;Raise Z more
G90 ;Absolute positioning

G1 X0 Y{machine_depth} ;Present print
M106 S0 ;Turn-off fan
M104 S0 ;Turn-off hotend
M140 S0 ;Turn-off bed

M84 X Y E ;Disable all steppers but Z
```
