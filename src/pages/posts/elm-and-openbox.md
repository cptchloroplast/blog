---
layout: ../../layouts/PostLayout.astro
title: Elm and Openbox
published: 2022-03-18
tags: hardware
draft: true
---

I was recently having some performance issues with my laptop where it would freeze up and become non responsive under load. Sometimes I could wait a few minutes and the system would jump a little bit before I regained control, but more often than not I would need to do a hard reboot. I use this machine to SSH into my workstation for some light development[^1] and web browsing. Here are the specs for those whom may be interested:

[^1]: Like working on this blog!

|                |                                                                                |
| -------------- | ------------------------------------------------------------------------------ |
| **Hostname**   | elm.okkema.org                                                                 |
| **Model**      | Acer Aspire One Cloudbook (AO1-131-C3AL)                                       |
| **Processor**  | Intel Celeron N3050 @ 1.60-2.16GHz                                             |
| **Graphics**   | Intel HD Graphics @ 320-600MHz                                                 |
| **Memory**     | 2GB DDR3L @ 1600MHz SDRAM                                                      |
| **Storage**    | 32GB eMMC                                                                      |
| **Display**    | 11.6" 16:9 1366x768 HD LCD                                                     |
| **Battery**    | 4350 mAh 2-cell Li-Polymer                                                     |
| **Networking** | Intel Dual Band Wireless-AC 3160, Bluetooth 4.0                                |
| **Ports**      | USB 3.0 (x1), USB 2.0 (x1), HDMI (x1), SD Reader, 3.5mm headphone + microphone |
| **Media**      | VGA 640x480 webcam, stereo speakers                                            |

I figured that this was a good opportunity for a full wipe and minimal reinstall to try to squeeze a little extra juice out of this machine. Previously, I had been running Debian "buster" with MATE and I wanted to keep my new setup as close to this as possible while reducing the footprint that comes with running a full DE.

After installing "bullseye"[^2] and logging in, first thing to do is connect to our Wi-Fi. 

[^2]: [11.2](https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/11.2.0+nonfree/amd64/iso-cd/) with non-free firmware so that the Wi-Fi works.

```bash
# TODO: add wifi steps
```

Next we can install [X](https://www.x.org/wiki/) and [Openbox](http://openbox.org/wiki/Main_Page), and load up the desktop.

```bash
apt install xorg openbox openbox-menu obconf
startx
```

This is a good start but a little too minimal, all we have is a black screen! Let's go ahead and add panel to manage our open windows and display some widgets. There are a lot of options but I decided on [tint2](https://gitlab.com/o9000/tint2) since it is light on resources and suited my needs. 

Right clicking on the desktop will display the menu where we can open up a terminal. Let's install our panel and configure Openbox to start it when our desktop loads.

```bash
apt install tint2
echo "tint2 &" >> ~/.config/openbox/autostart
tint2 &
```

tint2 can be configured through its built in GUI[^3] or by editing the config file located at `~/.config/tint2/tint2rc`

[^3]: `Applications > Settings > Tint2 Settings` from the menu.

One useful widget that we're missing is the [NetworkManager](https://wiki.gnome.org/Projects/NetworkManager). We could continue connecting to Wi-Fi using using `wpa-supplicant` and `dhclient`, but this isn't very convenient, especially when out and about. Let's go ahead and install this. No additional config is necessary to add it to our panel.

```bash
apt install network-manager network-manager-gnome
```