type Game = { id: number; results: { color: string; value: number; }[] }

const parseGameResults = (input: string): Game[] =>
    [...input.matchAll(/Game\s(\d+):(.*)\n/g)]
        .map(([, id, results]: string[]): Game => ({
            id: parseInt(id),
            results: [...results.matchAll(/(?:(\d+)\s(\S+))(?:$|,|;)+/g)]
                .map(([, value, color]: string[]) => ({ color, value: parseInt(value) }))
        }))


export const part1 = (input: string): number => {
    let sum = 0;
    for (const { id, results } of parseGameResults(input)) {
        let topResults: { [key: string]: number } = { blue: 0, red: 0, green: 0 };
        for (const { color, value } of results) if (topResults[color] < value) topResults[color] = value
        if (topResults.red > 12 || topResults.green > 13 || topResults.blue > 14) continue;
        sum += id
    }
    return sum
}

export const part2 = (input: string): number => {
    let sum = 0;
    for (const { results } of parseGameResults(input)) {
        let topResults: { [key: string]: number } = { blue: 0, red: 0, green: 0 };
        for (const { color, value } of results) if (topResults[color] < value) topResults[color] = value
        sum += topResults.red * topResults.green * topResults.blue
    }
    return sum
}
