import { expect, test } from "bun:test";
import { getSumOfFirstLast } from '@days/01'

test('day 1, part 1', async () => {
    const input = Promise.resolve(`1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet`)
    expect(await getSumOfFirstLast(input, 1)).toBe(142)
})

test('day 1, part 2', async () => {
    const input = Promise.resolve(`two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`)
    expect(await getSumOfFirstLast(input, 2)).toBe(281)
})
