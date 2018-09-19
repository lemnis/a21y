interface quoteSet {
	doubleOpen: string,
	singleOpen: string,
	singleClose: string,
	doubleClose: string
}

const status = {
  CLOSED: 0,
  DOUBLEOPEN: 1,
  SINGLEOPEN: 2
};

function getQuotesSet(stringifiedQuotes) : quoteSet {

	// custom css has unset all quotes
	if (stringifiedQuotes === "none") {
		return {
			doubleOpen: '',
			singleOpen: '',
			singleClose: '',
			doubleClose: ''
		}
	}

	const regex = /"(.+?)"/g;
	let match;
	const quotes = [];

	// convert stringified quotes to a array
	while (match = regex.exec(stringifiedQuotes)) quotes.push(match[1]);

	// no custom quotes are set
	if (quotes.length === 0) {
		return {
			doubleOpen: '“',
			singleOpen: '‘',
			singleClose: '’',
			doubleClose: '”'
		};
	}

	return {
		doubleOpen: quotes[0],
		singleOpen: quotes.length === 4 ? quotes[2] : quotes[0],
		singleClose: quotes.length === 4 ? quotes[3] : quotes[1],
		doubleClose: quotes[1]
	}
}

export default class Quotes {

	private currentStatus: number;
	private quoteSet: quoteSet;

	constructor(stringifiedQuotes: string){
		this.currentStatus = status.CLOSED;
		this.quoteSet = getQuotesSet(stringifiedQuotes);
	}


	is(string: string) {
		return string === 'open-quote' ||
			string === 'no-open-quote' || 
			string === 'close-quote' || 
			string === 'no-close-quote';
	}

	get(string: string){
		switch (string) {
			case 'open-quote':
				if (this.currentStatus === status.CLOSED) {
					this.currentStatus = status.DOUBLEOPEN;
					return this.quoteSet.doubleOpen;
				} else {
					this.currentStatus = status.SINGLEOPEN;
					return this.quoteSet.singleOpen;
				}
			case 'close-quote':
				if (this.currentStatus === status.DOUBLEOPEN) {
					this.currentStatus = status.SINGLEOPEN;
					return this.quoteSet.singleClose;
				} else if (this.currentStatus === status.SINGLEOPEN) {
					this.currentStatus = status.CLOSED;
					return this.quoteSet.doubleClose;
				}
				return null;
			case 'no-close-quote':
				if (this.currentStatus === status.DOUBLEOPEN) this.currentStatus = status.SINGLEOPEN;
				if (this.currentStatus === status.SINGLEOPEN) this.currentStatus = status.CLOSED;
				return null;
			case 'no-open-quote':
				if (this.currentStatus === status.CLOSED) {
					this.currentStatus = status.DOUBLEOPEN;
				} else {
					this.currentStatus = status.SINGLEOPEN;
				}
		}
	}
}