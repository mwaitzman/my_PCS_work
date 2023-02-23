console.log(
	process.argv
	.slice(2)
	.reduce(
		(acc, i) => acc + Number(i),
		0
	)
);