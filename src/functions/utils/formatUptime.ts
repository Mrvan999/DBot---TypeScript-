export function formatUptime(ms: number) {
    const totalMinutes = Math.floor(ms / 1000 / 60);

    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    return `${days}D, ${hours}H, ${minutes}M`;
}
