const { 
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuizById,
    getQuiz
} = require('../../src/controllers/quiz-ctrl')
const statusCode = require('http-status-codes');

const mockResponse = () => {
	const res = {};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

const mockRequest = (body) => {
	return {
		body
	}
} 

describe('Quiz creations unit-test', () => {	
	it('Quiz creations does not crash if empty object is passed in', () => {
		const body = {}
		const req = mockRequest(body);
		const res = mockResponse();
		createQuiz(req,res)
		expect(res.status).toHaveBeenCalledWith(statusCode.BAD_REQUEST);
	})

	it('Quiz creations if body has all necessary properties', () => {
        const body = {}
        body.name = "Pattern Match",
        body.description = "A pattern match quiz where user needs to match after seening a image",
        body.type = "matching"
		
		const req = mockRequest(body);
		const res = mockResponse();
		
		createQuiz(req,res)
		expect(res.status).toHaveBeenCalledWith(statusCode.ACCEPTED);
	})
})

describe('Quiz update/delete/get question by Id/get question unit-test', () => {
	let body = {}
	let req
	let res

	beforeEach(() => {
        body.name = "Pattern Match",
        body.description = "A pattern match quiz where user needs to match after seening a image",
        body.type = "matching"
		
		req = mockRequest(body);
		res = mockResponse();
		
		createQuiz(req,res)
	})

	it('quiz updates body properties', () => {
        body.name = "Pattern Match---",
        body.description = "A pattern match quiz where user needs to match after seening a image",
        body.type = "matching"
		
		const req2 = mockRequest(body);
		req2.params = {
			id: "5dfc2073a7ca93202c9f41a2" 
		}

		updateQuiz(req2, res)

		expect(res.status).toHaveBeenCalledWith(statusCode.ACCEPTED)
	})

	it('quiz deletes without crashing', () => {
		const req2 = mockRequest(body);
		req2.params = {
			id: "5dfc2073a7ca93202c9f41a2"
		}

		deleteQuiz(req2, res)
		expect(res.status).toHaveBeenCalledWith(statusCode.ACCEPTED)
	})

	it('Quiz gets retrieved without crashing', () => {
		const req2 = mockRequest(body);
		req2.params = {
			id: "5d7d69edbb4f4d29d843e50b" 
		}

		getQuizById(req2, res)
		expect(res.status).toHaveBeenCalledWith(statusCode.ACCEPTED)
	})

	it('All quiz gets retrieved without crashing', () => {
		const req2 = mockRequest(body);
		req2.params = {
			id: "5d7d69edbb4f4d29d843e50b" 
		}

		getQuiz(req2, res)
		expect(res.status).toHaveBeenCalledWith(statusCode.ACCEPTED)
	})
})