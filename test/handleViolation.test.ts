import * as chai from 'chai';
import { suite } from 'mocha'
import * as sinon from 'sinon';

import bot from '../src/bot'
import { FaunaClient } from '../src/fauna';
import { Notice } from '../src/types/notice';
import { badMessageFromEnd, newNotice, oldNotice } from './mocks';

chai.should();

suite('Violation Handler Tests', function() {

  let saveNoticeStub: sinon.SinonStub<[notice: Notice], Promise<Notice | undefined>>
  let reactStub: sinon.SinonStub<any[], any>
  let replyStub: sinon.SinonStub<any[], any>
  let createDMStub: sinon.SinonStub<any[], any>

  this.beforeEach(function() {
    saveNoticeStub = sinon.stub(FaunaClient, 'saveNotice')
      .callsFake((notice: Notice) => {
        return Promise.resolve(newNotice)
      })
    reactStub = sinon.stub(badMessageFromEnd, 'react')
    replyStub = sinon.stub(badMessageFromEnd, 'reply')
    createDMStub = sinon.stub(badMessageFromEnd.author, 'createDM')
      .callsFake(() => {
        return {
          send: sinon.stub()
        }
      })
  })

  this.afterEach(function() {
    sinon.resetHistory()
    sinon.restore()
  })

  it('Should DM user & react if this is their first offense', async function() {
    
    sinon.stub(FaunaClient, 'getNoticesByUser')
      .callsFake((user: String, guild: String): Promise<Notice[]> => {
        return Promise.resolve([])
      })

    await bot.handleViolation(badMessageFromEnd)
    
    createDMStub.called.should.be.true
    reactStub.called.should.be.true
    replyStub.called.should.be.false
    saveNoticeStub.called.should.be.true
  })

  it('Should reply in channel & react if this is a repeat offense', async function() {
  
    sinon.stub(FaunaClient, 'getNoticesByUser')
      .callsFake((user: String, guild: String): Promise<Notice[]> => {
        return Promise.resolve([newNotice])
      })

    await bot.handleViolation(badMessageFromEnd)
    
    createDMStub.called.should.be.false
    reactStub.called.should.be.true
    replyStub.called.should.be.true
    saveNoticeStub.called.should.be.true
  })
  
  it('Should disregard old offenses', async function() {
  
    sinon.stub(FaunaClient, 'getNoticesByUser')
      .callsFake((user: String, guild: String): Promise<Notice[]> => {
        return Promise.resolve([oldNotice])
      })

    await bot.handleViolation(badMessageFromEnd)
    
    createDMStub.called.should.be.true
    reactStub.called.should.be.true
    replyStub.called.should.be.false
    saveNoticeStub.called.should.be.true
  })
})
