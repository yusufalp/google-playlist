const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');

describe('GET /apps endpoint', () => {
  it('should return a list of apps from Google Playlist', () => {
    supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-type', /json/)
      .then(res => {
        expect(res.body[0]).to.include.all.keys('App', 'Rating', 'Installs', 'Type')
        expect(res.body).to.have.lengthOf.at.least(1)
        expect(res.body).to.be.an('array')
      })
  })
  it('should return 400 if sort is wrong', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'Type' })
      .expect(400, 'Sort must be one of the Rating or App')
  })
  it('should return 400 if genres is wrong', ()=>{
    return supertest(app)
      .get('/apps')
      .query({genres: 'sport'})
      .expect(400, 'Genres must be one of the Action, Puzzle, Strategy, Casual, Arcade, Card')
  })
})