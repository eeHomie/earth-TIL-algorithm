const Sequelize = require('sequelize');

module.exports = class Info extends Sequelize.Model {
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      // 테이블 컬럼에 대한 설정
      {
        address: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
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
        modelName: 'Info',
        tableName: 'infos',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  // 다른 모델과의 관계
  // foreignKey 를 설정하지 않으면 User1Id (모델명+기본키) 로 FK 컬럼 생성
  static associate(db) {
    db.Info.belongsTo(db.User1);
  }
};