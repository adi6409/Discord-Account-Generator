export const calculateUptime = (time: number) => {
    let totalSeconds = (time / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);

    return totalSeconds > 60 ? `${days > 0 ? days + 'd' : ''} ${hours > 0 ? hours + 'h' : ''} ${minutes > 0 ? minutes + 'm' : ''}` : 'Bot started.';
}