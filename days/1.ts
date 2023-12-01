(async () => {
    const result = (await fetch(`https://adventofcode.com/2023/day/1/input`, {
        headers: {
            cookie: `session=${process.env.SESSION_TOKEN}`
        }
    }).then((res) => res.text()))
        .split('\n')
        .filter((line: string) => line.length > 0)
        .map((line: string) => line
            .replaceAll('one', 'one1one')
            .replaceAll('two', 'two2two')
            .replaceAll('three', 'three3three')
            .replaceAll('four', 'four4four')
            .replaceAll('five', 'five5five')
            .replaceAll('six', 'six6six')
            .replaceAll('seven', 'seven7seven')
            .replaceAll('eight', 'eight8eight')
            .replaceAll('nine', 'nine9nine'))
        .map((line: string) => line.match(/\d/g) as string[])
        .reduce((acc: number, nums: string[]) => acc += parseInt(nums[0] + nums[nums.length - 1]), 0)

    console.log(result)
})()
