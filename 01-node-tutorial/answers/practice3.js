const { writeFile } = require("fs").promises;

// async call back function
const makeFile = async () => {
  try {
    await writeFile("./content/practice2.txt", `This is the first line\n`);
    const line = "This is line ";
    for (let i = 2; i <= 10; i++) {
      writeFile("./content/practice2.txt", `${line} ${i}\n`, { flag: "a" });
    }
  } catch (error) {
    console.log(error);
  }
};
makeFile();