import { expect, test } from "bun:test";
import { part1, part2 } from '@days/01'

test('day 1, part 1', async () => {
    const input = Promise.resolve(`1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet`)
    expect(await part1(input, 1)).toBe(142)
})

test('day 1, part 2', async () => {
    const input = Promise.resolve(`two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`)
    expect(await part2(input, 2)).toBe(281)
})
