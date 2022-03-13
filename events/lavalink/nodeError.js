module.exports = async(bot, node, error) => {
    console.log(`Lost connection of ${node.options.identifier}. Reason: ${error.message}`)

}