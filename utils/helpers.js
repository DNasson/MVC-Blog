module.exports = {
    formatdate: date => {
        return date.toLocaleDateString();
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
        return word;
    },
};