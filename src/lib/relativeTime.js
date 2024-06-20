export function TimeAgo(date) {

    const now = new Date();
    const secondsPast = Math.floor((now - date) / 1000);

    const rtf = new Intl.RelativeTimeFormat('no', { numeric: 'auto' });

    if (secondsPast < 60) {
        return rtf.format(-secondsPast, 'second');
    } else if (secondsPast < 3600) {
        const minutesPast = Math.floor(secondsPast / 60);
        return rtf.format(-minutesPast, 'minute');
    } else if (secondsPast < 86400) {
        const hoursPast = Math.floor(secondsPast / 3600);
        return rtf.format(-hoursPast, 'hour');
    } else {
        const daysPast = Math.floor(secondsPast / 86400);
        return rtf.format(-daysPast, 'day');
    }

    return null
}
