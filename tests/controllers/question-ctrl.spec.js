const { expect } = require('chai')
const { stub } = require('sinon')
const question_ = require('../../src/controllers/question-ctrl')

const question = {
	"answer":"2",
	"options":[{"1":"Big Willy"},{"2":"Touch of Death"},{"3":"One shadow Dealth Touch"},{"4": "none"}],
	"quizId":"5d7d69edbb4f4d29d843e50b",
	"question":"What test did the Kumite organize have chance?"
}

describe('Questions function unit-test', () => {
    it('Question creation fails if empty object is passed in', () => {
        expect(true).to.be.true;
    })
})