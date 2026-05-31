<p align="center">
  <a href="#"><img src="https://i.imgur.com/HtO7VKw.png"></a>
</p>

---

<p align="center">
	<a href="https://github.com/developerman9876/Comet.PC/releases/"><img src="https://img.shields.io/github/v/release/developerman9876/Comet.PC?label=version&style=for-the-badge"></a>
	<a href="https://discord.gg/moonymenu"><img src="https://img.shields.io/discord/1501983782125965413?label=discord&style=for-the-badge&color=blueviolet"></a>
</p>

---

# 🖥️ Comet PC (credit to cc!)
**Comet PC** is a fork of [ii's Quest Menu](https://github.com/iiDk-the-actual/iis.Quest.Menu) to Animal Company, letting it run on PC Animal Company.
This mod utilizes a modified version of **[vfsfitvnm/frida-il2cpp-bridge](https://github.com/vfsfitvnm/frida-il2cpp-bridge)** to communicate with **Animal Company**.
You may use this mod for any purposes you desire **as long as it falls under the MIT license**. Feel free to modify it, add or remove mods, or even [port it to other games](https://drive.iidk.online/funny/steal%20a%20brainrot.mp4).

> [!CAUTION]
>
> this doesnt use root so no need to worry about this
> 
> The exploit used to obtain root access has been **patched** in versions post V79. **Most headsets** will be able to run the exploit fine (as of 8/30/2025), but some may encounter issues or bugs. **I am not responsible for any issues or diminished performance resulting from the use of this mod with VR headsets.**
> If not following the tutorial correctly, or by writing to improper directories, you may risk bricking your headset. Know what you're doing before trying this.

## 📥 How to Use ([Video Tutorial](https://www.youtube.com/watch?v=YhiYD-SWrOo))

# well actually im too lazy to make a tutorial so dont listen to this

1. Run the [root exploit](https://drive.iidk.online/src/Quest3-Root).
2. Run the Frida server `./data/local/tmp/frida-server &` (If doing on standalone only, Termux > `su`, `cd`, the command).
3. Run the following commands: `adb tcpip 5000` `adb connect 192.168.[local ip address]:5000` `pip install frida`
4. Find Frida's FOLDER and make it an environment variable (mine was C:\Users\Grayson\AppData\Local\Programs\Python\Python313\Scripts\)
5. Run the batch script and go willy nilly in whatilly game you desilly
