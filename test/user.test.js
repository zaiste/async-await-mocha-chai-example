const expect = require('chai').expect;
const Sequelize = require('sequelize');

describe('users', () => {
  let database;
  let User;

  before(async () => {
    database = new Sequelize('postgresql://localhost/app_test', { logging: false });
    User = database.define('user', {
      username: Sequelize.STRING,
      birthday: Sequelize.DATE
    });
  })

  beforeEach(async () => {
    await User.sync();
    await User.create({
      username: 'zaiste',
      birthday: new Date(1988, 1, 21)
    });
  })

  afterEach(async () => {
    await User.drop();
  })

  describe('#find()', () => {
    it('should find a user', async () => {
      const user = await User.findOne({ where: { username: 'zaiste' }})
      expect(user).to.be.a('object');
      expect(user).to.have.property('username');
      expect(user).to.have.property('birthday');
      expect(user.username).to.equal('zaiste');

      // To check whether dates are equal, they must be converted to their primitives:
      // date1.getTime()=== date2.getTime()
      expect(user.birthday.toISOString()).to.equal((new Date(1988, 1, 21)).toISOString());
    });
  });
});
