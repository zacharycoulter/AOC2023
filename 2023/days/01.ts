const getSumOfLines = (lines: string[]): number => lines
    .map((line: string): string[] => line.match(/\d/g) ?? [])
    .reduce((acc: number, nums: string[]): number => acc += parseInt(nums[0] + nums[nums.length - 1]), 0)

const addDigitToNumWords = (lines: string[]): string[] => lines
    .map((line: string): string => ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
        .reduce((acc: string, word: string, index: number): string => acc.replaceAll(word, word + (index + 1) + word), line))

export const part1 = (input: string): number =>
    getSumOfLines(input.split('\n').filter((line: string): boolean => line.length > 0))

export const part2 = (input: string): number =>
    getSumOfLines(addDigitToNumWords(input.split('\n').filter((line: string): boolean => line.length > 0)))
