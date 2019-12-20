const {
	createQuestion, 
	updateQuestion,
	deleteQuestion,
	getQuestionById,
	getQuestion
} = require('../../src/controllers/question-ctrl')
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

describe('Questions creations unit-test', () => {	
	it('Question creations does not crash if empty object is passed in', () => {
		const body = {}
		const req = mockRequest(body);
		const res = mockResponse();
		createQuestion(req,res)
		expect(res.status).toHaveBeenCalledWith(statusCode.BAD_REQUEST);
	})

	it('Question creations if body has all necessary properties', () => {
		const body = {}
		body.answer = "2"
		body.options = [
			{"1":"Big Willy"},
			{"2":"Touch of Death"},
			{"3":"One shadow Dealth Touch"},
			{"4":"none"}
		]
		body.quizId = "5d7d69edbb4f4d29d843e50b"
		body.question = "What test did the Kumite organize have chance?"
		
		const req = mockRequest(body);
		const res = mockResponse();
		
		createQuestion(req,res)
		expect(res.status).toHaveBeenCalledWith(statusCode.OK);
	})
})

describe('Question update/delete/get question by Id/get question unit-test', () => {
	let body = {}
	let req
	let res

	beforeEach(() => {
		body.answer = "2"
		body.options = [
			{"1":"Big Willy"},
			{"2":"Touch of Death"},
			{"3":"One shadow Dealth Touch"},
			{"4":"none"}
		]
		body.quizId = "5d7d69edbb4f4d29d843e50b"
		body.question = "What test did the Kumite organize have chance?"
		
		req = mockRequest(body);
		res = mockResponse();
		
		createQuestion(req,res)
	})

	it('Question updates body properties', () => {
		body.answer = "4"
		body.options = [
			{"1":"Big Willy--"},
			{"2":"Touch of Death--"},
			{"3":"One shadow Dealth Touch--"},
			{"4":"none--"}
		]
		body.quizId = "5d7d69edbb4f4d29d843e50b"
		body.question = "What test did the Kumite organize have chance?"
		
		const req2 = mockRequest(body);
		req2.params = {
			id: "5d7d69edbb4f4d29d843e50b" 
		}

		updateQuestion(req2, res)

		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
	})

	it('Question deletes without crashing', () => {
		const req2 = mockRequest(body);
		req2.params = {
			id: "5d7d69edbb4f4d29d843e50b" 
		}

		deleteQuestion(req2, res)
		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
	})

	it('Question gets retrieved without crashing', () => {
		const req2 = mockRequest(body);
		req2.params = {
			id: "5d7d69edbb4f4d29d843e50b" 
		}

		getQuestionById(req2, res)
		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
	})

	it('All question gets retrieved without crashing', () => {
		const req2 = mockRequest(body);
		req2.params = {
			id: "5d7d69edbb4f4d29d843e50b" 
		}

		getQuestion(req2, res)
		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
	})
})