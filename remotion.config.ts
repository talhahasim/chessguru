import { Config } from "@remotion/cli/config";

Config.setEntryPoint("./src/index.ts");
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setOverwriteOutput(true);
// yuv420p + BT.709: plays everywhere (the default yuvj420p is not shown by iPhone Photos/Files).
Config.setPixelFormat("yuv420p");
Config.setColorSpace("bt709");
// Use the system Chromium when one is configured (e.g. CI containers without network access to download Chrome).
if (process.env.REMOTION_BROWSER_EXECUTABLE) Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
