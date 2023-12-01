import { getInput } from "@lib/input";

export const getSumOfFirstLast = async (input: Promise<string>, part: 1 | 2): Promise<number> => {
    const addDigitToNumWords = (lines: string[]): string[] => lines
        .map((line: string): string => ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
            .reduce((acc: string, word: string, index: number): string => acc.replaceAll(word, word + (index + 1) + word), line))

    const getSumOfLines = (lines: string[]): number => lines
        .map((line: string): string[] => line.match(/\d/g) ?? [])
        .reduce((acc: number, nums: string[]): number => acc += parseInt(nums[0] + nums[nums.length - 1]), 0)

    return input
        .then((text: string): string[] => text.split('\n').filter((line: string): boolean => line.length > 0))
        .then((lines: string[]): string[] => part === 1 ? lines : addDigitToNumWords(lines))
        .then(getSumOfLines)
}

const input = getInput(1)
Promise
    .all([getSumOfFirstLast(input, 1), getSumOfFirstLast(input, 2)])
    .then(console.log)
