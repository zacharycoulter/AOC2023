const run = (part: number) =>
    fetch(`https://adventofcode.com/2023/day/1/input`, {
        headers: {
            cookie: `session=${process.env.SESSION_TOKEN}`
        }
    })
        .then((res) => res.text())
        .then((text: string) => text.match(/(\S*)\n/g) as string[])
        .then((lines: string[]) => part === 1
            ? lines
            : lines.map((line: string) => ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].reduce((acc: string, word: string, index: number) => acc.replaceAll(word, word + (index + 1) + word), line)))
        .then((lines: string[]) => lines
            .map((line: string) => line.match(/\d/g) as string[])
            .reduce((acc: number, nums: string[]) => acc += parseInt(nums[0] + nums[nums.length - 1]), 0))

Promise
    .all([run(1), run(2)])
    .then(console.log)
