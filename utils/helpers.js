// file to create helper functions to format date/singular plural words

module.exports = {
    // used to properly format the date
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },

    // used to properly pluralize words (votes, reviews, etc)
    format_plural: (word, amount) => {
        if (amount !== 1){
            return `${word}s`;
        }
        return word
    },

    // used to format URL to make it easier to read
    format_url: url => {
        return url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .split('/')[0]
        .split('?')[0];
    }
};