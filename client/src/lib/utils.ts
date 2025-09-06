import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function smoothScrollTo(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

export function downloadResume() {
  // Resume PDF is now in the public folder
  const link = document.createElement("a");
  link.href = "/Hanzla_Nawaz_Resume.pdf";
  link.download = "Hanzla_Nawaz_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
