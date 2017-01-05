var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var app = require('../app.js');
var cheerio = require('cheerio');

chai.use(chaiHttp);

describe('routes', function(){
  it('should display INDEX html on / GET', function(done){
    chai.request(app)
      .get('/')
      .end(function(err, res){
        var $ = cheerio.load(res.text);

        res.should.have.status(200);
        res.should.be.html;
        ($('h1').text()).should.equal('Index');
        done();
      });
  });

  it('should display dynamic html on /dynamic/hello GET', function(done){
    chai.request(app)
      .get('/dynamic/hello')
      .end(function(err, res){
        var $ = cheerio.load(res.text);

        res.should.have.status(200);
        res.should.be.html;
        ($('p').text()).should.include('hello');
        done();
      });
  });

  it('should display ERROR on /error GET', function(done){
    chai.request(app)
      .get('/error')
      .end(function(err, res){
        res.should.have.status(404);
        res.text.should.equal('404 error');
        done();
      });
  });
});
