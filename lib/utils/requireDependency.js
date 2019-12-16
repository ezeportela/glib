const requireDependency = (filepath) => require(`${process.env.PWD}${filepath}`);

module.exports = requireDependency;
