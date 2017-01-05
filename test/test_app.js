var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var app = require('../app.js');
var cheerio = require('cheerio');

chai.use(chaiHttp);

describe('static routes', function(){
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

describe('api routes', function(){
  it('should display json on /api/info GET', function(done){
    chai.request(app)
      .get('/api/info')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('name');
        res.body.name.should.equal('howie mann');
        res.body.should.have.property('age');
        res.body.age.should.equal('21');
        done();
      });
  });
});
