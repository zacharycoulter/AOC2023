(async () => {
    const result = (await fetch(`https://adventofcode.com/2023/day/1/input`, {
        headers: {
            cookie: `session=${process.env.SESSION_TOKEN}`
        }
    })
        .then((res) => res.text())
        .then((text: string) => text.match(/(\S*)\n/g) as string[]))
        .map((line: string) => ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].reduce((acc: string, word: string, index: number) => acc.replaceAll(word, word + (index + 1) + word), line))
        .map((line: string) => line.match(/\d/g) as string[])
        .reduce((acc: number, nums: string[]) => acc += parseInt(nums[0] + nums[nums.length - 1]), 0)

    console.log(result)
})()
