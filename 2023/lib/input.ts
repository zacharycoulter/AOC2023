export const getInput = async (day: number): Promise<string> => {
    const inputFilePath = `./inputs/${day.toString().padStart(2, '0')}.txt`;
    const file = Bun.file(inputFilePath);
    if (await file.exists()) {
        return file.text();
    }
    const text = await fetch(`https://adventofcode.com/2023/day/${day}/input`, {
        headers: {
            cookie: `session=${process.env.SESSION_TOKEN}`
        }
    }).then((res: Response): Promise<string> => res.text());
    await Bun.write(inputFilePath, text);
    return text
}
