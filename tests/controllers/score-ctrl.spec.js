const { 
    createScore,
    updateScore,
    deleteScore,
    getScoreById,
    getScore
} = require('../../src/controllers/score-ctrl')
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

describe('Score creations unit-test', () => {	
	it('Score creations does not crash if empty object is passed in', () => {
		const body = {}
		const req = mockRequest(body);
		const res = mockResponse();
		createScore(req,res)
		expect(res.status).toHaveBeenCalledWith(statusCode.BAD_REQUEST);
	})

	it('Score creations if body has all necessary properties', () => {
        const body = {}
        body.quizId = "5d7d70b2d482c409406cec5d"
        body.userId = "5d76c40595c3f3472863e293"
        body.score = "100"
        body.nonAnswered =[]
		
		const req = mockRequest(body);
		const res = mockResponse();
		
		createScore(req,res)
		expect(res.status).toHaveBeenCalledWith(statusCode.OK);
	})
})

describe('Score update/delete/get question by Id/get question unit-test', () => {
	let body = {}
	let req
	let res

	beforeEach(() => {
        body.quizId = "5d7d70b2d482c409406cec5d"
        body.userId = "5d76c40595c3f3472863e293"
        body.score = "100"
        body.nonAnswered =[]
		
		req = mockRequest(body);
		res = mockResponse();
		
		createScore(req,res)
	})

	it('Score updates body properties', () => {
        body.quizId = "5d7d70b2d482c409406cec5d"
        body.userId = "5d76c40595c3f3472863e293"
        body.score = "100"
        body.nonAnswered =[]
		
		const req2 = mockRequest(body);
		req2.params = {
			id: "5dfc286769917714409e694c" 
		}

		updateScore(req2, res)
		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
	})

	it('Score deletes without crashing', () => {
		const req2 = mockRequest(body);
		req2.params = {
			id: "5dfc286769917714409e694c"
		}

		deleteScore(req2, res)
		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
	})

	it('Score gets retrieved without crashing', () => {
		const req2 = mockRequest(body);
		req2.params = {
			id: "5dfc286769917714409e694c" 
		}

		getScoreById(req2, res)
		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
	})

	it('All score gets retrieved without crashing', () => {
		const req2 = mockRequest(body);
		req2.params = {
			id: "5dfc286769917714409e694c" 
		}

		getScore(req2, res)
		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
	})
})