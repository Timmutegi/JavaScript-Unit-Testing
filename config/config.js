dbUri =
	"mongodb+srv://fse:mhbZAW8vEp@AMn8@cluster0.xrdjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

module.exports = {
	development: {
	
	},
	test: {
		
	},
	production: {
		secret: "hello",
		mongoURI: dbUri,
	},
};
