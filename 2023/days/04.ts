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

// export const part2 = (input: string): number => {
//     const cards = lines.map(parseLine)
//
//     // fill a cache of the cards that are won by each card
//     const cardWinCache = new Map<number, Card[]>()
//     cards.map(countWins).forEach((numWon, cardNum) => cardWinCache.set(cardNum, cards.slice(cardNum + 1, cardNum + numWon + 1)))
//     let result = 0
//     while (cards.length > 0) {
//         result++
//         const c = cards.pop()!
//         cards.push(...cardWinCache.get(c.num)!)
//     }
//     console.log(`Part 2: ${result}`)
// }

// export const part2 = (input: string): number => {
//     const allGames = getCards(input);
//     let cards = allGames
//         .map((card: Scratchcard) => {
//             const winners = card.numbers.filter((number: number) => card.winningNumbers.includes(number));
//
//             let clones: number[] = []
//             for (let i = 0; i <= winners.length; i++) clones = [...clones, card.id + i]
//             return clones
//         })
//         .flat()
//         // .map((id: number) => {
//         //     const card = allGames.find((card: Scratchcard) => card.id === id);
//         //     const winners = card.numbers.filter((number: number) => card.winningNumbers.includes(number));
//         //
//         //     let clones: number[] = []
//         //     for (let i = 0; i <= winners.length; i++) clones = [...clones, card.id + i]
//         //     return clones
//         // })
//         // .flat()
//         .reduce((acc: { [key: string]: number }, curr: number) => {
//             const key = curr.toString();
//             if (!acc[key]) acc[key] = 0;
//             acc[key]++;
//             return acc;
//         }, {});
//     // .reduce((acc: number, curr: number) => acc + curr, 0)
//     console.log(cards)
//
//     return 0
// }
