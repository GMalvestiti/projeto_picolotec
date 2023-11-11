"use server";

export async function loadScript(position: HTMLElement | null) {
  if (!position) {
    return;
  }
  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  const src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", "google-maps");
  script.src = src;
  position.appendChild(script);
}
