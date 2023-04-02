function toTwoDigits(number: number): string {
    return `${number <= 9 ? "0" : ""}${number}`;
}

// yyyy-MM-dd HH:mm:ss
export function toDateTimeStr(time: number): string {
    const date = new Date(time);

    return (
        `${date.getFullYear()}-` +
        `${toTwoDigits(date.getMonth() + 1)}-` +
        `${toTwoDigits(date.getDate())} ` +
        `${toTwoDigits(date.getHours())}:` +
        `${toTwoDigits(date.getMinutes())}:` +
        `${toTwoDigits(date.getSeconds())}`
    );
}
