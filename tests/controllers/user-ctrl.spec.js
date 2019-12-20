const { 
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    userSignIn,
    userSignOut
} = require('../../src/controllers/user-ctrl')
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

describe('User creations unit-test', () => {	
	it('User creations does not crash if empty object is passed in', () => {
		const body = {}
		const req = mockRequest(body);
		const res = mockResponse();
		createUser(req,res)
		expect(res.status).toHaveBeenCalledWith(statusCode.BAD_REQUEST);
	})

	// it('User creations if body has all necessary properties', () => {
    //     const body = {}	
    //     body.body = {
    //         username: "d1",
    //         password: "d1pw"  
    //     }
		
	// 	const req = mockRequest(body);
	// 	const res = mockResponse();
		
	// 	createUser(req,res)
	// 	expect(res.status).toHaveBeenCalledWith(statusCode.OK);
	// })
})

// describe('User update/delete/get question by Id/get question unit-test', () => {
// 	let body = {}
// 	let req
// 	let res

// 	beforeEach(() => {
//         body.body = {
//             username: "d1",
//             password: "d1pw",
//             email: "d1@d1.com"  
//         }
		
// 		req = mockRequest(body);
// 		res = mockResponse();
		
// 		createUser(req,res)
// 	})

// 	it('User updates body properties', () => {
//         body.body = {
//           email: 'd1@dummy.com'  
//         }
		
// 		const req2 = mockRequest(body);
// 		req2.params = {
// 			id: "5df6ffbdcb5c5f2db49e1c4e" 
// 		}

// 		updateUser(req2, res)
// 		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
// 	})

// 	it('User deletes without crashing', () => {
// 		const req2 = mockRequest(body);
// 		req2.params = {
// 			id: "5df6ffbdcb5c5f2db49e1c4e"
// 		}

// 		deleteUser(req2, res)
// 		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
// 	})

// 	it('User gets retrieved without crashing', () => {
// 		const req2 = mockRequest(body);
// 		req2.params = {
// 			id: "5df6ffbdcb5c5f2db49e1c4e" 
// 		}

// 		getUserById(req2, res)
// 		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
// 	})

// 	it('User gets sign in', () => {
// 		const req2 = mockRequest(body);
// 		req2.params = {
// 			id: "5df6ffbdcb5c5f2db49e1c4e" 
// 		}

// 		userSignIn(req2, res)
// 		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
// 	})

// 	it('User gets sign out', () => {
// 		const req2 = mockRequest(body);
// 		req2.params = {
// 			id: "5df6ffbdcb5c5f2db49e1c4e" 
// 		}

// 		userSignOut(req2, res)
// 		expect(res.status).toHaveBeenCalledWith(statusCode.OK)
// 	})
// })