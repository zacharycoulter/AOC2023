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
const findWholeNumber = (snippet: string, line: string) => {
    snippet = snippet.replace(/(\D)/g, '\\$1')
    if (/\d\D\d/.test(snippet)) return 1

    let expression = '';
    if (isNumber(snippet[0]) && isNumber(snippet[snippet.length - 1]) && snippet.includes('*')) expression = `([0-9]+)?${snippet}`
    else if (isNumber(snippet[0]) && isNumber(snippet[snippet.length - 1])) expression = `([0-9]+)?${snippet}([0-9]+)?`
    else if (isNumber(snippet[0])) expression = `([0-9]+)?${snippet}`
    else expression = `${snippet}([0-9]+)?`
    const [, found] = new RegExp(expression).exec(line) as string[]

    let number = /([0-9]+)/.exec(snippet)?.[0]
    if (!number) return 1
    if (!found) return parseInt(number)
    return parseInt(isNumber(snippet[0]) ? number = `${found}${number}` : `${number}${found}`)
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
    let sum = 0;

    const lines = input
        .split('\n')
        .filter((line: string) => !!line)

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex]
        const prevLine = lines[lineIndex - 1]
        const nextLine = lines[lineIndex + 1]

        console.log([prevLine, line, nextLine])

        for (let charIndex = 0; charIndex < line.length; charIndex++) {
            const char = lines[lineIndex][charIndex];

            if (char === '*') {
                const start = Math.max(0, charIndex - 3)
                const end = Math.min(line.length, charIndex + 4)
                const upperText = prevLine?.slice(start, end)
                const middleText = line.slice(start, end)
                const lowerText = nextLine?.slice(start, end)

                const countOfNumbers = `${upperText}.${middleText}.${lowerText}`.match(/(\d+)/g)?.length ?? 0
                if (countOfNumbers === 2) {
                    console.log(upperText, middleText, lowerText)
                    console.log([
                        findWholeNumber(upperText, prevLine),
                        findWholeNumber(middleText, line),
                        findWholeNumber(lowerText, nextLine)
                    ])
                    sum +=
                        findWholeNumber(upperText, prevLine) *
                        findWholeNumber(middleText, line) *
                        findWholeNumber(lowerText, nextLine)
                }
            }
        }
        console.log('\n\n')
    }
    return sum
}
