export const getInput = async (day: number): Promise<string> => {
    const inputFilePath = `./inputs/${day.toString().padStart(2, '0')}.txt`;
    const file = Bun.file(inputFilePath);

    if (await file.exists()) return file.text();
    return fetch(`https://adventofcode.com/2023/day/${day}/input`, {
        headers: {
            'User-Agent': 'github.com/zacharycoulter/advent-of-code',
            'Cookie': `session=${process.env.SESSION_TOKEN}`
        }
    })
        .then((res: Response): Promise<string> => res.text())
        .then((text: string): string => {
            Bun.write(inputFilePath, text)
            return text;
        })
}
