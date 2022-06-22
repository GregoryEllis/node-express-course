const makeFile = async () => {
    try {
        await writeFile('./content/p3.txt', 'this is  the line\n')
        const line = 'this is line';
        for(let i = 2; i <= 10; i++) {
            writeFile('./content/p3.txt', `${line} ${i}`)
        }

    } catch (error) {
        console.log(error)

    }
};
makeFile()