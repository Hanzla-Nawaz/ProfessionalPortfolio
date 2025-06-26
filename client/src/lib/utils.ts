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
  // In production, this would link to the actual resume PDF
  const link = document.createElement("a");
  link.href = "/assets/Hanzla_Nawaz_Resume.pdf";
  link.download = "Hanzla_Nawaz_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
