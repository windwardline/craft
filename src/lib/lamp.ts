export type LampMode = "day" | "night" | "system";

const KEY = "loft-lamp";

/* Runs blocking in <head> so a stored choice paints before first frame. */
export const LAMP_SNIPPET = `(function(){try{var v=localStorage.getItem(${JSON.stringify(
  KEY,
)});if(v==="day"||v==="night"){document.documentElement.dataset.lamp=v}}catch(e){}})()`;

export function getLamp(): LampMode {
  try {
    const v = localStorage.getItem(KEY);
    return v === "day" || v === "night" ? v : "system";
  } catch {
    return "system";
  }
}

export function setLamp(mode: LampMode): void {
  const root = document.documentElement;
  try {
    if (mode === "system") {
      localStorage.removeItem(KEY);
      delete root.dataset.lamp;
    } else {
      localStorage.setItem(KEY, mode);
      root.dataset.lamp = mode;
    }
  } catch {
    if (mode === "system") delete root.dataset.lamp;
    else root.dataset.lamp = mode;
  }
  window.dispatchEvent(new Event("loft-lamp"));
}

/* The lamp is external state; components read it via useSyncExternalStore. */
export function subscribeLamp(onChange: () => void): () => void {
  window.addEventListener("loft-lamp", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("loft-lamp", onChange);
    window.removeEventListener("storage", onChange);
  };
}
