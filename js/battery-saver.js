// Mode économie de batterie : la position est relevée moins souvent quand la batterie baisse.
export function gpsInterval({ level, charging }) {
  if (charging || level > 0.5) {
    return 10;
  }
  if (level > 0.2) {
    return 30;
  }
  return 60;
}

export async function trackPosition(nav, onPosition) {
  const battery = (await nav.getBattery?.()) ?? { level: 1, charging: true };
  let timer;

  const schedule = () => {
    clearInterval(timer);
    const seconds = gpsInterval(battery);
    timer = setInterval(() => {
      nav.geolocation.getCurrentPosition(onPosition, () => {}, { maximumAge: seconds * 1000 });
    }, seconds * 1000);
  };

  battery.addEventListener?.("levelchange", schedule);
  battery.addEventListener?.("chargingchange", schedule);
  schedule();
  return () => clearInterval(timer);
}
