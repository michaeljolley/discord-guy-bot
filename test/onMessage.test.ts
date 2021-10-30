import * as chai from 'chai';
import { suite, suiteSetup, suiteTeardown } from 'mocha'
import * as sinon from 'sinon';

import bot from '../src/bot'
import { IMessage, IOffense } from '../src/types/message';
import { badMessageFromEnd, badMessageFromStart, safeMessage } from './mocks';

chai.should();

suite('Message Handler Tests', function() {

  let handleViolationStub: sinon.SinonStub<[offendingMessage: IOffense], Promise<void>>

  this.beforeEach(function() {
    handleViolationStub = sinon.stub(bot, 'handleViolation')
  })

  this.afterEach(function() {
    handleViolationStub.restore()
  })

  it('Should disregard message with no offending text', async function() {
    await bot.onMessage(safeMessage)
    handleViolationStub.called.should.be.false
  })
  
  it('Should flag a message with offense at the start', async function() {
    await bot.onMessage(badMessageFromStart)
    handleViolationStub.called.should.be.true
  })

  it('Should flag a message with offense at the end', async function() {
    await bot.onMessage(badMessageFromEnd)
    handleViolationStub.called.should.be.true
  })
})
