export const getInput = async (day: number): Promise<string> => {
    const file = Bun.file(`./inputs/${day}.txt`);
    if (await file.exists()) {
        return file.text();
    }
    const text = await fetch(`https://adventofcode.com/2023/day/${day}/input`, {
        headers: {
            cookie: `session=${process.env.SESSION_TOKEN}`
        }
    }).then((res: Response): Promise<string> => res.text());
    await Bun.write(`./inputs/${day}.txt`, text);
    return text
}
