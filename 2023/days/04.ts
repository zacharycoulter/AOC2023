type Scratchcard = {
    id: number,
    winningNumbers: string[],
    numbers: string[],
}

const getCards = (input: string): Scratchcard[] =>
    [...input.matchAll(/(Card\s+(\d+):\s+([\ 0-9]+)\s\|\s([\ 0-9]+))\n?/g)]
        .map(([, , id, winningNumber, numbers]: string[]): Scratchcard => ({
            id: parseInt(id),
            winningNumbers: winningNumber.replace(/\ +/g, ',').split(','),
            numbers: numbers.replace(/\ +/g, ',').split(','),
        }));

export const part1 = (input: string): number =>
    getCards(input)
        .map(({ numbers, winningNumbers }: Scratchcard): number => {
            let multiplier = 0;
            numbers
                .filter((number: string) => winningNumbers.includes(number))
                .forEach(() => multiplier = (multiplier || 0.5) * 2)
            return multiplier
        })
        .reduce((acc: number, curr: number) => acc + curr, 0)

export const part2 = (input: string): number => {
    const cards = getCards(input);
    const wins: Map<number, Scratchcard[]> = new Map<number, Scratchcard[]>();

    cards.map((card: Scratchcard) => card.numbers
        .filter((number: string) => card.winningNumbers.includes(number)).length)
        .forEach((numWon: number, cardNum: number) => {
            return wins.set(cardNum + 1, cards.slice(cardNum + 1, cardNum + numWon + 1))
        })

    let result = 0
    while (cards.length > 0) {
        result++
        const c = cards.pop()!
        cards.push(...wins.get(c.id)!)
    }
    return result
}
