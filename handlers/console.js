module.exports = (bot) => {
    let promt = process.openStdin()
    promt.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
        bot.channels.get("621052065602338857").send(x.join(" "));
    });
}