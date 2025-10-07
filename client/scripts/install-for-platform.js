import { execSync } from "child_process";
import os from "os";

const platform = os.platform();
const arch = os.arch();

console.log(`🔹 Installing optional deps for ${platform}-${arch}...`);

try {
  if (platform === "darwin" && arch === "arm64") {
    console.log("✅ macOS ARM: installing all optional deps");
    execSync("npm install", { stdio: "inherit" });
  } else {
    console.log("✅ Non-Mac: skipping Mac-specific optional deps");
    execSync("npm install --omit=optional", { stdio: "inherit" });
  }
} catch (err) {
  console.error("❌ Failed to install optional dependencies", err);
  process.exit(1);
}
