export const calculateUptime = (time: number) => {
    let totalSeconds = (time / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);

    return `${days}d ${hours}h ${minutes}m`;
}