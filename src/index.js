var fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', 'data', 'users.json');
const outputFile = path.join(__dirname, '..', 'output', 'users.csv');


async function jsonActiveCustomersToCsv(inputFile, outputFile) {
    try {
        const options = { encoding: 'utf8' };
        const fileData = await fs.promises.readFile(inputFile, options);
        const customers = JSON.parse(fileData);
        const activeCustomers = customers.filter((customer) => customer.isActive);
        const csvData = `"name","company"\n${activeCustomers.map((customer) => `"${customer.name}","${customer.company}"\n`).join('')}`;
        await fs.promises.writeFile(outputFile, '\ufeff' + csvData, options);
        console.log('Done');
    } catch (err) {
        console.error(err);
    }
}

jsonActiveCustomersToCsv(inputFile, outputFile);