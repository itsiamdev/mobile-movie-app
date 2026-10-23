# Run in the Android emulator

In PowerShell, run the following commands from the project folder to configure the Android SDK, start the emulator, and open the app:

```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:Path = "$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:Path"

Start-Process "$env:ANDROID_HOME\emulator\emulator.exe" -ArgumentList "-avd", "Medium_Phone_API_37.0"
adb wait-for-device
npm run android
```

# Run on the web

```sh
npm run web
```
