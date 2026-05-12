/**
 * Detects WebGL support in the current browser.
 * Used to provide graceful fallbacks when 3D Canvas cannot render.
 */
export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return gl !== null;
  } catch {
    return false;
  }
}

/**
 * Rough GPU tier detection based on renderer string.
 * Returns "low", "mid", or "high".
 */
export function getGPUTier(): "low" | "mid" | "high" {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return "low";

    const debugInfo = (gl as WebGLRenderingContext).getExtension(
      "WEBGL_debug_renderer_info",
    );
    if (!debugInfo) return "mid";

    const renderer =
      (gl as WebGLRenderingContext)
        .getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        ?.toString()
        .toLowerCase() || "";

    // Known low-end indicators
    const lowEnd = [
      "mali-4",
      "mali-t",
      "adreno 3",
      "adreno 4",
      "powervr",
      "intel hd 4",
      "intel hd 5",
      "swiftshader",
      "llvmpipe",
    ];
    if (lowEnd.some((marker) => renderer.includes(marker))) return "low";

    // Known high-end indicators
    const highEnd = [
      "rtx",
      "radeon rx",
      "geforce gtx 10",
      "geforce gtx 16",
      "geforce rtx",
      "apple gpu",
      "adreno 7",
      "mali-g7",
    ];
    if (highEnd.some((marker) => renderer.includes(marker))) return "high";

    return "mid";
  } catch {
    return "mid";
  }
}
