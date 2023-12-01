const getSumOfFirstLast = async (part: 1 | 2): Promise<number> => {
    const addDigitToNumWords = (lines: string[]): string[] => {
        const numWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        return lines.map((line: string): string => numWords.reduce((acc: string, word: string, index: number): string => acc.replaceAll(word, word + (index + 1) + word), line))
    }
    const getSumOfLines = (lines: string[]): number => lines
        .map((line: string): string[] => line.match(/\d/g) ?? [])
        .reduce((acc: number, nums: string[]): number => acc += parseInt(nums[0] + nums[nums.length - 1]), 0)

    return fetch(`https://adventofcode.com/2023/day/1/input`, {
        headers: {
            cookie: `session=${process.env.SESSION_TOKEN}`
        }
    })
        .then((res: Response): Promise<string> => res.text())
        .then((text: string): string[] => text.split('\n').filter((line: string): boolean => line.length > 0))
        .then((lines: string[]): string[] => part === 1 ? lines : addDigitalToNumWords(lines))
        .then(getSumOfLines)
}

Promise
    .all([getSumOfFirstLast(1), getSumOfFirstLast(2)])
    .then(console.log)
