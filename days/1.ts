(async () => {
    const input = await Bun.file(import.meta.dir + '/1-input.txt').text();
    const total = input
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
            .replaceAll('nine', 'nine9nine')
        )
        .map((line: string) => line.split('').filter((char: string) => !isNaN(parseInt(char))).join(''))
        .reduce((acc: number, nums: string) => acc += parseInt(nums[0] + nums[nums.length - 1]), 0);
    console.log(total);
})()
