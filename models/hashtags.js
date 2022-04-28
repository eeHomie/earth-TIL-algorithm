const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      // 테이블 컬럼에 대한 설정
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      // 테이블 자체에 대한 설정
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Hashtag',
        tableName: 'hashtags',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  // 다른 모델과의 관계
  // belongsToMany 인 경우 through 필수
  static associate(db) {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  }
};