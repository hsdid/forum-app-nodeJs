'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post,User}) {
      // define association here
      this.belongsTo(Post, {foreignKey: 'postId', onDelete: 'CASCADE' });

      this.belongsTo(User, {foreignKey: 'authorId', onDelete: 'CASCADE' });
    }
  };
  Comment.init({
    authorId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};