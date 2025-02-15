"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * seeeder berguna untuk membuat data dummy/bohongan supaya database/tabel tidak kosong 
     * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					name: "User 1",
					email: "user1@example.com",
					password: "qwert123",
          createdAt: new Date(),
          updatedAt: new Date(),
				},
        {
					name: "User 2",
					email: "user2@example.com",
					password: "qwert456",
          createdAt: new Date(),
          updatedAt: new Date(),
				},
        {
					name: "User 3",
					email: "user3@example.com",
					password: "qwert789",
          createdAt: new Date(),
          updatedAt: new Date(),
				},
			],
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
    return queryInterface.bulkDelete("Users", null, {});
	},
};
