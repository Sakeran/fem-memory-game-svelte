export function formatTime(timeInSeconds: number): string {
  let seconds: number | string = timeInSeconds % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds.toString();

  let hours = Math.floor(timeInSeconds / 3600);

  let minutes: number | string = Math.floor((timeInSeconds % 3600) / 60) % 60;
  minutes = hours > 0 && minutes < 10 ? "0" + minutes : minutes.toString();

  return `${hours > 0 ? hours + ":" : ""}${minutes}:${seconds}`;
}

export function formatScreenReaderTime(timeInSeconds: number): string {
  let seconds: number | string = timeInSeconds % 60;

  let hours = Math.floor(timeInSeconds / 3600);

  let minutes: number | string = Math.floor((timeInSeconds % 3600) / 60) % 60;

  let res = `${minutes} minutes, ${seconds} seconds`;
  if (hours > 0) {
    res = `${hours} hours, ` + res;
  }

  return res;
}
