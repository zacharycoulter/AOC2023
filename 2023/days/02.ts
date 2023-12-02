export const part1 = (input: string): number => {
    const games = [...input.matchAll(/Game\s*?(\d*)\:\s(.*)\n/g)]

    let sum = 0;
    for (const [, id, result] of games) {
        const results = [...`${result};`.matchAll(/(\d+\s+\S+)[,;]/g)]

        let topResults: { [key: string]: number } = { blue: 0, red: 0, green: 0 };
        for (const [, result] of results) {
            const color = result.split(' ')[1]
            const value = parseInt(result.split(' ')[0])
            if (topResults[color] < value) topResults[color] = value
        }
        if (!(
            (topResults.red > 12) ||
            (topResults.green > 13) ||
            (topResults.blue > 14)
        )) {
            sum += parseInt(id)
            continue;
        }
    }

    return sum
}

export const part2 = (input: string): number => {
    const games = [...input.matchAll(/Game\s*?(\d*)\:\s(.*)\n/g)]

    let sum = 0;
    for (const [,, result] of games) {
        const results = [...`${result};`.matchAll(/(\d+\s+\S+)[,;]/g)]

        let topResults: { [key: string]: number } = { blue: 0, red: 0, green: 0 };
        for (const [, result] of results) {
            const color = result.split(' ')[1]
            const value = parseInt(result.split(' ')[0])
            if (topResults[color] < value) topResults[color] = value
        }
        sum += topResults.red * topResults.green * topResults.blue
    }
    return sum
}
