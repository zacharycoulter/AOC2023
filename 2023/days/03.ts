const isNumber = (char: string): boolean => /[0-9]/.test(char);
const containsSymbol = (str: string): boolean => str ? /([^.\d]+)/.test(str) : false;
const findNumbers = (line: string): { number: number; start: number; end: number }[] => {
    const numbers: { number: number; start: number; end: number }[] = []
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
        if (!isNumber(line[charIndex])) continue
        const [, number] = /([0-9]+)/.exec(line.slice(charIndex)) as string[]
        const start = Math.max(0, charIndex - 1)
        const end = Math.min(line.length, charIndex + number.length + 1)
        numbers.push({ number: parseInt(number), start, end })
        charIndex += number.length - 1
    }
    return numbers
}

export const part1 = (input: string): number => {
    let sum = 0;

    const lines = input
        .split('\n')
        .filter((line: string) => !!line)

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++)
        for (const { number, start, end } of findNumbers(lines[lineIndex]))
            if (
                containsSymbol(lines[lineIndex - 1]?.slice(start, end)) ||
                containsSymbol(lines[lineIndex]?.slice(start, end)) ||
                containsSymbol(lines[lineIndex + 1]?.slice(start, end))
            )
                sum += number

    return sum
}

export const part2 = (input: string): number => {
    const lineLength = input.indexOf('\n')
    let sum = 0;

    let index = 0;
    while ((index = input.indexOf('*', index + 1)) > 0) {
        const surrounding = [
            [
                index - (lineLength + 2),
                index - (lineLength + 1),
                index - lineLength
            ],
            [
                index - 1,
                index,
                index + 1
            ],
            [
                index + lineLength,
                index + (lineLength + 1),
                index + (lineLength + 2)
            ]
        ].map(row => row
            .map((index) => {
                let backwardsIndex = index, forwardIndex = index;
                while (isNumber(input[backwardsIndex])) backwardsIndex--
                while (isNumber(input[forwardIndex])) forwardIndex++
                const number = parseInt(input.slice(backwardsIndex + 1, forwardIndex))
                return number
            })
            .filter((value, index, array) => array[index - 1] !== value)
            .filter((value) => !isNaN(value))
        ).flat()

        if (surrounding.length === 2)
            sum += surrounding[0] * surrounding[1]

    }
    return sum
}
