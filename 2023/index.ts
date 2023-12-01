import { getInput } from '@lib/input';

const day = process.env.DAY ?? new Date().getDate();

if (!await Bun.file(`./days/${day.toString().padStart(2, '0')}.ts`).exists()) {
    console.error(`Day ${day} has not been implemented yet.`)
    process.exit(0);
}

const { part1, part2 } = await import(`@days/${day.toString().padStart(2, '0')}`);
const input = await getInput(1)
const start = performance.now()
console.log(`Part 1: ${part1(input)} (${(performance.now() - start).toFixed(2)}ms)`)
console.log(`Part 2: ${part2(input)} (${(performance.now() - start).toFixed(2)}ms)`)
