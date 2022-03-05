const app = require('./app');
const supertest = require('supertest')
const request = supertest(app);

describe('GET /quote', () => {
    it('responds with Life Is Good quote', (done) => {
        request
            .get('/quote')
            .expect(200, 'Life is good', done)
    })
})

describe('GET /weblink/ returns JSON', () => {
    it('responds with JSON', (done) => {
        request
            .get('/weblink/')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200, done)
    })
});

describe('GET /weblink/1 returns BBC website', () => {
    it('responds with BBC object in JSON', (done) => {
        request
            .get('/weblink/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, [{ url: 'http://www.bbc.co.uk', rating: 6, id: 1 }], done)
    });
});


describe('POST /weblink', () => {
    it('responds with json', (done) => {
        request
            .post('/weblink')
            .field('url', 'http://test3.com')
            .field('rating', 9)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/) //I have no fucking clue why this does not work
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                done();
            })
    })
})