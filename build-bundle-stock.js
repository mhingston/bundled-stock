const path = require('path');
const config = require(path.join(process.cwd(), 'config.json'));
const request = require('request-promise-native');
const csv = require('csvtojson');
const _ = require('lodash');
const stockData = [];

const done = (error, callback) =>
{
    if(error)
    {
        console.log(error.message);
    }

    if(typeof callback === 'function')
    {
        callback();
    }
};

const main = () =>
{
    const addRow = (json) =>
    {
        json.onHand = parseInt(json.onHand);
        json.onWater = parseInt(json.onWater);
        stockData.push(json);
    };

    if(/^https?:\/\//.test(config.dataSource))
    {
        csv()
            .fromStream(request.get(config.dataSource))
            .on('json', addRow)
            .on('done', (error) => done(error, processFile.bind(null, process.argv[2])));
    }

    else
    {
        csv()
            .fromFile(config.dataSource)
            .on('json', addRow)
            .on('done', (error) => done(error, processFile.bind(null, process.argv[2])));
    }
};

const processFile = (file) =>
{
    csv({noheader: true})
        .fromFile(file)
        .on('csv', (row) =>
        {
            const bundle = [];
            const patternSKU = /([\w-]+)\(?(\d+)?\)?/g;
            const patternQTY = /([\w-]+)/g;
            const SKUs = row[0].match(patternSKU);

            SKUs.forEach((sku) =>
            {
                let qty;
                const qtyMatch = sku.match(patternQTY);

                if(qtyMatch)
                {
                    sku  = qtyMatch[0];
                    qty = isNaN(parseInt(qtyMatch[1])) ? 1 : parseInt(qtyMatch[1]);
                }

                bundle.push(
                    {
                        row: row[0],
                        sku,
                        qty
                    });
            });

            let availableBundles = Infinity;

            bundle.forEach((sku) =>
            {
                const entry = _.find(stockData, {partNo: sku.sku});

                if(!entry)
                {
                    availableBundles = 0;
                    return;
                }

                const remaining = Math.floor(entry.onHand / sku.qty);

                if(remaining < availableBundles)
                {
                    availableBundles = remaining;
                }
            });

            console.log(`${row[0]},${availableBundles}`);
        })
        .on('done', done);
};

main();