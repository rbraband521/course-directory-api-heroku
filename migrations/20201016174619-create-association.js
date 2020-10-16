// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     return queryInterface.addConstraint("Courses", {
//         fields: ["userId"],
//         type: "foreign key",
//         name: "userId",
//         references: {
//           table: "Users",
//           field: "id"
//         },
//         onUpdate: "cascade",
//         onDelete: "cascade"
//       }
//     )
//   },

//   down: async (queryInterface, Sequelize) => {
//     return queryInterface.removeConstraint(
//       "Courses",
//       "userId"
//     )
//   }
// };
module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
  }
}