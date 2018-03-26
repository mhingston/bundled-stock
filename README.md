Bundled Stock
=-=-=-=-=-=-=

Objective: Work out the quantity in stock for groups of products.

Products for a shop are represented in a database by short codes or "Stock Keeping Units" (henceforth SKUs). Some of these products are sold in groups or "bundles". For example a set of table and chairs.

The SKUs for bundles are formatted from each of the component SKUs optionally followed by a quantity enclosed in brackets, joined by a "+" symbol. For example:

SKU1 + SKU2(3) + SKU3

Indicates a bundle composed of SKU1, 3 of SKU2 and a SKU3.

A supplier provides a feed of their available stock in CSV format here:

http://www.baumhaus.co.uk/gen_file

The columns are as follows:
 * partNo - The SKU
 * onHand - The quantity available
 * onWater - The quantity available at a later date
 * docDate - The date the "onWater" quantity will be available
 * onDate - The time the file was generated.

You should write a program that takes a list of bundle SKUs in a file and outputs the effective stock level for the bundle. It must also fetch an up-to-date stock list each time it is run.

Using the example SKU above and the following quantities:

SKU1: 10
SKU2: 11
SKU3: 4

The correct stock level for "SKU1 + SKU2(3) + SKU3" would be 3.

Your program should execute something like:

node build-bundle-stock.js list-of-bundles.csv

Where list-of-bundles.csv would be something like:

"SKU1 + SKU3"
"SKU2 + SKU1(4)"
"SKU1 + SKU4(4)"

It's output would be:

"SKU1 + SKU3",3
"SKU2 + SKU1(4)",1
"SKU1 + SKU4(4)",2

Important note: Almost all the SKUs are entered into the database "by hand" by people with _very_ limited understanding of computers. You should make your program as tolerant as practical of variations in the format described above.

The actual list of bundle SKUs is deliberately omitted. You should generate your own list of bundle SKUs for testing with the variations in formatting you consider appropriate.

## Notes

* To submit your solution commit and push your changes to origin.
* This exercise is timed. You should submit a solution within 4 hours of cloning this repository.
* Commit and push as many times as you like. The last commit before the 4 hour deadline will be assessed.
* The authoritative source of time is the git server.
* _All_ aspects of your solution will be assessed not just the output
* Yes that includes the ability to use source control properly
