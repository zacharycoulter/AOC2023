import { expect, test } from "bun:test";
import { part1, part2 } from '@days/01'

test('day 1, part 1', () => {
    const input = `1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet
`
    expect(part1(input)).toBe(142)
})

test('day 1, part 2', () => {
    const input = `two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen
`
    expect(part2(input)).toBe(281)
})
