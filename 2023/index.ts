const day = process.env.DAY ?? new Date().getDate();

if (!await Bun.file(`./days/${day.toString().padStart(2, '0')}.ts`).exists()) {
    console.error(`Day ${day} has not been implemented yet.`)
    process.exit(0);
}

const { solution } = await import(`./days/${day.toString().padStart(2, '0')}.ts`);

solution();
