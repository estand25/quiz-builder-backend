const { 
    createUserResponse,
    updateUserResponse,
    deleteUserResponse,
    getUserResponseById,
    getUserResponse
} = require('../../src/controllers/userResponse-ctrl')
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

describe('User Response creations unit-test', () => {	
	it('User Response creations does not crash if empty object is passed in', () => {
        const body = {}
        
		const req = mockRequest(body);
        const res = mockResponse();
        
		createUserResponse(req,res)
		expect(res.status).toHaveBeenCalledWith(statusCode.BAD_REQUEST);
	})

	it('User Response creations if body has all necessary properties', () => {
        const body = {}
        body.response = "2"
        body.questionId = "5d7d7e4c9350c2466c46d4b5"
        body.userId = "5d76c40595c3f3472863e293"
		
		const req = mockRequest(body);
		const res = mockResponse();
		
		createUserResponse(req,res)
		expect(res.status).toHaveBeenCalledWith(statusCode.OK);
	})
})

describe('User Response update/delete/get question by Id/get question unit-test', () => {
	let body = {}
	let req
	let res

	beforeEach(() => {
        body.response = "2"
        body.questionId = "5d7d7e4c9350c2466c46d4b5"
        body.userId = "5d76c40595c3f3472863e293"
		
		req = mockRequest(body);
		res = mockResponse();
		
		createUserResponse(req,res)
	})

	it('User Response updates body properties', () => {
        body.response = "2"
        body.questionId = "5d7d7e4c9350c2466c46d4b5"
        body.userId = "5d76c40595c3f3472863e293"
		
		const req2 = mockRequest(body);
		req2.params = {
			id: "5dfc358f20d4022da45df125" 
		}

		updateUserResponse(req2, res)
		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
	})

	it('User Response deletes without crashing', () => {
		const req2 = mockRequest(body);
		req2.params = {
			id: "5dfc358f20d4022da45df125"
		}

		deleteUserResponse(req2, res)
		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
	})

	it('User Response gets retrieved without crashing', () => {
		const req2 = mockRequest(body);
		req2.params = {
			id: "5dfc358f20d4022da45df125" 
		}

		getUserResponseById(req2, res)
		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
	})

	it('All user response gets retrieved without crashing', () => {
		const req2 = mockRequest(body);
		req2.params = {
			id: "5dfc358f20d4022da45df125" 
		}

		getUserResponse(req2, res)
		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
	})
})