import { getInput } from "@lib/input";

const getSumOfFirstLast = async (part: 1 | 2): Promise<number> => {
    const addDigitToNumWords = (lines: string[]): string[] => lines
        .map((line: string): string => ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
            .reduce((acc: string, word: string, index: number): string => acc.replaceAll(word, word + (index + 1) + word), line))
    
    const getSumOfLines = (lines: string[]): number => lines
        .map((line: string): string[] => line.match(/\d/g) ?? [])
        .reduce((acc: number, nums: string[]): number => acc += parseInt(nums[0] + nums[nums.length - 1]), 0)

    return getInput(1)
        .then((text: string): string[] => text.split('\n').filter((line: string): boolean => line.length > 0))
        .then((lines: string[]): string[] => part === 1 ? lines : addDigitToNumWords(lines))
        .then(getSumOfLines)
}

Promise
    .all([getSumOfFirstLast(1), getSumOfFirstLast(2)])
    .then(console.log)
