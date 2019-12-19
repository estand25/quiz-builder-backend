// const { expect } = require('chai')
// const { stub, spy } = require('sinon')
const {createQuestion} = require('../../src/controllers/question-ctrl')

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

describe('Questions function unit-test', () => {	
	it('Question creations does not crash if empty object is passed in', () => {
		const body = {}
		const req = mockRequest(body);
		
		const res = mockResponse();
		createQuestion(req,res)
		expect(res.status).toHaveBeenCalledWith(400);
	})
	// it('Question creations if body has all necessary properties', () => {
	// 	const body = {}
	// 	body.answer = "2"
	// 	body.options = [{"1":"Big Willy"},{"2":"Touch of Death"},{"3":"One shadow Dealth Touch"},{"4": "none"}]
	// 	body.quizId = "5d7d69edbb4f4d29d843e50b"
	// 	body.question = "What test did the Kumite organize have chance?"

	// 	console.log('test', body);
		
	// 	const req = mockRequest(body);
	// 	const res = mockResponse();
		
	// 	createQuestion(req,res)
	// 	expect(res.status).toHaveBeenCalledWith(201);
	// })
})